import { GalleryVerticalEnd } from "lucide-react"

import { SignupForm } from "@/components/sigun-form"
import { UploadPage } from "@/components/AIcomponents/Html"

export default function LoginPage() {
  return (
    <div className="    font-serif flex min-h-svh flex-col
     items-center justify-center gap-6 bg-background p-6 md:p-10  ">
      <div className="flex   max-w-sm flex-col gap-6" style={{'viewTransitionName':`up`}}>
    
        <SignupForm  />
      </div>
    </div>
  )
}
