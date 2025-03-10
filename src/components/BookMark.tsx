import { useBox } from "@/contexts/box-context";
import { toast } from "@/hooks/use-toast";
import { useMediaQueries } from "@react-hook/media-query";
import { Favicon } from "favicon-stealer";
import { motion, AnimatePresence } from "framer-motion";
import { TrashIcon, LinkIcon, Copy, Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ComboboxDemo } from "./combobox";
import { Badge } from "./ui/badge";

export const  BookMark=({meta,bol=true,onDelete,matchesbol=true})=>{
  const [expandedId, setExpandedId] = useState(null);
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
      data =await fetch(`http://localhost:3000/Card/updata/${meta.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meta),
      });
    }else {
      data =await fetch(`http://localhost:3000/Card`, {
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
     const data =await fetch(`http://localhost:3000/Card/delete/${meta.id}`, {
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
      title: 'Success',
      description: 'Card delete successfully!',
    });
  }
// 添加点击外部关闭的处理

  return    <motion.div
  layout
  key={meta.id}
  className="bg-gray-100 dark:bg-black
    dark:shadow-white dark:shadow-sm 
    grid-cols-subgrid
    [&:has([data-expanded='true'])]:z-50
    p-4 rounded-lg shadow-lg cursor-pointer relative overflow-visible"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ 
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: {
      duration: 0.4,
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
  {/* 核心信息部分 */}
  <div className="flex items-center z-0 justify-between gap-4" onClick={() => {
    if (!Delete) {
      Setshow(true)
      setExpandedId(expandedId === meta.id ? null : meta.id)
    }
  }}>
      
    
   
    <Favicon url={meta.url} className="w-8 h-8" />
    <div>
      <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {meta.title}
      </span>
    </div>
    {Delete ? (
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <TrashIcon 
          onClick={(e) => {
            e.preventDefault();
            const button = e.currentTarget;
            button.style.transform = 'rotate(10deg)';
            setTimeout(() => {
              Deletecard(meta.id);
            }, 200);
          }} 
          size={20} 
          className='text-sm text-red-500 transition-all duration-200 hover:text-red-600'
        />
      </motion.div>
    ) : <div></div>}
  </div>
  {!matches.width&&matchesbol? <AnimatePresence>
    {expandedId === meta.id && show && (
      <motion.div
      data-expanded="true"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-full mt-2 
        bg-gray-100/95 dark:bg-black/95
        backdrop-blur-sm
        rounded-lg shadow-xl p-4 max-h-[300px] overflow-y-auto
        dark:shadow-white dark:shadow-sm
        border border-gray-200 dark:border-gray-800"
      style={{
        width: '100%',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent'
      }}
    >
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
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
}
</motion.div>
}
