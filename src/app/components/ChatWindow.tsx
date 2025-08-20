// components/ChatWindow.tsx
import { Message } from '@/app/chat/page';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-xl p-3 rounded-lg ${
            msg.sender === 'user'
              ? 'bg-indigo-600/70 ml-auto text-right'
              : 'bg-purple-600/70 mr-auto text-left'
          }`}
        >
          <p className="font-semibold">{msg.sender === 'user' ? 'You' : `${msg.model} AI`}</p>
          <p>{msg.text}</p>
        </div>
      ))}
      {isLoading && (
        <div className="max-w-xl p-3 rounded-lg bg-purple-600/70 mr-auto text-left animate-pulse">
          <p className="font-semibold">AI is thinking...</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;