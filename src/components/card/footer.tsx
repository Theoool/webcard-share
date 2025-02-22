import clsx from "clsx";
import { Share, Star } from "lucide-react";
import React from "react";

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
        <span> {source}</span>
        <span> {time}</span>
      </div>
      <div className="flex justify-end gap-6">
        <Star
         className='icon'
          onClick={handleStarClick}
        />
        <Share
        className='icon'
        />
      </div>
    </div>
  );
}
export default Footer;
