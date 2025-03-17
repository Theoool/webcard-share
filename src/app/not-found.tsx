'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black p-4">
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          404
        </motion.h1>
        
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
          <Link 
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full
              hover:bg-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl
              dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <Home size={20} />
            <span>返回主页</span>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700
              rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>返回上页</span>
          </button>
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
