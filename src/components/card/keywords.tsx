'use client';
import { X } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
function Keywords({text,isdelete,click}:{text:string[],isdelete:boolean,click:any}) {
  return <>
  <div className='flex gap-1  flex-wrap p-2'>
{
 text.map((e,index)=>{
  return  index>0&&
  <AnimatePresence  key={index} >
  <motion.div
    layout 
    initial={{ y: 10, opacity: 0, scale: 0.8 }}
    animate={{ 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 } 
    }}
    exit={{ 
      y: -20, 
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.15 } 
    }}
    whileHover={{
      scale: 1.05,
      transition: { duration: 0.15 }
    }}
    transition={{
      type: "spring",
      stiffness: 150,
      damping: 15,
      mass: 0.5
    }}
    className="flex items-center"
  >
    <Badge
      variant="outline"
      className="text-[1rem] cursor-pointer hover:bg-black/5 transition-colors duration-200"
    >
      {e}
    </Badge>
    {isdelete && (
      <motion.span
        onClick={() => click(true,'',index)}
        className="relative z-10 cursor-pointer ml-2"
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        <X className="hover:text-red-600" size={15} />
      </motion.span>
    )}
  </motion.div>
</AnimatePresence>
 })
  
 }
</div>
  </>
}

export default Keywords
