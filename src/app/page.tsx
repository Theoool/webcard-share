"use client"
import { useEffect, useState } from "react";
import { FullscreenPanel } from "@/components/three";
import { Button } from "@/components/ui/button";
import {getCardProps} from '@/lib/card/router'

export default function Home() {
  const [value,setvalue]=useState('')
  const [show,setshow]=useState(false)
  const [data,setdata]=useState<any>()
  // const captureWebpagePost=async (url:string,options:any)=>{
  //   const blob = aait captureWebpage(url, type, options);
  //   const url = URL.createObjectURL(blob);
  //   return url      
  // }
  
 const Get=()=>{
  const a= fetch('http://localhost:8080/api', {}).then(res=>res.json())
  return a
 }
  return (

    <div className=" text-3xl  h-[70vh] flex  items-center justify-center">
     <div  className="flex  flex-col items-center w-full">
     <h1 className="w-full text-center p-4  font-sans" onClick={()=>Get()}>键入网址，创建属于你的网页合集</h1>
    
     <input 

onKeyDown={async e=>{
  if (e.code==='Enter'||e.key==='Enter') {
    setshow(true)
    const a= await getCardProps(value)
   if (a) {
    setdata({...a,url:value})
   } 
    }
}}
  onChange={ (event)=>{
    setvalue(event.target.value)
    setdata({
      url:'',
      meta:{},
      finalSummary: '',
    })
   
  }}
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
