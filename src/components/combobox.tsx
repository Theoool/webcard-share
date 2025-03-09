"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useVirtualizer } from "@tanstack/react-virtual"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"
import { ScrollArea } from "./ui/scroll-area"

export function ComboboxDemo({title}) {
  // 添加分页相关状态
  const [page, setPage] = React.useState(1)
  const [open, setOpen] = React.useState(false)
  const [value,setValue] = React.useState(title);
  const [pageSize, setPageSize] = React.useState(10)

  const { data, error, isLoading } = useQuery<any>({
    queryKey: ['/UserFavorites/GetAllFavoriteId', page, pageSize],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/UserFavorites/GetAllFavoriteId?page=${page}&pageSize=${pageSize}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000,
  });
   // 创建一个容器引用
   const parentRef = React.useRef<HTMLDivElement>(null)
  
   // 设置虚拟列表
   const virtualizer = useVirtualizer({
     count: data?.data?.length || 0,
     getScrollElement: () => parentRef.current,
     estimateSize: () => 35, // 每项的估计高度
     overscan: 5, // 预渲染的项数
   })
  if (!isLoading) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
      
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? data.data.find((framework) => framework.title === value)?.title
              : "Select framework..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent 
        sideOffset={4}
        align="start"
        // 添加以下属性来控制动画
        forceMount
        avoidCollisions={false}
        className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <div 
                ref={parentRef}
                className="h-[200px] overflow-auto"
              >
                <CommandGroup
                  style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  {virtualizer.getVirtualItems().map((virtualRow) => {
                    const framework = data.data[virtualRow.index]
                    return (
                      <CommandItem
                        key={framework.id}
                        value={framework.title}
                        className="absolute w-full"
                        style={{
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.title ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {framework.title}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
       
      </Popover>
    )
  }
}
