"use client";

import React from "react";
import Link from "next/link";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";
import Logo from "@/icons/logo.avif";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-[#030C16] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-center h-16 ">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src={Logo}
                alt="Logo"
                width={250}
                height={250}
               
              />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-transparent text-gray-200 hover:border-gray-300 hover:text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              {/* <Link
                href="/bets"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Bets
              </Link> */}
            </div>
          </div>
          <div className=" ml-6 flex items-center">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton>
                <Button variant="outline">Sign in</Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
