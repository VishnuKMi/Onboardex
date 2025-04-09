"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import {
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export const SideBar = () => {
  const { data } = useSession();
  const [toggleCollapse, setToggleCollapse] = useState(false);

  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const pages = [
    { name: "Dashboard", icon: <LayoutDashboard />, link: "/" },
    {
      name: "Analytics",
      icon: <TrendingUp />,
      link: "/analytics",
    },
    {
      name: "Transactions",
      icon: <ArrowLeftRight />,
      link: "/transactions",
    },
  ];

  const handleCollapse = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={` h-full relative flex flex-col bg-white transition-all duration-300 ease-in-out text-black ${
        toggleCollapse ? "collapsed" : ""
      }`}
    >
      <Link href="/">
        {toggleCollapse ? (
          <div className="text-black py-3 h-[100px] mb-8 font-bold text-xl"></div>
        ) : (
          <div className="text-black py-3 mb-8 font-bold text-xl">
            <Image alt="Onboardex" src="/logo2.png" width={200} height={200} />
          </div>
        )}
      </Link>

      <div
        className="absolute bottom-[20px] -right-[10px] p-1 border-2 border-gray-100 bg-white rounded-full shadow-md"
        onClick={handleCollapse}
      >
        {toggleCollapse ? (
          <ChevronRight size={20} />
        ) : (
          <ChevronLeft size={20} />
        )}
      </div>

      {pages.map((page, index) => (
        <Link
          href={page.link}
          key={page.link}
          className={`mb-6 px-8 cursor-pointer ${
            isActive(page.link) ? "activeColor" : ""
          }`}
        >
          {toggleCollapse ? (
            page.icon
          ) : (
            <div className="flex items-center font-semibold gap-2">
              {page.icon}
              {page.name}
              {isActive(page.link) && (
                <div className="bullet ml-auto mt-[4px]"></div>
              )}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};
