
interface User{
  email:string
  image:string,
  account?:any,
  username: string;}
const signup = async (user:User) => {
    const response = await fetch(process.env.NEST_URL+'/auth/signup', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({...user}),
    }).then((res)=>res.json())
     await console.log(response);
    return  response;
};

export {signup}
