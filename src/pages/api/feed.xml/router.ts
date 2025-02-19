import RSS from 'rss'

export async function GET() {
  const feed = new RSS({
    title: 'web-share',
    description: '看电视看NSA空对空lads',
    site_url: 'https://yourdomain.com', // 你的网站域名
    feed_url: 'https://yourdomain.com/feed.xml', // 尽可能用绝对 URL
    language: 'zh-CN', // 网站语言代码
    image_url: 'https://yourdomain.com/opengraph-image.png', // 放一个叫 opengraph-image.png 的1200x630尺寸的图片到你的 app 目录下即可
    generator: 'PHP 9.0', // 想写什么就写什么，也可以不提供
  })
  
 
  return new Response(feed.xml(), {
    headers: {
      'content-type': 'application/xml'
    }
  })
}
