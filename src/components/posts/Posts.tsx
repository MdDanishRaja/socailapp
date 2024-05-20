"use client";
import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { createClient } from "@/lib/supabase/supabaseClient";
import Loading from "@/app/(front)/loading";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";

export default function Posts({
  user,
  data,
  totalPosts,
}: {
  user: User;
  data: PostType[] | [];
  totalPosts: number;
}) {
  const supabase = createClient();
  const [posts, setPosts] = useState(data);
  const { ref, inView } = useInView({ threshold: 0 });
  const [page, setPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false);
  const limit = 5;

  useEffect(() => {
    // console.log("I am on that view", inView);
    fetchMorePosts()
  }, [inView]);

  //Fetch more posts
  const fetchMorePosts = async () => {
    let from = page * limit;
    let to = from * limit;
    if (from > totalPosts) {
      setNoMoreData(true);
      return false;
    }
    const { data: morePosts, error } = await supabase
      .rpc(
        "get_posts_with_likes",
        { request_user_id: user.id },
      )
      .order("post_id", { ascending: false })
      .range(from, to);
      console.log("The more posts ", morePosts);
      if(error){
        toast.error("something went wrong")
        return
      }
      setPage(page+1)
      const newMorePosts = morePosts as Array<PostType> | []
      if(newMorePosts && newMorePosts.length > 0){
        setPosts([...posts, ...newMorePosts])
      }else{
        setNoMoreData(true);
      }
  };

  //Listen realtime
  useEffect(() => {
    const postsChannel = supabase.channel("postsChannel");

    postsChannel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
        },
        async (payload) => {
          const { data: postUser, error } = await supabase
            .from("users")
            .select("id, name, email, username, profile_image")
            .eq("id", payload.new?.user_id)
            .single();

          const data: PostType = {
            post_id: payload.new?.id,
            user_id: payload.new?.user_id,
            content: payload.new?.content,
            image: payload.new?.image,
            like_count: payload.new?.like_count,
            reply_count: payload.new?.reply_count,
            created_at: payload.new?.created_at,
            email: postUser?.email!,
            liked: false,
            name: postUser?.name,
            username: postUser?.username,
            profile_image: postUser?.profile_image,
          };
          setPosts([data, ...posts]);
        }
      )
      .subscribe();
    return () => {
      postsChannel.unsubscribe();
    };
  }, []);
  return (
    <div>
      {posts &&
        posts.length > 0 &&
        posts.map((item: PostType, index: number) => (
          <PostCard post={item} key={index} user={user} />
        ))}
      { !noMoreData && (
      <div className="flex justify-center mt-2" ref={ref}>
        <Loading />
      </div>
      )}
      {noMoreData && <p className="text-center">No more posts to fetch!!</p>}
    </div>
  );
}
