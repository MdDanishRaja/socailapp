import UserAvatar from "@/components/common/UserAvatar";
import ProfileUpdate from "@/components/user/ProfileUpdate";
import { getS3URL } from "@/lib/helper";
import { createClient } from "@/lib/supabase/supabaseServer";
import { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/posts/PostCard";
import CommentCard from "@/components/comments/CommentCard";

export default async function Profile() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const user: User = data.session?.user!;

  const { data: posts } = await supabase
    .rpc("get_posts_with_likes", { request_user_id: data.session?.user.id })
    .eq("user_id", user.id)
    .order("post_id", { ascending: false });

  const { data: comments } = await supabase
    .from("comments")
    .select(
      "id, user_id, post_id, content, image, created_at, users(id, name, username, profile_image)"
    )
    .eq("user_id", user.id);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold">{user.user_metadata?.["name"]}</p>
          <p className="font-bold">@{user.user_metadata?.["username"]}</p>
        </div>
        <UserAvatar
          name={user.user_metadata?.["name"]}
          width={5}
          height={5}
          image={
            user.user_metadata?.["profile_image"]
              ? getS3URL(user.user_metadata?.["profile_image"])
              : ""
          }
        />
      </div>
      <p className="mt-4">{user.user_metadata?.["description"]}</p>
      <ProfileUpdate user={user} />
      <Tabs defaultValue="posts" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="mb-6">
            {posts &&
              posts.length > 0 &&
              posts.map((item: PostType, index: number) => (
                <PostCard post={item} key={index} user={user} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="comments">
          <div className="mb-6">
            {comments && comments.length > 0 && 
                comments.map((item, index) => (
                  <CommentCard comment={item} key={index} />
                ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
