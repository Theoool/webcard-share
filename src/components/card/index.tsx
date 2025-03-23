'use client';

import React, { useReducer, useState } from 'react';
import { PencilOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Favicon } from 'favicon-stealer';
import { addCard } from '@/lib/card/router';
import { useSession } from 'next-auth/react';
import { ComboboxDemo } from '../combobox';
import HoverText from '../HoverText';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { CardDescription } from '../ui/card';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';

// 定义类型
interface CardData {
  finalSummary?: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
    image: string;
    logo: string;
  };
  
}

interface CardState {
  title: string;
  url: string;
  logo: string;
  image: string;
  text: string;
  tags: string[];
  isEditingTitle: boolean;
  isEditingTags: boolean;
  isText:boolean;
  newTagText: string;
  selectedCollectionId: string;
}

type CardAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'TOGGLE_TITLE_EDIT' }
  | { type: 'TOGGLE_TAGS_EDIT' }
  | { type: 'TOGGLE_TEXT_EDIT' }
  | { type: 'SET_NEW_TAG_TEXT'; payload: string }
  | { type: 'SET_TEXT'; payload: string }
  | { type: 'ADD_TAG'; payload: string }
  | { type: 'REMOVE_TAG'; payload: number }
  | { type: 'SET_COLLECTION_ID'; payload: string };

// 状态管理的reducer函数
function cardReducer(state: CardState, action: CardAction): CardState {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'TOGGLE_TITLE_EDIT':
      return { ...state, isEditingTitle: !state.isEditingTitle };
    case 'TOGGLE_TAGS_EDIT':
      return { ...state, isEditingTags: !state.isEditingTags };
    case 'TOGGLE_TEXT_EDIT':
      return { ...state, isText: !state.isText };
    case 'SET_NEW_TAG_TEXT':
      return { ...state, newTagText: action.payload };
    case 'SET_TEXT':
      return { ...state, text: action.payload };
    case 'ADD_TAG':
      // 确保标签不超过8个字符
      if (action.payload.length > 8) {
        console.log("标签不能超过八个字");
        return state;
      }
      return { 
        ...state, 
        tags: [action.payload, ...state.tags],
        newTagText: '' 
      };
    case 'REMOVE_TAG':
      return { 
        ...state, 
        tags: state.tags.filter((_, i) => i !== action.payload) 
      };
    case 'SET_COLLECTION_ID':
      return { ...state, selectedCollectionId: action.payload };
    default:
      return state;
  }
}

// 标题组件
const CardHeader: React.FC<{
  title: string;
  url: string;
  logo: string;
  isEditing: boolean;
  onToggleEdit: () => void;
  onTitleChange: (title: string) => void;
}> = ({ title, url, logo, isEditing, onToggleEdit, onTitleChange }) => {
  return (
    <div className="flex w-full gap-4 justify-between items-center mb-4">
      <div className="flex w-full gap-3 items-center">
        {logo ? (
          <img className="h-8 w-8 object-contain" src={logo} alt={`${title} logo`} />
        ) : (
          <Favicon url={url} />
        )}

        {isEditing ? (
          <div className="w-full">
            <input
              autoFocus
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onToggleEdit();
                }
              }}
              className="text-sm w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm px-1"
            />
          </div>
        ) : (
          <span
            onClick={onToggleEdit}
            className="text-sm line-clamp-1 text-light cursor-pointer hover:bg-black/5 hover:px-1 transition-all rounded-sm"
            title="点击编辑标题"
          >
            {title}
          </span>
        )}
      </div>
    </div>
  );
};

// 标签组件
const CardTags: React.FC<{
  tags: string[];
  isEditing: boolean;
  newTagText: string;
  onToggleEdit: () => void;
  onNewTagTextChange: (text: string) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
}> = ({ 
  tags, 
  isEditing, 
  newTagText, 
  onToggleEdit, 
  onNewTagTextChange, 
  onAddTag, 
  onRemoveTag 
}) => {
  return (
    <div className="mt-4">
      <div className="flex gap-2 items-start">
        <div className="flex gap-1 flex-wrap p-2">
          {tags.map((tag, index) => (
            <AnimatePresence key={`${tag}-${index}`}>
              <motion.div
                layout
                initial={{ y: 10, opacity: 0, scale: 0.8 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  transition: { type: "spring", stiffness: 200, damping: 20 }
                }}
                exit={{
                  y: -20,
                  opacity: 0,
                  scale: 0.8,
                  transition: { duration: 0.15 }
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.15 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  mass: 0.5
                }}
                className="flex items-center"
              >
                <Badge
                  variant="outline"
                  className="text-[1rem] cursor-pointer hover:bg-black/5 transition-colors duration-200"
                >
                  {tag}
                </Badge>
                {isEditing && (
                  <motion.span
                    onClick={() => onRemoveTag(index)}
                    className="relative z-10 cursor-pointer ml-2"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <PencilOff className="hover:text-red-600" size={15} />
                  </motion.span>
                )}
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
        <PencilOff 
          className="icon cursor-pointer" 
          onClick={onToggleEdit}
        />
      </div>

      {isEditing && (
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.15
            }
          }}
          exit={{
            y: -20,
            opacity: 0,
            scale: 0.95,
            transition: {
              duration: 0.12,
              ease: "easeIn"
            }
          }}
          className="text-center mt-2"
        >
          <Input
            value={newTagText}
            placeholder="输入标签并按回车添加"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newTagText.trim()) {
                onAddTag(newTagText.trim());
              }
            }}
            onChange={(event) => onNewTagTextChange(event.target.value)}
            className="focus-visible:ring-2 w-full max-w-[18rem] mx-auto text-center ring-blue-500 transition-all"
          />
        </motion.div>
      )}
    </div>
  );
};

// 卡片底部组件
const CardFooter: React.FC<{
  cardState: CardState;
  onCollectionChange: (id: string) => void;
  onSaveCard: () => void;
}> = ({ cardState, onCollectionChange, onSaveCard }) => {
  return (
    <div className="flex justify-end h-5 mt-4 items-center">
      <ComboboxDemo 
        Clickfunction={onCollectionChange} 
         title={''}
        ID={cardState.selectedCollectionId}
      />
      <HoverText text="保存书签">
        <Bookmark className="icon cursor-pointer" onClick={onSaveCard} />
      </HoverText>
    </div>
  );
};

// 主卡片组件
const Card: React.FC<{ cardData: CardData,AI?:boolean }> = ({ cardData,AI=open}) => {
  const { data: session } = useSession();
  let summaryText, keywordsList,keywordsText;
  // 解析摘要和关键词
  if (!AI) {
     summaryText = cardData.meta.description||"暂无描述"
     keywordsText = cardData.meta.keywords||"";
     keywordsList = keywordsText.split(',').filter((_, index) => index > 0).map(k => k.trim())||[cardData.meta.keywords];
    
  }else{
     
   summaryText = cardData.finalSummary!.split('# 关键词')[0].split("摘要内容")[1]?.trim() || '暂无描述';
   keywordsText = cardData.finalSummary!.split('关键词')[1] || '';
   keywordsList = keywordsText.split('丨').filter((_, index) => index > 0).map(k => k.trim());
  
  }
 
  // 使用reducer管理状态
  const [state, dispatch] = useReducer(cardReducer, {
    title: cardData.meta.title,
    url: '',
    logo: cardData.meta.logo,
    image: cardData.meta.image,
    text: summaryText,
    tags: keywordsList,
    isText:false,
    isEditingTitle: false,
    isEditingTags: false,
    newTagText: '',
    selectedCollectionId: ''
  });

  // 保存卡片
  const handleSaveCard = async () => {
    try {
      const cardToSave = {
        UserFavoriteId: state.selectedCollectionId,
        title: state.title,
        url: state.url || window.location.href,
        image: state.image,
        tags: state.tags,
        content: state.text
      };
   await addCard(cardToSave, session?.accessToken);
    
        toast({
          title: "添加卡片成功",
          description: "做的非常好，感谢你为这个环境做的贡献",
          duration:2000
               
        })
    
    } catch (error) {
      toast({
        title: "Uh oh! 发生了一些错误.",
        description: "There was a problem with your request.",
        duration:2000      
      })
      console.error('保存卡片失败:', error);
    }
  };

  return (
    <div className="w-full relative min-h-[15rem] flex flex-col justify-between p-4 mt-2 cardboxshow @container rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader
        title={state.title}
        url={state.url}
        logo={state.logo}
        isEditing={state.isEditingTitle}
        onToggleEdit={() => dispatch({ type: 'TOGGLE_TITLE_EDIT' })}
        onTitleChange={(title) => dispatch({ type: 'SET_TITLE', payload: title })}
      />
      
      <div className="flex flex-col md:items-center leading-6 gap-2">
        {state.image && (
          <img 
            className="h-[10rem] w-auto ease-linear object-contain rounded-md" 
            src={state.image} 
            alt={state.title} 
          />
        )}

       {!state.isText?<CardDescription

       onClick={()=>{
        dispatch({ type: 'TOGGLE_TEXT_EDIT' });
       }}
       className="text-[1rem] leading-6 flex-w whitespace-pre-line hover:bg-black/5">{state.text}</CardDescription>
       :<Textarea className="text-[1rem] leading-6 flex-w whitespace-pre-line"
        value={state.text}
        onKeyDown={(e)=>{
          if (e.key==='Enter'||e.key==='Tab') {
            dispatch({ type: 'TOGGLE_TEXT_EDIT' });
            
          }
        }}
        onChange={(e)=>{
          dispatch({ type: 'SET_TEXT', payload: e.target.value });
        }}
        ></Textarea>
      }
        <hr className="w-full my-2 border-gray-200 dark:border-gray-700" />
        
        <CardTags
          tags={state.tags}
          isEditing={state.isEditingTags}
          newTagText={state.newTagText}
          onToggleEdit={() => dispatch({ type: 'TOGGLE_TAGS_EDIT' })}
          onNewTagTextChange={(text) => dispatch({ type: 'SET_NEW_TAG_TEXT', payload: text })}
          onAddTag={(tag) => dispatch({ type: 'ADD_TAG', payload: tag })}
          onRemoveTag={(index) => dispatch({ type: 'REMOVE_TAG', payload: index })}
        />
      </div>
      
     { session?<CardFooter
        cardState={state}
        onCollectionChange={(id) => dispatch({ type: 'SET_COLLECTION_ID', payload: id })}
        onSaveCard={handleSaveCard}
      />:<div className='text-sm '>保存的话需要<Link href={'/signup'}><Button className='  line-clamp-none text-red-400' variant={'link'}><span className=' font-bold'>登录</span></Button></Link></div>} </div>
  );
};

export default Card;
