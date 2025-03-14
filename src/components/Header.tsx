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

const RouterList=[{
  title:'主页',
  href:'/'
},{
  title:'我的书签',
  href:'/mymarkbox'
},
{
  title:"我的收藏夹",
  href:'/mymarkbox/markboxs'
},
{
  title:'广场',
  href:'/home'
},{
  title:'我的页面',
  href:'/me'
}]


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
    <div className="w-full relative ">
    
      <Button onClick={()=>setOpen(true)} className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64" >  搜索...  
        <kbd className="pointer-events-none hidden   font-serif md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5  text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>+J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
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
                  <Smile />
                  <span>{item.title}</span>
                </CommandItem>
              
              ))
            }
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
export default function Home() {
  const { data: session, } = useSession();
  const router= useRouter()
  return (
   <nav className="flex p-2  w-full text-black   gap-2  z-50 h-14  text-md sm:text-xl  justify-between   items-center font-bold  rounded-full ">
    <div className=" gap-10 ml-10 hidden md:flex">
     <Link href="/" className="dark:text-primary  underline-offset-4  hover:underline"  >主页</Link>
     <Link href="/mymarkbox" className="dark:text-primary  underline-offset-4  hover:underline"  >我的收藏</Link>
     <Link href="/home" className="dark:text-primary      underline-offset-4  hover:underline"  >广场</Link>
    </div>
    <div className="md:hidden"><DarkModeBtn ></DarkModeBtn>
    </div>
        <div className="  w-full  flex-1 md:w-auto md:hidden md:flex-none"><CommandDialogDemo></CommandDialogDemo></div>
    <div className=" mr-2 sm:mr-10  flex gap-2 items-center " >
    <div className="  w-full  flex-1 md:w-auto  hidden md:flex"><CommandDialogDemo></CommandDialogDemo></div>

     <DarkModeBtn></DarkModeBtn>
      {
         session?<div className=" flex  items-center gap-2" onClick={()=>router.push('/me')}>
          <Avatar className=' rounded-xl size-7 sm:size-8'>
        <AvatarImage className=" rounded-full" src={session.user?.image as string} alt={session.user?.name as string} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> <span className="mr-2  hidden md:block sm:block  dark:text-primary "
          >{session?.user?.name}</span> 
          </div>: <Button variant={'outline'}
        onClick={()=>router.push('/login')}
         className=" border-0 cursor-pointer text-sm font-serif dark:text-white">Login</Button> 
      }
       
    
        
      

     
      </div>
   </nav>
  )
}

