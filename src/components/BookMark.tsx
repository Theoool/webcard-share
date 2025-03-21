import { useBox } from "@/contexts/box-context";
import { toast } from "@/hooks/use-toast";
import { useMediaQueries } from "@react-hook/media-query";
import { Favicon } from "favicon-stealer";
import { motion, AnimatePresence } from "framer-motion";
import { TrashIcon, LinkIcon, Copy, Bookmark, Maximize } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ComboboxDemo } from "./combobox";
import { Badge } from "./ui/badge";

import { useRouter } from "next/navigation";
export const  BookMark=({meta,bol=true,onDelete,matchesbol=true,container=true})=>{
  const [expandedId, setExpandedId] = useState(null);
  const router= useRouter();
  const { Delete } = useBox();
  const [show, Setshow] = useState(false);
  const { data: session } = useSession();
  const [ID,SetID]=useState(meta.UserFavoriteId);
  const SetIdFirst=(id)=>{
    SetID(id);
  }
 
  const {matches, matchesAny, matchesAll} = useMediaQueries({
    screen: 'screen',
    width: '(max-width: 768px)'
  })
  const updatacard=async ()=>{
    meta.UserFavoriteId=ID;
    let data ;
    if (!session) {
       toast({
        title: '未登录',
        description: '请先登录',
      });
      return;
    }
    if (bol) {
      data =await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/Card/updata/${meta.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meta),
      });
    }else {
      data =await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/Card`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meta),
      });
    }

    if (!data.ok) {
       toast({
        title: data.statusText,
        description: 'Something went wrong!',
      });
    }
    toast({
      title: 'Success',
      description: 'Card updated successfully!',
    });
  }
  const Deletecard=async (id)=>{
    if (!session) {
       toast({
        title: '未登录',
        description: '请先登录',
      });
      return false;
    }
     const data =await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/Card/delete/${meta.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meta),
      });
    if (!data.ok) { 
       toast({
        title: data.statusText,
        description: 'Something went wrong!',
      });
      return true
    }
    onDelete(meta.id);
    toast({
      title: '删除成功',
      description: '卡片已经被扔掉了!',
    });
  }
  return    <motion.div
  layout
  style={{'viewTransitionName':`${meta.id}`}}
  key={meta.id}
  className="
   relative overflow-visible
   bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-900/80 dark:to-gray-900/40
   backdrop-blur-lg border-[0.5px] border-white/20 dark:border-gray-800/20
   shadow-[0_8px_30px_rgb(0,0,0,0.12)]
   dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
   hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]
   dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
   transition-all duration-300 ease-out
   p-4 rounded-xl
   [&:has([data-expanded='true'])]:z-50
   transform-gpu"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ 
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }}
  transition={{
    layout: { duration: 0.3 },
    opacity: { duration: 0.2 },
    y: { duration: 0.3 },
  }}
  whileHover={{ 
    scale: 1.02,
    transition: { duration: 0.2 }
  }}
>
  <div className="flex items-center z-0 justify-between gap-4 group" onClick={() => {
    if (!Delete) {
      Setshow(true)
      setExpandedId(expandedId === meta.id ? null : meta.id)
    }
  }}>
    <Favicon url={meta.url} className="w-8 h-8 rounded-lg shadow-sm transition-transform group-hover:scale-105" />
    <div className="flex-1">
      <span className="text-lg line-clamp-2 font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300">
        {meta.title}
      </span>
    </div>
    {Delete ? (
      <motion.div
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <TrashIcon 
          onClick={(e) => {
            e.preventDefault();
            Deletecard(meta.id);
          }} 
          size={20} 
          className='text-sm text-red-500 transition-all duration-200 hover:text-red-600 hover:drop-shadow-lg'
        />
      </motion.div>
    ) : <div></div>}
  </div>
  {(!matches.width&&matchesbol)&&container? <AnimatePresence>
    {expandedId === meta.id && show && (
      <motion.div
      data-expanded="true"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-full mt-2 
        bg-gradient-to-br from-gray-100/95 via-gray-50/90 to-white/85
        dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-950/85
        backdrop-blur-sm
        rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)]
        dark:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]
        p-6 max-h-[300px] overflow-y-auto
        border-[0.5px] border-white/30 dark:border-gray-800/30
        transform-gpu"
      style={{
        width: '100%',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent'
      }}
    >
        <div className="space-y-4 z-40">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {meta.content || '暂无描述'}
          </p>
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((el, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                border-[0.5px] border-gray-200/50 dark:border-gray-700/50
                text-gray-700 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-700
                transition-all duration-200"
              >
                {el}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
            {meta.createdAt.split('T')[0]}
          </p>
          <div className="flex gap-4 items-center">
            <a href={meta.url} target="_blank" rel="noopener noreferrer">
              <LinkIcon className="w-5 h-5 text-blue-500 hover:text-blue-700" />
            </a>
            <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />
            {session && <ComboboxDemo title={'我的合集'} ID={ID} Clickfunction={SetIdFirst} />}
            {session && <Bookmark onClick={updatacard} className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />}
            {session && <Maximize onClick={()=>{
              
              router.push(`/mymarkbox/${meta.id}`)
            }} className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
  : <AnimatePresence mode="wait">
    {expandedId === meta.id && show && (
      <motion.div
        initial={{ height: 0, opacity: 0, y: -20 }}
        animate={{ 
          height: 'auto', 
          opacity: 1, 
          y: 0,
          transition: {
            height: { duration: 0.4 },
            opacity: { duration: 0.3, delay: 0.1 },
            y: { duration: 0.3, delay: 0.1 }
          }
        }}
        exit={{ 
          height: 0, 
          opacity: 0,
          y: -10,
          transition: {
            height: { duration: 0.3 },
            opacity: { duration: 0.2 },
            y: { duration: 0.2 }
          }
        }}
        className="mt-4 overflow-hidden"
      >
         {meta.image && (
        <div className="relative flex justify-center">
          <img
            className="md:h-[10rem] w-full md:w-auto ease-linear object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
            src={meta.image}
            alt="Content"
            onError={(e) => {
              // 图片加载失败时移除图片元素
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* 添加备用内容 */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800" style={{ display: 'none' }}>
            <span className="text-gray-400">图片无法加载</span>
          </div>
        </div>
      )}
        <div className="space-y-3 z-40">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {meta.content || '暂无描述'}
          </p>
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((el, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="dark:border-gray-600 dark:text-gray-300"
              >
                {el}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {meta.createdAt.split('T')[0]}
          </p>
          <div className="flex gap-4 items-center">
            <a href={meta.url} target="_blank" rel="noopener noreferrer">
              <LinkIcon className="w-5 h-5 text-blue-500 hover:text-blue-700" />
            </a>
            <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />
            {session && <ComboboxDemo title={'我的合集'} ID={ID} Clickfunction={SetIdFirst} />}
            {session && <Bookmark onClick={updatacard} className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />}
            {session && <Maximize onClick={()=>{
            
              router.push(`/mymarkbox/${meta.id}`)
            }} className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-800  dark:hover:text-gray-100" />}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
}
</motion.div>
}
