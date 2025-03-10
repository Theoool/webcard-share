'use client'
import { ComboboxDemo } from "@/components/combobox";
import { ArcticonsDeepl, BiRssFill, MaterialSymbolsDownload2OutlineRounded } from "@/components/icon/icon";
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
import { useEffect, useState } from "react";
import { BookMark } from "@/components/BookMark";


export function TooltipDemo({children,text}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
         <div> {children}</div>
        </TooltipTrigger>
        <TooltipContent className=" text-white dark:text-darkbackround">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default  function Page(
) {
  const router=useParams()
  const route=useRouter()  
  const { data, error, isLoading } = useQuery<any>({
    queryKey: [`/UserFavorites/GetUserFavorite/${router!.slug}`],
    staleTime: 5 * 60 * 1000,
    // enabled: !!session,
  });
  const [cards, setCards] = useState<any>([]);
  
  useEffect(() => {
    if (data?.card) {
      setCards(data.card);
    }
  }, [data]);

  const handleDelete = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };
 
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
      {cards.map((meta) => (
       <BookMark key={meta.id} meta={meta} bol={false} onDelete={handleDelete}></BookMark>
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


