'use client'

import { useRouter } from "next/navigation"

export default function ViewButton({ chatId }: { chatId: number }) {
    const router = useRouter()

    return (
        <button onClick={() => router.push(`/chats/${chatId}`)}>
            View
        </button>
    )
}