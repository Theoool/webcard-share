
'use client'

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { User,  Clock,  Zap, Key, Database, AlertCircle, Settings as SettingsIcon, Globe } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import useSettingsModleStore from "@/Store/counter-store";
import { log } from "console";

// AI 服务提供商基础 URL 映射
interface BaseURLMap {
  [key: string]: string;
}

const baseURLMap: BaseURLMap = {
  openai: 'https://api.openai.com/v1',
  aliyun: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  siliconflow: 'https://api.siliconflow.cn/v1',
  custom: '',
};



export default function Settings() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("account");
  const [isAiEnabled, setIsAiEnabled] = useState(false);
  const [autoCleanEnabled, setAutoCleanEnabled] = useState(false);
  const [expirationEnabled, setExpirationEnabled] = useState(false);
  const [cleanInterval, setCleanInterval] = useState("30");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [aiProvider, setAiProvider] = useState("openai");
  const [apiKey, setApiKey] = useState("");
  const [chatModel, setChatModel] = useState("");
  const [embeddingModel, setEmbeddingModel] = useState("text-embedding-ada-002");
  const [customBaseUrl, setCustomBaseUrl] = useState("");
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [showApiKeyAlert, setShowApiKeyAlert] = useState(false);
  
  const { model, apikey, BaseURl, setModel, setApikey:SETAPI, setBaseURl, resetSettings } = useSettingsModleStore();

  // 在组件挂载后从 store 加载设置
  useEffect(() => {
  
console.log(model, apikey, BaseURl,"-------");


    
   
    
    if (BaseURl) {
      // 根据 BaseURl 判断当前提供商
      for (const [provider, url] of Object.entries(baseURLMap)) {
        if (BaseURl === url) {
          setAiProvider(provider);
          break;
        } else if (provider === 'custom' && BaseURl !== '') {
          setAiProvider('custom');
          setCustomBaseUrl(BaseURl);
        }
      }
    }
    if (model) {
      setChatModel(model);
    }
    
    if (apikey) {
      SETAPI(apikey);
      console.log(apikey);
      
      setApiKey(apikey);
      
      setIsAiEnabled(true);
    }
    console.log('Current State:', { model, apikey, BaseURl });
  }, [model, apikey, BaseURl]);

  const handleSaveProfile = () => {
    toast({
      title: "个人信息已更新",
      description: "你的个人资料已成功保存",
    });
  };

  const handleSaveAiSettings = () => {
    if (isAiEnabled && !apiKey) {
      setShowApiKeyAlert(true);
      return;
    }
    
    // 设置模型
    setModel(chatModel);
    
    // 设置 API Key
    SETAPI(apiKey);
    
    // 设置基础 URL
    const baseUrl = aiProvider === 'custom' ? customBaseUrl : baseURLMap[aiProvider];
    setBaseURl(baseUrl);
    
    toast({
      title: "AI 设置已更新",
      description: isAiEnabled ? "AI 功能已启用" : "AI 功能已禁用",
    });
  };

  const handleSaveLinkSettings = () => {
    toast({
      title: "链接管理设置已更新",
      description: autoCleanEnabled ? "自动清理功能已启用" : "自动清理功能已禁用",
    });
  };

  return (
    <div className="container mx-auto py-10 max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <SettingsIcon className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-semibold text-primary">设置</h1>
        </div>

        <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 bg-card/50 backdrop-blur-sm p-1 rounded-lg border border-border/50 w-full justify-start space-x-2">
            <TabsTrigger 
              value="account" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-200"
            >
              <User className="w-4 h-4 mr-2" />
              账户
            </TabsTrigger>
            <TabsTrigger 
              value="links" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-200"
            >
              <Clock className="w-4 h-4 mr-2" />
              链接管理
            </TabsTrigger>
            {/* <TabsTrigger 
              value="search" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-200"
            >
              <Clock className="w-4 h-4 mr-2" />
              搜索设置
            </TabsTrigger> */}
            <TabsTrigger 
              value="ai" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-200"
            >
              <Zap className="w-4 h-4 mr-2" />
              AI 设置
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6 mt-0">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">个人信息</CardTitle>
                <CardDescription>
                  更新你的个人资料和账户信息
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center space-y-3">
                    <Avatar className="w-24 h-24 border-2 border-border/50 ring-2 ring-primary/10">
                      <AvatarImage src={session?.user?.image || avatarUrl || ""} />
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xl">
                        {session?.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 w-full">
                      <Label htmlFor="avatar-url" className="text-xs text-center block">头像 URL</Label>
                      <Input 
                        id="avatar-url" 
                        value={avatarUrl} 
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="输入头像图片URL"
                        className="bg-background/50 text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div className="space-y-2">
                      <Label htmlFor="name">用户名</Label>
                      <Input 
                        id="name" 
                        defaultValue={session?.user?.name || ""} 
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">邮箱地址</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue={session?.user?.email || ""} 
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveProfile}
                    className="bg-primary hover:bg-primary/90"
                  >
                    保存更改
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="links" className="space-y-6 mt-0">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">链接管理</CardTitle>
                <CardDescription>
                  配置链接自动清理和过期设置
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">启用自动清理</h4>
                      <p className="text-sm text-muted-foreground">定期清理无效或过期的链接</p>
                    </div>
                    <Switch 
                      checked={autoCleanEnabled} 
                      onCheckedChange={setAutoCleanEnabled}
                    />
                  </div>

                  {autoCleanEnabled && (
                    <div className="space-y-4 animate-in fade-in-50">
                      <div className="space-y-2">
                        <Label>清理间隔（天）</Label>
                        <Select value={cleanInterval} onValueChange={setCleanInterval}>
                          <SelectTrigger className="bg-background/50">
                            <SelectValue placeholder="选择清理间隔" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">每周</SelectItem>
                            <SelectItem value="14">每两周</SelectItem>
                            <SelectItem value="30">每月</SelectItem>
                            <SelectItem value="90">每季度</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>启用链接过期</Label>
                          <Switch 
                            checked={expirationEnabled} 
                            onCheckedChange={setExpirationEnabled}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">链接将在指定时间后自动标记为过期</p>
                      </div>

                      <div className="space-y-2">
                        <Label>选择需要自动清理的收藏夹</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {

                          }
                          <div className="flex items-center space-x-2">
                            <Checkbox id="folder1" />
                            <Label htmlFor="folder1" className="text-sm">我的收藏</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="folder2" />
                            <Label htmlFor="folder2" className="text-sm">工作链接</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="folder3" />
                            <Label htmlFor="folder3" className="text-sm">学习资源</Label>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleSaveLinkSettings}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        保存链接设置
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-6 mt-0">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">AI 设置</CardTitle>
                <CardDescription>
                  配置 AI 功能和模型选项
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">启用 AI 功能</h4>
                      <p className="text-sm text-muted-foreground">开启后可使用 AI 智能总结和分析功能</p>
                    </div>
                    <Switch 
                      checked={isAiEnabled} 
                      onCheckedChange={setIsAiEnabled}
                    />
                  </div>

                  {isAiEnabled && (
                    <div className="space-y-4 animate-in fade-in-50">
                      <div className="space-y-2">
                        <Label>AI 服务提供商</Label>
                        <RadioGroup 
                          value={aiProvider} 
                          onValueChange={setAiProvider}
                          className="grid grid-cols-2 gap-4"
                        >
                          {/* <div className="flex items-center space-x-2">
                            <RadioGroupItem disabled={false} value="openai" id="openai" />
                            <Label htmlFor="openai">OpenAI</Label>
                          </div> */}
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="aliyun" id="aliyun" />
                            <Label htmlFor="aliyun">阿里云百炼</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="siliconflow" id="siliconflow" />
                            <Label htmlFor="siliconflow">硅基流动</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="custom" />
                            <Label htmlFor="custom">自定义</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {aiProvider === 'custom' && (
                        <div className="space-y-2">
                          <Label htmlFor="custom-base-url">自定义 API 端点</Label>
                          <div className="relative">
                            <Input 
                              id="custom-base-url" 
                              value={customBaseUrl}
                              onChange={(e) => setCustomBaseUrl(e.target.value)}
                              placeholder="https://your-api-endpoint.com/v1"
                              className="bg-background/50 pr-10"
                            />
                            <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground">输入完整的 API 基础 URL</p>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="api-key">API 密钥</Label>
                        <div className="relative">
                          <Input 
                            id="api-key" 
                            // type="password" 
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder={`输入${
                              aiProvider === 'openai' ? 'OpenAI' : 
                              aiProvider === 'aliyun' ? '阿里云百炼' : 
                              aiProvider === 'siliconflow' ? '硅基流动' : '自定义'
                            } API 密钥`}
                            className="bg-background/50 pr-10"
                          />
                          <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground">API 密钥将安全加密存储</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="chat-model">Chat 模型</Label>
                        <div className="relative">
                          <Input 
                            id="chat-model" 
                            value={chatModel}
                            onChange={(e) => setChatModel(e.target.value)}
                            placeholder={`输入 Chat 模型名称`}
                            className="bg-background/50 pr-10"
                          />
                          <Database className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {aiProvider === 'openai' ? '推荐: gpt-3.5-turbo, gpt-4' : 
                           aiProvider === 'aliyun' ? '推荐: deepseek-v3, qwen-plus' : 
                           aiProvider === 'siliconflow' ? '推荐: deepseek-v3' : '输入模型名称'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="embedding-model">Embedding 模型</Label>
                        <div className="relative">
                          <Input 
                            id="embedding-model" 
                            value={embeddingModel}
                            onChange={(e) => setEmbeddingModel(e.target.value)}
                            placeholder={`输入 Embedding 模型名称`}
                            className="bg-background/50 pr-10"
                          />
                          <Database className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {aiProvider === 'openai' ? '推荐: text-embedding-ada-002, text-embedding-3-small' : 
                           aiProvider === 'aliyun' ? '推荐: text-embedding-v1' : 
                           aiProvider === 'siliconflow' ? '推荐: bge-large-zh-v1.5' : '输入模型名称'}
                        </p>
                      </div>

                      <Button 
                        onClick={handleSaveAiSettings}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        保存 AI 设置
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
      <AlertDialog open={showApiKeyAlert} onOpenChange={setShowApiKeyAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              需要 API 密钥
            </AlertDialogTitle>
            <AlertDialogDescription>
              启用 AI 功能需要提供有效的 API 密钥。请输入您的 API 密钥后再保存设置。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowApiKeyAlert(false)}>
              了解
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
 )}
   
 