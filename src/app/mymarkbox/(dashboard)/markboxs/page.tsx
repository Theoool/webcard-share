'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
// import second from 'r'
import { useState } from 'react';

import MarkBooksBox from '@/components/MarkBooksBox';

export default function MyFavorites() {
  const { data: session } = useSession();
  const { data, error, isLoading } = useQuery<any>({
    queryKey: ['/UserFavorites/getuserall'],
    staleTime: 5 * 60 * 1000,
    enabled: !!session,
  });
  const [expandedId, setExpandedId] = useState(null);
  if (isLoading) return <div className="w-full h-auto p-10">加载中...</div>;
  if (error) return <div className="w-full h-auto p-10">错误: {JSON.stringify(error)}</div>;

  return (
    <div className="w-full h-auto md:p-10 p-2 relative">
   
      <div    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {data&&data.map((meta) => (
        //  <ViewTransitions >
            <motion.div
            style={{'viewTransitionName':`${meta.id}`}}
            key={meta.id}
            onClick={() => setExpandedId(expandedId === meta.id ? null : meta.id)}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          > 
           <MarkBooksBox 
           isopen={meta.isPublic}
           card={meta.card} title={meta.title} id={meta.id} user={meta.primaryUser}></MarkBooksBox>
          </motion.div>
        //  </ViewTransitions>
        ))}
      </div>

    

    </div>
  );
}
