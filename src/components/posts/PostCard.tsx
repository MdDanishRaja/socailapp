"use client";
import UserAvatar from "../common/UserAvatar";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import { formateDate, getS3URL } from "@/lib/helper";
import PostLike from "./PostLike";
import AddComment from "../comments/AddComment";
import { User } from "@supabase/supabase-js";
import ImageViewModel from "../common/ImageViewModel";
import Link from "next/link";
import PostMoreOptions from "./PostMoreOptions";

export default function PostCard({
  post,
  user,
}: {
  post: PostType;
  user: User | UserType;
}) {
  return (
    <div className="w-full mt-4 bg-muted rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <UserAvatar
            name={post.name}
            image={post.profile_image ? getS3URL(post.profile_image) : ""}
          />
          <div className="flex flex-col p-2">
            <p className="font-bold">{post.name}</p>
            <p className="text-sm">{formateDate(post.created_at)}</p>
          </div>
        </div>
        <PostMoreOptions userId={user.id} post={post} />
      </div>
      {/* Image & content */}
      {post.image && <ImageViewModel image={post.image} />}
      <Link href={`/post/${post.post_id}`}>
        {" "}
        <p className="p-2">{post.content}</p>
      </Link>
      {/* Footer icons bar  */}
      <div className="flex justify-between items-center mt-2 p-2">
        <div className="flex space-x-4">
          <PostLike userId={user.id} post={post} />
          {/* <AddComment
           user={user} 
           post={post} 
           children={<MessageCircle className="cursor-pointer" />}
           /> */}
          <AddComment user={user} post={post}>
            <MessageCircle className="cursor-pointer" />
          </AddComment>

          <Send />
        </div>
        <Bookmark />
      </div>
      <div className="flex space-x-4 p-2">
        <p>likes {post.like_count}</p>
        <p>Replies {post.reply_count}</p>
      </div>
    </div>
  );
}
