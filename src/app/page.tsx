"use client"
import Image from "next/image";
import Card from '@/components/card'
import Header from '@/components/Header'
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { FullscreenPanel } from "@/components/three";
import { Button } from "@/components/ui/button";


export default function Home() {
  const [value,setvalue]=useState('')
  const [show,setshow]=useState(true)
  const [data,setdata]=useState({
    url:'https://shiro.page/?lang=zh'
  })
  useEffect(()=>{
    setdata({
      url:value}
    )
},[show])
  return (
    <div className=" text-3xl  h-[70vh] flex  items-center justify-center">
     <div  className="flex  flex-col items-center w-full">
     <h1 className="w-full text-center p-4  font-sans">键入网址，创建属于你的网页合集</h1>
    
     <input 

onKeyDown={e=>{
  if (e.code==='Enter') {
    setshow(true)
  }
}}
  onChange={(event)=>{
    setvalue(event.target.value)}}
  type="text"
  value={value}
  placeholder="搜索---"
  className="font-mono w-2/3 px-2 rounded-md text-md
   border-black border-[1px] mt-2"
/>
 <div className=" w-2/3 flex gap-10 p-3 justify-center">
 <Button  variant='outline'>文章</Button>
 <Button variant='outline'>网页</Button>
 <Button variant='outline'>视频</Button>
 <Button variant='outline'>音乐</Button>
 </div>
    
        </div>


  <FullscreenPanel 
  isOpen={show}
  data={data}
  onClose={()=>{
    setshow(false)
  }}
  ></FullscreenPanel>

    </div>
  )
}
