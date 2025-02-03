'use client'
import { ExternalLink ,Star} from 'lucide-react';
import React from "react";

import {CardMenubar } from '@/components/menubar'
import {Share} from '@/components/share'
// import { cn } from "@/lib/utils";
import clsx from 'clsx';
interface Header{
  title:string,
  url:string,
  logo:string
}

function Footer() {
  const [show, setShow] = React.useState(false);
   return (
   <div className='flex justify-between h-5 items-center'>
<div className=' text-[1.2rem] text-light flex gap-2'>
    <span>by webshare.com</span>
    <span > time: 2025-1-1</span>
  </div>
 <div className="flex justify-end gap-6">
    <Star
    className={clsx('icon', { 'text-black': !show })}
    onClick={()=>{setShow(!show)}}
  />
  <Share/>
     </div>
   </div>
   )
}
function Header({title,url,logo}:Header) {
   return (
    <div className="flex w-full gap-10 justify-between">
      <div className="flex w-full gap-10 items-center">
      <img   className=" h-8" src={logo}></img>
      <a   href="url" className="text-sm text-light">{title}</a>
     
    </div>
       <div className="  ">
      <CardMenubar  ></CardMenubar>
      </div>
    </div>
    
    )

}

 const Card= ()=>{
  
  return (
    
      <div className="w-full min-h-[15rem] flex flex-col p-4 mt-2    cardboxshow    ">
        <Header title="「櫻田詩露」参考資料" url="https://shiro.page/?lang=zh"  logo="https://shiro.page/og_image_zh.jpg?ver=240825" />
       <div className=" md:flex-row  flex-col md:leading-loose leading-6 flex items-center gap-2">
       
       {/* 点击放大 */}
        <img className="h-[10rem]" src="https://shiro.page/img/sakurada_shiro_spring.png" alt="" />
       <p  className=" text-[1.2rem]">
         {/* 「桜田シロ / 櫻田詩露」是HY(Twitter: @hy_plus)的原创角色，设定稿画师是BACHeally(Twitter: @BACHeally)老师 */}
         Google Fonts 提供了多种开源的优质字体，可以在任何项目中使用。只需向网页添加样式表链接，然后以 CSS 样式使用字体即可。查看可用的字体，或者使用开发者 API 创建动态应用。
         Google Fonts 提供了多种开源的优质字体，可以在任何项目中使用。只需向网页添加样式表链接，然后以 CSS 样式使用字体即可。查看可用的字体，或者使用开发者 API 创建动态应用。
         Google Fonts 提供了多种开源的优质字体，可以在任何项目中使用。只需向网页添加样式表链接，然后以 CSS 样式使用字体即可。查看可用的字体，或者使用开发者 API 创建动态应用。
         </p>
        
       </div>
       <Footer></Footer>
       
      </div>
   
  );
}

export default Card

