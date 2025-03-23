'use client'
import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const { data: session } = useSession();

 
    return (
      <div className="font-sans
       bg-[#f5e4e0]
      dark:bg-[#0a0a0a]
      flex min-h-svh flex-col items-center justify-center gap-6  p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold mb-2">欢迎回来</h1>
           {
             !session?<p className="text-muted-foreground">登录您的账户继续使用</p>
             :<Button variant={'link'} className="text-black dark:text-gray-100 font-wenkai  font-bold"><Link href="/">您已经登录了，点击返回主页 </Link></Button>
           }
          </div>
          {!session&&<LoginForm />}
        </div>
      </div>
    )
  }
  
