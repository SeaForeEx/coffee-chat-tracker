import { getChat } from "@/app/actions"
import Link from "next/link"

export default async function Chat({ 
    params 
}: { 
    params: { id: string } 
}) {
    const { id } = await params
    const chatId = parseInt(id)
    const chat = await getChat(chatId)

    return (
        <div>
            <h1>Chat Details</h1>
            <p><strong>Guest:</strong> {chat.guest}</p>
            <p><strong>Date:</strong> {chat.chat_date}</p>
            <p><strong>Notes:</strong> {chat.notes}</p>
            <Link href="/">
                <button>Back Home</button>
            </Link>
        </div>
    )
}