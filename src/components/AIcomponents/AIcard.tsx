"use client";

import { useState, startTransition, useEffect, useRef } from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import Card from "../card";

import { getCardProps, getNomCardProps } from "@/lib/card/router";
import useSettingsModleStore from "@/Store/counter-store";
import { toast } from "@/hooks/use-toast";

type SeoParserProps = {
  url: string;

  AI?:boolean
};

const Aicard = ({ url,AI=true}: SeoParserProps) => {
  const [data, setData] = useState<{ finalSummary: any;
    meta: {
        title: string;
        description: string;
        keywords: string;
        image: string;
        logo: any;
    }}|null>(
    );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { model, apikey, BaseURl} = useSettingsModleStore();
  const prevUrlRef = useRef<string>(''); 
  useEffect(() => {
    console.log("prevUrlRef.current:", prevUrlRef.current);
    if (!url) return;
    prevUrlRef.current = url;
    console.log("开始请求数据，URL:", url);
    
    const controller = new AbortController();
    const fetchStream = async () => {
      setIsLoading(true);
      setError(null);
      setData(null); // 重置数据，确保UI显示加载状态
      try {
 
        const response = AI?await getCardProps(url,{model, apikey, BaseURl})||await getCardProps(url,{model, apikey, BaseURl,}) :await getNomCardProps(url,{model, apikey, BaseURl});
        if (!response.success) {
          throw new Error(`请求失败: ${response.error}`);
        }
        if (!response.data) {
          throw new Error('返回数据格式错误');
        }
        setData(response.data);
        toast({
          title: "创建成功了呀",
          description: "There was a problem with your request.",
          duration:2000
         })
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
  }, [url, model, apikey, BaseURl]);



  return (
    <div className="h-full overflow-hidden">
      <div className="h-full space-y-4 p-4">
        <h2 className="text-lg font-semibold mb-4">信息卡片</h2>
        {data ? ( 
           <Card
           AI={AI}
            cardData={data}
           />
        ) :isLoading?<div className="flex gap-4 flex-col">
        <Skeleton className="w-full h-4 rounded-lg" />
        <Skeleton className="w-full h-32 rounded-lg" />
        </div>:error ? (
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
