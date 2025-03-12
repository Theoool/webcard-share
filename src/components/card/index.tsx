'use client';
import { PencilOff } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import Keywords from '@/components/card/keywords'
import Footer from '@/components/card/footer'
import { motion } from 'framer-motion';
import { addCard } from '@/lib/card/router';
import {useSession} from 'next-auth/react'
import  {  Session } from "next-auth"
import { Favicon } from "favicon-stealer";
import { useClickOutside } from '@/hooks/outClick';

interface HeaderProps {
  title: string;
  url: string;
  logo?: string;
}

function Header({ title, url, logo }: HeaderProps) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const wrapperRef = useClickOutside<HTMLDivElement>(() => setShowInput(false));

  const handleTextClick = () => setShowInput(true);
  
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (['Enter', 'Escape'].includes(e.key)) {
      setShowInput(false);
    }
  };

  return (
    <div className="flex w-full gap-10 justify-between items-center">
      <div className="flex w-full gap-10 items-center">
        
        {logo ? (
          <img className="h-8 w-8 object-contain" src={logo} alt={`${title} logo`} />
        ) : (
          <Favicon url={url} />
        )}

        {showInput ? (
          <div ref={wrapperRef} className="w-full">
            <input
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className="text-sm w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm px-1"
            />
          </div>
        ) : (
          <span
            onClick={handleTextClick}
            className="text-sm line-clamp-1 text-light cursor-pointer
              hover:bg-black/5 hover:px-1 transition-all rounded-sm"
            title="Click to edit"
          >
            {inputValue}
          </span>
        )}
      </div>
    </div>
  );
}
const Card = ({ header, content, footer,dis=false }: CardProps) => {
  const [isdelete, setisdelete] = React.useState(false)
  const [keytext, setkeytext] = React.useState('sad1')
  const [from, setfrom] = React.useState({
     ...content,
     text: content.tags?content.
     tags:content.text.split('丨').filter((e, index) => index > 0)
  })
  const Changekey = (aAd: boolean, str?: string, index?: number) => {
    if (aAd) {
      setfrom({ ...from, text: from.text.filter((a, i) => i !== index) })
    } else {
      const keys = from.text
      keys.unshift(str!)
      if (str!.length < 8) {
        setfrom({ ...from, text: keys })
      } else {
        console.log("不能超过八个字");
      }
    }
  }
  return (
    <div className="w-full min-h-[15rem]   flex flex-col p-4 mt-2 cardboxshow 
    dark:shadow-xl dark:shadow-white
    @container">
      <Header {...header} />
      <div
      className="flex flex-col md:items-center leading-6  gap-2">
       {content.imageUrl&&<img className="md:h-[10rem] w-full md:w-auto  ease-linear  
    object-cover" referrerPolicy="no-referrer"  loading="lazy" src={content.imageUrl}  alt="Content" /> } 

        <p className="text-[1rem] leading-2 flex-w ">{content.text.split('关键词')[0]}</p>
        <hr></hr>
       
       
  <motion.div
    initial={{ y: 20, opacity: 0, scale: 0.95 }}
    animate={{ 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20,
        duration: 0.15
      }
    }}
    exit={{ 
      y: -20, 
      opacity: 0,
      scale: 0.95,
      transition: { 
        duration: 0.12,
        ease: "easeIn" 
      }
    }}
    className=' text-center relative '
    transition={{ type: "spring", stiffness: 250 }}
  >
   {isdelete && <Input 
     type="text"
      value={keytext}
      onKeyDown={(e) => {
        console.log(e);
        if (e.key === 'Enter') {
          Changekey(false, keytext)
        }
      }}
      onChange={(event) => setkeytext(event.target.value)}
      // 添加输入框的微交互
      className="focus-visible:ring-2 w-[18rem]
      text-center  z-30
      ring-blue-500 transition-all"
    />
}
  </motion.div>
    

        <div className='flex gap-2  items-start'>
          <Keywords text={from.text} isdelete={isdelete} click={Changekey}></Keywords>
          <PencilOff className=' text-xl cursor-pointer' onClick={() => {
            setisdelete(!isdelete)
          }}></PencilOff>
        </div>
      </div>
      <Footer content={
        {
          image:content.imageUrl||'',
          tags:from.text,
          title:header.title,
          url:header.url,
          content:content.text.split('#关键词')[0].split('摘要内容')[1]
        }
      } />
    </div>
  )

};
export default Card;
