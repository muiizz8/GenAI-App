import { Schema, model, models } from 'mongoose';

const messageSchema = new Schema({
  text: { type: String, required: true },
  sender: { type: String, enum: ['user', 'ai'], required: true },
  model: { type: String, enum: ['granite', 'mixtral', 'llama3'] },
  createdAt: { type: Date, default: Date.now },
}, { _id: true });

const chatSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'New Chat' },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
});

export const Chat = models.Chat || model('Chat', chatSchema);