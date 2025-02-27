// components/AnimatedText.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const phrases = [
  "一个web，一个插件",
  
  "书签管理 or 网页工具",
  "我们容纳所有的 AI",
  "用快捷的方式收纳丰富的知识",
 `用简单的浏览打破牢固的信息茧房`,
 
];

export default function AnimatedText() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  return (
    <div 
      ref={containerRef}
      className="min-h-[300vh] bg-gradient-to-b
      text-black
      
      dark:from-[#0a0a0a] to-[#0a0a0a]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="max-w-4xl px-4 text-center text-sm" >
          {phrases.map((phrase, i) => (
            <TextBlock 
              key={i}
              phrase={phrase} 
              range={[i * 0.15, (i + 1) * 0.15]}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TextBlock({ phrase, range, progress }) {
  const opacity = useTransform(progress, range, [0, 1]);
  const color = useTransform(
    progress,
    range,
    ['hsl(214,8%,84%)', 'hsl(0, 0%, 0%)']
  );

  const chars = phrase.split('');

  return (
    <motion.div 
      className="text-2xl md:text-3xl xl:text-4xl font-bold mb-5"
      style={{ opacity }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ 
            color,
            display: 'inline-block',
            transform: useTransform(
              progress,
              range,
              [`translateY(${i % 2 ? '40px' : '-40px'})`, 'translateY(0px)']
            )
          }}
          className="will-change-transform"
        >{['信','息','茧','房'].includes(char)? <div className='text-purple-500' > {char === ' ' ? '\u00A0' : char}</div>: <div className='' > {char === ' ' ? '\u00A0' : char}</div>}
        
        </motion.span>
      ))}
    </motion.div>
  );
}
