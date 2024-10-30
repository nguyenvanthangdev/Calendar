"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Settings, Users, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
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
          "bg-white shadow-md transition-all duration-300 ease-in-out fixed h-full z-20 pt-16",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex items-center p-4 justify-center gap-3">
          <Image src={Logo} width={30} height={30} alt="Logo" />
          {sidebarOpen && (
            <h1 className="text-2xl font-bold text-gray-800 transition-opacity duration-300">
              Calendar
            </h1>
          )}
        </div>

        <ul className="space-y-2 p-4">
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
