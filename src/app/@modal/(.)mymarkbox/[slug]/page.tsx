'use client'
import { Modal } from '../modal';
import { useParams } from 'next/navigation';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import {queryClient} from '@/lib/queryClient'
import { Favicon } from 'favicon-stealer';
import { motion,  } from 'framer-motion';
import { LinkIcon, } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

 function ModalContent() {
  const params = useParams();
  const slug = params?.slug;
 

  const { data:meta, error, isLoading } = useQuery<any>({
    queryKey: [`/Card/GetOneCard/${slug}`],
    staleTime: 5 * 60 * 1000,
    
  });

  return (
      <ScrollArea className='h-[30rem] ' style={{'viewTransitionName':`${slug}`}}>
        <div className=" " >
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          </div>
        ) : error ? (
          <div className="text-red-500">加载失败，请重试</div>
        ) : 
        (
          
            <motion.div
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
  
>
  
  <div className="flex items-center z-0 justify-between" style={{'viewTransitionName':`${slug}`}}>
    <Favicon url={meta.url} className="w-8 h-8" />
    <div>
      <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {meta.title}
      </span>
    </div>
      </div>
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
      <div className=' flex justify-center'>
      {meta.image && (
        <div className="relative">
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
      </div>
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
        
            </div>
        </div>
      </motion.div>
  </motion.div>

  

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
