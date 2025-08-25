// components/Sidebar.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ChatHistory {
  _id: string;
  title: string;
  createdAt: Date;
}

const Sidebar: React.FC = () => {
  const [chats, setChats] = useState<ChatHistory[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const fetchHistory = async () => {
      const res = await fetch('/api/chat/history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setChats(data);
      }
    };
    fetchHistory();
  }, [router]);

  const handleCreateChat = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/chat/create', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const { chatId } = await res.json();
      router.push(`/chat/${chatId}`);
    }
  };

  return (
    <aside className="w-64 bg-gray-800/50 backdrop-blur-md p-4 shadow-lg flex flex-col">
      <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Chat History</h2>
      <button
        onClick={handleCreateChat}
        className="mb-4 py-2 px-4 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg hover:opacity-90 transition-opacity"
      >
        Create New Chat
      </button>
      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.map((chat) => (
          <Link
            key={chat._id}
            href={`/chat/${chat._id}`}
            className="block p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <p className="font-semibold">{chat.title}</p>
            <p className="text-sm text-gray-400">{new Date(chat.createdAt).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;