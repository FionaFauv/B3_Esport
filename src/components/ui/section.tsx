import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
	children: React.ReactNode
    paddingY?: 'none' | 'small' | 'default' | 'large' | 'extra-large',
}
export function Section({ children, className, paddingY = 'default', ...props }: SectionProps) {
	return (
		<section
			className={cn(
                {
                    'py-0': paddingY === 'none',
                    'py-8': paddingY === 'small',
                    'py-12': paddingY === 'default',
                    'py-20': paddingY === 'large',
                    'py-45': paddingY === 'extra-large',
                },
				className
			)}
			{...props}
		>
			{children}
		</section>
	)
}