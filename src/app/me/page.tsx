"use client";
import { Button } from "@/components/ui/button";
import { Description } from "@radix-ui/react-toast";
import { Favicon } from "favicon-stealer";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Linkcard = () => {
  const data = {
    url: '',
    name: 'Anthony Fu',
    Description: '>Hey, I am Anthony Fu, a fanatical open sourceror.'
  }
  return <div className="cardboxshow w-full h-28 m-2 bg-background justify-between border border-primary *:
  gap-8  hover:rounded-sm 
  flex items-center rounded-sm p-4   md:w-[35rem]">
    <Favicon
      url='https://x.com/home'
      size={60}
      className=" border border-black   "
    />
    <div>
      <h1 className="text-black dark:text-white">{data.name}</h1>
      <Description className=" text-[#6e7c90] line-clamp-3">{data.Description}</Description>
    </div>
    <div>
      <Button className=" bg-black  border-2 dark:border-primary  text-white">View</Button>
    </div>
  </div>
}
const logout= async ()=>{
  try {
    await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/logout`) 
    await signOut({
      redirect:true
    })
  } catch (error) {
    console.log(error)
  }
}

const UserProfile = ({ session }) => (
  <div className="w-full h-auto flex flex-col mt-10 px-4 p-4 items-center">
   
    <div style={{'viewTransitionName':`Avatar`}} className="w-20 h-20 relative mb-4 flex flex-col gap-2">
      <img
        src={session.user?.image ?? ""}
        alt={session.user?.name ?? ""}
        className="object-cover rounded-full"
      />
    </div>
    <h1 className="text-2xl">{session.user?.name}</h1>
       <div className="m-4 flex gap-4">
      {/* <Link ><Button className="bg-white dark:text-black">订阅</Button></Link> */}
      {/* <Link><Button className="bg-white dark:text-black">邮箱</Button></Link> */}
    </div>

    <p className="font-bold mb-4">{session.user?.email}</p>
    <button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => logout()}>Sign out</button>
  </div>
);

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <div className="w-full   h-[80vh] justify-center flex flex-col mt-10 px-4 p-4 items-center"><Button variant={'link'} className="text-black font-wenkai text-3xl  font-bold"><Link href="/login">你在做什么? 快去登录！ </Link></Button></div>;
  }

  return <UserProfile session={session} />;
}
