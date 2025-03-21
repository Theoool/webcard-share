'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ResultCard from './ResultCard';

interface SearchResultsProps {
  data: any;
  isLoading: boolean;
  error: any;
  debouncedSearchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  data,
  isLoading,
  error,
  debouncedSearchTerm
}) => {
  // 如果没有搜索结果
  if (!isLoading && !error && data?.hits?.length === 0 && debouncedSearchTerm && debouncedSearchTerm.length >= 2) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto p-6 text-center text-gray-500 dark:text-gray-400"
      >
        <p>没有找到相关结果</p>
      </motion.div>
    );
  }

  // 如果有搜索错误
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto p-4 bg-red-50 dark:bg-red-900/10 rounded-lg text-red-500 text-center"
      >
        <p>搜索出错</p>
      </motion.div>
    );
  }

  // 如果有搜索结果
  if (!isLoading && !error && data?.hits?.length > 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto"
      >
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          找到 {data.found} 个结果 (用时 {data.search_time_ms}ms)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {data.hits.map((hit, index) => (
            <ResultCard key={hit.document.id || index} hit={hit} index={index} />
          ))}
        </div>
      </motion.div>
    );
  }

  return null;
};

export default SearchResults;