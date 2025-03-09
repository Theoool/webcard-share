'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Favicon } from "favicon-stealer";
import { Copy, Link as LinkIcon, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react';

export default function MyFavorites() {
  const { data: session } = useSession();
  const { data, error, isLoading } = useQuery<any>({
    queryKey: ['/Card/new'],
    staleTime: 5 * 60 * 1000,
    // enabled: !!session,
  });
  const [expandedId, setExpandedId] = useState(null);
  const [filteredData, setFilteredData] = useState(data?.data?.card || []);
  if (isLoading) return <div className="w-full h-auto p-10">加载中...</div>;
  if (error) return <div className="w-full h-auto p-10">错误: {JSON.stringify(error)}</div>;
  return (
    <div className="w-full h-auto md:p-10 p-2 relative">
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {data.map((meta) => (
          <motion.div
            key={meta.id}
            className="bg-gray-100 dark:bg-black
dark:shadow-white dark:shadow-sm 
              grid-cols-subgrid
            p-4 rounded-lg shadow-lg cursor-pointer relative overflow-hidden"
            onClick={() => setExpandedId(expandedId === meta.id ? null : meta.id)}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            {/* 核心信息 */}
            <div className="flex items-center gap-4">
              <Favicon url={meta.url} className="w-8 h-8" />
              <div>
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {meta.title}
                </span>
              </div>
              <div>
                
              </div>
            </div>

            {/* 详情内容 */}
            <AnimatePresence>
              {expandedId === meta.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="mt-4 overflow-hidden"
                >
                   <p className="text-sm text-gray-600 dark:text-gray-300 ">
                  {meta.content || '暂无描述'}
                </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {meta.tags.map((el, index) => (
                      <Badge key={index} variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                        {el}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {meta.createdAt.split('T')[0]}
                  </p>
                  <div className="flex gap-4">
                    <a href={meta.url} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                    </a>
                    <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

   
    </div>
  );
}
