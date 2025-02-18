'use client'
import { Link } from "next-view-transitions";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
export default function Home() {
  const { data: session } = useSession();
  return (
   <div className="flex w-full text-black   h-12  sm:text-xl  justify-between   items-center font-bold border-2 border-black rounded-full ">
    <div className="flex gap-10 ml-10">
     <Link href="/" className="dark:text-primary  underline-offset-4  hover:underline"  >主页</Link>
     <Link href="/myhome" className="dark:text-primary  underline-offset-4  hover:underline"  >我的收藏</Link>
     <Link href="/home" className="dark:text-primary      underline-offset-4  hover:underline"  >广场</Link>
        </div>
     {/* <div className="mr-4">
     <Button variant='outline' className=" !rounded-md "> 登录/注册</Button>
     </div> */}
     
      <div className=" mr-2 sm:mr-10  flex gap-2 items-center " >
      {
         session&&<Avatar className=' rounded-xl size-8'>
        <AvatarImage className=" rounded-full" src={session.user?.image as string} alt={session.user?.name as string} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      }
        <span className="mr-2  hidden sm:block"
        >{session?.user?.name}</span> 
        
      

     
      </div>
   </div>
  )
}

