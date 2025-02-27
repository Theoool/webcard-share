"use client"
import { useState } from "react";
import { FullscreenPanel } from "@/components/three";
import { Button } from "@/components/ui/button";
import {getCardProps} from '@/lib/card/router'
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
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

    <div className=" text-3xl  h-[95vh] flex  items-center justify-center">
     <div  className="flex  flex-col items-center w-full">
     <h1 className="w-full text-center p-4  font-sans" onClick={()=>Get()}>键入网址，创建属于你的网页合集</h1>
     <input 

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
  placeholder="搜索---"
  className="font-mono w-2/3 px-2 rounded-md text-md
   border-black dark:border-purple-300 dark:bg-black dark:text-primary border-[1px] mt-2"
/>
 <div className=" w-2/3 flex gap-x-10 gap-y-2 flex-wrap p-3 justify-center">
 {
  Tip.map((e,index)=>{
    return !e.bol?<Button key={index}  variant='outline' 
    onClick={()=>changeTipModle({I:index,...e})}
    >{e.text}</Button>:<Button key={index}
    onClick={()=>changeTipModle({I:index,...e})}
    variant='outline' className=" 
     bg-green-200/15
     
    text-green-800  border-green-800">{e.text}</Button>
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
  )
}
