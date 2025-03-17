'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from 'react';
import { BookMark } from '@/components/BookMark';
import Link from 'next/link';


export default function MyFavorites() {
  const { data: session } = useSession();
  const { data, error, isLoading } = useQuery<any>({
    queryKey: ['/UserFavorites/FirstFavorite'],
    staleTime: 5 * 60 * 1000,
    enabled: !!session,
  });
  const [cards, setCards] = useState<any>([]);
  

  useEffect(() => {
    if (data?.data?.card) {
      setCards(data.data.card);
    }else{
      return 
    }
  }, [data]);
 

  const handleDelete = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };
  if (!session) {
    return     <Link href={'/mymarkbox'}>登录</Link>
  }
 
  if (isLoading) return <div className="w-full h-auto p-10">加载中... 
    
  </div>;
  if (error) return <div className="w-full h-auto p-10">错误:你的收藏夹为空 </div>;
  return (
    <div className="w-full h-auto md:p-10 p-2 relative">

    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
        layout
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        {cards.map((meta) => (
            <BookMark key={meta.id} meta={meta} onDelete={handleDelete} />
          
        ))}
      </motion.div>
    </AnimatePresence>
  </div>
  );
}
