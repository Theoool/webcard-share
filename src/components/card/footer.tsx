'use clent'
import { addCard } from "@/lib/card/router";
import { Bookmark, Share, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { ComboboxDemo } from "../combobox";
import HoverText from "../HoverText";


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
    <div className="flex justify-end  h-5 mt-2 items-center">
     
    <ComboboxDemo Clickfunction={changeID} title={'我的合集'}  ID={''}/>
   <HoverText text="保存书签"> <Bookmark className="icon" onClick={()=>add()}></Bookmark></HoverText>
    </div>
  );
}
export default Footer;
