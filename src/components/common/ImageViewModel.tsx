"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { getS3URL } from "@/lib/helper"
import Image from "next/image"
  

export default function ImageViewModel({image}:{image:string}) {
  return (
<Dialog>
  <DialogTrigger asChild>
  <Image
        src={getS3URL(image)}
        width={10}
        height={10}
        alt="post_img"
        className="w-full object-contain rounded-lg cursor-pointer"
        unoptimized
    />
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Image view</DialogTitle>
    </DialogHeader>
    <Image
        src={getS3URL(image)}
        width={10}
        height={10}
        alt="post_img"
        className="w-full h-full object-contain rounded-xl"
        unoptimized
    />
  </DialogContent>
</Dialog>
  )
}
