'use client'
import Logo from "@/components/logo/logo";
import { SignupForm } from "@/components/sigun-form"
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import Link from "next/link";



export default function LoginPage() {
  const { data: session } = useSession();
  return (
    <div className="  bg-[#f5e4e0]
      dark:bg-[#0a0a0a]  font-serif flex min-h-svh flex-col
     items-center justify-center gap-6   p-6 md:p-10  ">
       <div className="border p-2 rounded-full border-black/10">
       <Logo />
       </div>
      <div className="flex   max-w-sm flex-col gap-6" style={{'viewTransitionName':`up`}}>
       
      <div className="text-center mb-4">

          <h1 className="text-2xl font-bold mb-2">欢迎注册</h1>
          {
             !session?<p className="text-muted-foreground">注册您的账户继续使用</p>
             :<Button variant={'link'} className="text-black dark:text-gray-500 font-wenkai  font-bold"><Link href="/">您已经登录了，点击返回主页 </Link></Button>
           }
         
        </div>
        {!session&&<SignupForm  />}
        
      </div>
    </div>
  )
}
