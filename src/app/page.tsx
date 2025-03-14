"use client"
import { useEffect, useState } from "react";
import { FullscreenPanel } from "@/components/three";
import { Button } from "@/components/ui/button";

import { DeviconNextjs, DeviconNestjs, LogosDockerIcon, LogosMicrosoftEdge } from "@/components/icon/icon";
import ScrollText from "@/components/home/ScrolText";

import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Interface } from "readline";
import SeoParser from "@/components/SeoParser";
import Aicard from "@/components/AIcomponents/AIcard";
import CoverParser from "@/components/AIcomponents/CoverParser";
import { isURL } from "@/lib/utils";

interface TipModel{
  text:string
  Open:boolean
  template:React.ReactNode
}

export default function Home() {
  const [value,setvalue]=useState('')
  const [show,setshow]=useState(false)
  const [success,setsuccess]=useState(false)
 
  const [progress, setProgress] = useState(0)

  const [Tip,changeTip]=useState<TipModel[]>([{
    text:'Seo建议',
    Open:true,
    template:<SeoParser url={value}></SeoParser>
  },{
    text:'网页预览',
    Open:false,
    template:<div>1</div>
  },{
    text:'纯净模式',
    Open:false,
    template:<div>2</div>
  },{
    text:'宣传文案',
    Open:false,
    template:<div>3</div>
  },{
    text:'生成封面',
    Open:false,
    template:<CoverParser url={value}></CoverParser>
  },{
    text:"智能摘要",
    Open:false,
    template:<Aicard url={value}></Aicard>
  },{
    text:"智能标签",
    Open:false,
    template:<div>4</div>
  },{
    text:"网页生成",
    Open:false,
    template:<div>8</div>
  }
])
const changeTipModle = ({I, text, Open}) => {
  if (text === "纯净模式") {
    // 当点击纯净模式时，只开启纯净模式，其他全部关闭
    changeTip(Tip.map(e => ({
      ...e,
      Open: e.text === "纯净模式"
    })));
  } else {
    // 其他模式的正常切换逻辑
    let newTip = Tip.map((e, index) => {
      if (index === I) {
        e.Open = !Open;
      }if (e.text === "纯净模式") {
        e.Open = false;
        
      }
      return e;
    });
    changeTip([...newTip]);
  }
};
useEffect(() => {
  if (value) {
    changeTip(prevTip => prevTip.map(item => ({
      ...item,
      template: (() => {
        switch(item.text) {
          case 'Seo建议':
            return <SeoParser url={value} />;
          case '网页预览':
            return <div>1</div>;
          case '纯净模式':
            return <div>2</div>;
          case '宣传文案':
            return <div>3</div>;
          case '生成封面':
            return <CoverParser url={value} />;
          case '智能摘要':
            return <Aicard url={value} />;
          case '智能标签':
            return <div>4</div>;
          case '网页生成':
            return <div>8</div>;
          default:
            return null;
        }
      })()
    })));
  }
}, [value]);
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
            一键提取网页精华，优化分析<span style={{'viewTransitionName':`markbox`}} className=" text-green-300">书签</span>，整理分类<span style={{'viewTransitionName':`markboxs`}} className=" text-green-300">收藏</span>，与世界分享你的发现
          </p>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <Input 
            onKeyDown={async e=>{
              console.log(e);
              if ((e.code==='Enter'||e.key==='Enter')&&isURL(value)) { 
              console.log(value);
               
             
              setTimeout(() => {
                setshow(true)
              }, 500);
              }
            
            }}
            onChange={(event)=>{
              setvalue(event.target.value)
            }}
            type="text"
            value={value}
            placeholder="输入网址，开始你的发现之旅"
            className="h-14 text-base w-full rounded-xl border-indigo-100 dark:border-indigo-900 shadow-md transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-950/30 dark:text-gray-100"
          />

          <div className="mt-8 flex flex-wrap justify-between gap-4 md:gap-6">
            {Tip.map((e,index)=>{
              return (
                <Button
                  key={index}
                  variant={e.Open ? 'default' : 'outline'}
                  onClick={()=>changeTipModle({I:index,...e})}
                  className={`px-6 py-2 text-sm font-medium transition-all duration-200 ${e.Open ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
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
  data={Tip}
  url={value}
  onClose={()=>{
   
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
