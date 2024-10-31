import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid"; // Tạo UUID cho sessionToken
import dayjs from "dayjs"; // Sử dụng để tính thời gian hết hạn của session
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    await prisma.account.create({
      data: {
        userId: newUser.id,
        type: "credentials", // Kiểu đăng nhập là 'credentials'
        provider: "custom", // Provider mặc định là 'custom'
        providerAccountId: newUser.id, // ID tài khoản từ người dùng
        access_token: uuidv4(), // Tạo access_token ngẫu nhiên
        token_type: "Bearer", // Thiết lập token_type là 'Bearer'
        id_token: uuidv4(),
      },
    });
    const sessionToken = uuidv4(); // Tạo UUID cho sessionToken
    const sessionExpiry = dayjs().add(1, "day").toDate(); // Phiên hết hạn sau 1 ngày
    await prisma.session.create({
      data: {
        userId: newUser.id,
        sessionToken,
        expires: sessionExpiry,
      },
    });
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
