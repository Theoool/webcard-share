'use client'
import { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, RefreshCw, Copy, Download, FileType2, MonitorSpeakerIcon, DownloadCloud, Globe, Link } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import useSettingsModleStore from '@/Store/counter-store';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@radix-ui/react-select';
import HtmlPreviewPopup from '../HtmlPreviewPopup';
export function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [htmlResult, setHtmlResult] = useState('');
  const [mdContent, setMdContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fileType, setFileType] = useState<'pdf' | 'md' | 'url'>('pdf');
  const [url, setUrl] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const { toast } = useToast();
  const { model, apikey, BaseURl} = useSettingsModleStore();
  const [activeTab, setActiveTab] = useState('upload')
  useEffect(() => {
    GlobalWorkerOptions.workerSrc = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/js/pdf.worker.js`;
  }, []);
  

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveTab('input');
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf" || droppedFile?.name.endsWith('.md')) {
      setFile(droppedFile);
      setFileType(droppedFile?.type === "application/pdf" ? 'pdf' : 'md');
    } else {
      toast({
        title: "文件类型错误",
        description: "请上传 PDF 或 Markdown 文件",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      if (selectedFile.type === "application/pdf") {
        setFileType('pdf');
      } else if (selectedFile.name.endsWith('.md')) {
        setFileType('md');
      } else {
        toast({
          title: "文件类型错误",
          description: "请上传 PDF 或 Markdown 文件",
          variant: "destructive",
        });
        setFile(null);
      }
    }
  };

  const extractTextFromPDF = async (file: File) => {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = async (e) => {
        const typedArray = new Uint8Array((e.target?.result || new ArrayBuffer(0)) as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        let text = '';
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          text += content.items.map((item) => ('str' in item ? item.str : '')).join(' ');
        }
        resolve(text);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const readMarkdownFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string || '');
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(htmlResult);
      toast({
        title: "复制成功",
        description: "HTML 内容已复制到剪贴板",
      });
    } catch (err) {
      toast({
        title: "复制失败",
        description: "请手动复制内容",
        variant: "destructive",
      });
    }
  };

  const downloadHTML = () => {
    const blob = new Blob([htmlResult.includes('```html') 
      ? htmlResult.split('```html')[1].split('```')[0].trim() 
      : htmlResult], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.replace(/\.(pdf|md)$/, '')}_converted.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "请选择文件",
        description: "需要上传文件才能进行转换",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
      
    }, 500);

    try {
      let text = '';
      
      if (fileType === 'pdf') {
        text = await extractTextFromPDF(file);
      } else {
        text = await readMarkdownFile(file);
        setMdContent(text);
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/search/cards/Htmlcode`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json',
          'x-ai-model': model,
          'x-api-key': apikey,
          'x-ai-baseurl': BaseURl,
         },
        body: JSON.stringify({ 
          text,
          fileType // 将文件类型传递给后端
        }),
      });
      
      const data = await response.json();
      setHtmlResult(data.data.html);
      setProgress(100);
      setActiveTab('result')
      toast({
        title: "转换成功",
        description: `${fileType === 'pdf' ? 'PDF' : 'Markdown'} 已成功转换为 HTML`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "转换失败",
        description: "请检查文件格式或稍后重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      clearInterval(progressInterval);
    }
  };

  const handleUrlSubmit = async () => {
   
   
    if (!url) {
      toast({
        title: "请输入URL",
        description: "需要提供有效的网址才能进行转换",
        variant: "destructive",
      });
      return;
    }

    // 简单的URL验证
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
    if (!urlPattern.test(url)) {
      toast({
        title: "无效的URL",
        description: "请输入有效的网址",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 500);
    

  
    try {
     
      const response = await fetch('${process.env.NEXT_PUBLIC_NESTJS_API_URL}/search/cards/Htmlcode', {
        method: 'POST', // 必须指定请求方法
        headers: {   
          'x-ai-model': model,
          'x-api-key': apikey,
          'x-ai-baseurl': BaseURl,
          'Content-Type': 'application/json' // 必须包含Content-Type
        },
        body: JSON.stringify({  // 必须包含请求体
          url,
          model: model,
          apikey: apikey,
          baseurl: BaseURl,
          fileType: 'url'
        }),
      });
      const data = await response.json();
      setHtmlResult(data.data.html);
      setProgress(100);
      toast({
        title: "转换成功",
        description: "URL已成功转换为HTML",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "转换失败",
        description: "请检查URL或稍后重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      clearInterval(progressInterval);
    }
  };

  return (
    <div className="max-w-4xl  mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl ">文档转 <code>html</code>网页  </h1>
        <p className="text-gray-500 dark:text-gray-400">
          上传文件或输入URL，用<span className=' font-bold mx-1 text-blue-500 dark:text-purple-600'>LLM模型</span>帮你转换为格式化的 HTML 内容
        </p>
        <p className="text-gray-400 0 dark:text-gray-400">
          简历，个人作品，文章等数据量少的效果较好，所以后期会升级成链式调用，加入多角色处理
        </p>
        <p className="text-gray-400 0 dark:text-gray-400">
          生成质量不稳定，无法处理中大型文件，读取速度慢，生成内容可能不完整，注意token消耗
        </p>
      </div>
     
      {/* 角色选择器 - 简化设计 */}
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex items-center justify-end gap-3 px-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="text-xs font-medium">AI角色:</span>
          </div>
          
          <Select onValueChange={setSelectedRole} defaultValue="general" >
            <SelectTrigger className="w-[160px] h-8 bg-transparent border-0 hover:bg-accent/30 focus:ring-0 shadow-none text-sm font-normal">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                 "bg-emerald-500"
                )}></div>
                <span className="truncate">
                   通用模式
                </span>
              </div>
            </SelectTrigger>
            {/* <SelectContent className="min-w-[200px] bg-white/20">
              <SelectGroup>
                <SelectItem value="general" className="flex items-center py-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                    <span>通用模式</span>
                  </div>
                </SelectItem>
                <SelectItem value="frontend" className="flex items-center py-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>前端开发专家</span>
                  </div>
                </SelectItem>
                <SelectItem value="designer" className="flex items-center py-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    <span>UX设计顾问</span>
                  </div>
                </SelectItem>
                <SelectItem value="fullstack" className="flex items-center py-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span>全栈工程师</span>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent> */}
          </Select>
        </div>
      </div>
     
      <Tabs defaultValue="upload" value={activeTab}  onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">文件上传</TabsTrigger>
          <TabsTrigger value="url">URL输入</TabsTrigger>
          <TabsTrigger value="result" disabled={!htmlResult}>转换结果</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <motion.div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center space-y-4 transition-colors",
              dragActive ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20" : "border-gray-300 dark:border-gray-700"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-900">
                {fileType === 'pdf' ? (
                  <FileText className="w-8 h-8 text-blue-500" />
                ) : (
                  <MonitorSpeakerIcon className="w-8 h-8 text-blue-500" />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {file ? file.name : "拖拽文件到此处或点击上传"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  支持 PDF 或 Markdown 文件，最大 10MB
                </p>
              </div>
              <div className="flex sm:flex-row flex-col gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFileType('pdf');
                    document.getElementById('file-upload')?.click();
                  }}
                  className={cn(
                    "flex items-center gap-2",
                    fileType === 'pdf' && file ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""
                  )}
                >
                  <FileText className="w-4 h-4" />
                  PDF 文件
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFileType('md');
                    document.getElementById('file-upload')?.click();
                  }}
                  className={cn(
                    "flex items-center gap-2",
                    fileType === 'md' && file ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""
                  )}
                >
                  <DownloadCloud className="w-4 h-4" />
                  Markdown 文件
                </Button>
              </div>
              <input
                type="file"
                accept={fileType === 'pdf' ? "application/pdf" : ".md"}
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
            </div>
          </motion.div>

          {file && (
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    正在转换...
                  </>
                ) : (
                  <>
                    <FileType2 className="w-4 h-4 mr-2" />
                    开始转换
                  </>
                )}
              </Button>

              {loading && (
                <Progress value={progress} className="w-full" />
              )}
            </div>
          )}
          
          {fileType === 'md' && mdContent && (
            <div className="mt-6 border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Markdown 预览</h3>
              <SyntaxHighlighter
                language="md"
                // style={theme === 'dark' ? vscDarkPlus : vs}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  fontSize: '0.875rem',
                }}
              >
                

                {mdContent}
              </SyntaxHighlighter>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="url" className="space-y-6">
          <div className="border-2 rounded-lg p-8 space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-900">
                <Globe className="w-8 h-8 text-blue-500" />
              </div>
              <div className="space-y-2 text-center">
                <p className="text-lg font-medium">
                  输入网页URL
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  支持HTTPS链接
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                className='text-white' 
                  onClick={handleUrlSubmit}
                  disabled={loading || !url}
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Link className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              {loading && (
                <Progress value={progress} className="w-full" />
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="result">
          <AnimatePresence>
            {htmlResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">转换结果</h2>
                  <div className="flex gap-2">
                  <Button
        variant={'outline'}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => setIsPopupOpen(true)}
      >
        显示预览
      </Button>
      <HtmlPreviewPopup
        htmlContent={htmlResult.includes('```html') 
          ? htmlResult.split('```html')[1].split('```')[0].trim() 
          : htmlResult}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      复制
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadHTML}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      下载
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <SyntaxHighlighter
                    language="html"
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.5rem',
                      padding: '2rem',
                      fontSize: '0.875rem',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    codeTagProps={{
                      style: {
                        fontSize: 'inherit',
                        lineHeight: '1.5',
                      }
                    }}
                    lineNumberStyle={{
                      minWidth: '3em',
                      paddingRight: '1em',
                    }}
                    showLineNumbers
                    wrapLines
                    wrapLongLines
                  >
                    {htmlResult.includes('```html') 
                      ? htmlResult.split('```html')[1].split('```')[0].trim() 
                      : htmlResult}
                  </SyntaxHighlighter>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}
