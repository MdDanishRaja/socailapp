"use client";
import {
  ArrowLeft,
  Bell,
  HomeIcon,
  Search,
  StickyNote,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import AddPost from "../posts/AddPost";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { SettingDropdown } from "./SettingDropdown";

export default function AppNav({ user }: { user: SupabaseUser }) {
  const pathName = usePathname();
  const router = useRouter();
  const staticRoutes = ["/", "/search", "/notifications", "/profile"];
  // console.log("path name ", pathName)
  return (
    <nav className="hidden md:flex justify-between items-center p-2">
      <Image src="/images/logo_512.png" width={40} height={40} alt="logo" />
      <div className="flex space-x-12">
        {!staticRoutes.includes(pathName) && (
          <ArrowLeft
            size={30}
            className="cursor-pointer"
            onClick={() => router.back()}
          />
        )}
        <Link
          href="/"
          className={`cursor-pointer hover:text-foreground
        ${pathName === "/" ? "text-foreground" : "text-gray-500"}`}
        >
          <HomeIcon size={30} />
        </Link>
        <Link
          href="/search"
          className={`cursor-pointer hover:text-foreground
        ${pathName === "/search" ? "text-foreground" : "text-gray-500"}`}
        >
          <Search size={30} />
        </Link>
        {/* <AddPost user={user} children={<StickyNote size={30} className="text-gray-500 cursor-pointer hover: text-foreground"/>}/> */}
        <AddPost user={user}>
          <StickyNote
            size={30}
            className="text-gray-500 cursor-pointer hover:text-foreground"
          />
        </AddPost>

        <Link
          href="/notifications"
          className={`cursor-pointer hover:text-foreground
        ${pathName === "/notifications" ? "text-foreground" : "text-gray-500"}`}
        >
          <Bell size={30} />
        </Link>
        <Link
          href="/profile"
          className={`cursor-pointer hover:text-foreground
        ${pathName === "/profile" ? "text-foreground" : "text-gray-500"}`}
        >
          <User size={30} />
        </Link>
      </div>
      <SettingDropdown />
    </nav>
  );
}
