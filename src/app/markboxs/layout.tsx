
import type { Metadata } from "next";
import { BoxProvider } from '@/contexts/box-context';
import { Link, ViewTransitions } from "next-view-transitions";
export const metadata: Metadata = {
  title: "openlink-书签",
  description: "打破信息茧房，让信息自由流动，让信息自由分享，让信息自由开放",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {

  return <BoxProvider>
     <div>
    
      <ViewTransitions>
      {children}
      </ViewTransitions>
     </div>
     </BoxProvider>
  
}
