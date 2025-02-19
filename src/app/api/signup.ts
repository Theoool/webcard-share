import { useSession,} from "next-auth/react";
interface User{
  email:string
  image:string,
  account?:any,
  username: string;}
const signup = async (user:User) => {
  const { data: session, } = useSession();
 
  try {
    const response = await fetch(process.env.NEST_URL+'/auth/signup', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({...user}),
    }).then((res)=>res.json());
   
    return await response;
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

export { signup}
