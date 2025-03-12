import NextAuth, { NextAuthOptions, Session } from "next-auth"
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";

export  const authOptions: NextAuthOptions = {
  session:{
    strategy:"jwt"
  },
  callbacks:{
    async signIn({ account, profile,user }) {
      
      
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
        account.accesstoken=res.accessToken
        account.refreshtoken=res.refreshToken
        
        if (!res.accessToken) return false
      }else if(user && 'accessToken' in user && 'refreshToken' in user){
        // account = account || {};
        account!.accesstoken = (user as any).accessToken;
        account!.refreshtoken = (user as any).refreshToken;
      }
      return true
    },
    async jwt({ token, account,}:any) {
       if (account) {
        token.provider = account.provider
        token.accessToken = account.accesstoken
        token.refreshToken = account.refreshtoken;
       }
      return token;
    },
    async session({ session, token }:{session:Session,token:any}) {
      session.provider = token.provider
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    }
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "邮箱", type: "email", placeholder: "请输入邮箱" },
        password: { label: "密码", type: "password", placeholder: "请输入密码" },
        token: { label: "Token", type: "text" } // 添加 token 字段
      },
      async authorize(credentials) {
        try {
          console.log(credentials);
          
          // 如果是邮箱验证token登录
          if (credentials?.token) {
            const res = await fetch(`${process.env.NESTJS_URL}/auth/verify?token=${credentials?.token}`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
            });
            const {data} = await res.json();
            console.log("user",data);
            if (res.ok && data) {
              return {
                id: data.user.id,
                email: data.user.email,
                name: data.user.username,
                image: data.user.image,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
              };
            }
          }
          
          // 常规邮箱密码登录
          const res = await fetch(`${process.env.NESTJS_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { 'Content-Type': 'application/json' }
          });
          const user = await res.json();
          if (res.ok && user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              accessToken: user.accessToken,
              refreshToken: user.refreshToken
            };
          }
          return null;
        } catch (error) {
          console.error('登录失败:', error);
          return null;
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
    signIn: '/login',
    signOut: '/login',
   },

  debug:true,
}

export default NextAuth(authOptions)

