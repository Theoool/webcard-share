import { toast } from "@/hooks/use-toast";
const getCardProps = async (url: string, selectedModel: string) => {
  try {
    console.log('发起请求到Card/meta，URL:', url);
    const response = await fetch('http://localhost:3000/Card/meta', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url:url }),
    });
    
    if (!response.ok) {
      console.error('请求失败，状态码:', response.status);
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`
      };
    }
    
    const jsonData = await response.json();
    console.log('成功获取数据:', jsonData);
    
    return {
      success: true,
      data: jsonData,
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
      toast({
        title: "Uh oh! 发生了一些错误.",
        description: "There was a problem with your request.",
             })
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    toast({
      title: "创建成功了呀",
      description: "There was a problem with your request.",
      duration:2000
     })
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
const SaveCards=async ({url,UserFavoriteId,session}) => { 
  try {
    const response = await fetch('http://localhost:3000/Card/SaveCards', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session}`,
      },
      body: JSON.stringify({
        url,
        UserFavoriteId,
      }),
    }).then(()=>response.json())
    if (!response.ok) {
      toast({
        title: "Uh oh! 发生了一些错误.",
        description: "There was a problem with your request.",
             })
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    toast({
      title: "全部创建成功",
      description: "There was a problem with your request.",
      duration:2000
     })
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
             })
    }else{
     toast({
        title: "创建成功",
        description: "There was a problem with your request.",
      })
      return data
    }
}

  
export { getCardProps,addCard,PostCreate,SaveCards}
