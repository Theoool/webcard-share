"use client";

import { useState, useEffect, useRef } from "react";
import { Skeleton } from "../ui/skeleton";

import { toast } from "@/hooks/use-toast";
import useSettingsModleStore from "@/Store/counter-store";

type SeoParserProps = {
  url: string;
};
const SeoParser = ({ url }: SeoParserProps) => {
  const [data, setData] = useState({
    url: '',
    alt: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // 移除不必要的 isFirstRender 状态
  const prevUrlRef = useRef<string>(''); // 添加 ref 来跟踪上一次的 url
  const { model, apikey, BaseURl} = useSettingsModleStore();
 
  useEffect(() => {
    console.log("prevUrlRef.current:", prevUrlRef.current);
    console.log("prevUrlRef.url:", url);
    
    if (!url || url === prevUrlRef.current) return;
    prevUrlRef.current = url;

    const controller = new AbortController();
    const fetchStream = async () => {

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/search/cards/Cover?url=${encodeURIComponent(url)}`,{
          headers:{
            'x-ai-model':model,
            'x-api-key':apikey,
            'x-ai-baseurl':BaseURl,
            }
        });
        if (!response.ok) {
          const res = await response.json();
          toast({
            title: '生成失败',
            description:res.message
          })
          throw new Error(`生成失败: ${response.statusText}`);
        }  
        const res = await response.json();
       toast({
        title: '生成成功',
       })
        if (!res.data) {
          throw new Error('返回数据格式错误');
        }
  
        // 确保解构赋值正确
        const { url: link, alt } = res.data;
        console.log('Extracted data:', { link, alt }); // 添加数据检查日志
  
        // 确保数据存在再更新状态
        if (link) {
          setData({
            url: link,
            alt: alt || ''
          });
          console.log('State updated:', { url: link, alt }); // 添加状态更新日志
        } else {
          throw new Error('图片链接不存在');
        }
  
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
        <h2 className="text-lg font-semibold mb-4">{'宣传封面'}</h2>
        {data ? (
          <div>
            {data.url && (

              <div className="relative w-full h-full">
                <img
                  alt={data.alt}
                  src={data.url}
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            {/* <Image alt={data.alt} src={data.url}></Image> */}
          </div>
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

export default SeoParser;
