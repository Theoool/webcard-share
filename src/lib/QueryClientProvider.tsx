// lib/QueryClientProvider.tsx
'use client';

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import {queryClient} from '@/lib/queryClient'

export function QueryClientProvider({ children }: { children: ReactNode }) {

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
