"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Search, User, UserCircle } from "lucide-react";
import { Input } from "./ui/input";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <header className="flex px-[60px] py-4 justify-between items-center shadow-md bg-white">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/logo-new.png" alt="Logo" width="152" height="29" />
        </Link>
        <div className="ml-10 mr-2 w-[390px] h-12 relative">
          <Input
            className="pl-[38px] w-full h-12 bg-[#F4F4F4] border border-[#DFDFDF] text-[#686868]"
            type="text"
            placeholder="Search For Products, Brands & Categories"
          />
          <Search
            size={15}
            color="black"
            className="absolute top-[17px] left-2.5 text-muted-foreground"
          />
        </div>
        <Button variant="ghost" size="lg">
          Explore
        </Button>
      </div>
      {status === "authenticated" && (
        <div className="flex items-center gap-x-2">
          <Button variant="ghost" size="icon">
            <Bell />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile/dashboard">
              <UserCircle />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => signOut()}
            className="bg-white p-2 rounded-md"
          >
            <LogOut color="black" />
          </Button>
        </div>
      )}
      {status === "unauthenticated" && (
        <div className="flex items-center gap-x-2">
          <Button variant="ghost" size="lg" asChild>
            <Link href={"/login"}>
              <User size={20} />
              Login
            </Link>
          </Button>
          <Button variant="primary" size="lg" asChild>
            <Link href={"/signup"}>Signup</Link>
          </Button>
        </div>
      )}
    </header>
  );
};
