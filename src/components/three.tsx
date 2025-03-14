import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Card from "@/components/card/index";
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import SeoParser from "./SeoParser";
import CoverParser from "./AIcomponents/CoverParser";

const containerVariants = {
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  closed: {
    opacity: 0,
    y: 30,
    scale: 0.98,
    transition: {
      duration: 0.25
    }
  }
};

const backdropVariants = {
  open: { 
    opacity: 1,
    transition: { duration: 0.25 }
  },
  closed: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

interface DataModel {
  //Seo建议
  SeoOpen:boolean
  //网页预览
  WebOpen:boolean
  //纯净模式
  promotionalOpen:boolean
  //宣传文案
  pristine:boolean
  //封面图
  coverOpen:boolean
  //智能摘要
  summaryOpen:boolean
  //智能标签
  tagOpen:boolean
  //网页生成
  HtmlOpen:boolean
}

export function FullscreenPanel({ isOpen, onClose, url, data }: {
  isOpen: boolean;
  onClose: () => void;
  url: string,
  data: DataModel
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          variants={backdropVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <motion.div
            className="absolute inset-4 sm:inset-8 md:inset-12 bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-md"
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ScrollArea className="h-full">
              <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-700/30">
                <div className="flex items-center gap-3">
                  <motion.h1 
                    className="text-lg font-medium truncate bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {url}
                  </motion.h1>
                </div>
                <motion.button
                  className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* 网页预览模块 */}
                  {/* {data.WebOpen && (
                    <div className="xl:col-span-1 space-y-8">
                      <motion.div 
                        className="aspect-[16/9] bg-gray-50 dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-lg border border-gray-200/30 dark:border-gray-700/30"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                      >
                        <iframe 
                          referrerPolicy="no-referrer"  
                          className="w-full h-full" 
                          src={url}
                          title="网页预览"
                        />
                      </motion.div>
                    </div>
                  )} */}

                  {/* 卡片预览模块 */}
                  {data.pristine  && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="transform-gpu xl:col-span-1"
                    >
                      1
                      {/* <Card url={url}/> */}
                    </motion.div>
                  )}

                  {/* SEO建议模块 */}
                  {data.SeoOpen && (
                    <motion.div 
                      className="cardboxshow bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-lg xl:col-span-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >

                      <SeoParser url={url} />
                    </motion.div>
                  )}
                  {/* SEO建议模块 */}
                  {data.coverOpen && (
                    <motion.div 
                      className="cardboxshow bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-lg xl:col-span-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >

                      <CoverParser url={url} />
                    </motion.div>
                  )}

                  {/* 智能摘要模块 */}
                  {data.summaryOpen && (
                    <motion.div 
                      className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-lg xl:col-span-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      智能摘要内容
                    </motion.div>
                  )}  

                  {/* 智能标签模块 */}
                  {data.tagOpen && (
                    <motion.div 
                      className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-lg xl:col-span-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      智能标签内容
                    </motion.div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
