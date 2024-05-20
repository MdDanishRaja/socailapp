import PostCard from '@/components/posts/PostCard';
import Posts from '@/components/posts/Posts';
import { createClient } from '@/lib/supabase/supabaseServer'
import { cookies } from 'next/headers'
import React from 'react'

export default async function App() {
  const supabase = createClient();
  const {data} = await supabase.auth.getSession();

  // const {data:posts, error} = await supabase.from("posts").
  // select("id, content, image, reply_count, like_count, created_at, users(id, name, username, profile_image)");

  
  // console.log("The error is", error);
  // console.log("The posts is", posts)

  // custom query
  const {data:posts,count} = await supabase.
  rpc("get_posts_with_likes", 
  {request_user_id: data.session?.user.id},{
    count:"exact"
  })
  .order("post_id",{ascending:false} )
  .range(0,4)

  // console.log("The custom posts", customPosts)
  // console.log("The error is", customErr)

  return (
    <div>
      {posts && posts.length > 0 && <Posts 
      data={posts} user={data.session?.user!} totalPosts={count ?? 0}/>}
    </div>
  )
}
