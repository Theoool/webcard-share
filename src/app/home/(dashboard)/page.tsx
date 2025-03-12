'use client'
import { useQuery } from "@tanstack/react-query";
import { BookMark } from '@/components/BookMark';
export default function MyFavorites() {
  const { data, error, isLoading } = useQuery<any>({
    queryKey: ['/Card/new'],
    staleTime: 5 * 60 * 1000,
  });
 
  if (isLoading) return <div className="w-full h-auto p-10">加载中...</div>;
  if (error) return <div className="w-full h-auto p-10">错误: {JSON.stringify(error)}</div>;
  return (
    <div className="w-full h-auto md:p-10 p-2 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {data.map((meta) => (
      <BookMark key={meta.id} meta={meta} onDelete={()=>{}} />
        ))}
      </div>

   
    </div>
  );
}
