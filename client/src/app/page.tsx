import { getChats } from "./actions";
import styles from "./page.module.css";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import EditButton from "@/components/EditButton/EditButton";
import ViewButton from "@/components/ViewButton/ViewButton";
import NewChatButton from "@/components/NewChatButton/NewChatButton";

export default async function Home() {
  const chats = await getChats();
  const convertedDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Coffee Chats</h1>

      <NewChatButton />

      {chats && chats.length > 0 ? (
          <div>
            {chats.map((chat) => (
              <div 
                key={chat.id} 
                className={styles.guestName}
              >
                {convertedDate(chat.chat_date)} - {chat.guest} &nbsp;
                <ViewButton chatId={chat.id} />&nbsp;
                <EditButton chatId={chat.id} />&nbsp;
                <DeleteButton chatId={chat.id} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            No chats yet
          </div>
        )
      }
    </div>
  );
}
