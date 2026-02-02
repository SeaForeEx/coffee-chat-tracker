'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Use environment variable for API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Define the Chat type
type Chat = {
    id: number;
    guest: string;
    chat_date: string;
    notes: string;
}

// Create New Chat
export async function createChat(data: { guest: string; chatDate: string; notes: string }) {
    if (!data.guest || !data.chatDate || !data.notes) {
        throw new Error('Guest, chat date, and notes are required');
    }

    const res = await fetch(`${API_URL}/api/chats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            guest: data.guest,
            chat_date: data.chatDate,
            notes: data.notes
        })
    })

    if (!res.ok) {
        throw new Error('Failed to create chat');
    }

    revalidatePath('/');
    redirect('/');
}

// Get All Chats
export async function getChats(): Promise<Chat[]> {
  const res = await fetch(`${API_URL}/api/chats`, {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

// Get Single Chat
export async function getChat(id: number): Promise<Chat> {
    const url = `${API_URL}/api/chats/${id}`;
    
    const res = await fetch(url, {
      cache: 'no-store'
    });
        
    if (!res.ok) { 
      throw new Error('Failed to fetch data');
    }
    return res.json();
}

// Edit Single Chat
export async function updateChat(chatId: number, data: { guest: string; chatDate: string; notes: string }) {
    if (!data.guest || !data.chatDate || !data.notes) {
        throw new Error('Guest, chat date, and notes are required');
    }

    const res = await fetch(`${API_URL}/api/chats/${chatId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            guest: data.guest,
            chat_date: data.chatDate,
            notes: data.notes
        })
    })

    if (!res.ok) {
        throw new Error('Failed to update chat');
    }

    revalidatePath('/');
    revalidatePath(`/chats/${chatId}`);
    redirect(`/chats/${chatId}`)
}

// Delete Single Chat
export async function deleteChat(chatId: number) {
    const res = await fetch(`${API_URL}/api/chats/${chatId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!res.ok) {
        throw new Error('Failed to delete chat')
    }

    revalidatePath('/')
    redirect('/')
}