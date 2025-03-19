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


// 1. 配置主字体
const inter =MA({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: "400"
})




export const metadata: Metadata = {
  title: "webcard-share",
  description: "Generated by create next app",
  alternates: {
    canonical: 'https://yourdomain.com',
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
       
          <body className="bg-[#f8f9fa] font-wenkai  dark:bg-black flex flex-col">
            <Header></Header> 
            <main className="flex-2    w-full pt-14  min-h-screen">
              <Toaster></Toaster>     
              <QueryClientProvider>
                {children}
              </QueryClientProvider>
              {modal}
              <div id="modal-root"></div>
            </main>
          </body>
        </html>
       
     
      </ViewTransitions>
    </SessionWrapper>
    </CardProvider>
  );
}
