'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { IconType } from 'react-icons'
import { getLogoIconById } from '@/lib/logo-icons'
import { getReactIconById, isReactIconId } from '@/lib/react-icons-library'

interface UseLogoIconComponentResult {
	Icon: IconType
	isLoading: boolean
}

export function useLogoIconComponent(
	iconId: string,
): UseLogoIconComponentResult {
	const isLibraryIcon = isReactIconId(iconId)
	const [loadedLibraryIcon, setLoadedLibraryIcon] = useState<IconType | null>(
		null,
	)
	const [isLoading, setIsLoading] = useState(false)
	const requestIdRef = useRef(0)

	const fallbackIcon = useMemo(() => getLogoIconById(iconId).Icon, [iconId])

	useEffect(() => {
		if (!isLibraryIcon) {
			requestIdRef.current += 1
			return
		}

		const requestId = requestIdRef.current + 1
		requestIdRef.current = requestId

		Promise.resolve().then(() => {
			if (requestId !== requestIdRef.current) {
				return
			}

			setLoadedLibraryIcon(null)
			setIsLoading(true)
		})

		void getReactIconById(iconId)
			.then((icon) => {
				if (requestId !== requestIdRef.current) {
					return
				}

				setLoadedLibraryIcon(() => icon)
				setIsLoading(false)
			})
			.catch(() => {
				if (requestId !== requestIdRef.current) {
					return
				}

				setLoadedLibraryIcon(null)
				setIsLoading(false)
			})
	}, [iconId, isLibraryIcon])

	return {
		Icon: isLibraryIcon ? loadedLibraryIcon ?? fallbackIcon : fallbackIcon,
		isLoading: isLibraryIcon && isLoading && !loadedLibraryIcon,
	}
}
