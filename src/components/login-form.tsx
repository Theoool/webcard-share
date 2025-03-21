'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [loginStep, setLoginStep] = useState<'methods' | 'email' | 'verification'|"ok"|"error">('methods')
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [codeError, setCodeError] = useState('')
  const [networkError, setNetworkError] = useState(false)
  
  const SendEmail = async ({email}) => {
    try {
      setNetworkError(false)
      const result = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/send-verification`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email}),
      })
      
      if (!result.ok) {
        const errorData = await result.json().catch(() => ({}));
        throw new Error(errorData.message || '发送验证码失败');
      }
      
      return result
    } catch (error) {
      setNetworkError(true)
      throw error;
    }
  };
  
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setEmailError('请输入邮箱地址')
      return
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('请输入有效的邮箱地址')
      return
    }
    
    setEmailError('')
    setNetworkError(false)
    setIsLoading(true)
    
    try {
      await SendEmail({email})
      setLoginStep('verification')
    } catch (error) {
      console.error('Failed to send verification code:', error)
      toast({
        title: '发送验证码失败',
        description:  '请检查网络连接后重试',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!verificationCode) {
      setCodeError('请输入验证码')
      return
    }
    
    if (verificationCode.length < 6) {
      setCodeError('验证码长度不正确')
      return
    }
    
    setCodeError('')
    setNetworkError(false)
    setIsLoading(true)
    
    try {
      const result = await signIn('credentials', {
        email,
        code: verificationCode,
        redirect: true,
      })

      if (result?.error) {
        setCodeError('验证码错误')
        toast({
          title: '验证失败',
          description: '验证码错误或已过期，请重试',
          variant: 'destructive'
        })
        return
      }
      
      toast({
        title: '登录成功',
        description: '欢迎回来！',
      })
      setLoginStep('ok')
    } catch (error) {
      console.error('Verification failed:', error)
      setNetworkError(true)
      toast({
        title: '登录失败',
        description: '网络错误或服务器异常，请稍后重试',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    if (loginStep === 'verification') {
      setLoginStep('email')
    } else {
      setLoginStep('methods')
    }
  }
 


  return (
    <div className={cn("flex flex-col items-center gap-6", className)} {...props}>
      <div className={cn("flex flex-col gap-6 w-72", className)}>
        <div>
          {loginStep === 'methods' && (
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-72 text-[#E3E4E6] bg-[#1e2025] h-12" onClick={() => signIn('github',{
                redirect:true
              })}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                  <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/>
                </svg>
                使用 GitHub 登录
              </Button>
              <Button variant="outline" className="w-72 text-[#e3e4e6] bg-[#1e2025] h-12" onClick={() => signIn('google')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                使用 Google 登录
              </Button>
              <Button 
                variant="outline" 
                className="w-72 text-[#e3e4e6] bg-[#1e2025] h-12" 
                onClick={() => setLoginStep('email')}
              >
                <Mail className="mr-2 h-5 w-5" />
                使用邮箱登录
              </Button>
            </div>
          )}

          {loginStep === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="flex items-center mb-4">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 mr-2" 
                  onClick={goBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-medium">输入您的邮箱</h2>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">邮箱地址</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError('')
                  }}
                  placeholder="your@email.com"
                  className={`h-12 ${emailError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  required
                />
                {emailError && <p className="text-sm text-red-500">{emailError}</p>}
              </div>
              
              {networkError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md">
                  网络连接错误，请检查您的网络连接后重试
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-[#1e2025] text-[#e3e4e6]"
                disabled={isLoading || !email}
              >
                {isLoading ? "发送中..." : "发送验证码"}
              </Button>
            </form>
          )}

          {loginStep === 'verification' && (
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div className="flex items-center mb-4">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 mr-2" 
                  onClick={goBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-medium">验证您的邮箱</h2>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground mb-4">
                  我们已向 <span className="font-medium text-foreground">{email}</span> 发送了验证码，
                  请检查您的邮箱并输入验证码。
                </div>
                
                <Label htmlFor="code">验证码</Label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value)
                    setCodeError('')
                  }}
                  placeholder="十位数字验证码"
                  className={`h-12 text-center text-lg tracking-widest ${codeError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  maxLength={10}
                  required
                />
                {codeError && <p className="text-sm text-red-500">{codeError}</p>}
              </div>
              
              {networkError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md">
                  网络连接错误，请检查您的网络连接后重试
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-[#1e2025] text-[#e3e4e6]"
                disabled={isLoading || verificationCode.length < 6}
              >
                {isLoading ? "验证中..." : "验证并登录"}
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                <button 
                  type="button" 
                  className="text-primary hover:underline" 
                  onClick={handleEmailSubmit}
                  disabled={isLoading}
                >
                  没有收到验证码？重新发送
                </button>
              </div>
            </form>
          )}
          {loginStep === 'ok' && (
            <form  className="space-y-4">
           
             <h1 className="text-xl flex flex-col gap-2 m-2">欢迎回来<span className="font-medium text-foreground">{email}</span></h1>
              
            <Link href={"/"}>  <Button 
                type="submit" 
                className="w-full h-12 bg-[#1e2025] text-[#e3e4e6]"
                disabled={isLoading || verificationCode.length < 6}
              >
                到主页去
              </Button></Link>
              
            </form>
          )}
        
        </div>
      </div>
      <div className="text-balance w-72 text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-black [&_a]:hover:dark:text-primary [&_a]:dark:hover:text-black">
        <Link href={'/signup'}>还没有账号点击注册</Link>
      </div>
      <div className="text-balance w-72 text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-black [&_a]:hover:dark:text-primary [&_a]:dark:hover:text-black">
       
        点击继续，即表示您同意我们的 <a >服务条款</a>{" "}
        和 <a >隐私政策</a>。
      </div>
    </div>
  )
}
