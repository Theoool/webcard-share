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
interface Header {
  username: string,
  title: string,
  Avatar: string,
}
const Avatarbox=({ src, alt }: any)=> {
  return (
    <Avatar className=' size-8'>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

const Header = ({ username, title, Avatar }: Header) => {
  return <div className="p-2 flex  w-full gap-2 ">
    <div className="w-full  flex-col  md:text-2xl flex gap-2">

      <span className=' text-nowrap truncate'>{title}</span>
      <div className='flex  items-center gap-2 text-base'>
        <Avatarbox src={Avatar} alt={username}></Avatarbox>
        <span> {username}的收藏</span>
      </div>
    </div>

  </div>

}
const Footer = () => {
  const { toast } = useToast()

  const removeEventListenerMessage = () => {
    window.removeEventListener('message', handleEventMessage);
  };
  const handleEventMessage = (event: any) => {
    if (event.data.type === 'extensionResponse') {
      toast({
        title: "收藏成功",
        type: "background",
        description: "Friday, February 10, 2023 at 5:57 PM",
        action: (
          <ToastAction altText="Goto schedule to undo">了解</ToastAction>
        ),
      });
    } else {
      toast({
        title: "收藏成功",
        description: "Friday, February 10, 2023 at 5:57 PM",
        duration: 3000,
        action: (
          <ToastAction altText="Goto schedule to undo">了解</ToastAction>
        ),
      });
      removeEventListenerMessage()

    }
  };
  // 收藏，同步浏览器标签，查看
  const GO = (bookmarks: any) => {

    window.postMessage({
      action: 'callExtensionFunction',
      params: bookmarks
    }, window.location.origin);

    window.addEventListener('message', handleEventMessage);



  }
 
  return (
    <div className='   m-2 w-full justify-center flex items-center' >
      <Button variant="default" className='dark:text-black text-primary' >
      <Link href={'/about'}> 查看更多</Link> </Button>
      <div className=' relative m-2  flex justify-end'>

        {/* // imp :出现加载动画 */}
        <Star className='icon w-8'></Star>
        <FolderSync onClick={() => GO('1')} className='icon w-8'></FolderSync>

      </div>
    </div>
  )
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
        return  <Cardsbox  key={index} data={el}
        ></Cardsbox>
      })
     }
   
         </div>



  </div>
}


const CardS = () => {
 

  return (
    <div className="relative
     border-[1px]
    break-inside-avoid max-h-[60rem] cardboxshow flex flex-col">
      <Header
        username='Theo'
        title="一招绝活走天下，曾经苦学数理化：数学和物理入门"
        Avatar="https://github.com/shadcn.png"
      />
      <Body />
      <Footer />
    </div>
  );
};


const page = () => {
  return <div className="flex justify-center    p-12 pt-6 @container   ">
    <div className=" w-full flex flex-col gap-2 ">
      <h1 className="text-[2.3rem]  ">挖掘网络的一切可能</h1>
      <h3 className="text-[1.5rem] font-medium">每日发现 </h3>

      <div className=" columns-1 xl:columns-3 md:columns-2 gap-2 space-y-4">
     
        <CardS></CardS>
       
       
        <CardS></CardS>
       
      </div>
     
    </div>
    

  </div>

}




export default page
