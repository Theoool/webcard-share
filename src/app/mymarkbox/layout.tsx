
import type { Metadata } from "next";
import { Link, ViewTransitions } from "next-view-transitions";

import H from './boxheader'

export const metadata: Metadata = {
  title: "webcard-share",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return  <div>
    <H></H>
      <ViewTransitions>
      {children}
      </ViewTransitions>
     </div>
  
}
