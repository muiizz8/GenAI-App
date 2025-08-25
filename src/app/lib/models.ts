export type Model = 'granite' | 'mixtral' | 'llama3';

export interface Message {
  _id: string;
  text: string;
  sender: 'user' | 'ai';
  model?: Model;
  createdAt: Date;
}

export const modelDisplayMap: Record<Model, string> = {
  granite: 'Granite',
  mixtral: 'Mistral',
  llama3: 'LLAMA',
};

export const modelValueMap: Record<string, Model> = {
  Granite: 'granite',
  Mistral: 'mixtral',
  LLAMA: 'llama3',
};

export const models: string[] = ['Granite', 'Mistral', 'LLAMA'];