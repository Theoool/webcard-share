// components/AnimatedText.tsx
'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-b">
      <div className="h-full flex flex-col items-center justify-center px-4 py-16 space-y-6">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center"
        >
          打破信息茧房
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl text-muted-foreground text-center max-w-2xl"
        >
          探索无限可能，连接知识世界
        </motion.p>
      </div>
    </div>
  );
}

function TextBlock({ phrase, progress }) {
  const chars = phrase.split('');
  const baseDelay = 0.1;

  return (
    <div className="flex justify-center items-center space-x-1">
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: baseDelay * i,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
          className={`inline-block ${char === '茧' ? 'text-primary' : ''}`}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
