import { getChat } from "@/app/actions"
import styles from "./page.module.css";
import HomeButton from "@/components/HomeButton/HomeButton"
import EditButton from "@/components/EditButton/EditButton";
import DeleteButton from "@/components/DeleteButton/DeleteButton";

export default async function Chat({ 
    params 
}: { 
    params: { id: string } 
}) {
    const { id } = await params
    const chatId = parseInt(id)
    const chat = await getChat(chatId)

    const convertedDate = (dateString: string): string => {
        const [year, month, day] = dateString.split('-');
        return `${month}/${day}/${year}`;
    }

    return (
        <div className={styles.container}>
            <h1>Chat Details</h1>
            <p><strong>Guest:</strong> {chat.guest}</p>
            <p><strong>Date:</strong> {convertedDate(chat.chat_date)}</p>
            <p><strong>Notes:</strong> {chat.notes}</p>
            <HomeButton />&nbsp;
            <EditButton chatId={chat.id} />&nbsp;
            <DeleteButton chatId={chat.id} />
        </div>
    )
}