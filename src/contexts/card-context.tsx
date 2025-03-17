'use client'
import { createContext, useContext, useState } from 'react';

interface CardContextType {
  data:{
    title: string;
    url:string;
    image:string;
    UserFavoriteId:string;
    content: string;
    tags: string[];
  }
  setdata: (data: {
    title: string;
    url:string;
    image:string;
    UserFavoriteId:string;
    content: string;
    tags: string[];
  }) => void;
   
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: React.ReactNode }) {
  const [data,setdata]=useState({
    title: '',
    url:'',
    image:'',
    UserFavoriteId:'',
    content: '',
    tags: ['']
  })
  return (
    <CardContext.Provider value={{ data, setdata }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCard() {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useBox must be used within a BoxProvider');
  }
  return context;
}
