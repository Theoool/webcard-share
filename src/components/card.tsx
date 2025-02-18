'use client';
import { ExternalLink, Star } from 'lucide-react';
import React from 'react';
import { CardMenubar } from '@/components/menubar';
import { Share } from '@/components/share';
import clsx from 'clsx';
interface HeaderProps {
  title: string;
  url: string;
  logo: string;
}

function Header({ title, url, logo }: HeaderProps) {
  return (
    <div className="flex w-full gap-10 justify-between">
      <div className="flex w-full gap-10 items-center">
       { logo&&<img className="h-8" src={logo} alt={`${title} logo`} />}
        <a href={url} className="text-sm line-clamp-1 text-light">
          {title}
        </a>
      </div>
      <div>
        <CardMenubar />
      </div>
    </div>
  );
}
interface FooterProps {
  source: string;
  time: string;
  onStarClick?: () => void; // 可选交互回调
}

function Footer({ source, time, onStarClick }: FooterProps) {
  const [show, setShow] = React.useState(false);

  const handleStarClick = () => {
    setShow((prev) => !prev);
    onStarClick?.(); // 触发外部回调
  };

  return (
    <div className="flex justify-between h-5 mt-2 items-center">
      <div className="text-[1.2rem] text-light flex gap-5">
        <span>by {source}</span>
        <span>time: {time}</span>
      </div>
      <div className="flex justify-end gap-6">
        <Star
          className={clsx('icon', { 'text-black': !show })}
          onClick={handleStarClick}
        />
        <Share />
      </div>
    </div>
  );
}



const Card = ({ header, content, footer }: CardProps) => {
  return (
    <div className="w-full min-h-[15rem] flex flex-col p-4 mt-2 cardboxshow @container">
      <Header {...header} />
      <div className="flex flex-col md:items-center leading-6  gap-2">
       
    {content.imageUrl.length>8&&<img className="md:h-[10rem] w-full md:w-auto  ease-linear 
    object-cover" src={content.imageUrl} alt="Content" />}

  <p className="text-[1rem] leading-2 ">{content.text.split('关键词')[0]}</p>
  <hr></hr>
  <p className="text-[1rem] leading-2">{content.text.split('关键词')[1]}</p>
</div>
      <Footer {...footer} />
    </div>
  );
};  
export default Card;
