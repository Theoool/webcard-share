'use client'
import SeoParser from '@/components/SeoParser'
import { Input } from '@/components/ui/input'
import { isURL } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Globe, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Page() {
  const [url, setUrl] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('input')
  const { toast } = useToast()

  // 重置进度条
  useEffect(() => {
    if (loading) {
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 90))
      }, 500)
      
      return () => clearInterval(progressInterval)
    }
  }, [loading])

  const handleSubmit = async () => {
    if (!url) {
      toast({
        title: "请输入URL",
        description: "需要提供有效的网址才能进行SEO分析",
        variant: "destructive",
      })
      return
    }

    // URL验证
    if (!isURL(url)) {
      toast({
        title: "无效的URL",
        description: "请输入有效的网址",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setProgress(0)
    
    // 模拟API请求延迟
    setTimeout(() => {
      setLoading(false)
      setProgress(100)
      setShow(true)
      setActiveTab('result')
      
      toast({
        title: "分析完成",
        description: "SEO报告已生成",
      })
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">SEO <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">分析工具</span></h1>
        <p className="text-gray-500 dark:text-gray-400">
          输入网址，获取详细的SEO分析报告，优化你的网站排名
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">URL输入</TabsTrigger>
          <TabsTrigger value="result" disabled={!show}>分析结果</TabsTrigger>
        </TabsList>
        
        <TabsContent value="input" className="space-y-6">
          <motion.div
            className="border-2 rounded-lg p-8 space-y-6"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-indigo-50 dark:bg-indigo-900/30">
                <Globe className="w-8 h-8 text-indigo-500" />
              </div>
              <div className="space-y-2 text-center">
                <p className="text-lg font-medium">
                  输入网页URL
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  支持任何公开可访问的网页
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.code === 'Enter' || e.key === 'Enter') && isURL(url)) {
                      handleSubmit()
                    }
                  }}
                  className="h-14 text-base w-full rounded-xl border-indigo-100 dark:border-indigo-900 shadow-md transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-950/30 dark:text-gray-100 pl-12"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={loading || !url}
                className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    分析中...
                  </>
                ) : (
                  "开始SEO分析"
                )}
              </Button>
              
              {loading && (
                <Progress value={progress} className="w-full h-2 bg-gray-100 dark:bg-gray-800" />
              )}
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="result">
          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">SEO分析结果</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveTab('input')
                      setUrl('')
                    }}
                  >
                    新分析
                  </Button>
                </div>
                <div className="bg-white overflow-auto dark:bg-gray-800 rounded-lg shadow-md ">
               { <SeoParser url={url} />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  )
}
