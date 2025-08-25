// app/chat/layout.tsx
import Sidebar from "../components/Sidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex">
      <Sidebar />
      <main className="flex-1 p-4 flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}