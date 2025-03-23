
import type { Metadata } from "next";
import { BoxProvider } from '@/contexts/box-context';
import {  ViewTransitions } from "next-view-transitions";

import H from '../../components/boxheader'

export const metadata: Metadata = {
  title: "openlink-书签|收藏夹",
  description: "打破信息茧房，让信息自由流动，让信息自由分享，让信息自由开放",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return <BoxProvider> <div>
    <H></H>
    
   
      <ViewTransitions>
      {children}
      </ViewTransitions>
     </div>
     </BoxProvider>
  
}
