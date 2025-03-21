'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f8f9fa] dark:bg-[#0a0a0a] p-4 relative overflow-hidden">
      {/* 对角线分割线 */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0 100 L100 0"
            stroke="#e9ecef"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.path
            d="M20 100 L100 20"
            stroke="#e9ecef"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </svg>
      </div>
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-[180px] md:text-[240px] font-bold text-[#212529] dark:text-[#f8f9fa] tracking-tighter">
            404
          </div>
          {/* 动态流体线 */}
          <motion.svg
            viewBox="0 0 300 60"
            className="absolute inset-0 w-full h-full"
          >
            <path
              d="M10 50 C20 10, 40 10, 50 50 S 80 10, 100 50"
              stroke="#4dabf7"
              fill="none"
              strokeWidth="2"
              strokeLinecap="square"
            >
              <animate
                attributeName="d"
                dur="5s"
                repeatCount="indefinite"
                values="
                  M10 50 C20 10, 40 10, 50 50 S 80 10, 100 50;
                  M10 50 C30 20, 50 20, 70 50 S 90 20, 100 50;
                  M10 50 C20 10, 40 10, 50 50 S 80 10, 100 50"
              />
            </path>
          </motion.svg>
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            页面未找到
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            抱歉，您访问的页面可能已被移动或不存在。让我们帮您回到正确的地方。
          </p>
        </motion.div>

        <motion.div 
          className="flex gap-4 justify-center items-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/"
              className="group relative flex items-center gap-2 px-8 py-4 bg-white dark:bg-[#1a1a1a] 
                border-2 border-[#212529] dark:border-[#f8f9fa] hover:border-[#4dabf7] transition-all
                shadow-[4px_4px_0_#212529] dark:shadow-[4px_4px_0_#f8f9fa] hover:shadow-none"
              style={{ clipPath: 'polygon(calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%, 0 0)' }}
            >
              <Home size={20} className="text-[#212529] dark:text-[#f8f9fa]" />
              <span className="font-medium">返回主页</span>
              <div className="absolute -right-[2px] -top-[2px] w-3 h-3 bg-[#4dabf7]" />
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group relative flex items-center gap-2 px-8 py-4 bg-transparent 
                border-2 border-[#212529] dark:border-[#f8f9fa] hover:border-[#4dabf7] transition-all
                shadow-[4px_4px_0_#212529] dark:shadow-[4px_4px_0_#f8f9fa] hover:shadow-none"
              style={{ clipPath: 'polygon(calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%, 0 0)' }}
            >
              <ArrowLeft size={20} className="text-[#212529] dark:text-[#f8f9fa]" />
              <span className="font-medium">返回上页</span>
              <div className="absolute -right-[2px] -top-[2px] w-3 h-3 bg-[#4dabf7]" />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

     
      <motion.div 
        className="absolute inset-0 -z-10 overflow-hidden opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute w-full h-full bg-[radial-gradient(circle_500px_at_50%_50%,#3b82f6,transparent)]" />
      </motion.div>
    </div>
  )
}
