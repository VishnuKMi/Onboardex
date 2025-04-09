"use client";

import React from "react";
import { BellDot, LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const Header = () => {
  return (
    <div className="flex justify-between">
      <div>
        <h2 className="font-semibold">Welcome, Name</h2>
      </div>
      <div className="flex space-x-4">
        <Button className="bg-white p-2 rounded-md">
          <BellDot color="black" />
        </Button>
        <Button className="bg-white p-2 rounded-md">
          <UserCircle color="black" />
        </Button>
        <Button onClick={() => signOut()} className="bg-white p-2 rounded-md">
          <LogOut color="black" />
        </Button>
      </div>
    </div>
  );
};
