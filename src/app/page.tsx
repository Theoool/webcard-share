"use client"
import { useEffect, useState } from "react";
import { FullscreenPanel } from "@/components/three";
import { Button } from "@/components/ui/button";
import {getCardProps} from '@/lib/card/router'
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { DeviconNextjs, DeviconNestjs, LogosDockerIcon, LogosMicrosoftEdge } from "@/components/icon/icon";
import ScrollText from "@/components/home/ScrolText";
import FaviconMode from "@/components/icon/favicon";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
function isURL(str) {
  // 定义匹配 http:// 或 https:// 开头的 URL 的正则表达式
  const regex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/;
  return regex.test(str);
}
export default function Home() {
  const [value,setvalue]=useState('')
  const [show,setshow]=useState(false)
  const [Data,setdata]=useState<any>(null)
  const [success,setsuccess]=useState(false)
  const { toast } = useToast()
  const [progress, setProgress] = useState(0)
  const [isValidUrl, setIsValidUrl] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateUrl = (value) => {
    const isValid = isURL(value)
    setIsValidUrl(isValid)
    return isValid
  }

  const handleUrlSubmit = async () => {
    if (!isValidUrl || isLoading) return
    
    setIsLoading(true)
    setProgress(33)
    
    try {
      const {data, success} = await getCardProps(value)
      setProgress(66)
      
      if (!success) {
        throw new Error('无法连接到该网页')
      }
      
      setdata({...data, url: value})
      setProgress(100)
      setsuccess(true)
      setshow(true)
    } catch (error) {
      toast({
        title: "无法连接到该网页",
        description: "请检查网址是否正确",
        action: <ToastAction altText="确认">确认</ToastAction>
      })
    } finally {
      setIsLoading(false)
    }
  }
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
  return (
    <div>
      
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl w-full space-y-12">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">
            <span className="block">发现、分享、连接</span>
            <span className="block mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-normal">打造你的数字世界</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            一键提取网页精华，优化分析内容，智能整理分类，与世界分享你的发现
          </p>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <Input 
            onKeyDown={async e=>{
              if ((e.code==='Enter'||e.key==='Enter')&&isURL(value)) {  
                setProgress(33)
                const {data,success}= await getCardProps(value)
                setProgress(66)
                if (!success) {
                  setProgress(0)
                  toast({
                    title: "无法连接到该网页",
                    description: "请检查网址是否正确",
                    action: (
                      <ToastAction altText="确认">确认</ToastAction>
                    ),
                  })
                } else{
                  await setdata({...data,url:value})
                  setProgress(100)
                  setsuccess(true)
                  await setshow(true)
                }
              }
            }}
            onChange={(event)=>{
              setvalue(event.target.value)
            }}
            type="text"
            value={value}
            placeholder="输入网址，开始你的发现之旅"
            className="h-14 text-base w-full rounded-lg border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
          />

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {Tip.map((e,index)=>{
              return (
                <Button
                  key={index}
                  variant={e.bol ? 'default' : 'outline'}
                  onClick={()=>changeTipModle({I:index,...e})}
                  className={`px-6 py-2 text-sm font-medium transition-all duration-200 ${e.bol ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                  {e.text}
                </Button>
              )
            })}
          </div>
        </div>
        <div className="relative w-full max-w-2xl mx-auto">
          <Progress value={progress} className="h-1 transition-all duration-500" />
        </div>


        </div>


  <FullscreenPanel 
  isOpen={show}
  data={Data}
  onClose={()=>{
    setdata('null')
    setshow(false)
  }}
  ></FullscreenPanel>
 
 
    </div>
    <ScrollText></ScrollText>
         <div className="w-full py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">浏览器书签管理</h3>
                  <div className="flex gap-4">
                    <DeviconNextjs className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                    <DeviconNestjs className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">智能标签分类</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">SEO深度分析</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">一键信息共享</p>
                  </div>
                </div>
                <p className="mt-8 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">探索无限可能的信息管理平台</p>
              </div>
              
              <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">插件快捷操作</h3>
                  <div className="flex gap-4">
                    <LogosDockerIcon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                    <LogosMicrosoftEdge className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">一键提取摘要</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">智能内容分析</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">便捷分享功能</p>
                  </div>
                </div>
                <p className="mt-8 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">让信息管理更简单高效</p>
              </div>
            </div>
          </div>


         </div>
       
    </div>
  )
}
