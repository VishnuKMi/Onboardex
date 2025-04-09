"use client";

import React from "react";
import { BellDot, LogOut, UserCircle } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { data } = useSession();

  const fullName = data?.user
    ? `${data?.user?.firstName || ""} ${data?.user?.lastName || ""}`
    : "";
  return (
    <div className="flex justify-between">
      <div>
        <h2 className="font-semibold">Welcome, {fullName}</h2>
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
