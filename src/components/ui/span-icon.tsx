import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SpanProps extends HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode
}

export function SpanIcon({ children, className, ...props }: SpanProps) {
    return (
        <span 
        className={cn(
            'inline-w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold faq-icon', 
            className
            )} 
            {...props}
        >
            {children}
        </span>
    )
}