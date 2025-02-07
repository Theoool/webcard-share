"use client"
import {FolderSync,Star} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {HoverLink} from "@/components/hoverCard"
import { Button } from '@/components/ui/button';

 interface  Header{
  username:string,
  title:string,
  Avatar:string,
}
  
export function AvatarDemo({src,alt}:any) {
  return (
    <Avatar className=' size-8'>
      <AvatarImage  src={src} alt={alt} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

const Header=({username,title,Avatar}:Header)=>{
  return <div className="p-2 flex  w-full gap-2 ">
  <div  className="w-full  flex-col  md:text-2xl flex gap-2">
 
  <span  className=' text-nowrap truncate'>{title}</span>
  <div className='flex  items-center gap-2 text-base'>
    <AvatarDemo src={Avatar} alt={username}></AvatarDemo>
    <span> {username}的收藏</span>
  </div>
  </div>
  
  </div>

}
const Footer=()=>{
  // 收藏，同步浏览器标签，查看
  const GO=()=>{
    window.postMessage({
      action: 'callExtensionFunction',
      params: { title: '草泥马', url: 'https://example1.com' }
    },  window.location.origin);
    
    // 监听插件返回的结果
    window.addEventListener('message', (event) => {
      console.log('插件返回的数据:', event);
      if (event.data.type === 'extensionResponse') {
        console.log('插件返回:', event.data.result);
      }
    }); 
  }
   return (
    <div className='   m-2 w-full justify-center flex items-center' >
      <Button className='text-white'>
查看更多</Button>
      <div className=' relative m-2  flex justify-end'>

{/* // imp :出现加载动画 */}
<Star className='icon w-8'></Star>
<FolderSync  onClick={()=>GO()} className='icon w-8'></FolderSync>

</div>
    </div>
   )
}

const Cardsbox=({url,urlLong,Avatar,Desc}:any)=>{
  return (
    <div className='flex  cursor-pointer gap-2 hover:bg-slate-500/5 p-2'>
      <img className='w-[33.3%] ' src="https://cdn.sanity.io/images/i81ys0da/production/bd497a82afbf1a4d0eae482beb17bffacb1f4790-1200x675.png" alt="" />
      <div className='text-sm flex flex-col'>
      作者分享零基础转行前端的学习路线。前端入门需 3 - 6 个月，要学 HTML、CSS、JavaScript 及主流框架并实战。还推荐了各阶段学习资料、实战项目和刷题工具。
     <HoverLink  name={url} url={urlLong} avatar={Avatar} Desc={Desc}></HoverLink>
      </div>
    </div>
    
  )
}
const Body=()=>{
  return <div className='p-2'>
     <div className=' relative w-full md:text-xl flex   gap-2 justify-around flex-wrap'>
      <Cardsbox urlLong='https://cali.so/blog/how-to-add-rss-to-your-nextjs-app-router' url='www.diamomd.com' Avatar='https://cali.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPortrait.8d12f14a.png&w=64&q=75'
      Desc='如何给你的 Next.js（App 路由）应用添加 RSS | Cali Castle'
      ></Cardsbox>
      {/* <Cardsbox urlLong='https://cali.so/blog/how-to-add-rss-to-your-nextjs-app-router' url='www.diamomd.com' Avatar='https://cali.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPortrait.8d12f14a.png&w=64&q=75'
      Desc='如何给你的 Next.js（App 路由）应用添加 RSS | Cali Castle'
      ></Cardsbox> */}
      
  {/* <img className=' w-[48%]' src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1mA9TA.img?w=768&h=480&m=4&q=81" alt="" /> */}
</div>



  </div>
}
const CardS=( ) =>{
 return (<div className=" relative m-2 break-inside-avoid max-h-[60rem]  cardboxshow flex flex-col">
  <Header username='Theo' title='一招绝活走天下，曾经苦学数理化：数学和物理入门'
  Avatar='https://github.com/shadcn.png'
  ></Header>
   <Body></Body>
   <Footer></Footer>
 </div>)
} 

const page=()=>{
  return  <div className="flex justify-center   pt-12 @container   ">
 <div className=" w-full flex flex-col gap-2 ">
 <h1 className="text-[2.3rem]  ">挖掘网络的一切可能</h1>
 <h3 className="text-[1.5rem] font-medium">每日发现 </h3>
 <div className=" columns-1 xl:columns-2 gap-4 space-y-4">
          <CardS></CardS>
          <div className='break-inside-avoid max-h-[60rem] h-[50rem] cardboxshow'>
21
          </div>
          <div className='break-inside-avoid max-h-[60rem] h-[20rem] cardboxshow'>
21
          </div>
          {/* <CardS></CardS> */}
          <CardS></CardS>
          
        </div>
 </div>



  </div>

}


// rss的功能就是 可以及时的跟新订阅源，不用每次都去访问网站，但是我要做到功能是用户通过rss来去访问网站，只是这个rss可以用户去编辑，
// 我的网站是否需要支持去订阅rss源呢?
// 用户可以引入一个更新源？


{/* <div className="  leading-10 text-xxl">
1.  随机推送  功能按钮<hr/>
2. AI？标签搜索 or 宝藏挖掘<hr></hr>
3. 网址推荐<hr></hr>
4. 标签同步  功能按钮 同步到浏览器标签上  这个现在变成重点了<hr></hr>
5. aI摘要  ！！！！<hr></hr>
6. 网站/pdf托拽总结关键信息点，生成关联路径/思维导图/内容相似度？   功能按钮   AI重点关照对象<hr></hr>
7. 用户登录 邮箱/github/谷歌 oauth<hr></hr>
8. rss 订阅 这个需要想一个好的方式来完成订阅 <hr></hr>
9. 社区贡献排行00 <hr></hr>
10. 关于我们
11. 分享卡片 寻找各种方式来完成
</div> */}
export default page
