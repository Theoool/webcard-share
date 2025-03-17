'use client'
import { toast } from "@/hooks/use-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
export default function EmailVerification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  const handleEmailVerification = async (token: string) => {
    signIn('credentials', {
      token: token,  // 使用验证返回的token
      redirect: false
    });
  };
 
  useEffect(() => {
    const token = searchParams!.get('token');
    if (!token) {
      toast({
        title: '验证失败',
        description: '无效的验证链接',
      });
      router.push('/login');
      return;
    }
    handleEmailVerification(token);
  }, [searchParams]);

  return (
    <div className="font-serif flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 items-center">
        {verifying ? (
          <div className="text-xl">验证中...</div>
        ) : verified ? (
          <>
            <div className="text-xl text-green-500">验证成功！</div>
            <div className="text-sm text-gray-500">3秒后自动跳转到登录页...</div>
          </>
        ) : (
          <div className="text-xl text-red-500">验证失败</div>
        )}
      </div>
    </div>
  );
}
