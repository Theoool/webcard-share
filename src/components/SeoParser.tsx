"use client";

import { useState, startTransition, useEffect, useRef } from "react";
import { Skeleton } from "./ui/skeleton";
import ReactMarkdown from "react-markdown";
import { debounce } from "@/lib/utils";
import useSettingsModleStore from "@/Store/counter-store"

type SeoParserProps = {
  url: string;
};

const SeoParser = ({ url }: SeoParserProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<string>(""); // 存储流式数据的状态
  const [isLoading, setIsLoading] = useState<boolean>(false); // 加载状态
  const [error, setError] = useState<string | null>(null); // 错误状态
  const { model, apikey, BaseURl} = useSettingsModleStore();
  const prevUrlRef = useRef<string>('');
  
  useEffect(() => {
    
    if (!url || url === prevUrlRef.current) return;
    prevUrlRef.current = url;
    if (!url) return; // 如果没有 url，则不执行
  
 
    const fetchStream = async () => {
      setIsLoading(true); 
      setData(""); 
      setError(null); 
      try {
        const response = await fetch(
          `http://localhost:3000/search/cards/parse-md?url=${encodeURIComponent(url)}`
        ,{
          headers:{
            'x-ai-model':model,
            'x-api-key':apikey,
            'x-ai-baseurl':BaseURl,
            }
        });

        if (!response.ok) {
          const res=await response.json()
          throw new Error(`解析失败: ${res.message}`);
        }

        if (!response.body) {
          throw new Error("响应体不可用，无法进行流式读取");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log("流读取完成");
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          console.log("收到数据块:", chunk);

          // 使用 startTransition 加数据
          startTransition(() => {
            setData((prev) => prev + chunk);
          });
        }
      } catch (err) {
        console.error("流式读取错误:", err);
        setError((err as Error).message || "未知错误");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchStream();

  }, [url]); 

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 防抖滚动函数
    const smoothScroll = debounce(() => {
      const targetScroll = container.scrollHeight - container.clientHeight;
      const currentScroll = container.scrollTop;
      const distance = targetScroll - currentScroll;
      
      // 动态滚动速度系数（0.1-0.3根据滚动距离调整）
      const speedFactor = Math.min(0.3, Math.max(0.1, distance / 100));
      container.scrollTop += distance * speedFactor;

      // 接近底部时直接跳转
      if (distance < 50) {
        container.scrollTop = targetScroll;
      }
    }, 100);

    // 实时跟踪内容高度变化
    const resizeObserver = new ResizeObserver(smoothScroll);
    resizeObserver.observe(container);

    // 初始触发滚动
    smoothScroll();

    return () => {
      resizeObserver.disconnect();
      smoothScroll.cancel();
    };
  }, [data]);



  return (
    <div className="h-full overflow-hidden">
      <div className="h-full space-y-4 p-4">
        <h2 className="text-lg font-semibold mb-4">SEO 分析报告</h2>
        {data ? (
          <div className="dark:bg-[#141419] dark:text-white/50 backdrop-blur-sm rounded-lg border p-4 shadow-sm transition-all duration-200 hover:shadow-md" ref={containerRef}>
            <ReactMarkdown>{data}</ReactMarkdown>
          </div>
        ) : isLoading ? (
          <div className="space-y-4 animate-pulse">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
            {error}
          </div>
        ) : (
          <Skeleton className="text-gray-500">请输入 URL 以开始分析</Skeleton>
        )}
      </div>
    </div>
  );
};

export default SeoParser;
