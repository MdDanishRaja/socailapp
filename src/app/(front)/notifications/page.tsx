import { createClient } from '@/lib/supabase/supabaseServer'
import React from 'react'
import UserAvatar from '@/components/common/UserAvatar';
import { formateDate } from '@/lib/helper';

export default async function Notifications() {
    const supabase = createClient();
    const {data} = await supabase.auth.getSession();
    const {data: notification, error} = await supabase.from("notifications").select("id, user_id, post_id, type,created_at, users(id, name, username, profile_image)")
    .eq("to_user_id", data.session?.user?.id)
    .order("id", {
        ascending:false
    })
    // console.log("The notifications", notification);
    // console.log("The error is", error);
  return (
    <div>
      {notification && notification.length > 0 && 
      notification.map((item:NotificationType, index)=> 
      <div className='flex space-x-3 mt-4' key={index}>
        <UserAvatar name={item.users?.name!} image={item.users?.profile_image}/>
        <p><strong>{item.users?.name} {item.type === 1 ?
        "liked your post":"commented on your post"}
           </strong>
        </p>
        <p>{formateDate(item.created_at)}</p>
      </div>)}
    </div>
  )
}
