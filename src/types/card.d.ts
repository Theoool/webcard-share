interface CardProps {
  // Header 部分
  header: {
    title: string;
    url: string;
    logo: string;
    
  };
  // 内容部分
  content: {
    image: string;
    text: string;
    tags?:string[]
  };
  // Footer 部分
 
  dis?:boolean
}
interface TipModel{
  text:string
  Open:boolean
  template:React.ReactNode
}
interface TheoProject{
   url:string,
   name:string,
   icon:React.Node,
   tag:string
}

interface FormData{
  title:string,
  isPublic:boolean,
  content:string
}
