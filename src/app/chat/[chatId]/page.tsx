'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ModelSelector from '@/app/components/ModelSelector';
import ChatWindow from '@/app/components/ChatWindow';
import MessageInput from '@/app/components/MessageInput';
import { v4 as uuidv4 } from 'uuid';
import { Model, modelDisplayMap, modelValueMap } from '@/app/lib/models';

export interface Message {
  _id: string;
  text: string;
  sender: 'user' | 'ai';
  model?: Model;
  createdAt: Date;
}

const ChatIdPage: React.FC = () => {
  const { chatId } = useParams();
  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState<Model>('granite');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const fetchMessages = async () => {
      const res = await fetch(`/api/chat/${chatId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      } else {
        router.push('/chat');
      }
    };
    fetchMessages();
  }, [chatId, router]);

  const handleModelChange = (displayModel: string) => {
    const model = modelValueMap[displayModel];
    if (model) {
      setSelectedModel(model);
    }
  };

  const handleSendMessage = async (text: string) => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const userMessage: Message = {
      _id: uuidv4(),
      text,
      sender: 'user',
      model: selectedModel,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          model: selectedModel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response from server');
      }

      const aiMessage: Message = {
        _id: uuidv4(),
        text: data.response || 'No response content',
        sender: 'ai',
        model: selectedModel,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Save to MongoDB
      await fetch(`/api/chat/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, model: selectedModel }),
      });
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        _id: uuidv4(),
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        sender: 'ai',
        model: selectedModel,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 h-full">
      <aside className="md:w-1/4 bg-gray-800/50 backdrop-blur-md rounded-xl p-4 shadow-lg">
        <ModelSelector
          selectedModel={modelDisplayMap[selectedModel]}
          onModelChange={handleModelChange}
        />
      </aside>
      <section className="flex-1 bg-gray-800/50 backdrop-blur-md rounded-xl p-4 shadow-lg flex flex-col">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <MessageInput onSend={handleSendMessage} disabled={isLoading} />
      </section>
    </div>
  );
};

export default ChatIdPage;