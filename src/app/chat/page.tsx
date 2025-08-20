// app/chat/page.tsx
"use client"
import { useState } from 'react';
import ModelSelector from '../components/ModelSelector'; 
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import { v4 as uuidv4 } from 'uuid';

type Model = 'Granite' | 'Mistral' | 'LLAMA';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  model?: Model;
}

const ChatPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<Model>('Granite');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageIdCounter, setMessageIdCounter] = useState(0);

  const handleModelChange = (model: Model) => {
    setSelectedModel(model);
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: `msg-${uuidv4()}`,
      text,
      sender: 'user',
      model: selectedModel,
    };
    setMessages((prev) => [...prev, userMessage]);
    // setMessageIdCounter((prev) => prev + 1); 
    setIsLoading(true);

    // Simulate API call to AI backend (replace with actual API integration)
    try {
      // Example: const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: text, model: selectedModel }) });
      // const data = await response.json();
      // const aiText = data.response;

      // Simulated response
      const aiText = `AI response from ${selectedModel}: ${text}`;
      const aiMessage: Message = {
        id: `msg-${uuidv4()}`,
        text: aiText,
        sender: 'ai',
        model: selectedModel,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          AI Chat Interface
        </h1>
      </header>
      <main className="w-full max-w-4xl flex flex-col md:flex-row gap-4">
        <aside className="md:w-1/4 bg-gray-800/50 backdrop-blur-md rounded-xl p-4 shadow-lg">
          <ModelSelector selectedModel={selectedModel} onModelChange={handleModelChange} />
        </aside>
        <section className="flex-1 bg-gray-800/50 backdrop-blur-md rounded-xl p-4 shadow-lg flex flex-col">
          <ChatWindow messages={messages} isLoading={isLoading} />
          <MessageInput onSend={handleSendMessage} disabled={isLoading} />
        </section>
      </main>
    </div>
  );
};

export default ChatPage;