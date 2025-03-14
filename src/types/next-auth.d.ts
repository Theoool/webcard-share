import NextAuth from "next-auth";
declare module "next-auth" {
  /**
   * 扩展 Session 类型
   */
  interface Session {
    accessToken?: string; // 你的自定义属性
    provider?:any
    refreshToken?:any
  }
  interface User{
    id:string
    name:string
    email:string
    image:string
    accessToken:string
    refreshToken:string
  }
  

  /**
   * 扩展 JWT 类型
   */
  interface JWT {
    accessToken?: string;
    refreshToken?: string;

  }
}
