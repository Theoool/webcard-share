import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // 假设使用 lucide-react 图标

import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState, useEffect } from "react";
import Card from "./card";
import { Skeleton } from "@/components/ui/skeleton"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
 
// 容器动画
const containerVariants = {
  open: { 
    opacity: 1,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  closed: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2
    }
  }
};

// 背景动画
const backdropVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 }
};


export function FullscreenPanel({ isOpen, onClose,data }:any) {
  const str=`根据对https://www.bestblogs.dev/的分析，结合SEO与用户体验优化原则，提出以下建议：

结构化数据增强
建议在文章页面部署Schema.org的Article/BlogPosting结构化标记[4]，特别是针对技术类文章增加HowTo和CodeSample组件。这将提升Google精选摘要的抓取概率，预计可使搜索可见性提升30%[2]

移动端体验重构
采用AMP+PWA混合架构实现秒级加载，针对技术文档类页面进行阅读模式优化。数据显示移动端跳出率每降低1秒可提升9%的转化率[3]，建议优先优化首屏LCP指标至2.5秒内

内容价值升级策略
在现有RSS聚合基础上增加原创技术解析模块[1]，采用AI生成技术对比分析不同技术方案（如Spring Boot 3.3的虚拟线程实现）。原创内容占比建议提升至30%以上以突破SEO内容重复阈值[4]

用户参与体系构建
在文章底部增加"技术观点PK"互动模块，结合GitHub Discussions构建开发者社区。数据显示互动功能可使页面停留时间延长40%[3]，建议每周设置技术话题引导讨论

多维度内容分发
将精选技术文章转换为Markdown格式的GitHub知识库[2]，同步建立技术术语的GitBook文档中心。多渠道分发可使品牌搜索量提升57%[4]

性能监控体系
部署Core Web Vitals实时看板，针对技术文档类页面设置FID100ms的专项优化。建议将CLS评分纳入内容发布审核流程[3]

注：所有优化建议均基于白帽SEO原则，实施周期建议控制在6-8周，预期可实现自然搜索流量增长120%-150%[4][3]
`
 const strs: (string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined)[]=[]
   str.split('\n').map((item,index)=>{
    strs.push(item)
   }
  )
 

 

  return (
  <div >
     
     
     {
   
  <AnimatePresence>
      {isOpen &&  (
      
        <motion.div
          className=" fixed  inset-0  
          
           z-50"
          variants={backdropVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          {
            
            <motion.div
              className="absolute top-0 p-2 sm:p-10 bg-white dark:bg-black w-full h-full"
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
                 <ScrollArea className="h-full     ">
              <div className="flex justify-between   px-2 sm:px-12">
               <div className="flex flex-col gap-2">
               <h1 className="text-xl">搜索url:{data.url}</h1>
             
               </div>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <X 
                    className="cursor-pointer"
                    onClick={onClose}
                  />
                </motion.div>
              </div>
             
              
              <motion.div 
                className="flex w-full gap-2  h-full p-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2 }
                }}
                exit={{ 
                  opacity: 0,
                  transition: { duration: 0.1 }
                }}
              >
                         
   
    <div className="   gap-2 
     md:flex-row flex-col 
    w-full h-full p-2
     flex 
     ">
     
      <div className="flex-1 h-full hidden xl:flex  ">
        {
          data.url ?<iframe className="w-full h-[85vh]" src={data.url}>
  
          </iframe>:<Skeleton className="w-full h-full" />
        }
      </div>
      <div className="flex-1  h-[85vh] ">
    
     { data.finalSummary?<Card
    header={{
      title: data.meta.title,
      url: data.meta.image,
      logo: data.meta.logo
    }}
    content={{
      imageUrl: data.meta.image,
      text: data.finalSummary
    }}
    footer={{
      source: "webshare.com",
      time: Date.now().toString()
    }}
  />:<Skeleton className="w-full h-[85vh]" /> }
       
      </div>
      <div className="flex-1   h-full cardboxshow ">
       {strs?<div className="p-2 ">
       <h3 className="text-[18px]">{strs[0]}</h3>
        {strs.map((item,index)=>{
          if (index===0) {
            return <div key={index}></div>
          }
          return <p  key={index} className=" text-[16px]">{item}</p>
        })} 
       </div>:<Skeleton className="w-full h-[85vh]" />
}
      </div>
    </div>
                {/* iframe 和 Card 内容 */}
              </motion.div>
              </ScrollArea>
            </motion.div>
            
          }
        </motion.div>
        
      )}
      
    </AnimatePresence>
    

    }
   
  </div>
  );
}
