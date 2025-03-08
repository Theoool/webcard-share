import NextAuth, { NextAuthOptions, Session } from "next-auth"
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
export  const authOptions: NextAuthOptions = {
   
  session:{
    strategy:"jwt"
  },
  callbacks:{
    async signIn({ account, profile }) {
      if (account?.provider === 'github' || account?.provider === 'google') {
        // 调用NestJS后端同步用户
        const res:any = await fetch(`${process.env.NEST_URL}/auth/callback`, {
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
      }
      return true
    },
    

  
    async jwt({ token, account }:any) {
     
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
console.log(session);

      return session;
    }
  },
  providers: [
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

}

export default NextAuth(authOptions)

