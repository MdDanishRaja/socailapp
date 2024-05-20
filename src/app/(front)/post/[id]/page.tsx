import React from 'react'
import { createClient } from '@/lib/supabase/supabaseServer';
import { cookies } from 'next/headers';
import PostCard from '@/components/posts/PostCard';
import CommentCard from '@/components/comments/CommentCard';


export default async function ShowPost({params}:{params:{
    id:number
}}) {
    
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const { data: post } = await supabase
    .rpc("get_posts_with_likes", { request_user_id: data.session?.user.id })
    .eq("post_id", params?.id)
    .single();

  // * Fetch comments
  const {data: comments, error: cmtErr} = await supabase.from("comments"). 
  select("id, user_id, post_id, content, image, created_at, users(id, name, username, profile_image)"). 
  eq("post_id", params.id);

  // console.log("The data is", comments);
  // console.log("The error is", cmtErr);

  return (
    <div>
      <PostCard user={data.session?.user!} post={post as PostType}/>
      {comments && comments.length > 0 && <div>
        <h1 className='text-2xl font-bold'>comments :-</h1>
        {comments.map((item, index)=>(
          <CommentCard comment={item} key={index}/>
        ))}
      </div>}
    </div>
  )
}
