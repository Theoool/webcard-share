import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // 假设使用 lucide-react 图标

import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, } from "react";
import Card from "@/components/card/index";
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import SeoParser from "./SeoParser";

// 容器动画
const containerVariants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  closed: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2
    }
  }
};

// 背景动画
const backdropVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 }
};


export function FullscreenPanel({ isOpen, onClose, data }: any) {

  return (
    <div>
      {

        <AnimatePresence>
          {isOpen && (

            <motion.div
              className=" fixed  inset-0  
          
           z-50"
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {

                <motion.div
                  className="absolute top-0 p-2 sm:p-10 bg-white dark:bg-black w-full h-full"
                  variants={containerVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <ScrollArea className="h-full     ">
                    <div className="flex justify-between   px-2 sm:px-12">
                      <div className="flex flex-col gap-2">
                        <h1 className="text-xl">搜索url:{data.url}</h1>

                      </div>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <X
                          className="cursor-pointer"
                          onClick={onClose}
                        />
                      </motion.div>
                    </div>


                    <motion.div
                      className="flex w-full gap-2  h-full p-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.2 }
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.1 }
                      }}
                    >


                      <div className="   gap-2 
     md:flex-row flex-col 
    w-full h-full p-2
     flex 
     ">
                        <div className="flex-1 h-full hidden xl:flex  ">
                          {
                            data.url ? <iframe className="w-full h-[85vh]" src={data.url}>

                            </iframe> : <Skeleton className="w-full h-[85vh]" />
                          }
                        </div>
                        <div className="flex-1  h-[85vh] ">

                          {data.meta ? <Card
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
                          /> : <Skeleton className="w-full h-[85vh]" />}

                        </div>
                        <div className="flex-1    h-full cardboxshow ">
                          
                         {/* <SeoParser  url={data.url}></SeoParser> */}
                        </div>
                      </div>
                      {/* iframe 和 Card 内容 */}
                    </motion.div>
                  </ScrollArea>
                </motion.div>

              }
            </motion.div>

          )}

        </AnimatePresence>


      }

    </div>
  );
}
