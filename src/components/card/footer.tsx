'use clent'
import { addCard } from "@/lib/card/router";
import { Bookmark, Share, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { ComboboxDemo } from "../combobox";


function Footer({ content}) {
  const [show, setShow] = React.useState(false);
  const [ID, SetID] = React.useState<string|undefined>('');
  const {data:session}=useSession()
 const changeID=(id)=>{
  SetID(id)
 }
  const add=async ()=>{
     await addCard(
          {
            UserFavoriteId:ID,
            ...content
          },
        session?.accessToken
      )
    }
  return (
    <div className="flex justify-between h-5 mt-2 items-center">
      <div className="text-[1.2rem] text-light flex gap-5">
        {/* <span> {source}</span> */}
        {/* <span > {time}</span> */}
      </div>
    <ComboboxDemo Clickfunction={changeID} title={'我的合集'}  ID={''}/>
    <Bookmark onClick={()=>add()}></Bookmark>
    </div>
  );
}
export default Footer;
