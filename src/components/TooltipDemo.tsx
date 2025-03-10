import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default  function TooltipDemo({children,text}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
         <div> {children}</div>
        </TooltipTrigger>
        <TooltipContent className=" text-white dark:text-darkbackround">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
