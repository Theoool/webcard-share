import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactNode } from "react"

export  default function HoverText({text,children}:{
  text:string,
  children:ReactNode
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
         {children}
        </TooltipTrigger>
        <TooltipContent>
          <p className=" text-white">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
