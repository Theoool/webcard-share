"use client";
import { Button } from "@/components/ui/button";
import { Description } from "@radix-ui/react-toast";
import { Favicon } from "favicon-stealer";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { useMediaQuery } from "@react-hook/media-query";
import React from "react";
import { PostCreate } from "@/lib/card/router";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
interface FormData {
  title: string;
  isPublic: boolean;
  content: string;
}
export function DrawerDialogDemo({children}) {
  const [open, setOpen] = React.useState(false)
  const [option, setOptionn] = React.useState(false)
  const path = usePathname()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">{children}</Button>
        </DialogTrigger>
        {/* <DialogOverlay className="fixed inset-0 bg-black/50" /> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>个人主页链接</DialogTitle>
            <DialogDescription className="flex items-center">
            这个收藏夹的会公开到你的个人主页，创建后建议手动编辑
            </DialogDescription>
          </DialogHeader>
        {
          option?<div className=" flex flex-col gap-2">
            <div className="p-2 w-full hover:scale-105 shadow-inner h-40 flex justify-center items-center bg-white/5 cursor-pointer text-2xl">文件导入</div>
              <div className="p-2 w-full hover:scale-105 shadow-inner h-40 flex justify-center items-center bg-white/5 cursor-pointer text-2xl">手动新建</div>
              </div>:<MarkboxsForm/>
        
                    // <MarkboxsForm />
           
        }
        </DialogContent>
      </Dialog>
    )
  }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DrawerTrigger>
      <DrawerContent className="px-4">
        <DrawerHeader className="text-left">
          <DrawerTitle>个人主页链接</DrawerTitle>
          <DrawerDescription>
            这个收藏夹的会公开到你的个人主页，创建后建议手动编辑
          </DrawerDescription>
        </DrawerHeader>
     <MarkboxsForm/>
     <MarkboxsForm></MarkboxsForm>
        
        {/* <ProfileForm className="px-4" /> */}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
function MarkboxsForm({ className }: React.ComponentProps<"form">) {
  const { data: session } = useSession();
  const [form, setForm] = useState<FormData>({
    title: '自己的网站/社媒', 
    isPublic: true, 
    content: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
    setErrors (prev => ({
      ...prev,
      [field]: ''
    }));
  };


  const handleSubmit = () => {
    
      PostCreate(form, session?.accessToken)
        .then(() => {
          setForm({ title: '自己的网站/社媒', isPublic: true, content: form.content });
        })
        .catch(error => {
          console.error('创建失败:', error);
          setErrors({ 
            ...errors,
            title: '提交失败，请稍后重试'
          });
        });
   
  };

  return (
    <div className={cn("grid items-start gap-4", className)}>
      
      <div className="flex items-center space-x-2">
        <Label htmlFor="isPublic">介绍一下自己吧</Label>
         <Input onChange={e=>handleChange('content',e.target.value)}></Input>
      </div>
      <Button onClick={handleSubmit}>保存更改</Button>
    </div>
  );
}
const Linkcard = () => {
  const data = {
    url: '',
    name: 'Anthony Fu',
    Description: '>Hey, I am Anthony Fu, a fanatical open sourceror.'
  }
  return <div className="cardboxshow w-full h-28 m-2 bg-background justify-between border border-primary *:
  gap-8  hover:rounded-sm 
  flex items-center rounded-sm p-4   md:w-[35rem]">
    <Favicon
      url='https://x.com/home'
      size={60}
      className=" border border-black   "
    />
    <div>
      <h1 className="text-black dark:text-white">{data.name}</h1>
      <Description className=" text-[#6e7c90] line-clamp-3">{data.Description}</Description>
    </div>
    <div>
      <Button className=" bg-black  border-2 dark:border-primary  text-white">View</Button>
    </div>
  </div>
}
const logout= async ()=>{
  try {
    await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/logout`) 
    await signOut({
      redirect:true
    })
  } catch (error) {
    console.log(error)
  }
}

const UserProfile = ({ session }) => (
  <div className="w-full h-auto flex flex-col mt-10 px-4 p-4 items-center">
    <div style={{'viewTransitionName':`Avatar`}} className="w-20 h-20 relative mb-4 flex flex-col gap-2">
      <img
        src={session.user?.image ?? ""}
        alt={session.user?.name ?? ""}
        className="object-cover rounded-full"
      />
    </div>
    <h1 className="text-2xl">{session.user?.name}</h1>
       <div className="m-4 flex gap-4">
       {/* <DrawerDialogDemo>工改</DrawerDialogDemo> */}
      {/* <Link ><Button className="bg-white dark:text-black">订阅</Button></Link> */}
      {/* <Link><Button className="bg-white dark:text-black">邮箱</Button></Link> */}
    </div>

    <p className="font-bold mb-4">{session.user?.email}</p>
    <button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => logout()}>Sign out</button>
  </div>
);

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <div className="w-full   h-[80vh] justify-center flex flex-col mt-10 px-4 p-4 items-center"><Button variant={'link'} className="text-black font-wenkai text-3xl  font-bold"><Link href="/login">你在做什么? 快去登录！ </Link></Button></div>;
  }

  return <UserProfile session={session} />;
}
