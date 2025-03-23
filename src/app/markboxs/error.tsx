'use client'

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function Error() {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center max-w-md w-full p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-gray-800/10 border border-gray-100 dark:border-gray-800"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            delay: 0.2 
          }}
          className="text-red-500 mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-full"
        >
          <AlertCircle size={32} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="space-y-3"
        >
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">加载失败</h2>
          <h3 className="text-md   font-medium text-gray-900 dark:text-gray-100">检查书签id是否正确</h3>
          <p className="text-gray-500 dark:text-gray-400">无法加载书签内容，请稍后重试或返回上一页</p>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => router.back()}
          className="mt-6 px-5 py-2.5 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          <ArrowLeft size={16} />
          <span>返回上一页</span>
        </motion.button>
      </motion.div>
    </div>
  )
}
