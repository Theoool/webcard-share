'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { BookMark } from '@/components/BookMark';

interface ResultCardProps {
  hit: any;
  index: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ hit, index }) => {
  // 构建BookMark组件所需的meta数据
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
        <div className="absolute -top-2 -right-2 z-10">
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
};

export default ResultCard;