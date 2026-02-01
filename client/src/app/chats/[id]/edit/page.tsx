import ChatForm from "@/components/ChatForm/ChatForm"
import styles from "./page.module.css";
import { getChat, updateChat } from "@/app/actions"

export default async function EditChat({
    params
}: {
    params: { id: string }
}) {
    const { id } = await params;  
    const chatId = parseInt(id)

    const chat = await getChat(chatId)

    async function handleSubmit(data: { guest: string, chatDate: string, notes: string}) {
        'use server'
        await updateChat(chatId, data)
    }

    return (
        <div className={styles.container}>
            <h1>Edit Chat</h1>
            <ChatForm 
                chatId={chatId}
                initialData={{
                    guest: chat.guest,
                    chatDate: chat.chat_date,
                    notes: chat.notes
                }}
                onSubmit={handleSubmit}
            />
        </div>
    )
}