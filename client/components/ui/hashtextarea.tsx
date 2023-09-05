import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const HashTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md focus-visible:ring-0 focus-visible:border-none bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:placeholder:text-slate-400",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
HashTextarea.displayName = "HashTextarea"

export { HashTextarea }
