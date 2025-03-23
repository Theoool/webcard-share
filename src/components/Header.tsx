'use client'
import { Link } from "next-view-transitions";
import { useSession } from "next-auth/react";
import  DarkModeBtn  from "@/components/dark";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ButtonD } from "./Button/button";
import { useRouter } from "next/navigation";
import {
  Calculator,
  Calendar,
  CreditCard,
  File,
  List,
  Settings,
  Smile,
  User,
} from "lucide-react"
 
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import React from "react";
import { Button } from "./ui/button";
import { DialogTitle } from "./ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Logo from "./logo/logo";

const RouterList=[{
  title:'主页',
  href:'/'
},{
  title:'我的书签',
  href:'/mymarkbox'
},
{
  title:"我的收藏夹",
  href:'/markboxs'
},
{
  title:'广场',
  href:'/home'
},{
  title:'我的页面',
  href:'/me'
},
{
  title:"工具",
  href:'/Theo'
},
{
  title:"文档转网页",
  href:'/Theo'
},
{
  title:"SEO报告",
  href:'/Theo/Seo'
},
{
  title:"封面宣传",
  href:'/Theo/Cover'
},
]


export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)
 const router= useRouter()
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
 
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
 
  return (
    <div className="w-full relative  ">
    
      <Button onClick={()=>setOpen(true)} className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64" >  搜索...  
        <kbd className="pointer-events-none hidden   font-serif md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5  text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>+J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">快捷导航菜单</DialogTitle>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>没有什么结果返回</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {
              RouterList.map((item,index)=>(
              
                <CommandItem key={index} onClick={()=>{
                 setOpen(false)
                router.push(item.href)
                 
                }} onSelect={(e)=>{
                  setOpen(false)
                    router.push(item.href)
                  
                }}>
                  <File />
                  <span>{item.title}</span>
                </CommandItem>
              
              ))
            }
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>个人页面</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>设置</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <List className="h-5 w-5 dark:text-white" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>导航菜单</DrawerTitle>
          <DrawerDescription>快速访问网站各个部分</DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-1 px-4">
          {RouterList.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="justify-start"
              onClick={() => {
                router.push(item.href)
                setOpen(false)
              }}
            >
              <File className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </Button>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">关闭</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default function Home() {
  const { data: session, } = useSession();
  const router= useRouter()
  return (
   <nav className="flex p-2 w-full  fixed top-0  text-borderColor  gap-2  z-50 h-14  text-md sm:text-xl
     justify-between   items-center font-bold   ">
    <div className=" text-md gap-5 ml-5 hidden md:flex">
    <Logo></Logo>


     <Link href="/" className="dark:text-white  underline-offset-4  hover:underline"  >主页</Link>
     <Link href="/mymarkbox" className="dark:text-white   underline-offset-4  hover:underline"  >我的收藏</Link>
     <Link href="/home" className="dark:text-white       underline-offset-4  hover:underline"  >广场</Link>
     <Link href="/Theo" className="dark:text-white       underline-offset-4  hover:underline"  >工具</Link>
     {session&&<Link href="/me/settings" className="dark:text-white       underline-offset-4  hover:underline">设置</Link>}
      </div>
    <div className="md:hidden">
      <MobileNav />
    </div>
    <div className=" mr-2 sm:mr-10 flex-1 md:flex-none  flex gap-2 items-center " >
    <div className="w-full flex-1 md:w-auto"><CommandDialogDemo></CommandDialogDemo></div>
     <DarkModeBtn></DarkModeBtn>
      {
         session?<div className=" flex  items-center gap-2" onClick={()=>router.push('/me')}>
          <Avatar style={{'viewTransitionName':`Avatar`}} className=' rounded-xl size-7 sm:size-8'>
        <AvatarImage  referrerPolicy="no-referrer"
            loading="lazy" className=" rounded-full" src={session.user?.image as string} alt={session.user?.name as string} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> <span className="mr-2 text-sm  hidden md:block sm:block  dark:text-primary "
          >{session?.user?.name}</span> 
          </div>: <Button variant={'outline'}
        onClick={()=>router.push('/signup')}
         className=" border-0 cursor-pointer text-sm font-serif dark:text-white">signup</Button> 
      }
      </div>
   </nav>
  )
}

