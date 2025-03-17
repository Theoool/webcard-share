'use client';

import { useState, useRef, useCallback } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpFromLine, Plus, Trash2, FileUp, Link, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

interface UrlInput {
  id: string;
  value: string;
  isValid: boolean;
}

interface BookmarkItem {
  title: string;
  url: string;
  tags?: string[];
  content?: string;
}

export function BatchImportDialog({ onImportSuccess }: { onImportSuccess?: (items: BookmarkItem[]) => void }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("html");
  const [isLoading, setIsLoading] = useState(false);
  const [parsedItems, setParsedItems] = useState<BookmarkItem[]>([]);
  const [urlInputs, setUrlInputs] = useState<UrlInput[]>([{ id: '1', value: '', isValid: false }]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const { data: session } = useSession();

  // 处理HTML文件拖放
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // 处理HTML文件上传
  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    setIsLoading(true);
    
    let files: FileList | null = null;
    
    if ('dataTransfer' in e) {
      files = e.dataTransfer.files;
    } else if ('target' in e && e.target.files) {
      files = e.target.files;
    }

    if (!files || files.length === 0) {
      setIsLoading(false);
      return;
    }

    const file = files[0];
    if (file.type !== "text/html" && !file.name.endsWith('.html')) {
      toast({
        title: "文件格式错误",
        description: "请上传HTML格式的书签文件",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const text = await file.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const bookmarks: BookmarkItem[] = [];

      // 查找所有书签链接
      const links = doc.querySelectorAll('a');
      links.forEach(link => {
        const url = link.getAttribute('href');
        const title = link.textContent;
        if (url && title) {
          bookmarks.push({
            title: title.trim(),
            url: url,
            tags: []
          });
        }
      });

      setParsedItems(bookmarks);
      toast({
        title: "解析成功",
        description: `成功解析 ${bookmarks.length} 个书签`
      });
    } catch (error) {
      console.error("解析书签文件失败:", error);
      toast({
        title: "解析失败",
        description: "无法解析书签文件，请检查文件格式",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, []);

  // 添加URL输入框
  const addUrlInput = useCallback(() => {
    setUrlInputs(prev => [...prev, { id: Date.now().toString(), value: '', isValid: false }]);
  }, []);

  // 删除URL输入框
  const removeUrlInput = useCallback((id: string) => {
    setUrlInputs(prev => prev.filter(input => input.id !== id));
  }, []);

  // 更新URL输入
  const updateUrlInput = useCallback((id: string, value: string) => {
    setUrlInputs(prev => prev.map(input => {
      if (input.id === id) {
        // 简单的URL验证
        const isValid = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/.test(value);
        return { ...input, value, isValid };
      }
      return input;
    }));
  }, []);

  // 处理URL批量导入
  const handleUrlImport = useCallback(async () => {
    const validUrls = urlInputs.filter(input => input.isValid).map(input => input.value);
    
    if (validUrls.length === 0) {
      toast({
        title: "无效的URL",
        description: "请输入至少一个有效的URL",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // 这里应该是调用API获取URL的元数据
      // 模拟API调用
      const items: BookmarkItem[] = validUrls.map(url => ({
        title: `来自 ${new URL(url).hostname}`,
        url: url,
        tags: []
      }));

      setParsedItems(items);
      toast({
        title: "导入成功",
        description: `成功导入 ${items.length} 个URL`
      });
    } catch (error) {
      console.error("URL导入失败:", error);
      toast({
        title: "导入失败",
        description: "无法导入URL，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [urlInputs]);

  // 确认导入
  const confirmImport = useCallback(() => {
    if (parsedItems.length === 0) {
      toast({
        title: "没有可导入的项目",
        description: "请先上传书签文件或添加URL",
        variant: "destructive"
      });
      return;
    }

    if (onImportSuccess) {
      onImportSuccess(parsedItems);
    }

    // 这里应该是调用API保存书签
    toast({
      title: "导入完成",
      description: `成功导入 ${parsedItems.length} 个书签`
    });

    // 重置状态并关闭对话框
    setParsedItems([]);
    setUrlInputs([{ id: '1', value: '', isValid: false }]);
    setOpen(false);
  }, [parsedItems, onImportSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button 
            className="flex-1 border-[#e5e5e5] dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] hover:bg-[#f5f5f7] dark:hover:bg-[#2a2a2a] text-[#1d1d1f] dark:text-white"
                variant={'outline'} 
    > <ArrowUpFromLine className="text-xl mr-2 text-[#1d1d1f] dark:text-white" />
               
                <span>批量导入</span>
              </Button>
          
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>批量导入书签</DialogTitle>
          <DialogDescription>
            从HTML书签文件导入或批量添加URL链接
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="html" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="html">HTML文件导入</TabsTrigger>
            <TabsTrigger value="url">URL批量添加</TabsTrigger>
          </TabsList>
          
          <TabsContent value="html" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>上传书签文件</CardTitle>
                <CardDescription>
                  支持从Chrome、Firefox、Edge等浏览器导出的书签HTML文件
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                    dragActive ? "border-primary bg-primary/10" : "border-muted-foreground/20",
                    "hover:border-primary/50 hover:bg-primary/5"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleFileChange}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileUp className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      拖放HTML书签文件到这里，或
                      <label htmlFor="file-upload" className="relative cursor-pointer text-black dark:text-primary hover:underline ml-1">
                        <span className='text-black dark:text-primary'>浏览文件</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".html,.htm"
                          className="sr-only"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                      </label>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>批量添加URL</CardTitle>
                <CardDescription>
                  添加多个URL链接，每行一个
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatePresence>
                  {urlInputs.map((input, index) => (
                    <motion.div 
                      key={input.id}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input
                        placeholder="https://example.com"
                        value={input.value}
                        onChange={(e) => updateUrlInput(input.id, e.target.value)}
                        className={cn(
                          input.value && (input.isValid ? "border-green-500" : "border-red-500")
                        )}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeUrlInput(input.id)}
                        disabled={urlInputs.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={addUrlInput}
                >
                  <Plus className="mr-2 h-4 w-4" /> 添加URL
                </Button>
                
                <Button 
                  className="w-full" 
                  onClick={handleUrlImport}
                  disabled={isLoading || !urlInputs.some(input => input.isValid)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      处理中...
                    </>
                  ) : (
                    <>
                      <Link className="mr-2 h-4 w-4" />
                      解析URL
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {parsedItems.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">已解析 {parsedItems.length} 个项目</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setParsedItems([])}
              >
                清空
              </Button>
            </div>
            <div className="mt-2 max-h-[200px] overflow-y-auto rounded-md border p-2">
              {parsedItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-1 text-sm">
                  <span className="truncate max-w-[300px]">{item.title}</span>
                  <span className="text-muted-foreground text-xs truncate max-w-[100px]">
                    {new URL(item.url).hostname}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button 
            onClick={confirmImport}
            disabled={isLoading || parsedItems.length === 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                处理中...
              </>
            ) : (
              <>确认导入 ({parsedItems.length})</>  
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function BatchImportButton({ onImportSuccess }: { onImportSuccess?: (items: BookmarkItem[]) => void }) {
  return (
    <BatchImportDialog  onImportSuccess={onImportSuccess} />
  );
}
