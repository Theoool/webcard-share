'use client'
import { useInfiniteQuery,  } from "@tanstack/react-query";
import { BookMark } from '@/components/BookMark';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function MyFavorites() {
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const { ref, inView } = useInView();
  const router = useRouter();
  const [textIndex, setTextIndex] = useState(0);
  const searchTexts = ["读一些技术文章", "关于AI的一些应用","找一些有趣的网站"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % searchTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [searchTexts.length]);

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['/Card/new'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/Card/new?page=${pageParam}&pageSize=${pageSize}&orderBy=createdAt&order=desc`);
      if (!res.ok) throw new Error('网络请求失败');
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.meta.hasMore ? lastPage.meta.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div className="w-full h-auto p-10">加载中...</div>;
  if (error) return <div className="w-full h-auto p-10">错误:刷新重试</div>;

  return (
    <div className="w-full h-auto md:p-10 p-2 relative">
      <div className="flex justify-center mb-6" >
        <motion.button
          onClick={() => router.push('/home/semantic-search')}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-gray-900/10 text-black dark:text-white border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          
        >

          <Search className="w-4 h-4"  style={{'viewTransitionName':`sarch`}} />
          <AnimatePresence mode="wait">
            <motion.span
              key={textIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-medium"
            >
              {searchTexts[textIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.pages.map((page) =>
          page.data.map((meta, index) => (
            <BookMark key={meta.id || index} meta={meta} onDelete={() => {}} />
          ))
        )}
      </div>
      <div ref={ref} className="w-full h-20 flex items-center justify-center">
        {isFetchingNextPage && <div>加载更多...</div>}
      </div>
    </div>
  );
}
