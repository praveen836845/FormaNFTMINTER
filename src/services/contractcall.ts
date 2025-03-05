import { useReadContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS  } from '../contract/constant.ts'; // Import your contract ABI

export interface NFT {
    tokenId: number;
    owner: string;
    name: string;
    description: string;
    image: string;
  }

export const useGetAllNFTs = () => {
  const { data, isError, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getMarketplaceNFTs',
  });

  return {
    nfts: data as NFT[] | undefined,
    isLoading,
    isError,
  };
};

export const useGetMYNFTs = () => {
    const {data , isError , isLoading} = useReadContract({
        address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getMyNFTs',
    }); 

    return {
        nfts: data as NFT[] | undefined,
        isLoading,
        isError,
    };
}

export const createNFTAll = () => {
    
}