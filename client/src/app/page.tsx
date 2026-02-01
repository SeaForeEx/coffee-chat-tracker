import { getChats } from "./actions";
import Link from "next/link";
import styles from "./page.module.css";
import DeleteButton from "@/components/DeleteButton/DeleteButton";

export default async function Home() {
  const chats = await getChats();
  const convertedDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Coffee Chats</h1>

      <Link href="/chats/new">
        <button>New Chat</button>
      </Link>

      {chats && chats.length > 0 ? (
          <div>
            {chats.map((chat) => (
              <div 
                key={chat.id} 
                className={styles.guestName}
              >
                {convertedDate(chat.chat_date)} - {chat.guest} &nbsp;
                <Link href={`/chats/${chat.id}/edit`}>
                  Edit
                </Link> &nbsp;
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
