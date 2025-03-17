"use client";

import { useState, startTransition, useEffect, useRef } from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import Card from "../card";
import { title } from "process";
import { getCardProps } from "@/lib/card/router";

type SeoParserProps = {
  url: string;
};

const Aicard = ({ url }: SeoParserProps) => {
  const [data, setData] = useState<{ finalSummary: any;
    meta: {
        title: string;
        description: string;
        keywords: string;
        image: string;
        logo: any;
    }}|null>(null);
  console.log("Aicrd",url);
    
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // 移除不必要的 isFirstRender 状态
  const prevUrlRef = useRef<string>(''); // 添加 ref 来跟踪上一次的 url
  useEffect(() => {
    console.log("prevUrlRef.current:", prevUrlRef.current);
    console.log("url:", url);
    
    // 确保URL存在且组件已挂载
    if (!url) return;
    
    // 记录当前处理的URL，用于避免重复请求
    prevUrlRef.current = url;
    console.log("开始请求数据，URL:", url);
    
    const controller = new AbortController();
    const fetchStream = async () => {
      setIsLoading(true);
      setError(null);
      setData(null); // 重置数据，确保UI显示加载状态
      
      try {
        console.log("调用getCardProps，URL:", url);
        const response = await getCardProps(url);
        console.log('API Response:', response); // 添加详细日志
        
        if (!response.success) {
          throw new Error(`请求失败: ${response.error}`);
        }
        
        if (!response.data) {
          throw new Error('返回数据格式错误');
        }
  
        setData(response.data);
        console.log('State updated:', response.data); // 添加状态更新日志
  
      } catch (err) {
        console.error('Error details:', err); // 添加错误详情日志
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        setError(err instanceof Error ? err.message : "生成失败");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStream();
    
    return () => {
      controller.abort();
    };
  }, [url]);



  return (
    <div className="h-full overflow-hidden">
      <div className="h-full space-y-4 p-4">
        <h2 className="text-lg font-semibold mb-4">信息卡片</h2>
        {data ? (
           <Card 
           header={{
            url:url,
            logo:data.meta.image,
            title:data.meta.title
           }
          }
           content={
           {text:data.finalSummary||data.meta.description,
            image:data.meta.image,
            tags:data.finalSummary.split('关键词推荐')[1],
           }
          }
           footer={
            {
              source:url,
              time:new Date().toLocaleString(),
            }
          }
           ></Card>
        ) : isLoading ? (
          <Skeleton  className="relative w-full h-full">
            <Skeleton  className="relative w-full h-full" />
          </Skeleton>
        ) : error ? (
          <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="text-gray-500">请输入 URL 以开始分析</div>
        )}
      </div>
    </div>
  );
};

export default Aicard;
