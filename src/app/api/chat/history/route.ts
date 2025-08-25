// api/chat/history/route.ts
import { connectDB } from '@/app/lib/mongoose';
import { Chat } from '@/models/Chat';
import { getUserFromToken } from '@/app/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const userId = await getUserFromToken(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();
  const chats = await Chat.find({ userId }).sort({ createdAt: -1 }).select('_id title createdAt');
  return NextResponse.json(chats);
}