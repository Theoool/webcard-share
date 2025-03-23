'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Key, Database, Globe, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import useSettingsModleStore from "@/Store/counter-store";

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

export function AiSettings() {
  const [isAiEnabled, setIsAiEnabled] = useState(false);
  const [aiProvider, setAiProvider] = useState("openai");
  const [apiKey, setApiKey] = useState("");
  const [chatModel, setChatModel] = useState("");
  const [embeddingModel, setEmbeddingModel] = useState("text-embedding-ada-002");
  const [customBaseUrl, setCustomBaseUrl] = useState("");
  const [showApiKeyAlert, setShowApiKeyAlert] = useState(false);
  const { model, apikey, BaseURl, setModel, setApikey: SETAPI, setBaseURl, resetSettings } = useSettingsModleStore();

  // 在组件挂载后从 store 加载设置
  useEffect(() => {
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
      setApiKey(apikey);
      setIsAiEnabled(true);
    }
  }, [model, apikey, BaseURl, SETAPI]);

  // 处理AI功能开关变化
  const handleAiEnabledChange = (enabled: boolean) => {
    setIsAiEnabled(enabled);
    if (!enabled) {
      // 如果禁用AI功能，重置所有设置
      resetSettings();
      setApiKey("");
      setChatModel("");
      setCustomBaseUrl("");
      setAiProvider("openai");
      toast({
        title: "AI 设置已重置",
        description: "所有AI相关设置已被清除",
      });
    }
  };

  const handleSaveAiSettings = () => {
    if (isAiEnabled && !apiKey) {
      setShowApiKeyAlert(true);
      return;
    }
    
    try {
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
    } catch (error) {
      toast({
        title: "保存设置失败",
        description: "请检查您的设置并重试",
        variant: "destructive",
      });
    }
  };

  const handleResetSettings = () => {
    resetSettings();
    setApiKey("");
    setChatModel("");
    setCustomBaseUrl("");
    setAiProvider("openai");
    setIsAiEnabled(false);
    toast({
      title: "设置已重置",
      description: "所有AI设置已恢复默认值",
    });
  };

  return (
    <>
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
                onCheckedChange={handleAiEnabledChange}
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
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={`输入${aiProvider === 'openai' ? 'OpenAI' : aiProvider === 'aliyun' ? '阿里云百炼' : aiProvider === 'siliconflow' ? '硅基流动' : '自定义'} API 密钥`}
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
                      disabled
                      id="embedding-model" 
                      value={embeddingModel}
                      onChange={(e) => setEmbeddingModel(e.target.value)}
                      placeholder={`输入 Embedding 模型名称`}
                      className="bg-background/50 pr-10"
                    />
                    <Database className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    暂时不用设置，免费使用 &nbsp; 
                    {aiProvider === 'openai' ? '推荐: text-embedding-ada-002, text-embedding-3-small' : 
                     aiProvider === 'aliyun' ? '推荐: text-embedding-v3' : 
                     aiProvider === 'siliconflow' ? '推荐: bge-large-zh-v1.5' : '输入模型名称'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant={'outline'}
                    onClick={handleSaveAiSettings}
                    className="flex-1"
                  >
                    保存 AI 设置
                  </Button>
                  <Button
                    variant={'outline'}
                    onClick={handleResetSettings}
                    className="px-3"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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
    </>
  );
}
