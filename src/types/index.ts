export interface NFT {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  owner: string;
  creator: string;
  price?: string;
  listed?: boolean;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
}