"use client"
import { FolderSync, Star } from "lucide-react"
import {Cardsbox} from '@/components/cardshare'

import { useToast } from "@/hooks/use-toast"

import { ToastAction } from "@/components/ui/toast"
import {Link} from 'next-view-transitions'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { ButtonD } from "@/components/Button/button"
import MarkBooksBox from "@/components/MarkBooksBox"
interface Header {
  username: string,
  title: string,
  Avatar: string,
}
const Avatarbox=({ src, alt }: any)=> {
  return (
    <Avatar className=' size-5'>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

const Header = ({ username, title, Avatar }: Header) => {
  return <div className="p-2 flex  w-full gap-2 ">
    <div className="w-full  flex-col  md:text-2xl flex gap-2">

      <h1 className=' text-nowrap truncate  text-[18px]'>{title}</h1>
      <div className='flex  items-center justify-end  gap-2 text-base'>
      <span>  {username}</span> 
        <Avatarbox src={Avatar} alt={username}></Avatarbox>
        
      </div>
    </div>
  </div>

}


const Body = () => {
  const data={
    title:'一个梦想的开始p公开/私密   导出/导入（插件功能）cmwk',
    authorname:"theo",
    createTime:"20122222",
    carddata:[{
      urlLong:'https://cali.so/blog/how-to-add-rss-to-your-nextjs-app-router',
       url:'www.diamomd.com' ,
       Avatar:'https://cali.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPortrait.8d12f14a.png&w=64&q=75',
        Content:' 作者分享零基础转行前端的学习路线。前端入门需 3 - 6 个月，要学 HTML、CSS、JavaScript 及主流框架并实战。还推荐了各阶段学习资料、实战项目和刷题工具。',
        Desc:'如何给你的 Next.js（App 路由）应用添加 RSS | Cali Castle'
     
    }]
  }
  return <div className='p-2'>
    <div className=' relative w-full md:text-xl flex 
    
    gap-2 justify-around flex-wrap'>
    
     {
      data.carddata.map((el,index)=>{
        return  <MarkBooksBox card={[]} key={index} title={'创意的时刻'} src={''} user={'https://github.com/shadcn.png'} ></MarkBooksBox>
      })
     }
   
         </div>



  </div>
}


export const CardS = () => {
  return (
    <div className="relative flex flex-col">
     
      <Body />
     
    </div>
  );
};


const page = () => {
  return <div className="flex justify-center     pt-6 @container   ">
    <div className=" w-full flex flex-col gap-2 ">
      <h1 className="text-[2.3rem]  ">挖掘网络的一切可能</h1>
      <h3 className="text-[1.5rem] font-medium">每日发现 </h3>

      <div className=" columns-1 sm:columns-2 xl:columns-4 md:columns-3 gap-2 space-y-4">
     
        <CardS></CardS>
        <CardS></CardS>
        <CardS></CardS>
        <CardS></CardS>
        <CardS></CardS>
        <CardS></CardS>
        <CardS></CardS>
       
       
        <CardS></CardS>
       
      </div>
     
    </div>
    

  </div>

}




export default page
