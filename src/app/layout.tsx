import type { Metadata } from "next";
import Header from '@/components/Header'
import SessionWrapper from '@/components/SessionWrapper';
import {  Ma_Shan_Zheng as MA  } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '../lib/QueryClientProvider';
import {CardProvider} from '@/contexts/card-context'
import {ViewTransitions} from 'next-view-transitions'
import "./globals.css";
import { motion } from "framer-motion";
import SplashCursor from "@/components/home/SplashCursor";
import { Github, Twitter, X } from "lucide-react";


// 1. 配置主字体
const inter =MA({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: "400"
})




export const metadata: Metadata = {
  title: "OpenLink",
  description: "OpenLink - 智能书签管理平台：集成AI摘要、SEO优化建议、智能标签和语义搜索，轻松导入收藏夹，打破信息茧房。让知识分享更简单，信息获取更高效。发现并连接有价值的网络资源。",
  icons: [ { url: '/Vector2.svg' },],
  keywords:"AI摘要工具,SEO优化建议,智能书签系统,语义搜索技术,信息茧房解决方案,网络分享平台",
  alternates: {
    canonical: 'https://www.theooo.xyz',
    types: {
      'application/rss+xml': [{ url: 'feed.xml', title: 'RSS 订阅' }],
    },
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  
  return ( 
    <CardProvider >
    <SessionWrapper>
    <ViewTransitions>
       
        <html lang="en" className={`${inter.variable}`}  >
          <body className="bg-[#f5e5e0] font-wenkai  dark:bg-[#0a0a0a] flex flex-col">
            <Header></Header> 
            <main className="flex-2    w-full pt-14  min-h-screen">
              <Toaster></Toaster>     
              <QueryClientProvider>
                {children}
              </QueryClientProvider>
              {modal}
              <div id="modal-root"></div>
            </main>
            <footer className="flex flex-col items-center justify-center py-8 gap-4 w-full">
              <div className="text-lg font-medium text-gray-600 dark:text-gray-300">
                让我们一起交流与成长
              </div>
              <div className="flex items-center justify-center space-x-6">
                <a 
                  href="https://x.com/QIN_KING88" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <div className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <span className="text-sm">WeChat:</span>
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">wx2580456922</code>
                </div>
                <a 
                  href="https://github.com/Theoool/" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
              <div className="flex flex-col items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span>查看源代码</span>
                  <a 
                    href="https://github.com/Theoool/webcard-share"
                    className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    aria-label="Project Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
                <p className="mt-2 text-center max-w-md">
                  期待与您一同完善这个项目！欢迎提出建议，浏览器插件开发中 ✨
                </p>
              </div>
            </footer>
          </body>
        </html>
       
     
      </ViewTransitions>
    </SessionWrapper>
    </CardProvider>
  );
}
