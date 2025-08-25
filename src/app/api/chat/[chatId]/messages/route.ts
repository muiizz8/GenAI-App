import { connectDB } from '@/app/lib/mongoose'; 
import { Chat } from '@/models/Chat';
import { getUserFromToken } from '@/app/lib/auth'; 
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { chatId: string } }) {
  const userId = await getUserFromToken(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();
  const chat = await Chat.findOne({ _id: params.chatId, userId });
  if (!chat) {
    return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
  }
  return NextResponse.json(chat.messages);
}

export async function POST(req: NextRequest, { params }: { params: { chatId: string } }) {
  const userId = await getUserFromToken(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();
  const { text, model } = await req.json();
  const chat = await Chat.findOne({ _id: params.chatId, userId });
  if (!chat) {
    return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
  }
  // Add user message
  chat.messages.push({ text, sender: 'user', model });
  // Call AI backend
  const response = await fetch('http://localhost:5000/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: text,
      model,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json({ error: data.error || 'Failed to get AI response' }, { status: 500 });
  }
  chat.messages.push({ text: data.response || 'No response content', sender: 'ai', model });
  // Update title if first message
  if (chat.messages.length === 2 && chat.title === 'New Chat') {
    chat.title = text.slice(0, 30) + (text.length > 30 ? '...' : '');
  }
  await chat.save();
  return NextResponse.json(chat.messages);
}