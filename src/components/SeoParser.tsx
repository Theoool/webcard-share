"use client";

import { useState, startTransition, useEffect, useCallback } from "react";
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

 
  const handleParse = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setData("");
    
    try {
      const stream = await parseSeoAction(url);
      // ... rest of handleParse implementation ...
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect( ()=>{
    handleParse()
  },[handleParse])

  return (
    <div className="space-y-4  border rounded-lg bg-card">
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
