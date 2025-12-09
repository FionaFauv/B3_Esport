import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode,
    paddingY?: 'none' | 'small' | 'default' | 'large',
    paddingX?: 'none' | 'small' | 'default' | 'large',
}

export function Container({ children, className, paddingY = 'none', paddingX = 'default', ...props }: ContainerProps) {
	return (
		<div className={cn('container mx-auto', 
                {
                    'py-0': paddingY === 'none',
                    'py-4': paddingY === 'small',
                    'py-8': paddingY === 'default',
                    'py-12': paddingY === 'large',
                },
                {
                    'px-0': paddingX === 'none',
                    'px-4': paddingX === 'small',
                    'px-6': paddingX === 'default',
                    'px-8': paddingX === 'large',
                },
                className
            )} 
                {...props}
        >
			{children}
		</div>
	)
}