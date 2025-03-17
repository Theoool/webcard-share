'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return createPortal(
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className=" max-h-[90vh] bg-gray-100 dark:bg-black
    dark:shadow-white dark:shadow-sm   p-2  rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-left">书签详情</DialogTitle>
          <DialogDescription className="text-left">
            查看和管理您的书签内容
          </DialogDescription>
        </DialogHeader>
       <ScrollArea className=' '>
          {children}
       </ScrollArea>
      </DialogContent>
    </Dialog>,
    document.getElementById('modal-root')!
  );
}
