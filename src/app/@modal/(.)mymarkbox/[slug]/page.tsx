'use client'
import { Modal } from '../modal';
import { useParams, useRouter } from 'next/navigation';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import {queryClient} from '@/lib/queryClient'
import { Favicon } from 'favicon-stealer';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkIcon, UserIcon, BookmarkIcon, ExternalLinkIcon, CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface CardData {
  id: string;
  title: string;
  url: string;
  content: string;
  tags: string[];
  image: string;
  createdAt: string;
  UserFavorite: {
    id: any;
    title: string;
    primaryUserId: string;
  };
  author: {
    id: any;
    username: string;
    image: string;
  };
}

function ModalContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const { data: meta, error, isLoading } = useQuery<CardData>({
    queryKey: [`/Card/GetOneCard/${slug}`],
    staleTime: 5 * 60 * 1000,
  });

  // 处理用户头像的回退显示
  const getInitials = (name: string) => {
    return name?.substring(0, 2).toUpperCase() || 'UN';
  };

  // 处理跳转到用户页面
  const handleUserClick = () => {
    if (meta?.author) {
      router.push(`/user/${meta.author.id}`);
    }
  };

  // 处理跳转到收藏夹页面
  const handleFavoriteClick = () => {
    if (meta?.UserFavorite) {
      router.push(`/markboxs/${meta.UserFavorite.id}`);
    }
  };

  return (
    <ScrollArea className='h-[calc(90vh-120px)]' style={{'viewTransitionName':`${slug}`}}>
      <div className="px-1 py-2">
        {isLoading ? (
          <div className="space-y-4 p-4">
            <div className="animate-pulse space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4"></div>
              <Progress value={65} className="w-full mt-2" />
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="text-red-500 mb-4 text-lg font-medium">加载失败</div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">无法加载书签内容，请稍后重试</p>
            <button 
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              返回
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              layout
              key={meta?.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-gray-800/10 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ 
                opacity: 0,
                scale: 0.96,
                y: -10,
                transition: {
                  duration: 0.2,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              transition={{
                layout: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.25 },
                y: { duration: 0.3, type: "spring", stiffness: 300, damping: 30 },
              }}
            >
              {/* 头部信息区域 */}
              <div className="p-5 border-b dark:border-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Favicon url={meta?.url!} className="w-8 h-8 rounded-md shadow-sm" />
                    <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                      {meta?.title}
                    </h2>
                  </div>
                  <a 
                    href={meta?.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="访问原网站"
                  >
                    <ExternalLinkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </a>
                </div>
                
                {/* 作者和收藏夹信息 */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  {meta?.author && (
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUserClick}
                      className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={meta.author.image} alt={meta.author.username} />
                        <AvatarFallback>{getInitials(meta.author.username)}</AvatarFallback>
                      </Avatar>
                      <span>{meta.author.username}</span>
                    </motion.button>
                  )}
                  
                  {meta?.UserFavorite && (
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleFavoriteClick}
                      className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      <BookmarkIcon className="w-4 h-4" />
                      <span>{meta.UserFavorite.title}</span>
                    </motion.button>
                  )}
                  
                  {meta?.createdAt && (
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{meta.createdAt.split('T')[0]}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* 内容区域 */}
              <div className="p-5">
                {/* 图片区域 */}
                {meta?.image && (
                  <motion.div 
                    className="mb-5 overflow-hidden rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <img
                        className="w-full  object-contain  h-full  transition-transform hover:scale-105 duration-700"
                        referrerPolicy="no-referrer"
                       
                        loading="lazy"
                        src={meta.image}
                        alt={meta.title}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          // e.currentTarget.nextElementSibling!..display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 hidden items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <span className="text-gray-400">图片无法加载</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* 内容描述 */}
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {meta?.content || '暂无描述'}
                  </p>
                  
                  {/* 标签 */}
                  {meta?.tags && meta.tags.length > 0 && (
                    <motion.div 
                      className="flex flex-wrap gap-2 pt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      {meta.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </ScrollArea>
  )
}

export default function MarkboxDetailModal() {
  return (
    <QueryClientProvider client={queryClient}>
      <Modal>
        <ModalContent />
      </Modal>
    </QueryClientProvider>
  );
}
