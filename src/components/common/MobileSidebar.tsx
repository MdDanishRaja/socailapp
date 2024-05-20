"use client"
import { useState } from "react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Bell, Home, MenuIcon, SearchIcon, StickyNote, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
  

export default function MobileSidebar() {
    const [open, setOpen] = useState(false)
    const staticClass = "flex space-x-4 mb-6 items-center"
  return (
<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild>
  <MenuIcon size={30} className="cursor-pointer"/>
  </SheetTrigger>
  <SheetContent side="left" className="w-3/5">
    <div className="flex justify-center">
    <Image src="/images/logo_512.png" width = {50} height= {50} alt='logo'/>
    </div>
    <ul>
       <li className={staticClass} onClick={()=> setOpen(false)}>
        <Home size={25}/>
        <Link href="/">Home</Link>
       </li> 
       <li className={staticClass} onClick={()=> setOpen(false)}>
        <SearchIcon size={25}/>
        <Link href="/search">Search</Link>
       </li> 
       <li className={staticClass} onClick={()=> setOpen(false)}>
        <Bell size={25}/>
        <Link href="/notifications">Notifications</Link>
       </li> 
       <li className={staticClass} onClick={()=> setOpen(false)}>
        <User size={25}/>
        <Link href="/profile">Profile</Link>
       </li> 
    </ul>
  </SheetContent>
</Sheet>

  )
}

