import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect } from "react";
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

export function FullscreenPanel({ isOpen, onClose, url, data }: {
  isOpen: boolean;
  onClose: () => void;
  url: string,
  data: TipModel[]
}) {
  // 控制页面滚动
  useEffect(() => {
    if (isOpen) {
      // 禁止页面滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 恢复页面滚动
      document.body.style.overflow = '';
    }
    
    // 组件卸载时恢复滚动
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
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
              {
                data.map((e,index)=>{
               return e.Open?<motion.div key={e.text}
                    className=" bg-gray-50 dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-lg border border-gray-200/30 dark:border-gray-700/30"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    {/* {e.text} */}
                   {e.template}
                  </motion.div>:null
                })
              }
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

                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
