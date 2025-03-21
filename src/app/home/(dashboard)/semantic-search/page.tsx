'use client'
import { useState, useEffect, useCallback, use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookMark } from '@/components/BookMark';
import { ArrowLeftIcon, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
// import router from 'next/router';
// 本地缓存搜索结果，减少API调用
const searchCache = new Map();
const MAX_QUERY_LENGTH = 100; // 限制查询长度

const fetchSearchResults = async (searchTerm) => {
  if (!searchTerm) return { hits: [], found: 0 };
 
  // 截断过长的查询
  const trimmedSearchTerm = searchTerm.slice(0, MAX_QUERY_LENGTH);

  
  // 检查缓存中是否有结果
  const cacheKey = trimmedSearchTerm.toLowerCase().trim();
  if (searchCache.has(cacheKey)) {
    console.log('使用缓存的搜索结果');
    return searchCache.get(cacheKey);
  }
  
  // 发起API请求
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/search/cards/semantic?query=${encodeURIComponent(trimmedSearchTerm)}`
  );
  if (!response.ok) throw new Error('搜索失败');
  const data = await response.json();
  
  // 存入缓存
  searchCache.set(cacheKey, data);
  
  // 限制缓存大小，防止内存泄漏
  if (searchCache.size > 20) {
    const firstKey = searchCache.keys().next().value;
    searchCache.delete(firstKey);
  }
  
  return data;
};

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const router = useRouter();
  // 优化查询策略，增加staleTime和cacheTime减少请求次数
  const { data, isLoading, error } = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: () => fetchSearchResults(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm && debouncedSearchTerm.trim().length >= 2, // 至少2个字符才触发搜索
    staleTime: 5 * 60 * 1000, // 5分钟内不重新获取数据
    cacheTime: 10 * 60 * 2000, // 10分钟内缓存数据
  });

  // 清除输入框内容的处理函数
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return (
    <div className="w-full h-auto md:p-10 p-4 relative">
      <div className="max-w-3xl mx-auto mb-8">
       <h1 onClick={()=>{router.back()}} className="text-2xl font-semibold mb-6 text-center dark:text-gray-100">语义话搜索|网页书签</h1>
       
        <div className="relative">
          <div  className="flex items-center border dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
            <Search style={{'viewTransitionName':`sarch`}}  className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="输入搜索内容..."
              className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ×
              </button>
            )}
          </div>
          {debouncedSearchTerm && debouncedSearchTerm.length < 2 && (
            <p className="text-xs text-gray-500 mt-2 ml-2">请至少输入2个字符</p>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border dark:border-[#27272a] rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-20 w-full mb-3" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto p-4 bg-red-50 dark:bg-red-900/10 rounded-lg text-red-500 text-center"
          >
            <p>搜索出错</p>
          </motion.div>
        )}

        {!isLoading && !error && data?.hits?.length === 0 && debouncedSearchTerm && debouncedSearchTerm.length >= 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto p-6 text-center text-gray-500 dark:text-gray-400"
          >
            <p>没有找到相关结果</p>
          </motion.div>
        )}

        {!isLoading && !error && data?.hits?.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl mx-auto"
          >
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              找到 {data.found} 个结果 (用时 {data.search_time_ms}ms)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {data.hits.map((hit, index) => {
                const meta = {
                  id: hit.document.id,
                  title: hit.document.title,
                  url: hit.document.url,
                  content: hit.document.content,
                  tags: hit.document.tags || [],
                  image: hit.document.image,
                  createdAt: new Date().toISOString()
                };
                
                return (
                  <motion.div
                    key={meta.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    {hit.similarity_tag && (
                      <div className="absolute -top-2 -right-2  z-10">
                        <Badge 
                          className={`${hit.similarity_tag === '高相关' ? 'bg-green-500' : hit.similarity_tag === '中相关' ? 'bg-yellow-500' : 'bg-blue-500'} rounded-full text-white`}
                        >
                          {hit.similarity_tag}
                        </Badge>
                      </div>
                    )}
                    <BookMark meta={meta} onDelete={() => {}} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchComponent;
