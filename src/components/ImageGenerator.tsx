import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string, prompt: string) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock function to simulate image generation
  const generateImage = async (promptText: string) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // In a real implementation, this would call your AI image generation API
      // For now, we'll simulate a delay and return a placeholder image
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Using Unsplash for placeholder images
      const imageUrl = `https://source.unsplash.com/random/800x600/?${encodeURIComponent(promptText.replace(/\s+/g, ','))}`;
      
      onImageGenerated(imageUrl, promptText);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Image generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      generateImage(prompt);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Generate AI Artwork</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Describe your artwork
          </label>
          <textarea
            id="prompt"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="A futuristic cityscape with flying cars and neon lights..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium ${
            isGenerating || !prompt.trim()
              ? 'bg-purple-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          } transition-colors`}
        >
          {isGenerating ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={20} className="mr-2" />
              Generate Image
            </>
          )}
        </button>
      </form>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Tips:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Be specific about what you want to see</li>
          <li>Include details about style, colors, and mood</li>
          <li>Try different prompts for varied results</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageGenerator;