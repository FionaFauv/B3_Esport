import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
	children: React.ReactNode
	variant?: 'default' | 'muted' | 'dark'
    paddingY?: 'none' | 'small' | 'default' | 'large'
}
export function Section({ children, variant = 'default', className, paddingY = 'default', ...props }: SectionProps) {
	return (
		<section
			className={cn(
				{
					'bg-background': variant === 'default',
					'bg-muted': variant === 'muted',
					'bg-card': variant === 'dark',
				},
                {
                    'py-0': paddingY === 'none',
                    'py-8': paddingY === 'small',
                    'py-12': paddingY === 'default',
                    'py-20': paddingY === 'large',
                },
				className
			)}
			{...props}
		>
			{children}
		</section>
	)
}