'use client'
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BookMark } from '@/components/BookMark';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export default function MyFavorites() {
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const { ref, inView } = useInView();

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
