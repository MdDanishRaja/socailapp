"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function notFound() {
  return (
    <div className="flex-col h-screen flex justify-center items-center">
      <Image src="/images/404.svg" width={500} height={500} alt="404 image not found"/>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}
