"use client"

import { useRouter } from 'next/navigation'
export const ClientButton = ({children}) => {
    const router = useRouter()


return (
    <button className="button-sky foreground-ligth p-4 rounded-lg"
        onClick={() => router.push('/login')}>
        {children}
    </button>
)
}
