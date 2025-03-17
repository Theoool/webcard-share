import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="font-sans flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">欢迎回来</h1>
          <p className="text-muted-foreground">登录您的账户继续使用</p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  )
}
