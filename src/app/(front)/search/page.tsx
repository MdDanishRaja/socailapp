import SearchInput from '@/components/common/SearchInput'
import UserAvatar from '@/components/common/UserAvatar';
import { getS3URL } from '@/lib/helper';
import { createClient } from '@/lib/supabase/supabaseServer'
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Search({searchParams}:
    {searchParams:{[key:string]:string | undefined}}) {
        const supabase = createClient();
        const {data} = await supabase.auth.getSession();
        const { data:users, } = await supabase
          .from("users")
          .select("id ,username,name,profile_image")
          .ilike("username", `%${searchParams?.q}%`)
          .neq("id", data.session?.user.id);
  return (
    <div>
      <SearchInput/>
      {
        users && users.length > 0 && users.map((item, index)=>
        <Link href={`/user/${item.id}`} key={index} className='flex space-x-3 mt-3'>
            <UserAvatar name={item.name} 
            image={item.profile_image ? getS3URL(item.profile_image):""}
            />
            <div className='flex flex-col'>
                <p className='font-bold'>{item.name}</p>
                <p>@{item.username}</p>
            </div>
        </Link>)
      }
      {users && users.length <= 0 && (
        <p className='text-center'>No user found!!</p>
      ) }
    </div>
  )
}
