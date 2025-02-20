"use client"
import { FolderSync, Heart, Rss, Share2 ,Copy} from "lucide-react"
import { Button } from "./ui/button"
import HoverText from '@/components/HoverText'
import {useParams} from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import domtoimage from 'dom-to-image';
import {downloadBookmarks} from '@/lib/utils'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import { ToastAction } from "@radix-ui/react-toast"
import { useToast as UseToast } from "@/hooks/use-toast"
const bookmarks: any[] = [
  {
    title: '书签栏',
    children: [
      {
        title: '博客',
        children: [
          { title: '我的博客', url: 'https://example.com/blog' },
          { title: '某乎', url: 'https://example.com' },
          { title: '某书', url: 'https://example.com' },
        ],
      },
      {
        title: '工具',
        children: [
          { title: '在线图片压缩', url: 'https://example.com' },
          { title: 'TinyPNG – Developer API', url: 'https://example.com' },
          { title: '在线GIF动图压缩', url: 'https://example.com' },
        ],
      },
    ],
  },
];
function DialogCloseButton() 
{
  const   router = useParams()
  const cardimage=useRef<HTMLDivElement|null>(null)
  const currentUrl = `${window.location.origin}/home/${router!.slug}`;
  
  function saveAsPng() {
 
   if (cardimage.current) {
    const dom=cardimage.current.cloneNode(true) as HTMLElement;
    dom.style.width=cardimage.current.clientWidth*2+'px'
    dom.style.height=cardimage.current.clientHeight*2+'px'
    domtoimage.toPng(cardimage.current).then((dataUrl: string) => {
      const link = document.createElement('a');
      link.download = 'card.png';
      link.href = dataUrl;
      link.click();
    })
    .catch((error: any) => {
      console.error('生成图片失败:', error);
    });
   }
  }
 
  return (
    <Dialog>
      <DialogTrigger asChild>
       <Share2></Share2>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-md ">
        <DialogHeader>
          <DialogTitle>分享合集</DialogTitle>
          <DialogDescription>
         选择你喜欢的分享方式
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="Card" className="">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="Card">卡片Card</TabsTrigger>
    <TabsTrigger value="a">文件导出</TabsTrigger>
    <TabsTrigger value="Link">链接Link</TabsTrigger>
  </TabsList>
  <TabsContent value="Card">
    <div ref={cardimage} onClick={()=>saveAsPng()}  className="w-full
     bg-blue-300
    cardboxshow h-56">
      下载这个

    </div>
  </TabsContent>
  <TabsContent value="Link">
  <div className="flex items-center bg space-x-2 h-56">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={currentUrl}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className=" text-white px-3">
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
  </TabsContent>
  <TabsContent value="a">
  <div className="flex  items-center h-56 justify-around bg space-x-2 font-medium ">
         <Button className="text-white" type='submit' onClick={()=>downloadBookmarks(bookmarks,'测试')} >.xml导出</Button>
         <Button className="text-white" type='submit'>.json导出</Button>
  </div>
  </TabsContent>
</Tabs>
       
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


function tolbox() {

   {/* //删除  //邀请 //分享 卡片二维码  //RSS //添加   
        // 公开/私密   导出/导入（插件功能）  //阅读  //标注（以后再更新）
        //拖拽Ai，网页对比，网页思维导图
         //离线阅读 //pdf/html下载
    */}

    const { toast } = UseToast()

    const removeEventListenerMessage = () => {
      window.removeEventListener('message', handleEventMessage);
    };
    const handleEventMessage = (event: any) => {
      if (event.data.type === 'extensionResponse') {
        toast({
          title: "收藏成功",
          type: "background",
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: (
            <ToastAction altText="Goto schedule to undo">了解</ToastAction>
          ),
        });
      } else {
        toast({
          title: "收藏失败",
          description: "Friday, February 10, 2023 at 5:57 PM",
          duration: 3000,
          action: (
            <ToastAction altText="Goto schedule to undo">了解</ToastAction>
          ),
        });
        removeEventListenerMessage()
  
      }
    };
    // 收藏，同步浏览器标签，查看
    const GO = (bookmarks: any) => {
      window.postMessage({
        action: 'callExtensionFunction',
        params: bookmarks
      }, window.location.origin);
      window.addEventListener('message', handleEventMessage);
    } 
  return <div className="pointer-events-auto
   flex w-full h-12 sm:w-12 sm:flex-col 
    
   items-center
   
   sm:h-96  
    justify-around  gap-8 rounded-3xl
     bg-gradient-to-b from-zinc-100/80
      to-white/90 px-1 pb-8 pt-4 ring-1
       ring-zinc-400/10 backdrop-blur-lg
        dark:from-zinc-800/80 dark:to-zinc-950/80
         dark:ring-zinc-500/10">
          <HoverText
          text="分享这个合集"
          >
              <div className="pointer-events-auto hover:-translate-y-2 transform 
    text-disabled hover:text-black
    hover:animate-in" >
      <DialogCloseButton>

      </DialogCloseButton>
    
    </div>
          </HoverText>
          <HoverText
          text="收藏"
          >
    <div className="pointer-events-auto hover:-translate-y-2 transform 
    text-disabled hover:text-black
    hover:animate-in" >
      <Heart />
    </div>
    </HoverText>
    <HoverText
    
          text="同步到浏览器"
          >
    <div className="pointer-events-auto hover:-translate-y-2 transform 
    text-disabled hover:text-black
    hover:animate-in"  onClick={()=>{GO(bookmarks)}}>
      <FolderSync />  
    </div>
    </HoverText>
    <HoverText
          text="RSS订阅"
          >
    <div className="pointer-events-auto hover:-translate-y-2 transform 
    text-disabled hover:text-black
    hover:animate-in" >
      <Rss />
    </div>
    </HoverText>
  </div>
}



export default tolbox
