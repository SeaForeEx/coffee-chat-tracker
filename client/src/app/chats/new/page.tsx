import { createChat } from "@/app/actions";
import styles from "./page.module.css";
import ChatForm from "@/components/ChatForm/ChatForm";

async function handleSubmit(data: { guest: string; chatDate: string, notes: string }) {
    'use server'
    await createChat(data);
}

export default async function NewChat() {
    return (
        <div className={styles.container}>
            <h1>Create New Chat</h1>
            <ChatForm 
                onSubmit={handleSubmit}
            />
        </div>
    )
}