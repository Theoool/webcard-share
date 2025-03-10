'use client'
import { ArcticonsDeepl, BiRssFill, MaterialSymbolsDownload2OutlineRounded } from "@/components/icon/icon";
import TooltipDemo from "@/components/TooltipDemo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { Favicon } from "favicon-stealer";
import { motion, AnimatePresence } from "framer-motion";
import { LinkIcon, Copy, Brain, LucideRss, Download } from "lucide-react";

import { useParams,useRouter} from 'next/navigation'
// import { useRouter} from 'next/router'
import { useState } from "react";



export default  function Page(
) {
  const router=useParams()
  const route=useRouter()  
  const { data, error, isLoading } = useQuery<any>({
    queryKey: [`/UserFavorites/GetUserFavorite/${router!.slug}`],
    staleTime: 5 * 60 * 1000,
    // enabled: !!session,
  });
  const [expandedId, setExpandedId] = useState(null);

  return <div className="dark:text-white flex justify-center">
    {
      isLoading?<div  style={{'viewTransitionName':`${router!.slug}`}} className="md:max-w-[40rem] lg:max-w-[40rem]  w-full mt-2  gap-2 px-2">
        <h1 className="w-full cursor-pointer text-xl  text-center "><Skeleton className="w-36"></Skeleton>  </h1>
      {/* <h1   className="w-full cursor-pointer text-xl  text-center ">{data.title}</h1> */}
      <div className="flex  justify-between">
      <div className="flex gap-2">
      <Avatar className=' size-7'>
      <AvatarImage src={''}  />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
   <Skeleton className=" w-20"> </Skeleton>

      </div>
       <span className="text-sm">
        <Badge className="bg-red-400 text-white">私密</Badge>
      
       </span>
      </div>
      </div>:   <div  style={{'viewTransitionName':`${router!.slug}`}} className="md:max-w-[40rem] lg:max-w-[40rem]  w-full mt-2  gap-2 px-2">
      <h1   className="w-full cursor-pointer text-xl  text-center ">{data.title}</h1>
      <div className="flex  justify-between">
      <div className="flex gap-2">
      <Avatar className=' size-7'>
      <AvatarImage src={data.primaryUser.image}  />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <span>{data.primaryUser.username}</span>

      </div>
       <span className="text-sm">
       {
        !data.isPublic?<Badge className="bg-red-400 text-white">私密</Badge>:
        <Badge className="bg-green-400">公开</Badge>
       }
       
       </span>
      </div>
     <div className="grid mt-2 grid-cols-1   gap-6">
      {data.card.map((meta) => (
        <motion.div
          key={meta.id}
        className="bg-gray-100 dark:bg-black
dark:shadow-white dark:shadow-sm 
            grid-cols-subgrid
          p-4 rounded-lg shadow-lg cursor-pointer relative overflow-hidden"
          onClick={() => setExpandedId(expandedId === meta.id ? null : meta.id)}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <Favicon url={meta.url} className="w-8 h-8" />
            <div>
              <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {meta.title}
              </span>
             
            </div>
          </div>

          {/* 详情内容 */}
          <AnimatePresence>
            {expandedId === meta.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="mt-4 overflow-hidden"
              >
                 <p className="text-sm text-gray-600 dark:text-gray-300 ">
                {meta.content || '暂无描述'}
              </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {meta.tags.map((el, index) => (
                    <Badge key={index} variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                      {el}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {meta.createdAt.split('T')[0]}
                </p>
                <div className="flex gap-4">
                  <a href={meta.url} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                  </a>
                  <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
    <div className=" flex w-full mt-4 p-2 justify-around ">
    <TooltipDemo text={'AI智能总结'}>
    <Button variant={'outline'}> <Brain  className="icon text-2xl mx-2 dark:text-light"></Brain></Button>
    </TooltipDemo>
   <TooltipDemo text={'rss订阅'}>  <Button
   onClick={()=>route.push(`/api/feed/${router!.slug}`)}
   variant={'outline'}><LucideRss className="icon text-2xl mx-2 dark:text-light"></LucideRss></Button></TooltipDemo>
   <TooltipDemo text={'下载导出'}>   <Button variant={'outline'}
   ><Download className="icon text-2xl mx-2 text-light"></Download></Button></TooltipDemo>
    </div>

      </div>
     
    }
   
  </div> 
}


