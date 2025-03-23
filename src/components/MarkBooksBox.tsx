import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CalendarIcon, Link } from "lucide-react";
import { Button } from "./ui/button";
import { Favicon } from "favicon-stealer";
import { ButtonD } from "./Button/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link as Linkhearf } from "next-view-transitions";
import { Badge } from "./ui/badge";
import { toast } from "@/hooks/use-toast";



const LinkView=({url,title})=>{
  return <div className="flex justify-between px-2 items-center text-textfirst  p-2">

  <div className="flex gap-2 items-center   ">
  <Favicon lazy={true}   size={30} url={url} className=" flex-2 p-2 shadow-sm rounded-full"></Favicon>
   <div className="flex flex-col gap-1 flex-1">
    <span className=" font-bold line-clamp-1 text-sm  text-clip">{title}</span>
    {/* <span className=" font-bold line-clamp-1   text-clip text-sm">{url}</span> */}
   </div>
  </div>
   <Linkhearf href={url}><ButtonD>view</ButtonD></Linkhearf>
   
  </div>
  
}
 function HoverCardDemo({id}) {
  return (
   
        <Button 
          className="text-[18px] font-mono transition-all duration-200 hover:scale-105 active:scale-95"  
          variant={'link'}
          onClick={() => {
            // 构建分享链接
            const shareUrl = `www.theooo.xyz/markboxs/${id}`;
            // 复制到剪贴板
            navigator.clipboard.writeText(shareUrl).then(() => {
              toast({
                title: "复制成功",
                description: "链接已复制到剪贴板，快去分享吧！",
                // status: "success",
                duration: 2000,
              });
            }).catch(err => {
              console.error('复制失败:', err);
            });
          }}
        >
          <Link className="block text-textfirst hover:text-blue-500" />
        </Button>
  )
}
export default function MarkBooksBox({title,id,user,card,isopen=true}){
   
  return <div className=" border dark:border-[#27272a] dark:shadow-md shadow-sm rounded-md  p-2"
  
  >
  
    <div className=" w-full  text-center flex flex-col justify-around gap-2 px-2">
      <Linkhearf  href={`/markboxs/${id}`} 
      
      className="w-full cursor-pointer text-xl  text-center ">{title}</Linkhearf>
      <div className="flex  justify-between">
      <div className="flex gap-2">
      <Avatar className=' size-7'>
      <AvatarImage src={user.image}  />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <span>{user.username}</span>

      </div>
       <span className="text-sm">
       {
        !isopen?<Badge className="bg-red-400 text-white">私密</Badge>:
        <Badge className="bg-green-400">公开</Badge>
       }
       </span>
      <HoverCardDemo id={id} />
      </div>
    
    </div>
  </div>
}
