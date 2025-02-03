"use client"
import Image from "next/image";
import Card from '@/components/card'



export default function Home() {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('上传的文件:', file);
      // 这里可以添加您的文件处理逻辑
    }
  };
  return (
    <div className=" text-3xl  ">
      <h1 className="w-full text-center p-8  font-sans">键入网址，创建属于你的网页合集</h1>
      <div className=" xl:px-40 flex flex-col  h-[100rem]   items-center ">
        <input 
          type="text"
          placeholder="输入消息或上传图片..."
          className="h-20 font-mono w-2/3 px-12 rounded-md file:text-xl border-black border-[1px] mt-2"
        />
       <Card
  header={{
    title: "「櫻田詩露」参考資料",
    url: "https://shiro.page/?lang=zh",
    logo: "https://shiro.page/og_image_zh.jpg?ver=240825"
  }}
  content={{
    imageUrl: "https://shiro.page/img/sakurada_shiro_spring.png",
    text: "Google Fonts 提供了多种开源的优质字Google Fonts 提供了多种开源的优质字Google Fonts 提供了多种开源的优质字Google Fonts 提供了多种开源的优质字Google Fonts 提供了多种开源的优质字Google Fonts 提供了多种开源的优质字Google Fonts 提供了多种开源的优质字Google Fonts 提供了多种开源的优质字Google Fonts 提供了多种开源的优质字Google Fonts 提供了多种开源的优质字Google Fonts 提供了多种开源的优质字体，可以在任何项目中使用..."
  }}
  footer={{
    source: "webshare.com",
    time: "2025-1-1"
  }}
/>
      </div>
     

    </div>
  )
}
