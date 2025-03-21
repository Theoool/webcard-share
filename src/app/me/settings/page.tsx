
'use client'

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { User, Clock, Zap, Settings as SettingsIcon } from "lucide-react";
import { AccountSettings } from "@/components/settings/account-settings";
import { LinkSettings } from "@/components/settings/link-settings";
import { AiSettings } from "@/components/settings/ai-settings";
import { toast } from "@/hooks/use-toast";
import useSettingsModleStore from "@/Store/counter-store";





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
      for (const [provider, url] of Object.entries(BaseURl)) {
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
    // const baseUrl = aiProvider === 'custom' ? customBaseUrl : baseURLMap[aiProvider];
    // setBaseURl(baseUrl);
    
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
            <AccountSettings />
          </TabsContent>

          <TabsContent value="links" className="space-y-6 mt-0">
            <LinkSettings />
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-6 mt-0">
            <AiSettings />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
 )}
   
 