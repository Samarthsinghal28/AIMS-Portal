"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Dashboard({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-xl font-bold tracking-tight">
            {title || "Dashboard"}
          </h1>
          <nav>
            <Link href="/admin">
              <Button variant="ghost" className="text-white">
                Home
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-6">{children}</main>
    </div>
  );
}
