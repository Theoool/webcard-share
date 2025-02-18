
import { HoverLink } from "@/components/hoverCard"



export const Cardsbox = (data: any) => {
const { url, urlLong, Avatar, Desc,Content }=data.data

  return (
    <div className='flex  w-full h-32 cursor-pointer gap-2 hover:bg-slate-500/5 p-2'>
      <img className='w-[33.3%] ' src={urlLong} alt="" />
      <div className='text-sm flex flex-col justify-between'>
      <div className="leading-7 [&:not(:first-child)]:mt-6  overflow-clip"> {Content}</div>
       {
       urlLong&&<HoverLink name={url} url={urlLong} avatar={Avatar} Desc={Desc}></HoverLink>  
       } 
      </div>
    </div>  

  )
}
