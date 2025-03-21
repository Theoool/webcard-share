'use client'

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSession} from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { SaveUsers } from "@/lib/card/router";

export function AccountSettings() {
  const { data: session ,update} = useSession();
  const [avatarUrl, setAvatarUrl] = useState(session?.user?.image || "");
  const [name, setNmae] = useState(session?.user?.name || "");
const handleSaveProfile = async () => {
  try {
    // 保存用户信息到服务器
    const User =  SaveUsers({ 
      user: {
        email: session?.user?.email,
        username:name,
        image: avatarUrl
      },
      session: session?.accessToken
    })

    console.log(User);

    if ((await User).success === false) {
      toast({
        title: "个人信息更新失败",
        description: "需要你重新保存",
      });
      return;
    }
    // 更新 next-auth session 中的用户数据
    if (session?.user) {
      session.user.image = avatarUrl;
      session.user.name = name;
    }
    update({
      name: name,
      image:avatarUrl
    })

    toast({
      title: "个人信息已更新",
      description: "你的个人资料已成功保存",
    });
  } catch (error) {
    toast({
      title: "更新失败",
      description: "保存个人资料时发生错误",
      variant: "destructive",
    });
  }
};

  return (
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
              <AvatarImage src={avatarUrl||session?.user?.image || ""} />
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
                onChange={(e)=>{
                  if (e.target.value.length > 8) {
                    toast({
                      title: "用户名过长",
                      description: "用户名不能超过10个字符",
                      variant: "destructive",
                    });
                  }else{
                    setNmae(e.target.value)
                  }
                }}
                placeholder={session?.user?.name || ""} 
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">邮箱地址</Label>
              <p className="text-xs text-muted-foreground">暂时不支持更改</p>
              <Input 
                id="email" 
                type="email" 
                disabled
                defaultValue={session?.user?.email || ""} 
                className="bg-background/50"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex justify-end">
          <Button 
            variant={'outline'}
            onClick={handleSaveProfile}
            className=""
          >
            保存更改
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
