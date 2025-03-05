import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string, prompt: string) => void;
}
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const imageGenerator = async (prompt: string) => {
  console.log("Generating image with prompt:", prompt);
  console.log("API Key:", API_KEY);
  console.log("hello");
  

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: "512x512"
      }),
    });

    if (!response.ok) throw new Error("Failed to generate image");

    const data = await response.json();
    console.log("Response Data:", data);

    return data.data[0]?.url || null;  // Extracting the image URL
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

const uploadToIPFS = async (file: File) => {
  const jwt = import.meta.env.VITE_PINATE_JWT;
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log("Data:", data);
    if (data.IpfsHash) {
      return `https://ipfs.io/ipfs/${data.IpfsHash}`;
    } else {
      throw new Error("IPFS upload failed");
    }
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    return null;
  }
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (promptText: string) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const imageUrl = await imageGenerator(promptText);
      if (!imageUrl) throw new Error("Image URL not received");

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
        
        {error && <div className="text-red-500 text-sm">{error}</div>}
        
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
