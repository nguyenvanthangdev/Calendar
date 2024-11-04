import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
//import { v4 as uuidv4 } from "uuid";
//import dayjs from "dayjs";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }
    // Hash the password
    const hashedPassword = await bcrypt.hashSync(password, salt);
    // Create the user and associated account in one transaction
    //const newUser =
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // accounts: {
        //   create: {
        //     type: "credentials",
        //     provider: "custom",
        //     providerAccountId: uuidv4(),
        //     access_token: uuidv4(),
        //     token_type: "bearer",
        //     id_token: uuidv4(),
        //   },
        // },
      },
    });

    // Create the session
    // const sessionToken = uuidv4();
    // const sessionExpiry = dayjs().add(1, "day").toDate();
    // await prisma.session.create({
    //   data: {
    //     userId: newUser.id,
    //     sessionToken,
    //     expires: sessionExpiry,
    //   },
    // });

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
