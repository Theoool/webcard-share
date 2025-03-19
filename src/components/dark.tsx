"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";


 const DarkModeBtn = () => {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const root = window.document.documentElement;
    const initialIsDark = localStorage.getItem("isDarkMode") === "true";
    setIsDark(initialIsDark);
    root.classList.toggle("dark", initialIsDark);
    
  },[]);
  const toggleDark=(event?: MouseEvent|any) =>{
   
    // @ts-expect-error experimental API
      const isAppearanceTransition = document.startViewTransition
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!isAppearanceTransition) {
        setIsDark(!isDark)
        handleThemeChange()
        return
      }
      const x = event?.clientX || window.innerWidth / 2
      const y = event?.clientY || window.innerHeight / 2
      
      //获得网页大小
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      )
      //结束时的大小
     
      const transition = document.startViewTransition(async () => {
        setIsDark(!isDark) 
        handleThemeChange()
        
      })
      transition.ready
        .then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ]
          document.documentElement.animate(
            {
              clipPath: isDark
                ? [...clipPath].reverse()
                : clipPath,
              
            },
            {
              duration: 400,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              pseudoElement: isDark
                ? '::view-transition-old(root)'
                : '::view-transition-new(root)',
            },
          )

        })
  }
  const handleThemeChange = () => {
    const root = window.document.documentElement;
    const newIsDark = !isDark;
    root.classList.toggle("dark", newIsDark);
    localStorage.setItem("isDarkMode", String(newIsDark));
  };
  return (
    <div
    className="cursor-pointer hover:text-yellow-500 hover:dark:text-green-400 transition-all duration-300"
      onClick={(e)=>toggleDark(e)}
    >
      {isDark ?  <SunIcon
      className="icon transition-transform duration-300 hover:rotate-12"
      ></SunIcon>: <MoonIcon
      className="icon transition-transform duration-300 hover:rotate-12"
      ></MoonIcon>
      }
    </div>
  );
};
export default DarkModeBtn
