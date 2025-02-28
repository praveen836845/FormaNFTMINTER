// This is a mock service for AI image generation
// In a real implementation, this would call an actual AI image generation API

import { GeneratedImage } from '../types';

export const generateImage = async (prompt: string): Promise<GeneratedImage> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // In a real implementation, this would call an AI image generation API like DALL-E or Stable Diffusion
  // For now, we'll use Unsplash as a placeholder
  const imageUrl = `https://source.unsplash.com/random/800x600/?${encodeURIComponent(prompt.replace(/\s+/g, ','))}`;
  
  return {
    id: `img-${Date.now()}`,
    prompt,
    imageUrl,
    createdAt: new Date().toISOString(),
  };
};

export const getGenerationHistory = async (): Promise<GeneratedImage[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock generation history
  return Array.from({ length: 5 }, (_, i) => ({
    id: `img-${Date.now() - i * 86400000}`,
    prompt: [
      'A futuristic cityscape with flying cars and neon lights',
      'A serene forest landscape with mystical creatures',
      'An underwater scene with bioluminescent sea creatures',
      'A cosmic space scene with colorful nebulae and planets',
      'A cyberpunk character with augmented reality elements',
    ][i],
    imageUrl: `https://source.unsplash.com/random/800x600/?${i + 1},digital,art`,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  }));
};