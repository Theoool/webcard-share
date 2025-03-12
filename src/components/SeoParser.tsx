"use client";

import { useState, startTransition, useEffect } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { parseSeoAction } from "@/lib/seo-actions";

type SeoParserProps = {
  url: string;
};

const SeoParser = ({ url }: SeoParserProps) => {
  const [data, setData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleParse = async () => {
    setIsLoading(true);
    setError(null);
    setData("");
    
    try {
      const stream = await parseSeoAction(url);
      
      if (!stream) {
        throw new Error("Failed to initiate parsing");
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          startTransition(() => {
            setData(prev => prev + decoder.decode(value));
          });
        }
        reader.releaseLock();
      };

      await processStream();
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect( ()=>{
    handleParse()
  },[url])

  return (
    <div className="h-full overflow-hidden">
      <div className="h-full space-y-4 p-4">
        <h2 className="text-lg font-semibold mb-4">SEO 分析报告</h2>
        {data ? (
          <div className="bg-background/50 backdrop-blur-sm rounded-lg border p-4 shadow-sm transition-all duration-200 hover:shadow-md">
            <pre className="text-sm font-mono whitespace-pre-wrap break-words leading-relaxed">
              {data}
            </pre>
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
        ) : null}
    </div>
    </div>
  );
};

export default SeoParser;
