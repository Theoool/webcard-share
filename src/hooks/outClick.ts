import { useRef, useEffect } from 'react';

// 定义 Hook 的返回类型和参数类型
function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T | null>(null);

  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      event.preventDefault(); 
      if (ref.current && !ref.current.contains(event.target as Node)) {
       
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
   
    
  }, [callback]);

  return ref;
}


export {useClickOutside}
