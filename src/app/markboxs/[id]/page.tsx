'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Brain, LucideRss, Download, Loader2 } from "lucide-react";
import BatchImportButton from "@/components/BatchImport";
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { BookMark } from "@/components/BookMark";
import TooltipDemo from "@/components/TooltipDemo";
import { downloadBookmarks } from "@/lib/utils";
import { SaveCards } from "@/lib/card/router";

import { useSession } from "next-auth/react";
import { submitUrls, getSocket } from "@/lib/ws";
import { motion, AnimatePresence } from "framer-motion";



export default function Page() {
  const {data:session} = useSession()
  const router = useParams()
  const route = useRouter()

  const { data, error, isLoading } = useQuery<any>({
    queryKey: [`/UserFavorites/GetUserFavorite/${router?.id}`],
    staleTime: 5 * 60 * 1000,
  });
  const [cards, setCards] = useState<any>([]);

  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState<{
    processed: number;
    total: number;
    success: number;
    failed: number;
    percentage: number;
    results?:any[]
  } | null>(null);

  useEffect(() => {
    if (data?.card) {
      setCards(data.card);
    }
  }, [data]);
  const handleDelete = async (id) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}Card/delete/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session?.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!data.ok) { 
      toast({
        title: data.statusText,
        description: 'Something went wrong!',
      });
      return true
    }
    setCards(cards.filter(card => card.id !== id));
  };

  // 添加WebSocket监听
  useEffect(() => {
    // 确保在客户端环境中执行
    if (typeof window !== 'undefined') {
      const socket = getSocket();
      
      // 监听进度更新
      socket.on('progress', (data) => {
        if (data.status === 'processing') {
          setProgress(data.progress);
         
        } else if (data.status === 'completed') {
          setTimeout(() => {
            setAnalyzing(false);
            
            // 处理分析结果，删除失败的URL
            if (data.results) {
              const failedUrls = data.results
                .filter(result => result.success === false)
                .map(result => result.url);
                
              if (failedUrls.length > 0) {
                // 找出要删除的卡片ID
                const cardsToDelete = cards.filter(card => 
                  failedUrls.includes(card.url)||card.title===""
                ).map(card => card.id);
                
                // 删除失败的卡片
                if (cardsToDelete.length > 0) {
                  cardsToDelete.forEach(id => handleDelete(id));
                  
                  toast({
                    title: "已清理无效链接",
                    description: `已从收藏夹中移除 ${cardsToDelete.length} 个无效链接`,
                  });
                  route.refresh()
                }
              }
            }
            
            setProgress(null);
            toast({
              title: "分析完成",
              description: `成功分析 ${data.progress.success} 个URL`,
            });
            
          }, 2000);
          setAnalyzing(false);
          setProgress(null);
          toast({
            title: "分析完成",
            description: `成功分析所有URL`,
          });
        }
      });
      
      // 组件卸载时清理监听器
      return () => {
        socket.off('progress');
      };
    }
  }, [cards,handleDelete]);

 
  const handleDeleteID = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };
  // 处理AI分析
  const handleAnalyze = async () => {
    if (!cards || cards.length === 0) {
      toast({
        title: "无法分析",
        description: "收藏夹中没有URL可供分析",
        variant: "destructive"
      });
      return;
    }

    try {
      setAnalyzing(true);
      setProgress(null);
      // 提取所有URL
      const urls = cards.map(card => card.url);
      // 提交URL进行分析
      const result = await submitUrls(urls);
      toast({
        title: "分析已开始",
        description: `正在分析 ${urls.length} 个URL，请稍候...`,
      });
    } catch (error) {
      console.error("分析失败:", error);
      setAnalyzing(false);
      toast({
        title: "分析失败",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="dark:text-white flex justify-center  min-h-screen">
      {isLoading ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ 'viewTransitionName': `${router!.id}` }} 
          className="md:max-w-[40rem] lg:max-w-[40rem] w-full mt-8 gap-2 px-4"
        >
          <div className="w-full cursor-pointer text-xl text-center mb-6">
            <Skeleton className="w-36 h-8 mx-auto rounded-md"></Skeleton>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2 items-center">
              <Skeleton className="w-8 h-8 rounded-full"></Skeleton>
              <Skeleton className="w-24 h-5 rounded-md"></Skeleton>
            </div>
            <Skeleton className="w-16 h-6 rounded-full"></Skeleton>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-full h-24 rounded-lg"></Skeleton>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ 'viewTransitionName': `${router!.id}` }} 
          className="md:max-w-[40rem] lg:max-w-[40rem] w-full mt-8 gap-2 px-4 pb-12"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full cursor-pointer text-2xl font-medium text-center mb-6 text-[#1d1d1f] dark:text-white"
          >
            {data.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between items-center mb-8"
          >
            <div className="flex gap-2 items-center">
              <Avatar className="size-8 border border-[#f0f0f0] dark:border-[#2a2a2a]">
                <AvatarImage src={data.primaryUser.image} />
                <AvatarFallback className="bg-[#f5f5f7] dark:bg-[#2a2a2a] text-[#1d1d1f] dark:text-white">
                  {data.primaryUser.username?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">{data.primaryUser.username}</span>
            </div>
            <span>
              {!data.isPublic ? (
                <Badge className="bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-white font-normal px-2 py-0.5 rounded-full text-xs">私密</Badge>
              ) : (
                <Badge className="bg-[#34c759] hover:bg-[#34c759]/90 text-white font-normal px-2 py-0.5 rounded-full text-xs">公开</Badge>
              )}
            </span>
          </motion.div>
          
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 mb-8"
          >
            <AnimatePresence>
              {cards.map((meta, index) => (
                <motion.div
                  key={meta.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <BookMark container={false} meta={meta} bol={false} onDelete={handleDeleteID}></BookMark>
                </motion.div>
              ))}
              
              {cards.length === 0 && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-[#8e8e93] dark:text-[#98989d]"
                >
                  暂无书签，请添加书签到此收藏夹
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <AnimatePresence>
            {progress && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-8 p-4 rounded-lg border border-[#e5e5e5] dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-[#1d1d1f] dark:text-white">
                    分析进度
                  </div>
                  <div className="text-sm font-medium text-[#007aff] dark:text-[#0a84ff]">
                    {progress.percentage}%
                  </div>
                </div>
                
                <div className="relative h-1 w-full bg-[#f0f0f0] dark:bg-[#2a2a2a] rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-[#007aff] dark:bg-[#0a84ff]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  ></motion.div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="flex flex-col items-center p-3 rounded-md bg-[#f5f5f7] dark:bg-[#2a2a2a]">
                    <div className="text-xs text-[#8e8e93] dark:text-[#98989d] mb-1">已处理</div>
                    <div className="text-sm font-medium text-[#1d1d1f] dark:text-white">
                      {progress.processed}/{progress.total}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center p-3 rounded-md bg-[#f5f5f7] dark:bg-[#2a2a2a]">
                    <div className="text-xs text-[#8e8e93] dark:text-[#98989d] mb-1">成功</div>
                    <div className="text-sm font-medium text-[#34c759] dark:text-[#30d158]">
                      {progress.success}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center p-3 rounded-md bg-[#f5f5f7] dark:bg-[#2a2a2a]">
                    <div className="text-xs text-[#8e8e93] dark:text-[#98989d] mb-1">失败</div>
                    <div className="text-sm font-medium text-[#ff3b30] dark:text-[#ff453a]">
                      {progress.failed}
                    </div>
                  </div>
                </div>
                
                {progress.percentage === 100 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-center text-sm text-[#8e8e93] dark:text-[#98989d]"
                  >
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      正在清理无效链接...
                    </motion.span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex w-full mt-6 mb-8 justify-between gap-2"
          >
            <TooltipDemo text={'批量导入'}>
         <BatchImportButton 
                onImportSuccess={async (items) => {
                  if (items && items.length > 0) {
                    const newCards = items.map(item => item.url);
                    const res = await SaveCards({url: newCards, UserFavoriteId: router!.id, session: session?.accessToken})
                    if (res.success) {
                      toast({
                        title: "导入成功",
                        description: `成功导入 ${items.length} 个书签到收藏夹`,
                      });
                    } else {
                      toast({
                        title: "导入失败",
                        description: `导入${items.length} 失败书签到收藏夹`,
                        variant: "destructive"
                      });
                    }
                  }
                }} />
            </TooltipDemo>
            
            <TooltipDemo text={'清理失效连接'}>
              <Button 
                variant={analyzing ? 'default' : 'outline'} 
                onClick={handleAnalyze}
                disabled={analyzing}
                className={`flex-1 transition-all duration-300 ${analyzing 
                  ? 'bg-[#007aff] hover:bg-[#007aff]/90 text-white dark:bg-[#0a84ff] dark:hover:bg-[#0a84ff]/90' 
                  : 'border-[#e5e5e5] dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] hover:bg-[#f5f5f7] dark:hover:bg-[#2a2a2a] text-[#1d1d1f] dark:text-white'}`}
              > 
                <Brain className={`text-xl mr-2 ${analyzing 
                  ? 'animate-pulse text-white' 
                  : 'text-[#1d1d1f] dark:text-white'}`} 
                />
                {analyzing ? <span>分析中</span> : <span>清理链接</span>}
              </Button>
            </TooltipDemo>
            
            <TooltipDemo text={'RSS订阅'}>
              <Button
                onClick={() => route.push(`/api/feed/${router!.id}`)}
                variant="outline"
                className="flex-1 border-[#e5e5e5] dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] hover:bg-[#f5f5f7] dark:hover:bg-[#2a2a2a] text-[#1d1d1f] dark:text-white"
              >
                <LucideRss className="text-xl mr-2 text-[#ff9500] dark:text-[#ff9f0a]" />
                <span>RSS</span>
              </Button>
            </TooltipDemo>
            
            <TooltipDemo text={'下载导出'}>
              <Button 
                variant="outline"
                onClick={() => downloadBookmarks([{
                  title: data.title,
                  children: cards
                }], data.title)}
                className="flex-1 border-[#e5e5e5] dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] hover:bg-[#f5f5f7] dark:hover:bg-[#2a2a2a] text-[#1d1d1f] dark:text-white"
              >
                <Download className="text-xl mr-2 text-[#1d1d1f] dark:text-white" />
                <span>导出</span>
              </Button>
            </TooltipDemo>
          </motion.div>
          </motion.div>
        )}
  
</div>
)}
