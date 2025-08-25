// api/chat/create/route.ts
import { connectDB } from '@/app/lib/mongoose';
import { Chat } from '@/models/Chat';
import { getUserFromToken } from '@/app/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const userId = await getUserFromToken(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();
  const chat = await Chat.create({ userId });
  return NextResponse.json({ chatId: chat._id });
}