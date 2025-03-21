'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Mail, User, Lock } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [image, setImage] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [signupStep, setSignupStep] = useState<'methods' | 'email' | 'verification' | 'userInfo'>('methods')
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [codeError, setCodeError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [imageError, setImageError] = useState('')
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
          email
        }),
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

  const verifyCode = async ({verificationCode}) => {
    try {
      setNetworkError(false)
      const result = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/verify/?code=${verificationCode}&email=${email}`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email
        }),
      })
      
      if (!result.ok) {
        throw new Error('验证码验证失败');
      }
      
      return result.json()
    } catch (error) {
      setNetworkError(true)
      throw error;
    }
  };
  
  const Signup = async ({email, username, image}) => {
    try {
      setNetworkError(false)
      const result = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/signup`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          image,
          username,
        }),
      })
      
      if (!result.ok) {
        const errorData = await result.json().catch(() => ({}));
        throw new Error(errorData.message || '注册失败');
      }
      
      return result.json()
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
      // 发送验证码
      await SendEmail({email})
      
      setSignupStep('verification')
      toast({
        title: '验证码已发送',
        description: `验证码已发送至 ${email}，请查收`,
      })
    } catch (error) {
      console.error('邮箱验证失败:', error)
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
      // 验证码验证
      const result = await verifyCode({verificationCode})
      
      if (result.success) {
        setSignupStep('userInfo')
        toast({
          title: '验证成功',
          description: '请完善您的个人信息',
        })
      } else {
        setCodeError('验证码错误或已过期')
        toast({
          title: '验证失败',
          description: '验证码错误或已过期，请重新获取',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('验证失败:', error)
      toast({
        title: '验证失败',
        description:  '网络错误或服务器异常，请稍后重试',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const validateImageUrl = (url) => {
    // 简单验证URL格式
    const urlRegex = /^(https?:\/\/)?([\w\-])+\.([\w\-\.]+)([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
    if (!urlRegex.test(url)) {
      return false;
    }
    return true;
  }

  const handleUserInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 验证用户名
    if (!username) {
      setUsernameError('请输入用户名')
      return
    }
    
    if (username.length < 2) {
      setUsernameError('用户名至少需要2个字符')
      return
    }
    
    // 验证头像URL
    if (!image) {
      setImageError('请输入头像URL')
      return
    }
    
    if (!validateImageUrl(image)) {
      setImageError('请输入有效的图片URL')
      return
    }
    
    setUsernameError('')
    setImageError('')
    setNetworkError(false)
    setIsLoading(true)
    
    try {
      // 注册用户
      const result = await Signup({email, username, image})
      if (result.accessToken) {
        const signInResult = await signIn("credentials", {
          email,
          code: verificationCode,
          redirect: false,
        })
        
        if (signInResult?.error) {
          throw new Error('自动登录失败，请手动登录')
        }
       
        toast({
          title: '注册成功',
          description: '欢迎加入我们！',
        })
        
        // 注册成功，重定向到首页
        router.push('/')
      } else {
        throw new Error(result.message || '注册失败，请稍后重试')
      }
    } catch (error) {
      console.error('注册失败:', error)
      toast({
        title: '注册失败',
        description:  '服务器错误，请稍后重试',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    if (signupStep === 'userInfo') {
      setSignupStep('verification')
    } else if (signupStep === 'verification') {
      setSignupStep('email')
    } else {
      setSignupStep('methods')
    }
  }

  return (
    <div className={cn("flex flex-col items-center gap-6", className)} {...props}>
      <div className={cn("flex flex-col gap-6 w-72", className)}>
        <div>
          {signupStep === 'methods' && (
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-72 text-[#E3E4E6] bg-[#1e2025] h-12" onClick={() => signIn('github',{
                redirect:true
              })}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                  <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/>
                </svg>
                使用 GitHub 注册
              </Button>
              <Button variant="outline" className="w-72 text-[#e3e4e6] bg-[#1e2025] h-12" onClick={() => signIn('google')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                使用 Google 注册
              </Button>
              <Button 
                variant="outline" 
                className="w-72 text-[#e3e4e6] bg-[#1e2025] h-12" 
                onClick={() => setSignupStep('email')}
              >
                <Mail className="mr-2 h-5 w-5" />
                使用邮箱注册
              </Button>
            </div>
          )}

          {signupStep === 'email' && (
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

          {signupStep === 'verification' && (
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
                {isLoading ? "验证中..." : "验证"}
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

          {signupStep === 'userInfo' && (
            <form onSubmit={handleUserInfoSubmit} className="space-y-4">
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
                <h2 className="text-lg font-medium">完善您的信息</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">用户名</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value)
                        setUsernameError('')
                      }}
                      placeholder="用户名"
                      className={`h-12 pl-10 ${usernameError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      required
                    />
                  </div>
                  {usernameError && <p className="text-sm text-red-500">{usernameError}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">头像URL</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="image"
                      name="image"
                      type="text"
                      value={image}
                      onChange={(e) => {
                        setImage(e.target.value)
                        setImageError('')
                      }}
                      placeholder="设置头像URL"
                      className={`h-12 pl-10 ${imageError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      required
                    />
                  </div>
                  {imageError && <p className="text-sm text-red-500">{imageError}</p>}
                  <p className="text-xs text-muted-foreground">请输入有效的图片URL，例如：https://example.com/avatar.jpg</p>
                </div>
              </div>
              
              {networkError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md">
                  网络连接错误，请检查您的网络连接后重试
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-[#1e2025] text-[#e3e4e6]"
                disabled={isLoading || !username || !image}
              >
                {isLoading ? "注册中..." : "完成注册"}
              </Button>
            </form>
          )}
        </div>
      </div>
  
      <div className="text-balance w-72 text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-black [&_a]:hover:dark:text-primary [&_a]:dark:hover:text-black">
        <Link href={'/login'}>已有帐号，点击登录</Link>
      </div>
  
      <div className="text-balance w-72 text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-black [&_a]:hover:dark:text-primary [&_a]:dark:hover:text-black">
        点击继续，即表示您同意我们的 <a href="#">服务条款</a>{" "}
        和 <a href="#">隐私政策</a>。
      </div>
    </div>
  )
}
