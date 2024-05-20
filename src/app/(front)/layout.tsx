import AppNav from "@/components/common/AppNav";
import MobileAppNav from "@/components/common/MobileAppNav";
import { createClient } from "@/lib/supabase/supabaseServer"; 
import { cookies } from "next/headers";

export default async function FrontLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const supabase = createClient();
    const {data} = await supabase.auth.getSession();
    return (
      <div className="p-2 md:container relative h-screen">
        <MobileAppNav user={data.session?.user!}/>
        <AppNav user={data.session?.user!}/>
        <div className="flex flex-col items-center h-full">
          <div className="w-full md:w-2/5">
            {children}
          </div>
        </div>
      </div>
    );
  }
