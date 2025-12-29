"use client"

import { useRouter } from 'next/navigation'
export const ClientButton = ({children}) => {
    const router = useRouter()


return (
    <button className="btn-zinc py-1 px-4 rounded-lg "
        onClick={() => router.push('/login')}>
        {children}
    </button>
)
}
