
import {NextApiRequest,NextApiResponse} from 'next'
import RSS from 'rss'

export default async function GET(req:NextApiRequest,res:NextApiResponse) {
  const {id}=req.query
  const feed = new RSS({
    title: 'OpenLink',
    description: 'OpenLink 是一个开源的AI书签管理平台，帮助用户轻松保存、分类和分享网页链接。时常更新一些小玩具,加入我们，共同打造一个高效、安全的链接管理工具！',
    site_url: 'https://Theool.com', // 你的网站域名
    feed_url: `https://Theool.com/api/feed/${id}`, // 尽可能用绝对 URL
    language: 'zh-CN', // 网站语言代码
    // image_url: 'https://yourdomain.com/opengraph-image.png', // 放一个叫 opengraph-image.png 的1200x630尺寸的图片到你的 app 目录下即可
    generator: 'node', // 想写什么就写什么，也可以不提供
  })
 
  
  const data= await fetch(`http://localhost:3000/UserFavorites/GetUserFavorite/${id}`,{
    mode: 'cors',
    method: 'GET',
  }).then(res=>res.json())
  
  

   if (data) {
    console.log(data);
    
    
    data.card.forEach((post) => {
      feed.item({
        title: post.title, // 文章名
        guid: post.id, // 文章 ID
        url: post.url, // 文章的链接
        description: post.content, // 文章的介绍，如果有的话
        date: new Date(post.createdAt), // 文章的发布时间
        enclosure: {
          url: post.image, // 文章的图片，如果有的话
        }
      })
    })
   }
 
  // req.body(feed.xml())
 res.setHeader('content-type','application/xml')
 res.status(200).send(feed.xml()) 
}


// export async function GET() {
//   const feed = new RSS({
   
//   })

//   // const data = await fetchData() // 获取文章数据才能填充 RSS feed
//   // // 假设 data 是一个类型为文章的数组：
//   // data.forEach((post) => {
//   //   feed.item({
//   //     title: post.title, // 文章名
//   //     guid: post.id, // 文章 ID
//   //     url: `https://yourdomain.com/blog/${post.slug}`, // 文章的链接
//   //     description: post.description, // 文章的介绍，如果有的话
//   //     date: new Date(post.publishedAt), // 文章的发布时间
//   //     enclosure: {
//   //       url: post.imageUrl, // 文章的图片，如果有的话
//   //     }
//   //   })
//   // })
 
//   return new Response(feed.xml(), {
//     headers: {
//       'content-type': 'application/xml'
//     }
//   })
// }
