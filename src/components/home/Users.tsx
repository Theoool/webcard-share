'use client'
import {Avatar,AvatarImage,AvatarFallback} from '@/components/ui/avatar'
import Link from 'next/link'

import { ListCollapse,Search,  } from 'lucide-react'


// interface Dialoglist {
//   children: React.ReactNode;
//   name: React.ReactNode;
//   Description: string;
//   title: string;
//   ClickSubmit: () => void | Promise<void>; // 更明确的类型定义
// }
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
 

import { Input } from '@/components/ui/input'
import { useState } from 'react'
import DialogBox from '../DialogBox'

function Users(){
  //主要的作者，次要作者，链接可以点，hover会显示作者名字
  const [search,setSearch]=useState<boolean>(false)
  // const [inputValue,setinputValue]=useState<string>('')
    return <div className='flex gap-10 justify-between w-full items-end'>
       <div className='flex  h-10   items-end   '>
      <Link href=''>
        <Avatar>
       <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
       </Avatar>
      </Link>
      
  
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
      
     
      <DialogBox name={<DropdownMenuItem
       onClick={(event)=>{
        event.preventDefault(); 
     }}
      >添加</DropdownMenuItem>}
       Description='添加更多的图片Card' 
       ClickSubmit={()=>{
    
     
      }}  title='添加图片'>

  
  <div>1</div>
      </DialogBox>
      
      <DropdownMenuItem>团队</DropdownMenuItem>
      <DropdownMenuItem>订阅</DropdownMenuItem>
      <DropdownMenuItem>设置</DropdownMenuItem>
  </DropdownMenuContent>
  </DropdownMenu>

    </div>
    </div>
  }
  export default Users
