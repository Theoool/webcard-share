"use client";

import { useState, useEffect, useRef } from "react";
import { Skeleton } from "../ui/skeleton";
import Card from "../card";
import { getCardProps, getNomCardProps } from "@/lib/card/router";
import useSettingsModleStore from "@/Store/counter-store";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

type SeoParserProps = {
  url: string;
  AI?: boolean;
};

// 防抖函数
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Aicard = ({ url, AI = true }: SeoParserProps) => {
  const { model, apikey, BaseURl } = useSettingsModleStore();
  const debouncedUrl = useDebounce(url, 500); // 500ms 防抖

  // 使用 React Query 管理请求状态和缓存
  const { data, isLoading, error } = useQuery(
    ["cardData", debouncedUrl, AI, model, apikey, BaseURl],
    async () => {
      if (!debouncedUrl) return null;
      const response = AI
        ? await getCardProps(debouncedUrl, { model, apikey, BaseURl })
        : await getNomCardProps(debouncedUrl, { model, apikey, BaseURl });
      if (!response.success) {
        throw new Error(`请求失败: ${response.error}`);
      }
      if (!response.data) {
        throw new Error("返回数据格式错误");
      }

      toast({
        title: "创建成功了呀",
        description: "卡片信息已生成",
        duration: 2000,
      });

      return response.data;
    },
    {
      enabled: !!debouncedUrl,
      staleTime: 5 * 60 * 1000, // 5分钟内不重新请求
      cacheTime: 30 * 60 * 1000, // 缓存30分钟
      retry: 2, // 失败重试2次
    }
  );

  return (
    <div className="h-full overflow-hidden">
      <div className="h-full space-y-4 p-4">
        <h2 className="text-lg font-semibold mb-4">信息卡片</h2>
        {data ? (
          <Card AI={AI} cardData={data} />
        ) : isLoading ? (
          <div className="flex gap-4 flex-col">
            <Skeleton className="w-full h-4 rounded-lg" />
            <Skeleton className="w-full h-32 rounded-lg" />
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
            {error instanceof Error ? error.message : "生成失败"}
          </div>
        ) : (
          <div className="text-gray-500">请输入 URL 以开始分析</div>
        )}
      </div>
    </div>
  );
};

export default Aicard;
