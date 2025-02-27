import NextAuth from "next-auth";
declare module "next-auth" {
  /**
   * 扩展 Session 类型
   */
  interface Session {
    accessToken?: string; // 你的自定义属性
    provider?:any
  }
  

  /**
   * 扩展 JWT 类型
   */
  interface JWT {
    accessToken?: string;
    refreshToken?: string;

  }
}
