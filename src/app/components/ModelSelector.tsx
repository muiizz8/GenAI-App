// components/ModelSelector.tsx
import { useState } from 'react';

type Model = 'Granite' | 'Mistral' | 'LLAMA';

export interface ModelSelectorProps {
  selectedModel: Model;
  onModelChange: (model: Model) => void;
}

const models: Model[] = ['Granite', 'Mistral', 'LLAMA'];

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Select Model</h2>
      <div className="grid grid-cols-1 gap-2">
        {models.map((model) => (
          <button
            key={model}
            onClick={() => onModelChange(model)}
            className={`py-2 px-4 rounded-lg transition-all duration-300 ${
              selectedModel === model
                ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-md scale-105'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {model}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;