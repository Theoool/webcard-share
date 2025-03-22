"use client";
import { Button } from "@/components/ui/button";
import { Description } from "@radix-ui/react-toast";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Settings, LogOut, Mail, Share2, BookMarked } from "lucide-react";
import GradientText from "@/components/GradientText";

const logout = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/logout`);
    await signOut({ redirect: true });
  } catch (error) {
    console.log(error);
  }
};

const UserProfile = ({ session }) => (
  <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl w-full space-y-12"
    >
      <div className="space-y-6 text-center">
        <motion.div 
          style={{'viewTransitionName':`Avatar`}} 
          className="w-32 h-32 mx-auto relative mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={session.user?.image ?? ""}
            alt={session.user?.name ?? ""}
            className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-700 shadow-xl"
          />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-light tracking-tight">
            <GradientText>{session.user?.name}</GradientText>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{session.user?.email}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
          <Link href="/me/settings">
            <Button 
              variant="outline" 
              className="w-full py-6 flex flex-col items-center gap-2 hover:bg-[#dd8f9a] hover:text-[#f7e4dd] transition-all duration-300"
            >
              
              <span>设置</span>
            </Button>
          </Link>
          
          <Link href="/mymarkbox">
            <Button 
              variant="outline" 
              className="w-full py-6 flex flex-col items-center gap-2 hover:bg-[#dd8f9a] hover:text-[#f7e4dd] transition-all duration-300"
            >
             
              <span>书签</span>
            </Button>
          </Link>

          <Link href="/markboxs">
            <Button 
              variant="outline" 
              className="w-full py-6 flex flex-col items-center gap-2 hover:bg-[#dd8f9a] hover:text-[#f7e4dd] transition-all duration-300"
            >
             
              <span>分享</span>
            </Button>
          </Link>

          <Button 
            variant="outline" 
            className="w-full py-6 flex flex-col items-center gap-2 hover:bg-[#dd8f9a] hover:text-[#f7e4dd] transition-all duration-300"
            onClick={logout}
          >
            
            <span>退出</span>
          </Button>
        </div>
      </div>
    </motion.div>
  </div>
);

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button 
            variant="link" 
            className="text-4xl font-light hover:text-primary transition-colors duration-300"
          >
            <Link href="/login">开始你的探索之旅</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return <UserProfile session={session} />;
}
