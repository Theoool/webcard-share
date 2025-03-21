'use client';

import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return createPortal(
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-white dark:bg-gray-950
    border border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-gray-900/20 p-0 rounded-xl overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-medium text-gray-900 dark:text-gray-50">书签详情</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            查看和管理您的书签内容
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>,
    document.getElementById('modal-root')!
  );
}
