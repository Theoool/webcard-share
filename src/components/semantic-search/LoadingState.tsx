'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingState: React.FC = () => {
  return (
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
  );
};

export default LoadingState;