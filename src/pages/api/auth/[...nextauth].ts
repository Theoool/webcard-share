import NextAuth, { NextAuthOptions, Session } from "next-auth"
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";


export  const authOptions: NextAuthOptions = {
  session:{
    strategy:"jwt"

  },
  jwt:{
    secret:process.env.JWT_SECRET,
    maxAge:15*24*30*60
  },
  callbacks:{
    async signIn({ account,user }) {
      if (account?.provider === 'credentials') {
       
        if (!user.accessToken) return false;
        account.accesstoken=user.accessToken
        account.refreshtoken=user.refreshToken
        return true;
      }
      if (account?.provider === 'github' || account?.provider === 'google') {
        const res:any = await fetch(`${process.env.NESTJS_URL}/auth/callback`, {
          method: 'POST',
          body: JSON.stringify({
            provider: account.provider,
            code: account.code,
            access_token: account.access_token,
            id_token: account.id_token
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res=>res.json())
        
        // 同步账户信息
        account.accesstoken = res.accessToken
        account.refreshtoken = res.refreshToken
        account.provider = res.provider
        // 同步用户信息
        if(res.user) {
          user.email = res.user.email
          user.name = res.user.username
          user.image = res.user.image
        }
        
        if (!res.accessToken) return false
      } else if(user) {
        account!.accesstoken = (user as any).accessToken;
        account!.refreshtoken = (user as any).refreshToken;
      }

   
      return true
    },
    async jwt({ token,  trigger,account, session}:any) {
       if (account) {
        token.provider = account.provider
        token.accessToken = account.accesstoken
        token.refreshToken = account.refreshtoken;
       }
       if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name
      }
      return token;
    },
    async session({ session, token ,trigger,newSession}:{session:Session,token:any,trigger?:string,newSession?:any}) {
      session.provider = token.provider
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      if (trigger === "update" && newSession?.name) {
        // You can update the session in the database if it's not already updated.
        // await adapter.updateUser(session.user.id, { name: newSession.name })

        // Make sure the updated value is reflected on the client
        // session.user?.name = newSession.name
      }
      return session;
    }
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "邮箱", type: "email", placeholder: "请输入邮箱" },
        code: { label: "密码", type: "text", placeholder: "请输入密码" },
        
      },
      async authorize(credentials) {
        try {
         
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          
          console.log(credentials);
          
          const loginRes = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials?.email,
              code: credentials?.code,
              rememberMe:true
            }),
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal
          })
          
          clearTimeout(timeoutId);
          if (!loginRes.ok) {
              const errorData = await loginRes.json();
           
              throw new Error('登录失败',errorData.message);
          }else{
            
          const {user,accessToken,refreshToken} = await loginRes.json();
          
          return {
            id: user.id,
            email: user.email,
            name: user.username, // 添加默认用户名
            image: user.image || null,
            accessToken: accessToken,
            refreshToken:refreshToken
          };
          }


        } catch (error) {
          console.error('认证错误:', error);
        
          throw error; // 将错误传递给 NextAuth
        }
      }
    }),
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
      httpOptions: {
        timeout: 100000,
      },
    }),
    
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
    })
  
   
  ],
  pages: {
    signIn: '/',
    signOut: '/login',
    error: '/auth/error',
    // verifyRequest: '/login/EmailVerification',
   },

  debug:true,
}

export default NextAuth(authOptions)

