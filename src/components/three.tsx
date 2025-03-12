import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Card from "@/components/card/index";
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"

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

export function FullscreenPanel({ isOpen, onClose, data }: any) {
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
                  {data?.meta?.logo && (
                    <motion.img 
                      src={data.meta.logo} 
                      alt="logo" 
                      className="w-7 h-7 rounded-lg shadow-sm" 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  )}
                  <motion.h1 
                    className="text-lg font-medium truncate bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {data?.meta?.title || data?.url}
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
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-1 space-y-8">
                    <motion.div 
                      className="aspect-[16/9] bg-gray-50 dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-lg border border-gray-200/30 dark:border-gray-700/30"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      {data?.url ? (
                        <iframe 
                          referrerPolicy="no-referrer"  
                          className="w-full h-full" 
                          src={data.url}
                          title="网页预览"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Skeleton className="w-full h-full" />
                        </div>
                      )}
                    </motion.div>
                    
                    {data?.meta && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="transform-gpu"
                      >
                        <Card
                          dis={true}
                          header={{
                            title: data.meta.title,
                            url: data.url,
                            logo: data.meta.logo
                          }}
                          content={{
                            imageUrl: data.meta.image,
                            text: data.finalSummary
                          }}
                          footer={{
                            source: "webshare.com",
                            time: Date.now().toString()
                          }}
                        />
                      </motion.div>
                    )}
                  </div>
                  <motion.div 
                    className="cardboxshow bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* <SeoParser url={data?.url} /> */}
                  </motion.div>
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
