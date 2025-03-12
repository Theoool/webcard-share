import { toast } from "@/hooks/use-toast";
import { useSession} from "next-auth/react";




const getCardProps = async (url: string) => {
  try {
    const response = await fetch('http://localhost:3000/Card/url', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url:url }),
    });
    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`
      };
    }
    return {
      success: true,
      data: await response.json(),
    };
  } catch (error) {
   
    console.error('Fetch failed:', error);
   
    return { 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

interface carddata{
  UserFavoriteId?:string,
  image:string,
  tags:string[],
  title:string,
  url:string,
  content:string

}

const addCard=async (data:carddata,session:any) => { 
  try {
    const response = await fetch('http://localhost:3000/Card', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session}`,
      },
      body: JSON.stringify({...data}),
    }).then(()=>response.json())
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return {
      success: true,
      data: response.json(),
    };
  } catch (error) {
    return { 
      success: false,
      error: error
    };
  }


}

 const PostCreate= async (data,token)=>{
     const res=await fetch(`http://localhost:3000/UserFavorites/createFavorite`,{
      mode: 'cors',
      method: 'POST',
      headers:{
         'Content-Type': 'application/json',    
       Authorization: `Bearer ${token}` 
      },
      body:JSON.stringify(data)
    })
    if (!res.ok) {
       toast({
        title: "Uh oh! 发生了一些错误.",
        description: "There was a problem with your request.",
        // action: <ToastAction altText="Try again" onClick={()=>PostCreate(data,token)}>Try again</ToastAction>,
      })
    }else{
     toast({
        title: "创建成功",
        description: "There was a problem with your request.",
      })
      return data
    }
  }
  
export { getCardProps,addCard,PostCreate}
