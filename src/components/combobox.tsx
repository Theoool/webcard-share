"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";

export function ComboboxDemo({ title,ID,Clickfunction=(id)=>{} }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(ID);
  const { data, error, isLoading } = useQuery<any>({
    queryKey: ["/UserFavorites/GetAllFavoriteId"],
    onSuccess(data) {
      console.log("This is data" ,data);
      if (ID==='') {
        setValue(data.data.find((framework) => framework.title === title)?.title);
      }else{
        setValue(data.data.find((framework) => framework.id === ID)?.title);
      }
      
    },
    staleTime: 5 * 60 * 1000,
  });
  React.useEffect(() => {
    if (!isLoading) {
      setValue(data.data.find((framework) => framework.id === ID)?.title);
    }
  }, [isLoading, data, ID]);
  // 加载中时显示占位符
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // if (!isLoading) {
  //   setValue(data.data.find((framework) => framework.id === ID)?.title);
  // }
 
  return (
    <Popover open={open && !isLoading} onOpenChange={setOpen}>
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
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
        
              <CommandGroup
                
              >
                {data.data.map((framework) => {
                  return (
                    <CommandItem

                      key={framework.id}
                      value={framework.title}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        Clickfunction(framework.id)
                        setOpen(false);
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
                  );
                })}
              </CommandGroup>
          
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
