import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CalendarIcon, Link } from "lucide-react";
import { Button } from "./ui/button";
import { Favicon } from "favicon-stealer";
import { ButtonD } from "./Button/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link as Linkhearf } from "next-view-transitions";
import { Badge } from "./ui/badge";



const LinkView=({url,title})=>{
  return <div className="flex justify-between px-2 items-center text-textfirst  p-2">
  <div className="flex gap-2 items-center   ">
  <Favicon lazy={true}   size={30} url={url} className=" flex-2 p-2 shadow-sm rounded-full"></Favicon>
   <div className="flex flex-col gap-1 flex-1">
    <span className=" font-bold line-clamp-1">{title}</span>
    <span className=" text-sm">{url}</span>
   </div>
  </div>
   <Linkhearf href={url}><ButtonD>view</ButtonD></Linkhearf>
  </div>
}
export function HoverCardDemo({cards}:{cards:any[]}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className=" text-[18px] font-mono  "  variant={'link'}>
          <Link className="block text-textfirst"  />
        </Button>
      </HoverCardTrigger>
     
      <HoverCardContent className="w-80   z-10   shadow-sm  rounded-sm p-2">
      <ScrollArea className="h-52 w-full rounded-md bg-background ">
        {
          cards.map((res)=>{
            return <LinkView key={res.id} url={res.url} title={res.title}></LinkView>
          })
        }
     
      </ScrollArea>
      </HoverCardContent>
      
    </HoverCard>
  )
}
export default function MarkBooksBox({title,id,user,card,isopen=true}){
   
  return <div className=" dark:shadow-white dark:shadow-sm shadow-md rounded-md"
  
  >
  
    <div className=" w-full mt-2 px-2">
      <Linkhearf  href={`/mymarkbox/markboxs/${id}`} 
      
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
      <HoverCardDemo cards={card} />
      </div>
    
    </div>
  </div>
}
