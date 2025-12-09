import { type ClassValue, clsx } from 'clsx'
import type React from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * J'ai réutilisé cette fonction que j'ai trouvé sur un de tes projets. Afin de pouvoir décomposer mon HTML !
 */
export function parseLineBreaks(text: string): React.ReactNode[] {
	const parts = text.split('\\n')
	return parts.map((part, i) => (
		<span key={`${part.slice(0, 50)}-${i}`}>
			{part}
			{i < parts.length - 1 && <br />}
		</span>
	))
}