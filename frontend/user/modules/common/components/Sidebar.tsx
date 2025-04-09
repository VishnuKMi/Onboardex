"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { CheckCheck, ChevronLeft, ChevronRight, User2 } from "lucide-react";
import { usePathname } from "next/navigation";

export const SideBar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);

  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const pages = [
    { name: "Dashboard", link: "/profile/dashboard" },
    { name: "My Profile", link: "/profile" },
    { name: "Claim History", link: "/profile/claims" },
  ];

  const handleCollapse = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div className="flex flex-col gap-y-[30px] ml-[60px] mr-[172px] mt-[200px]">
      {pages.map((page, index) => (
        <Link
          href={page.link}
          key={page.link}
          className={`font-semibold font-poppins whitespace-nowrap ${
            isActive(page.link) ? "text-[#5151D4]" : "text-[#141414]"
          }`}
        >
          {page.name}
        </Link>
      ))}
    </div>
  );
};
