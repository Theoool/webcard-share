import Image from "next/image";
import Card from '@/components/card'

export default function Home() {
  return (
   <div className="flex w-full text-black  h-12  sm:text-xl  justify-between  items-center font-bold border-2 border-black rounded-full ">
      <div className=" ml-2 sm:ml-10 " >
        Theo~ 
        <span className=" sm:m-5">/</span>
        <a className="">webcard</a>
      </div>
      <div className="  " >
        Theo~ 
        <span className="sm:m-5">/</span>
        <a className="">webcard</a>
      </div>
      <div className=" mr-2 sm:mr-10  flex items-center " >
        <span className="mr-2  hidden sm:block">Theo</span> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

      </div>
     
   </div>
  )
}

