import Login from "@/components/auth/login"
import Register from "@/components/auth/register"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"

export const metadata= {
    title: "Login|Freelancers",
    description: "Please login to access the Community app for freelancers.",
  };  

export default function login() {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
    <Image src="/images/logo_512.png" width={80} height={80} alt="logo" />
    <p className="font-bold">Freelancers</p>
    <p className="text-sm mb-2">A community of freelancers</p>
    <Tabs defaultValue="login" className="w-full p-2 sm:w-[500px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
       <Login/>
      </TabsContent>
      <TabsContent value="register">
        <Register/>
      </TabsContent>
    </Tabs>
    </div>
  )
}
