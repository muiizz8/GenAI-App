import Image from "next/image";
import ChatIdPage from "./chat/[chatId]/page";

export default function Home() {
  return (
    <div>
      <ChatIdPage/>
    </div>
  );
}
