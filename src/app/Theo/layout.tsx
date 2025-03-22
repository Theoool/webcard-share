import type { Metadata } from "next";

import Link from "next/link";
import { Brush, FileCode, Globe, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const metadata: Metadata = {

    title: "脱离-工具中心",
    description: "智能工具集合，提升您的工作效率，seo建议，网页生成，AI绘画，智能标签，语义搜索，智能书签管理平台，让知识分享更简单，信息获取更高效。",
    keywords:"seo建议，网页生成，AI绘画，智能标签，语义搜索，智能书签管理平台，"
 
};
interface TheoProject {
  name: string;
  tag: string;
  url: string;
  icon: React.ReactNode;
}

const TheoProjects: TheoProject[] = [{
  name:"网页生成",
  tag:"HTML",
  url:"/Theo",
  icon:<FileCode size={20} className="text-blue-500" />
},{
  name:"Seo建议",
  url:"/Theo/Seo",
  tag:"SEO",
  icon:<Globe size={20} className="text-green-500" />
},{
  name:"AI绘画",
  url:"/Theo/Cover",
  tag:"AI",
  icon:<Brush size={20} className="text-purple-500" />
}]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex overflow-hidden min-h-screen">
      <aside className="w-10 border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen sticky top-0 backdrop-blur-sm shadow z-10">
        
        <nav className="flex-1 overflow-y-auto py-6 px-2 ">
          <div className="space-y-3">
            <TooltipProvider delayDuration={100}>
              {TheoProjects.map((project) => (
                <Tooltip key={project.name}>
                  <TooltipTrigger className="w-full" asChild>
                    <Link href={project.url}>
                      <div 
                        className={cn(
                          "group flex items-center overflow-x-hidden py-3 text-sm rounded-xl gap-3",
                          "text-gray-700 dark:text-gray-300",
                          "hover:bg-gray-50 dark:hover:bg-gray-800/40",
                          "border-l-[3px] border-transparent hover:border-l-indigo-500"
                        )}
                      >
                        <div className="flex items-center justify-center w-8 rounded-lg bg-[#f5e4e0] dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700">
                          {project.icon}
                        </div>
                        <span className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 hidden md:block">
                          {project.name}
                        </span>
                        <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-white group-hover:text-indigo-600 dark:group-hover:bg-gray-700 dark:group-hover:text-indigo-400 hidden md:block">
                          {project.tag}
                        </span>
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    className="text-xs bg-gray-900 text-gray-100 dark:bg-gray-800 dark:text-white px-3 py-2 rounded-md shadow"
                  >
                    {project.name} - {project.tag}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#f5e4e0] dark:bg-gray-900/30">
        {children}
      </main>
    </div>
  );
}
