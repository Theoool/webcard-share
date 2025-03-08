interface CardProps {
  // Header 部分
  header: {
    title: string;
    url: string;
    logo: string;
    
  };
  // 内容部分
  content: {
    imageUrl: string;
    text: string;
    tags?:string[]
  };
  // Footer 部分
  footer: {
    source: string;
    time: string;
  };
  dis?:boolean
}
