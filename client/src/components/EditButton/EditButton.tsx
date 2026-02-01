'use client'

import { useRouter } from "next/navigation"

export default function EditButton({ chatId }: { chatId: number }) {
    const router = useRouter()

    return (
        <button onClick={() => router.push(`/chats/${chatId}/edit`)}>
            Edit
        </button>
    )
}