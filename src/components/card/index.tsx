'use client';
import { PencilOff } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import Keywords from '@/components/card/keywords'
import Footer from '@/components/card/footer'
import { motion } from 'framer-motion';
import { useClickOutside } from "@/hooks/outClick";
import { Favicon } from 'favicon-stealer';

interface HeaderProps {
  title: string;
  url: string;
  logo: string;
  setTitle:(title:string)=>void
}
function Header({ title, url, logo,setTitle }: HeaderProps) {
  const [show,setshow]=useState(false)
  
  return (
    <div className="flex w-full gap-10 justify-between items-center">
    <div className="flex w-full gap-10 items-center">
      
      {logo ? (
        <img className="h-8 w-8 object-contain" src={logo} alt={`${title} logo`} />
      ) : (
        <Favicon url={logo} />
      )}

      {show ? (
        <div  className="w-full">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e)=>{
              if (e.key === 'Enter') {
                setshow(false)
                
              }
            }}
            className="text-sm w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm px-1"
          />
        </div>
      ) : (
        <span
          onClick={()=>setshow(true)}
          className="text-sm line-clamp-1 text-light cursor-pointer
            hover:bg-black/5 hover:px-1 transition-all rounded-sm"
          title="Click to edit"
        >
          {title}
        </span>
      )}
    </div>
  </div>
);
}
const Card = ({ header, content }: CardProps) => {
  const [isdelete, setisdelete] = React.useState(false)
  const [keytext, setkeytext] = React.useState('')
  const [from, setfrom] = React.useState({
    ...header,
    ...content, 
    tags: content.text.split('关键词')[1].split('丨').filter((e, index) => index > 0),
    text:content.text.split('关键词')[0].split("摘要内容")[1]
  })
  const Changekey = (aAd: boolean, str?: string, index?: number) => {
    if (aAd) {
      setfrom({ ...from, tags: from.tags.filter((e, i) => i !== index) })
    } else {
      const keys = from.tags
      keys.unshift(str!)
      if (str!.length < 8) {
        setfrom({ ...from, tags: keys })
      } else {
        console.log("不能超过八个字");
      }
    }
  }
  const ChageTitle=(value)=>{
    setfrom({ ...from, title: value })
  }
  return (
    <div className="w-full min-h-[15rem] flex flex-col p-4 mt-2 cardboxshow @container">
      <Header title={from.title} 
      url={from.url}
      logo={from.logo}
      setTitle={ChageTitle} />
      <div
       
      className="flex flex-col md:items-center leading-6  gap-2">

        {<img className="md:h-[10rem] w-full md:w-auto  ease-linear 
    object-cover" src={content.image} alt="Content" />}

        <p className="text-[1rem] leading-2 flex-w ">{content.text.split('关键词')[0]}</p>
        <hr></hr>

        {isdelete && (
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
    className=' text-center'
    transition={{ type: "spring", stiffness: 250 }}
  >
    <Input 
      value={keytext}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          Changekey(false, keytext)
        }
      }}
      onChange={(event) => setkeytext(event.target.value)}
      // 添加输入框的微交互
      className="focus-visible:ring-2 w-[18rem]
      text-center
      ring-blue-500 transition-all"
    />
  </motion.div>
)}
        <div className='flex gap-2  items-start'>
          <Keywords text={from.tags} isdelete={isdelete} click={Changekey}></Keywords>
          <PencilOff className=' icon cursor-pointer' onClick={() => {
            setisdelete(!isdelete)
          }}></PencilOff>
        </div>
      </div>
      <Footer content={from}></Footer>
    </div>
  );
};
export default Card;
