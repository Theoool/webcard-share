"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Description } from "@radix-ui/react-toast";
import { Favicon } from "favicon-stealer";
import { Link } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
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
      url='chat.openai.com'
      
      className=" border-2 border-black  w-32 rounded-md h-22 "
    />

    <div>
      <h1 className="text-black dark:text-white">{data.name}</h1>
      <Description className=" text-[#6e7c90] line-clamp-3">{data.Description}</Description>
    </div>
    <div >
      <Button className=" bg-black  border-2 dark:border-primary  text-white">View</Button>
    </div>


  </div>
}
export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="w-full  h-auto  flex flex-col mt-10 px-4  p-4 items-center">
        <div className="w-20 h-20 relative mb-4 flex flex-col gap-2">
          <img
            src='https://cdn.sanity.io/images/i81ys0da/production/8835e0796d05e110862f182f8a1f3850ac249d18-2000x2000.png'

            alt=""
            className="object-cover rounded-full"
          />

        </div>
        <h1 className="  text-2xl">Anthony Fu </h1>
        <Description className=" text-gray-400">Hey, I am Anthony Fu, a fanatical open sourceror.</Description>
        <div className="m-4 flex gap-4">
          <Link><Button className=" bg-white dark:text-black">订阅</Button></Link>
          <Link><Button className="bg-white dark:text-black">邮箱</Button></Link>
        </div>


        <Linkcard ></Linkcard>
        <Linkcard ></Linkcard>
        <Linkcard ></Linkcard>
        <Linkcard ></Linkcard>
        <Linkcard ></Linkcard>
        <p className="font-bold mb-4">{'session.user?.emai'}</p>
        <button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <p className="text-2xl mb-2">Not Signed In</p>
      <button className="bg-blue-600 py-2 px-6 rounded-md mb-2" onClick={() => signIn('google')}>Sign in with google</button>
      <button className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2" onClick={() => signIn('github')}>Sign in with github</button>
    </div>
  )
}
