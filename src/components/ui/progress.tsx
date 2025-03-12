"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2.5 w-full overflow-hidden rounded-full bg-gray-200/30 dark:bg-gray-700/30",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
        "transition-transform duration-500 ease-in-out",
        "animate-pulse-subtle",
        value === 100 && "animate-complete"
      )}
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`
      }}
    />
  </ProgressPrimitive.Root>
))

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

// Add these styles to your global CSS or tailwind.config.js
// @keyframes pulse-subtle {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.8; }
// }
// @keyframes complete {
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// }
// .animate-pulse-subtle {
//   animation: pulse-subtle 2s infinite;
// }
// .animate-complete {
//   animation: complete 0.5s ease-in-out;
// }
