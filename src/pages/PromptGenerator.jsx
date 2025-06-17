import { useState } from 'react';
import { imagePrompts, generateCustomPrompt, getStyleOptions } from '../utils/imagePrompts';
import PromptPreview from '../components/PromptPreview';

export default function PromptGenerator() {
  const { styles, ratios } = getStyleOptions();
  const [customScene, setCustomScene] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('default');
  const [selectedRatio, setSelectedRatio] = useState('landscape');

  const [selectedBias, setSelectedBias] = useState('confirmationBias');
  const [selectedStage, setSelectedStage] = useState('intro');

  // Get all available biases
  const biases = Object.keys(imagePrompts).filter(key => 
    typeof imagePrompts[key] === 'object' && 
    imagePrompts[key].hasOwnProperty('intro')
  );

  const customPrompt = customScene 
    ? generateCustomPrompt(customScene, selectedStyle, selectedRatio)
    : '';

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Prompt Generator</h1>

      {/* Existing Prompts Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Existing Game Prompts</h2>
        <div className="space-y-4">
          <div className="flex gap-4 mb-4">
            <select
              value={selectedBias}
              onChange={(e) => setSelectedBias(e.target.value)}
              className="rounded border-gray-300"
            >
              {biases.map(bias => (
                <option key={bias} value={bias}>
                  {bias.replace(/([A-Z])/g, ' $1').trim()}
                </option>
              ))}
            </select>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="rounded border-gray-300"
            >
              <option value="intro">Intro</option>
              <option value="game">Game</option>
              <option value="success">Success</option>
            </select>
          </div>

          {imagePrompts[selectedBias]?.[selectedStage] && (
            <PromptPreview
              prompt={imagePrompts[selectedBias][selectedStage]}
              label={`${selectedBias} - ${selectedStage} stage`}
            />
          )}
        </div>
      </section>

      {/* Custom Prompt Generator */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Custom Prompt Generator</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scene Description
            </label>
            <textarea
              value={customScene}
              onChange={(e) => setCustomScene(e.target.value)}
              placeholder="Describe your scene here..."
              className="w-full h-32 rounded border-gray-300"
            />
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="rounded border-gray-300"
              >
                {styles.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aspect Ratio
              </label>
              <select
                value={selectedRatio}
                onChange={(e) => setSelectedRatio(e.target.value)}
                className="rounded border-gray-300"
              >
                {ratios.map(ratio => (
                  <option key={ratio} value={ratio}>{ratio}</option>
                ))}
              </select>
            </div>
          </div>

          {customPrompt && (
            <PromptPreview
              prompt={customPrompt}
              label="Custom Generated Prompt"
            />
          )}
        </div>
      </section>

      {/* Quick Guide */}
      <section className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Browse existing prompts by selecting a bias and stage</li>
          <li>Or create a custom prompt using the generator</li>
          <li>Click "Copy Prompt" to copy the prompt to your clipboard</li>
          <li>Paste the prompt into Midjourney</li>
          <li>Save the generated image in your project's assets folder</li>
          <li>Use the GameImage component to display the image in your game</li>
        </ol>
      </section>
    </div>
  );
} 