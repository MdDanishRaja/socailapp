"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { User } from "@supabase/supabase-js"
import { Image } from "lucide-react";
import React, { useState,useRef } from "react"
import { Button } from "../ui/button";
import ImagePreview from "../common/ImagePreview";
import { v4 as uuidv4 } from 'uuid';
import { createClient } from "@/lib/supabase/supabaseClient";
import Env from "@/Env";
import { toast } from "react-toastify";
  

export default function AddPost({
  user, 
  children}:{
    user:User; 
    children:React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [previewURL, setPreviewURL] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [loading, SetLoading] = useState(false)
  const [content, setContent] = useState("");
  const supabase = createClient();

  const handleImageIcon = ()=>{
    imageRef.current?.click();
  }

  const handleImageChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
    const selectedFile = event.target.files?.[0];
    if(selectedFile){
      setImage(selectedFile)
      const imageURL = URL.createObjectURL(selectedFile)
      setPreviewURL(imageURL)
    }
  }

  const removePreview = ()=>{
    setImage(null);
    if(imageRef.current){
      imageRef.current.value=""
    }
    setPreviewURL("")
  }

  const addPost = async()=>{
    SetLoading(true)
    const payload:PostPayloadType = {
      content:content,
      user_id: user?.id
    }
    if(image){
      const path = `${user.id}/${uuidv4()}`
      const {data, error} = await supabase.storage.
      from(Env.S3_BUCKET).
      upload(path, image);
      if(error){
        SetLoading(false);
        console.log("The error is:",error);
        toast.error("Somthing went wrong while uploading image",
        {theme:"colored"})
        return;
      }
      payload.image = data.path;
    }
    //Add post 
    const {error} = await supabase.from("posts").insert(payload);
    if(error){
      toast.error("Something went wrong while upload the post",
        {theme:"colored"})
        SetLoading(false);
        return ;
    }
    resetState();
    SetLoading(false);
    toast.success("Post added successfully!", {theme:"colored"})
    setOpen(false);
  }
  const resetState = ()=>{
    setContent("");
    removePreview();
  }


  return (
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent onInteractOutside={(e)=>e.preventDefault()}>
    <DialogHeader>
      <DialogTitle>Add Post</DialogTitle>
    </DialogHeader>
    <div>
    <textarea className="bg-muted w-full rounded-lg
     outline-none h-32 p-2 border"
     placeholder="Add your thoughts...."
     value={content}
     onChange={(event)=> setContent(event.target.value)}
     >
    </textarea>
    {previewURL && <ImagePreview image={previewURL} callback={removePreview}/>}
    <div className="flex justify-between items-center mt-2">
      <input type="file" className="hidden" 
      accept="image/png, image/jpg, image/svg, image/jpeg,
       /image/webp, image/gif" ref={imageRef} onChange={handleImageChange}/>
      <Image className="cursor-pointer" onClick={handleImageIcon}/>
      <Button size="sm" disabled={content.length <= 1 || loading}
      onClick={addPost}>{loading? "Processing":"Post"}</Button>
    </div>
    </div>
  </DialogContent>
</Dialog>

  )
}




