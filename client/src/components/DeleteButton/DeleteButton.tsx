'use client'

import { deleteChat } from '@/app/actions'

export default function DeleteButton({ chatId }: { chatId: number }) {
    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this chat?')) {
            await deleteChat(chatId)
        }
    }

    return (
        <button onClick={handleDelete}>
            Delete
        </button>
    )
}