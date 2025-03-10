'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Delete, FilePlus, Trash } from "lucide-react";
import Link from "next/link";
import { useMediaQuery } from "@react-hook/media-query";
import { usePathname } from "next/navigation"
import React, { useState, } from "react";
import { Input } from "@/components/ui/input";
import { clsx as cn, } from "clsx"
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { PostCreate } from "@/lib/card/router";
import { useBox } from '@/contexts/box-context';
export default function Header(){
  const pathname = usePathname()
  const {setdelete,Delete}=useBox()
  return  <div className="xl:px-20 mt-2 flex  justify-end items-center gap-4  text-xl" >
  <Button className="text-xl text-textfirst "  variant={'link'}>
    <Link href={'/mymarkbox'}>书签</Link>
  </Button>

      <Button className="text-xl text-textfirst "  variant={'link'}
      
      >  <Link href={'/mymarkbox/markboxs'}>收藏夹</Link></Button>
{ pathname?.includes('/mymarkbox')&&<Button variant={'outline'}
 onClick={(e) => {
  setdelete(!Delete)
 }}

 className={cn(
  
  !Delete ? "" : "bg-green-500/20 text-green-200"
)}
> <div className="flex items-center p-1   "> 
     {
     <span><Trash
    
     className=" icon cursor-pointer " size={25}></Trash></span>
     }
     </div></Button>
}
{ pathname?.includes('/mymarkbox/markboxs')&&<DrawerDialogDemo> <div className="flex items-center p-1  ">
     {
     <span><FilePlus
     
     className=" icon cursor-pointer text-[#c5ddd3]" size={25}></FilePlus></span>
     }
     </div></DrawerDialogDemo>
}

    
  </div>
}
export function DrawerDialogDemo({children}) {
  const [open, setOpen] = React.useState(false)
  const [option, setOptionn] = React.useState(false)
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
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
        {
          option?<div className=" flex flex-col gap-2">
            <div className="p-2 w-full hover:scale-105 shadow-inner h-40 flex justify-center items-center bg-white/5 cursor-pointer text-2xl">文件导入</div>
              <div className="p-2 w-full hover:scale-105 shadow-inner h-40 flex justify-center items-center bg-white/5 cursor-pointer text-2xl">手动新建</div>
              </div> :
                    <ProfileForm />
           
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
      <DrawerContent className="p-2">
        <DrawerHeader className="text-left">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-2 w-full hover:scale-105 m-2 shadow-inner h-40 flex justify-center items-center bg-white/5 cursor-pointer text-2xl">文件导入</div>
          <div className="p-2 w-full hover:scale-105 m-2 shadow-inner h-40 flex justify-center items-center bg-white/5 cursor-pointer text-2xl">手动新建</div>
       
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

interface FormData{
   title:string,
   isPublic:boolean,
   content:string
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const { data: session } = useSession();
  const [Form,setFrom]=useState<FormData>({
      title:'',
      
      isPublic:false,
      content:''
  })
 
  const changeInput=(num,value)=>{
    // if (num==1) {
    //   Form.title=value
    // }
    switch (num) {
      case 1:
        Form.title=value
        break;
      case 3:
        Form.isPublic=value
        break;
      case 2:
        Form.content=value
        break;
      
      default:
        break;
    }
  
    setFrom({...Form})
    console.log(Form);
    
  }

  return (
    <div className={cn("grid items-start gap-4", className)} >
      <div className="grid gap-2">
        <Label htmlFor="text">标题</Label>
        <Input type="text" id="text"
        value={Form.title}
        onChange={(e)=>{changeInput(1,e.target.value)}}
      />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">收藏夹概念</Label>
        <Input id="username" 
        value={Form.content}
        onChange={(e)=>{changeInput(2,e.target.value)}}
        />
      </div>
      <div className="flex items-center space-x-2">
      <Checkbox className=" text-black" id="terms" 
        checked={Form.isPublic}
        onCheckedChange={(e)=>{changeInput(3,e)}}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        是否公开这个收藏夹
      </label>
    </div>
     
      <Button className="bg-black"
      onClick={()=>PostCreate(Form,session?.accessToken)}
      >Save changes</Button>
    </div>
  )
}
