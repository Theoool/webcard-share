'use client'
import CoverParser from '@/components/AIcomponents/CoverParser'
import { Input } from '@/components/ui/input'
import { isURL } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

export default function Page() {
  const [url, setUrl] = useState('')
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // 模拟进度条效果
  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer)
            return 100
          }
          return prevProgress + 5
        })
      }, 200)
      return () => clearInterval(timer)
    } else {
      setProgress(0)
    }
  }, [isLoading])

  const handleSubmit = () => {
    if (isURL(url)) {
      setIsLoading(true)
      setTimeout(() => {
        setShow(true)
        setIsLoading(false)
      }, 2000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-light tracking-tight text-center">
          <span className="block">智能封面生成</span>
          <span className="block mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-normal">为您的网页创建精美封面</span>
        </h1>
        
        <div className="relative max-w-2xl mx-auto">
          <Input 
            onKeyDown={async e => {
              if ((e.code === 'Enter' || e.key === 'Enter') && isURL(url)) {
                handleSubmit()
              }
            }}
            onChange={(event) => {
              setUrl(event.target.value)
            }}
            type="text"
            value={url}
            placeholder="输入你的网址，绘制宣传封面"
            className="h-14 text-base w-full rounded-xl border-indigo-100 dark:border-indigo-900 shadow-md transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-950/30 dark:text-gray-100"
          />
          
          <Button 
            onClick={handleSubmit}
            disabled={!isURL(url) || isLoading}
            className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
          >
            {isLoading ? '生成中...' : '生成封面'}
          </Button>
        </div>
        
        {isLoading && (
          <div className="relative w-full max-w-2xl mx-auto mt-4">
            <Progress value={progress} className="h-1 transition-all duration-500" />
          </div>
        )}
      </div>
      
      <div className="mt-8">
        {show && <CoverParser url={url} />}
      </div>
    </div>
  )
}
