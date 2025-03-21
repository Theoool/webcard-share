'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { FilePlus, LucideBookOpenText, Trash } from "lucide-react";
import Link from "next/link";
import { useMediaQuery } from "@react-hook/media-query";
import { usePathname, useRouter } from "next/navigation"
import React, { useState, } from "react";
import { Input } from "@/components/ui/input";
import { clsx as cn, } from "clsx"
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { addCard, PostCreate } from "@/lib/card/router";
import { useBox } from '@/contexts/box-context';
import { Badge } from "./ui/badge";
import { toast } from "@/hooks/use-toast";
import { ComboboxDemo } from "./combobox";
interface carddata{
  UserFavoriteId?:string,
  image:string,
  tags:string[],
  title:string,
  url:string,
  content:string
}
interface FormData{
  title:string,
  isPublic:boolean,
  content:string
}


export default function Header(){
  const pathname = usePathname()
  const Router = useRouter()
  const {setdelete,Delete}=useBox()
  return  <div className="xl:px-20 mt-2 flex  justify-end items-center gap-4  text-xl" >
  <Button className="text-xl text-textfirst " style={{'viewTransitionName':`markbox`}}  variant={'link'}>
    <Link href={'/mymarkbox'}>书签</Link>
  </Button>

      <Button className="text-xl text-textfirst "  variant={'link'}
      onClick={()=>{
        pathname?.includes("/markboxs")?Router.back():Router.push('/markboxs')
      }}
      style={{'viewTransitionName':`markboxs`}}
      >  收藏夹</Button>
<Button variant={'outline'}
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

{ pathname&&<DrawerDialogDemo> <div className="flex items-center p-1  ">
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
            <DialogTitle>创建文件夹</DialogTitle>
            <DialogDescription className="flex items-center">
             编辑一个新的收藏夹，或者导入一个收藏夹 <Button variant={'link'} >
              <Link href={'/bolg/2'}  className="flex items-center">方法</Link>
             </Button>
            </DialogDescription>
          </DialogHeader>
        {
          option?<div className=" flex flex-col gap-2">
            <div className="p-2 w-full hover:scale-105 shadow-inner h-40 flex justify-center items-center bg-white/5 cursor-pointer text-2xl">文件导入</div>
              <div className="p-2 w-full hover:scale-105 shadow-inner h-40 flex justify-center items-center bg-white/5 cursor-pointer text-2xl">手动新建</div>
              </div> : path?.includes('markboxs/')? <CardForm></CardForm>:<MarkboxsForm/>
        
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
          <DrawerTitle>创建收藏夹 </DrawerTitle>
          <DrawerDescription>
            在这里创建你的新收藏夹，点击保存
          </DrawerDescription>
        </DrawerHeader>
        {/* <div className="p-2 w-full hover:scale-105 m-2 shadow-inner h-40 flex justify-center items-center bg-white/5 cursor-pointer text-2xl">文件导入</div>
          <div className="p-2 w-full hover:scale-105 m-2 shadow-inner h-40 flex justify-center items-center bg-white/5 cursor-pointer text-2xl">手动新建</div> */}
         
        {
          path?.includes('markboxs/')? <CardForm></CardForm>:<MarkboxsForm/>
        }
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
  const [Form,setFrom]=useState<FormData>({
      title:'',
      
      isPublic:false,
      content:''
  })
 
  const changeInput=(num,value)=>{
   
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
      <Checkbox className=" text-white dark:text-black " id="terms" 
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
     
      <Button className=" text-white dark:text-black"
      onClick={()=>PostCreate(Form,session?.accessToken)}
      >Save changes</Button>
    </div>
  )
}
function CardForm({ className }: React.ComponentProps<"form">) {
  const { data: session } = useSession();
  const path=usePathname()
  const Router = useRouter()
  const [Form, setFrom] = useState<carddata>({
    title: '',
    image: "",
    UserFavoriteId:path?.split('/')[2],
    content: '',
    url: "",
    tags: ['']
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!Form.title.trim()) newErrors['title'] = '标题不能为空';
    if (!Form.url.trim()) newErrors['url'] = '链接不能为空';
    if (!Form.content.trim()) newErrors['content'] = '描述不能为空';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFrom(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setFrom({...Form,tags:[...Form.tags,tagInput.trim()]});
      setTagInput('');
    }
  };

  const handleSubmit = async () => {
   
    if (!session) {
      toast({
        title: '未登录',
        description: '请先登录后再提交',
        variant: 'destructive'
      });
      return;
    }
   

    if (!validateForm()) {
      toast({
        title: '表单验证失败',
        description: '请填写所有必填字段',
        variant: 'destructive'
      });
      return;
    }
   
    
    try {
      console.log("你好");
      await addCard(Form, session?.accessToken);
      Router.push('/markboxs/'+Form.UserFavoriteId)
      
    } catch (error) {
      toast({
        title: '提交失败',
        description:'创建卡片时发生错误',
        variant: 'destructive'
      });
    }
  };
 

  return (
    <div className={cn("grid items-start gap-4", className)} >
    
     
 
      <div className="grid gap-2">
        <Label htmlFor="url">链接</Label>
        <Input
          id="url"
          type="text"
          value={Form.url}
          onChange={(e) => handleInputChange('url', e.target.value)}
          className={errors['url'] ? 'border-red-500' : ''}
        />
        {errors['url'] && <span className="text-sm text-red-500">{errors['url']}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="title">标题</Label>
        <Input
          id="title"
          type="text"
          value={Form.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={errors['title'] ? 'border-red-500' : ''}
        />
        {errors['title'] && <span className="text-sm text-red-500">{errors['title']}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="content">描述</Label>
        <Input
          id="content"
          type="text"
          value={Form.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          className={errors['content'] ? 'border-red-500' : ''}
        />
        {errors['content'] && <span className="text-sm text-red-500">{errors['content']}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image">封面</Label>
        <Input
          id="image"
          type="text"
          value={Form.image}
          onChange={(e) => handleInputChange('image', e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="tags">标签/关键词</Label>
        <Input
          id="tags"
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInput}
          placeholder="输入标签后按回车添加,单击标签删除"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {Form.tags.map((el, index) => (
          <Badge
            key={index}
            variant="outline"
            className="dark:border-gray-600 dark:text-gray-300"
            onClick={()=>{
              setFrom({...Form,tags:Form.tags.filter(item=>item!==el )})
            }}
          >
            {el}
          </Badge>
        ))}
      </div>
  
      <Button
      type="submit"
        className="text-white dark:text-black"
        onClick={handleSubmit}
      >
        保存卡片
      </Button>
    </div>
  );
}
