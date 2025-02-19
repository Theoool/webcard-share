'use client'
import {Avatar,AvatarImage,AvatarFallback} from '@/components/ui/avatar'
import Link from 'next/link'

import { ListCollapse, Power, Search, Settings2 } from 'lucide-react'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Dialoglist {
  children: React.ReactNode;
  name: React.ReactNode;
  Description: string;
  title: string;
  ClickSubmit: () => void | Promise<void>; // 更明确的类型定义
}
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { forwardRef, useEffect, useRef, useState } from 'react'
export  function DialogBox({ children, title, ClickSubmit, name, Description }: Dialoglist) {


  return (
    <Dialog>
    <DialogTrigger asChild>
  <div>添加</div>
    </DialogTrigger>
    <DialogContent className="max-w-sm sm:max-w-md ">
      <DialogHeader>
        <DialogTitle>分享合集</DialogTitle>
        <DialogDescription>
       选择你喜欢的分享方式
        </DialogDescription>
      </DialogHeader>
     niashjdnika1
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  );
}
function Users(){
  


  //主要的作者，次要作者，链接可以点，hover会显示作者名字
  const [search,setSearch]=useState<boolean>(true)
  const [inputValue,setinputValue]=useState<string>('')
    return <div className='flex gap-10 justify-between w-full items-end'>
       <div className='flex  h-10   items-end   '>
      <Link href=''>
        <Avatar>
       <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
       </Avatar>
      </Link>
      <div className='flex  w-full flex-row-reverse transform justify-end'>
    {
      [0,1,2,3].map((e)=>{
        return   <Link href=''  key={e}  className='w-1 mx-2 ' >
        <Avatar  className=' hover:w-8 hover:h-8 transform duration-75  w-7 h-7'  >
       <AvatarImage   src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
       </Avatar>
      </Link>
      })
    }
      </div>
  
    </div>
    
    <div className=' text-md flex gap-2 items-center'>
    {/* 标题，创作者管理，是否公开， */}

    <Popover open={search} onOpenChange={setSearch}>
      <PopoverTrigger>
      <Search  />
      </PopoverTrigger>
      <PopoverContent>
      <Input
    onKeyDown={(e)=>{
    if (  e.code==="Enter") {
      setSearch(false)
    }
    }}
       placeholder='搜索整张合集'
      ></Input>
      </PopoverContent>
    </Popover>
   
    <DropdownMenu>
    <DropdownMenuTrigger>
    <ListCollapse className='hover:bg-slate-500/15 m2 hover:cursor-pointer rounded-md transition-colors'/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>更多的功能</DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      <DropdownMenuItem  onClick={(event)=>{
         event.preventDefault(); 
      }}>
      <DialogBox name={<DropdownMenuItem>添加</DropdownMenuItem>}
       Description='添加更多的图片Card' 
       ClickSubmit={()=>{
    
     
      }}  title='添加图片'>

  
  <div>1</div>
      </DialogBox>
      </DropdownMenuItem>
      <DropdownMenuItem>团队</DropdownMenuItem>
      <DropdownMenuItem>订阅</DropdownMenuItem>
      <DropdownMenuItem>设置</DropdownMenuItem>
  </DropdownMenuContent>
  </DropdownMenu>

    </div>
    </div>
  }
  export default Users
