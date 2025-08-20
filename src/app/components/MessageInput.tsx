// components/MessageInput.tsx
import { useState } from 'react';

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled}
        className="py-3 px-6 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;