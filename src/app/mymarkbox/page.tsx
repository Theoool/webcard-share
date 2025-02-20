"use client";
import { useSession,  } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div>1打开了时间</div>
      </>
    );
    
  }else{}
}
