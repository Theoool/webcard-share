'use client';
import { PencilOff } from 'lucide-react';
import React from 'react';
import { Input } from '@/components/ui/input';
import Keywords from '@/components/card/keywords'
import Footer from '@/components/card/footer'
import { motion } from 'framer-motion';
import { addCard } from '@/lib/card/router';
import {useSession} from 'next-auth/react'

interface HeaderProps {
  title: string;
  url: string;
  logo: string;
}
function Header({ title, url, logo }: HeaderProps) {
  return (
    <div className="flex w-full gap-10 justify-between"
    >
      <div className="flex w-full gap-10 items-center">
        {logo && <img className="h-8" src={logo} alt={`${title} logo`} />}
        <a href={url} className="text-sm line-clamp-1 text-light">
          {title}
        </a>
      </div>
     
    </div>
  );
}
const Card = ({ header, content, footer }: CardProps) => {
  const [isdelete, setisdelete] = React.useState(false)
  const [keytext, setkeytext] = React.useState('')
  const session= useSession()
  console.log(session);
  
  const [from, setfrom] = React.useState({
    ...content, text: content.text.split('丨').filter((e, index) => index > 0)
  })
  const Changekey = (aAd: boolean, str?: string, index?: number) => {
    if (aAd) {
      console.log("shanc", index);

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
    <div className="w-full min-h-[15rem] flex flex-col p-4 mt-2 cardboxshow @container">
      <Header {...header} />
      <div
       onClick={ async ()=>{
     await addCard(
          {
            UserFavoriteId:'cm7bfshx5000244c0icx9wwoi',
            image:content.imageUrl||'',
            tags:from.text,
            title:header.title,
            url:'https://lucide.dev/icons/?search=add',
            content:content.text.split('关键词')[0]
          },
          session.data
         )
       }}
      className="flex flex-col md:items-center leading-6  gap-2">

        {<img className="md:h-[10rem] w-full md:w-auto  ease-linear 
    object-cover" src={content.imageUrl} alt="Content" />}

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
          <Keywords text={from.text} isdelete={isdelete} click={Changekey}></Keywords>
          <PencilOff className=' icon cursor-pointer' onClick={() => {
            setisdelete(!isdelete)
          }}></PencilOff>
        </div>
      </div>
      <Footer {...footer} />
    </div>
  );
};
export default Card;
