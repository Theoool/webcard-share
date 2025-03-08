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

    // 处理 HTTP 错误状态码 (如 404, 500 等)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // 统一错误处理
    console.error('Fetch failed:', error);
    // 返回标准化错误格式
    return { 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
// const gettag = async (url: string) => {
//   try {
//     const response = await fetch('http://localhost:3000/tag/:id', {
//       mode: 'cors',
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ url:url }),
//     });

//     // 处理 HTTP 错误状态码 (如 404, 500 等)
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     // 统一错误处理
//     console.error('Fetch failed:', error);
//     // 返回标准化错误格式
//     return { 
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error'
//     };
//   }
// };

interface carddata{
  UserFavoriteId?:string,
  image:string,
  tags:string[],
  title:string,
  url:string,
  content:string

}
const InRefreshtoken=async ()=>{
  const { data: session, status, update } = useSession()
console.log(session);

  const response = await fetch('http://localhost:3000/auth/Refreshtoken', {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
        refreshToken:session?.refreshToken
    })
  }).then(()=>response.json())
  if (response.accessToken) {
    update({ accessToken: response.accessToken })
  }
}
const addCard=async (data:carddata,session:any) => { 
  // const { data: sessiona, status, update } = useSession()
  try {
    const response = await fetch('http://localhost:3000/Card', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session}`,
      },
      body: JSON.stringify(data),
    }).then(()=>response.json())
    if (response.code='TOKEN_EXPIRED') {
      InRefreshtoken()
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return { 
      success: false,
      error: error
    };
  }


}
// http://localhost:3000/UserFavorites/FirstFavorite

 const PostCreate= async (data,token)=>{
  console.log(data);
  
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
