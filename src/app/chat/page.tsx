// app/chat/page.tsx
"use client";
import { useState } from 'react';
import ModelSelector from '../components/ModelSelector';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import { v4 as uuidv4 } from 'uuid';

// Define Model type for backend-compatible names
type Model = 'granite' | 'mixtral' | 'llama3';

// Map backend model names to display names
const modelDisplayMap: Record<Model, string> = {
  granite: 'Granite',
  mixtral: 'Mistral',
  llama3: 'LLAMA',
};

// Map display names back to backend model names
const modelValueMap: Record<string, Model> = {
  Granite: 'granite',
  Mistral: 'mixtral',
  LLAMA: 'llama3',
};

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  model?: Model;
}

const ChatPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<Model>('granite');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleModelChange = (displayModel: string) => {
    const model = modelValueMap[displayModel];
    if (model) {
      setSelectedModel(model);
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      model: selectedModel,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

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
        id: uuidv4(),
        text: data.response || 'No response content',
        sender: 'ai',
        model: selectedModel,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        sender: 'ai',
        model: selectedModel,
      };
      setMessages((prev) => [...prev, errorMessage]);
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
          <ModelSelector
            selectedModel={modelDisplayMap[selectedModel]}
            onModelChange={handleModelChange}
          />
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