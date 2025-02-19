
import {Cardsbox} from '@/components/cardshare'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Tolbox from '@/components/tolbox'
import Users from '@/components/home/Users'

export async function generateStaticParams() {  
  // const posts = await fetch('https://.../posts').then((res) => res.json())
  return [
    { slug: 'about' },   // 对应路径 /home/about
    { slug: 'contact' }, // 对应路径 /home/contact
    { slug: 'pricing' }  // 对应路径 /home/pricing
  ];
}

const data={
  title:'一个梦想的开始p公开/私密   导出/导入（插件功能）cmwk',
  authorname:"theo",
  createTime:"20122222",
  carddata:[{
    urlLong:'https://cali.so/blog/how-to-add-rss-to-your-nextjs-app-router',
     url:'www.diamomd.com' ,
     Avatar:'https://cali.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPortrait.8d12f14a.png&w=64&q=75',
      Content:' 作者分享零基础转行前端的学习路线。前端入门需 3 - 6 个月，要学 HTML、CSS、JavaScript 及主流框架并实战。还推荐了各阶段学习资料、实战项目和刷题工具。',
      Desc:'如何给你的 Next.js（App 路由）应用添加 RSS | Cali Castle'
   
  },{
    urlLong:'https://cali.so/blog/how-to-add-rss-to-your-nextjs-app-router',
     url:'www.diamomd.com' ,
     Avatar:'https://cali.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPortrait.8d12f14a.png&w=64&q=75',
      Content:' 作者分享零基础转行前端的学习路线。前端入门需 3 - 6 个月，要学 HTML、CSS、JavaScript 及主流框架并实战。还推荐了各阶段学习资料、实战项目和刷题工具。',
      Desc:'如何给你的 Next.js（App 路由）应用添加 RSS | Cali Castle'
   
  },{
    urlLong:'https://cali.so/blog/how-to-add-rss-to-your-nextjs-app-router',
     url:'www.diamomd.com' ,
     Avatar:'https://cali.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPortrait.8d12f14a.png&w=64&q=75',
      Content:' 作者分享零基础转行前端的学习路线。前端入门需 3 - 6 个月，要学 HTML、CSS、JavaScript 及主流框架并实战。还推荐了各阶段学习资料、实战项目和刷题工具。',
      Desc:'如何给你的 Next.js（App 路由）应用添加 RSS | Cali Castle'
   
  },{
    urlLong:'https://cali.so/blog/how-to-add-rss-to-your-nextjs-app-router',
     url:'www.diamomd.com' ,
     Avatar:'https://cali.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPortrait.8d12f14a.png&w=64&q=75',
      Content:' 作者分享零基础转行前端的学习路线。前端入门需 3 - 6 个月，要学 HTML、CSS、JavaScript 及主流框架并实战。还推荐了各阶段学习资料、实战项目和刷题工具。',
      Desc:'如何给你的 Next.js（App 路由）应用添加 RSS | Cali Castle'
   
  },{
    urlLong:'https://cali.so/blog/how-to-add-rss-to-your-nextjs-app-router',
     url:'www.diamomd.com' ,
     Avatar:'https://cali.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPortrait.8d12f14a.png&w=64&q=75',
      Content:' 作者分享零基础转行前端的学习路线。前端入门需 3 - 6 个月，要学 HTML、CSS、JavaScript 及主流框架并实战。还推荐了各阶段学习资料、实战项目和刷题工具。',
      Desc:'如何给你的 Next.js（App 路由）应用添加 RSS | Cali Castle'
   
  },{
    urlLong:'https://cali.so/blog/how-to-add-rss-to-your-nextjs-app-router',
     url:'www.diamomd.com' ,
     Avatar:'https://cali.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPortrait.8d12f14a.png&w=64&q=75',
      Content:' 作者分享零基础转行前端的学习路线。前端入门需 3 - 6 个月，要学 HTML、CSS、JavaScript 及主流框架并实战。还推荐了各阶段学习资料、实战项目和刷题工具。',
      Desc:'如何给你的 Next.js（App 路由）应用添加 RSS | Cali Castle'
   
  },{
    urlLong:'https://cali.so/blog/how-to-add-rss-to-your-nextjs-app-router',
     url:'www.diamomd.com' ,
     Avatar:'https://cali.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPortrait.8d12f14a.png&w=64&q=75',
      Content:' 作者分享零基础转行前端的学习路线。前端入门需 3 - 6 个月，要学 HTML、CSS、JavaScript 及主流框架并实战。还推荐了各阶段学习资料、实战项目和刷题工具。',
      Desc:'如何给你的 Next.js（App 路由）应用添加 RSS | Cali Castle'
   
  },]
}


function Footer(){
    {/* //删除  //邀请 //分享 卡片二维码  //RSS //添加   
        // 公开/私密   导出/导入（插件功能）  //阅读  //标注（以后再更新）
        //拖拽Ai，网页对比，网页思维导图
         //离线阅读 //pdf/html下载
    */}

 return <div className='h-[5vh]'>


 </div>
}

export default function Page() {
  return  <div className=" @container animate-fade-down  flex-10 p2 m2 flex
  flex-col sm:flex-row
  justify-center">
  
<div className="flex-grow-1  hidden sm:flex">1</div> 
     <div className="flex-grow-2 flex flex-col xl:w-[58%]  md:w-[70%]  w-full    m-2">
   <div className='flex   justify-center text-xl w-full flex-wrap'>
       
   {data.title}
  <Users></Users>
   </div>
   <ScrollArea className=" h-[75vh] sm:h-[80vh] w-full rounded-md  ">
   {  data.carddata.map((el,index)=>{
        return  <Cardsbox  key={index} data={el}
        ></Cardsbox>
      })}
      <Separator className=' '></Separator>
       </ScrollArea>

      </div>  {/* 设置为2 */}

     
     <div className="flex-grow-1  p-2 items-center    sm:flex">
      <Tolbox></Tolbox>
      </div>  {/* 设置为1 */}
  </div>
}

