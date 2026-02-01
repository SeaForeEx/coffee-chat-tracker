'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

type ChatFormProps = {
    chatId?: number
    initialData?: {
        guest: string
        chatDate: string
        notes: string
    }
    onSubmit: (data: { guest: string; chatDate: string; notes: string; }) => Promise<void>
}

export default function ChatForm({
    chatId,
    initialData,
    onSubmit
}: ChatFormProps) {
    const router = useRouter();

    const [guest, setGuest] = useState(initialData?.guest || '');
    const [chatDate, setChatDate] = useState(initialData?.chatDate || '');
    const [notes, setNotes] = useState(initialData?.notes || '');
    const [isSubmitting, setIsSubmitting] = useState(false)


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        await onSubmit({ 
            guest, 
            chatDate,
            notes, 
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Guest:</label>
                <input 
                    type="text"
                    value={guest}
                    onChange={(e) => setGuest(e.target.value)}
                    required
                />
            </div>
        
            <div>
                <label>Chat Date:</label>
                <input 
                    type="date"
                    value={chatDate}
                    onChange={(e) => setChatDate(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Notes:</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    required
                />
            </div>

            <button 
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Saving...' : 'Save'}
            </button>

            <button 
                type="button"
                onClick={() => chatId ? router.push(`/chats/${chatId}`) : router.push('/')}
            >
                Cancel
            </button>
        </form>
    )
}