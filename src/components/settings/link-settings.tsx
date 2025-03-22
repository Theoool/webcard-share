'use client'

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
export function LinkSettings() {
  const [autoCleanEnabled, setAutoCleanEnabled] = useState(false);
  const [expirationEnabled, setExpirationEnabled] = useState(false);
  const [cleanInterval, setCleanInterval] = useState("30");
  const { data, error, isLoading } = useQuery<any>({
    queryKey: ['/UserFavorites/getuserall'],
    staleTime: 5 * 60 * 1000,
    
  });
  const handleSaveLinkSettings = () => {
    toast({
      title: "链接管理设置已更新",
      description: autoCleanEnabled ? "自动清理功能已启用" : "自动清理功能已禁用",
    });
  };

  return (
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
                 {data&&data.map((meta) => { 
                 return <div key={meta.id} className="flex items-center space-x-2">
                    <Checkbox id={meta.id} />
                    <Label htmlFor={meta.id} className="text-sm">{meta.title}</Label>
                  
                  </div>})
                 }
                </div>
              </div>
              
              <Button 
                variant={'outline'}
                onClick={handleSaveLinkSettings}
                className="w-full "
              >
                保存链接设置
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
