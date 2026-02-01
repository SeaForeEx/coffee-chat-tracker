'use client'

import { useRouter } from "next/navigation"

export default function NewChatButton() {
    const router = useRouter()

    return (
        <button onClick={() => router.push('/chats/new')}>
            New Chat
        </button>
    )
}