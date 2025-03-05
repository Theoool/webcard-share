"use client"
import { useState } from "react";
import { FullscreenPanel } from "@/components/three";
import { Button } from "@/components/ui/button";
import {getCardProps} from '@/lib/card/router'
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { DeviconNextjs, DeviconNestjs, LogosDockerIcon, LogosMicrosoftEdge } from "@/components/icon/icon";
import ScrollText from "@/components/home/ScrolText";
import FaviconMode from "@/components/icon/favicon";
import { Input } from "@/components/ui/input";
export default function Home() {
  const [value,setvalue]=useState('')
  const [show,setshow]=useState(false)
  const [data,setdata]=useState<any>('a')
  const { toast } = useToast()
  const [Tip,changeTip]=useState([{
    text:'默认模式',
    bol:true
  },{
    text:'宣传文案',
    bol:false
  },{
    text:'纯净模式',
    bol:false
  },{
    text:'页面预览',
    bol:true
  },{
    text:'SEO建议',
    bol:true
  }])
  const changeTipModle=({I,text,bol})=>{

        let newTip=Tip.map((e,index)=>{
          if (index===I) {
            e.bol=!bol
          }
          return e
        }) 
        changeTip([...newTip])
        
      }
  
 const Get=()=>{
  const a= fetch('http://localhost:8080/api', {}).then(res=>res.json())
  return a
 }
  return (
    <div>
      
    <div className=" text-3xl  h-[100vh] flex  items-center justify-center">
     <div  className="flex  flex-col items-center w-full">
     <div className="w-full text-center p-4 flex flex-col  font-sans " onClick={()=>Get()}>
    <span>发现、分享、连接</span>
    <span className="  bg-clip-text  text-transparent bg-gradient-to-r from-purple-400 to-[#4a7ef6]">打造你的数字世界</span>
     </div>
     <div className="text-[1.2rem] ">
     一键提取网页精华，Seo优化分析,智能分类整理，将宝藏与世界分享
     </div>
     <Input 

onKeyDown={async e=>{
  if (e.code==='Enter'||e.key==='Enter') {  
     setshow(true)
      const PropsData= await getCardProps(value)
      
      if (PropsData) {
          setdata({...PropsData,url:value})
      } else{
        toast({
          title: "输入错误或无法连接到该网页",
          description: Date.now(),
          action: (
            <ToastAction altText="Goto schedule to undo">OK</ToastAction>
          ),
        })
      }
}}}
  onChange={ (event)=>{
    setvalue(event.target.value)
  }}
  type="text"
  value={value}
  placeholder="输入网址，记录世界"
  className="font-mono
  h-16 text-sm
  w-2/3  rounded-md 
    dark:bg-black dark:text-primary border-[1px] mt-2"
/>
 <div className=" w-2/3 flex gap-x-10 gap-y-2 flex-wrap p-3 justify-center">
 {
  Tip.map((e,index)=>{
    return !e.bol?<Button key={index}  variant='outline' 
    onClick={()=>changeTipModle({I:index,...e})}
    >{e.text}</Button>:<Button key={index}
    onClick={()=>changeTipModle({I:index,...e})}
    variant='outline' className=" 
    
     
    bg-[#4a7ef6]/40 ">{e.text}</Button>
  })
 }
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
    <ScrollText></ScrollText>
         <div className="w-full h-[150vh] flex justify-center gap-10 p-2 md:p-10 items-center flex-wrap">
 <div className=" w-[35rem]  h-[35rem] text-black  border-[hsl(214,8%,84%)] border  rounded-md
 bg-gradient-to-b from-[hsl(0,0%,100%)] to-[hsl(240,9%,97%)] flex  items-center flex-col py-16 
 ">
 <span className=" transform text-xl">浏览器书签管理</span>
 <span className=" transform text-2xl flex gap-10 m-5"><DeviconNextjs></DeviconNextjs> <DeviconNestjs></DeviconNestjs>
 <LogosDockerIcon></LogosDockerIcon> <LogosMicrosoftEdge/>
 </span>
 <span className=" transform text-2xl">摘要总结</span>
 <span className=" transform text-2xl">智能标签</span>
 <span className=" transform text-2xl">Seo分析</span>
 <span className=" transform text-2xl">信息共享</span>
 <span className=" transform text-2xl mt-10 text-center text-purple-500">一款充满任意可能的信息共享平台</span>

 </div>
 <div className="w-[35rem] h-[35rem]  border-[hsl(214,8%,84%)] border
 bg-gradient-to-b from-[hsl(0,0%,100%)] to-[hsl(240,9%,97%)]
 "></div>
  <div className=" w-[35rem]  h-[35rem]  border-[hsl(214,8%,84%)] border  rounded-md
 bg-gradient-to-b from-[hsl(0,0%,100%)] to-[hsl(240,9%,97%)] flex  items-center flex-col py-16 
 ">
 <span className=" transform text-xl">插件快捷操作</span>
 <span className=" transform text-2xl flex gap-20 m-5"><DeviconNextjs></DeviconNextjs> <DeviconNestjs></DeviconNestjs>
 <LogosDockerIcon></LogosDockerIcon> <LogosMicrosoftEdge/>
 </span>
 <span className=" transform text-2xl">摘要总结</span>
 <span className=" transform text-2xl">智能标签</span>
 <span className=" transform text-2xl">Seo分析</span>
 <span className=" transform text-2xl">信息共享</span>
 <span className=" transform text-2xl mt-10 text-center text-purple-500">一款充满任意可能的信息共享平台</span>

 </div>
 <div className="w-[35rem] h-[35rem]  border-[hsl(214,8%,84%)] border
 bg-gradient-to-b from-[hsl(0,0%,100%)] to-[hsl(240,9%,97%)]
 "></div>


         </div>
       
    </div>
  )
}
