
import { HoverLink } from "@/components/hoverCard"



export const Cardsbox = (data: any) => {
const { url, urlLong, Avatar, Desc,Content }=data.data

  return (
    <div className='flex  w-full cursor-pointer gap-2 hover:bg-slate-500/5 p-2'>
      <img className='w-[33.3%] ' src="https://cdn.sanity.io/images/i81ys0da/production/bd497a82afbf1a4d0eae482beb17bffacb1f4790-1200x675.png" alt="" />
      <div className='text-sm flex flex-col justify-between'>
      <div> {Content}</div>
       <HoverLink name={url} url={urlLong} avatar={Avatar} Desc={Desc}></HoverLink>  
      </div>
    </div>  

  )
}
