"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Settings,
  Users,
  Menu,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleSignOut } from "@/app/lib/logout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        className="fixed top-4 left-4 z-30"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <nav
        className={cn(
          "bg-white shadow-md transition-all duration-300 ease-in-out fixed h-full z-20 flex flex-col pt-16",
          sidebarOpen ? "w-64" : "w-25"
        )}
      >
        <div className="flex items-center p-4 gap-3 cursor-pointer">
          <Image src={Logo} width={40} height={40} alt="Logo" />
          {sidebarOpen && (
            <h1 className="text-2xl font-bold text-gray-800 transition-opacity duration-300">
              Calendar
            </h1>
          )}
        </div>

        <ul className="space-y-2 p-4 flex-1">
          <li>
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center space-x-2 text-gray-700 hover:text-blue-500",
                sidebarOpen ? "" : "justify-center"
              )}
            >
              <Home className="h-5 w-5" />
              {sidebarOpen && <span>Home</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/users"
              className={cn(
                "flex items-center space-x-2 text-gray-700 hover:text-blue-500",
                sidebarOpen ? "" : "justify-center"
              )}
            >
              <Users className="h-5 w-5" />
              {sidebarOpen && <span>Users</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className={cn(
                "flex items-center space-x-2 text-gray-700 hover:text-blue-500",
                sidebarOpen ? "" : "justify-center"
              )}
            >
              <Settings className="h-5 w-5" />
              {sidebarOpen && <span>Settings</span>}
            </Link>
          </li>
        </ul>
        {/* Nút nằm ở cuối cùng của sidebar */}
        <div className="flex justify-center p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <CircleUserRound className="h-10 w-10" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <form action={handleSignOut}>
                  <button className="flex items-center">
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <main
        className={cn(
          "flex-1 overflow-auto p-8 transition-all duration-300 ease-in-out",
          sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        {children}
      </main>
    </div>
  );
}
