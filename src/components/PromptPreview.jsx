import { useState } from 'react';

export default function PromptPreview({ prompt, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 my-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <button
          onClick={handleCopy}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          {copied ? 'Copied!' : 'Copy Prompt'}
        </button>
      </div>
      <p className="text-sm font-mono bg-white p-2 rounded border border-gray-200 whitespace-pre-wrap">
        {prompt}
      </p>
    </div>
  );
} 