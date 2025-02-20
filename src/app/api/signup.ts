
interface User{
  email:string
  image:string,
  account?:any,
  username: string;}
const signup = async (user:User) => {

  try {
    const response = await fetch(process.env.NEST_URL+'/auth/signup', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
