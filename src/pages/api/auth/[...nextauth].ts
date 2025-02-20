import NextAuth, { NextAuthOptions, Session } from "next-auth"
import GithubProvider from 'next-auth/providers/github';

import GoogleProvider from 'next-auth/providers/google';

import {signup} from '@/app/api/signup'


export  const authOptions: NextAuthOptions = {
   
  session:{
    strategy:"jwt"
  },
  callbacks:{
    async signIn({ user, account, profile, email, credentials }:any) {
    const { accessToken, refreshToken}= await signup({
      username:user.name,
      email:user.email,
      image:user.image,
      account:account
    })
    account.accessToken=accessToken
    account.refreshToken=refreshToken
      if (accessToken) {
        
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, account }:any) {
      // 将令牌持久化到 JWT
      if (account) {
        token.accessToken = account.accessToken;
        token.refreshToken = account.refreshToken;
      }
      return token;
    },

    async session({ session, token }:{session:Session,token:any}) {
      // 暴露 accessToken 给前端
      session.accessToken = token.accessToken;
      return session;
    }
  },
  providers: [
  

    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
      httpOptions: {
        timeout: 160000,
      },
     
    }),
    
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      httpOptions: {
        timeout: 160000,
      },
    })
  
   
  ],

}
// @see ./lib/auth
export default NextAuth(authOptions)
// 

// export {handler as GET  , handler as  POST}
