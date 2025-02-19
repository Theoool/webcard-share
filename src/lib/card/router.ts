// import { useSession} from "next-auth/react";

import { Session } from "inspector/promises";

// const session=useSession()
const getCardProps = async (url: string) => {
  try {
    const response = await fetch('http://localhost:3000/Card/url', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url:url }),
    });

    // 处理 HTTP 错误状态码 (如 404, 500 等)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
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
const getSEO = async (url: string) => {
  try {
    const response = await fetch('http://localhost:3000/Card/url', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url:url }),
    });
    // 处理 HTTP 错误状态码 (如 404, 500 等)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
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

// {
//   "UserFavoriteId": "cm73n6r7j0001xz27pj6o7wxs",
//   "image": "https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/favicons/apple-touch-icon.png",
//   "tags": [],
//   "title": "十分钟入门prisma",
//   "url": "https://juejin.cn/post/7231152303583100988#heading-10",
//   "content": "本文介绍了如何在 Koa 中使用 Prisma 配合 MySQL 数据库实现数据的增删改查。包括安装依赖、初始化环境、初始化 Prisma、生成 Prisma Client 及 CRUD 操作的实现和注意事项，并总结了 Prisma 的基本使用流程"
// }
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
        'Authorization': `Bearer ${session.accessToken}`,
        // authorization: `Bearer ${localStorage.getItem('token')}`,

      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return { 
      success: false,
      error: error
    };
  }

}



export { getCardProps,addCard}
