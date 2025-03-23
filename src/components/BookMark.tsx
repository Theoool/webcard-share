import { useBox } from "@/contexts/box-context";
import { toast } from "@/hooks/use-toast";
import { useMediaQueries } from "@react-hook/media-query";
import { Favicon } from "favicon-stealer";
import { motion, AnimatePresence } from "framer-motion";
import { TrashIcon, LinkIcon, Copy, Bookmark, Maximize, Calendar } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ComboboxDemo } from "./combobox";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

export const BookMark = ({ meta, bol = true, onDelete, matchesbol = true, container = true }) => {
  const [expandedId, setExpandedId] = useState(null);
  const router = useRouter();
  const { Delete } = useBox();
  const [show, setShow] = useState(false);
  const { data: session } = useSession();
  const [ID, setID] = useState(meta.UserFavoriteId);
  
  const setIdFirst = (id) => {
    setID(id);
  };

  const { matches } = useMediaQueries({
    screen: 'screen',
    width: '(max-width: 768px)'
  });

  const updateCard = async () => {
    meta.UserFavoriteId = ID;
    let data;
    
    if (!session) {
      toast({
        title: '未登录',
        description: '请先登录',
      });
      return;
    }
    
    if (bol) {
      data = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/Card/updata/${meta.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          id: meta.id,
          title: meta.title,
          content:meta.content,
          tags: meta.tags,
          url: meta.url,
          image: meta.image,
          UserFavoriteId: ID,
         
          createdAt: meta.createdAt,
          updatedAt: meta.updatedAt,
      }),
      });
    } else {
      data = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/Card`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({meta}),
      });
    }

    if (!data.ok) {
      toast({
        title: data.statusText,
        description: 'Something went wrong!',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Card updated successfully!',
      });
    }
  };

  const deleteCard = async () => {
    if (!session) {
      toast({
        title: '未登录',
        description: '请先登录',
      });
      return false;
    }
    
    const data = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/Card/delete/${meta.id}`, {
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
      return true;
    }
    
    onDelete(meta.id);
    toast({
      title: '删除成功',
      description: '卡片已经被扔掉了!',
    });
  };

  // 复制卡片信息到剪贴板
  const copyCardInfo = () => {
    const metaString = JSON.stringify(meta, null, 2);
    navigator.clipboard.writeText(metaString).then(() => {
      toast({
        title: "复制成功",
        description: "卡片信息已复制到剪贴板",
      });
    }).catch(() => {
      toast({
        title: "复制失败",
        description: "无法访问剪贴板",
        variant: "destructive"
      });
    });
  };

  // 卡片展开/收起处理
  const toggleExpand = () => {
    if (!Delete) {
      setShow(true);
      setExpandedId(expandedId === meta.id ? null : meta.id);
    }
  };

  return (
    <motion.div
      layout
      style={{ 'viewTransitionName': `${meta.id}` }}
      key={meta.id}
      className="
        relative overflow-visible
          bg-white dark:bg-gray-900/10
           backdrop-blur-sm shadow-lg
          dark:border dark:border-gray-800
         hover:shadow-md
        transition-all duration-200 ease-out
        p-4 rounded-lg
        [&:has([data-expanded='true'])]:z-50
        transform-gpu"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ 
        opacity: 0,
        scale: 0.98,
        transition: {
          duration: 0.2,
          ease: 'easeOut'
        }
      }}
      transition={{
        layout: { duration: 0.2 },
        opacity: { duration: 0.15 },
        y: { duration: 0.2 },
      }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.15 }
      }}
    >
      <div 
        className="flex items-center justify-between gap-3 group cursor-pointer" 
        onClick={toggleExpand}
      >
        <Favicon url={meta.url} className="w-8 h-8 rounded-md shadow-sm" />
        <div className="flex-1 min-w-0"> {/* 添加 min-width-0 防止移动端文本溢出 */}
          <span className="text-base font-medium line-clamp-2 text-gray-800 dark:text-gray-200 break-all">
            {meta.title}
          </span>
        </div>
        {Delete ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              deleteCard();
            }}
            className="p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <TrashIcon 
              size={18} 
              className='text-red-500 transition-colors'
            />
          </motion.button>
        ) : null}
      </div>

      {(!matches.width && matchesbol) && container ? (
        <AnimatePresence>
          {expandedId === meta.id && show && (
            <motion.div
              data-expanded="true"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-full mt-1
                bg-white dark:bg-gray-900/10
                rounded-lg shadow-lg
                backdrop-blur-sm
                p-4 max-h-[280px] overflow-y-auto
                border border-gray-100 dark:border-gray-800
                z-10"
              style={{
                width: '100%',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent'
              }}
            >
              <CardContent 
                meta={meta} 
                session={session} 
                ID={ID} 
                setIdFirst={setIdFirst} 
                updateCard={updateCard} 
                copyCardInfo={copyCardInfo} 
                router={router} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          {expandedId === meta.id && show && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: 'auto', 
                opacity: 1,
                transition: {
                  height: { duration: 0.2 },
                  opacity: { duration: 0.15, delay: 0.05 }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: {
                  height: { duration: 0.2 },
                  opacity: { duration: 0.1 }
                }
              }}
              className="mt-3 pt-3
              backdrop-blur-sm
              border-t border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <CardContent 
                meta={meta} 
                session={session} 
                ID={ID} 
                setIdFirst={setIdFirst} 
                updateCard={updateCard} 
                copyCardInfo={copyCardInfo} 
                router={router} 
                showImage={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

const CardContent = ({ meta, session, ID, setIdFirst, updateCard, copyCardInfo, router, showImage = false }) => {
  return (
    <div className="space-y-3">
      {showImage && meta.image && (
        <div className="relative flex justify-center mb-2">
          <img
            className="  h-auto max-h-[10rem] rounded-md "
            referrerPolicy="no-referrer"
            loading="lazy"
            src={meta.image}
            alt={meta.title}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <p className="text-sm text-gray-600 dark:text-gray-300 
       
      leading-relaxed">
        {meta.content || '暂无描述'}
      </p>
      
      {meta.tags && meta.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {meta.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs bg-gray-50 dark:bg-gray-800 
                border-gray-200 dark:border-gray-700
                text-gray-700 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <Calendar className="w-3.5 h-3.5 mr-1" />
        {meta.createdAt.split('T')[0]}
      </div>
      
      <div className="flex gap-3 items-center pt-1">
        <a 
          href={meta.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="访问链接"
        >
          <LinkIcon className="w-4 h-4 text-blue-500" />
        </a>
        
        <button 
          onClick={copyCardInfo}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="复制信息"
        >
          <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        
        {session && (
          <>
            <ComboboxDemo 
              title={'我的合集'} 
              ID={ID} 
              Clickfunction={setIdFirst} 
            />
            
            <button 
              onClick={updateCard}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="保存到收藏夹"
            >
              <Bookmark className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            
            <button 
              onClick={() => router.push(`/mymarkbox/${meta.id}`)}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="查看详情"
            >
              <Maximize className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
