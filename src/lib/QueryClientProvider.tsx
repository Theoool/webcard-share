// lib/QueryClientProvider.tsx
'use client';

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import {queryClient} from '@/lib/queryClient'

export function QueryClientProvider({ children }: { children: ReactNode }) {
  // const [queryClient] = useState(() => new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 5 * 60 * 1000, // 设置默认缓存时间（可选）
  //     },
  //   },
  // }));

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
