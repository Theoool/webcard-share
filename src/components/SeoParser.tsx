"use client";

import { useState, startTransition } from "react";
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

  return (
    <div className="space-y-4 p-6 border rounded-lg bg-card">
      <div className="flex items-center gap-4">
        <Button 
          onClick={handleParse}
          disabled={isLoading}
          variant="default"
          size="sm"
        >
          {isLoading ? "解析中..." : "解析 SEO"}
        </Button>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>

      {data ? (
        <div className="p-4 bg-background rounded-md border">
          <pre className="text-sm font-mono whitespace-pre-wrap break-words">
            {data}
          </pre>
        </div>
      ) : isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : null}
    </div>
  );
};

export default SeoParser;
