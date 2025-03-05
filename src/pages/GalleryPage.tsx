import React, { useState, useEffect } from 'react';
import NFTCard from '../components/NFTCard';
import { NFT } from '../types';
import { Search, Filter, Grid, List } from 'lucide-react';
import {useGetMYNFTs} from '../services/contractcall';
import { useAccount } from 'wagmi';
import { toast } from "react-hot-toast";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { formatUnits, parseEther } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS  } from '../contract/constant.ts'; // Import your contract ABI

const GalleryPage: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const { address, isConnected } = useAccount();  // Destructure the needed properties
   console.log(address);
    const data = useGetMYNFTs(address);   // This is you data that you need do something
    console.log("data" , data);

 // Calling sellNFT to the MARKET 
 const sellNFT = async (e) => {
  e.preventDefault();
  console.log("Landing button clicked");
  try {
    await toast.promise(
      (async () => {
        const amount = "1".toString() ?? 0 ;   // price
        // Prepare contract call
        console.log("Amount", amount);
        const { hash } = await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "deposit",
          args: ["tokenId means index of Arraylist" , ""],
          value: amount,
        });
      })(),
      {
        loading: `Approving token ...`, // Loading state message
        success: (hash) => `Approval successful! Transaction Hash:`, // Success state message with the hash
        // error: (error) => `Approval failed: ${error.message}`, // Error state message
      }
    );
  } catch (err) {
    // console.log("error message" , err.message);
    toast.error(err.message);
  }
};

  useEffect(() => {
    // Simulate fetching NFTs from an API
    const fetchNFTs = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would call your NFT API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data
        const mockNFTs: NFT[] = Array.from({ length: 12 }, (_, i) => ({
          id: `nft-${i + 1}`,
          name: `Digital Dreamscape #${i + 1}`,
          description: `A stunning AI-generated artwork exploring digital landscapes and futuristic themes. This unique piece features vibrant colors and intricate details.`,
          imageUrl: `https://source.unsplash.com/random/800x600?art,digital,${i + 1}`,
          owner: i % 3 === 0 ? '' : `0x${Math.random().toString(16).substring(2, 10)}`,
          creator: `0x${Math.random().toString(16).substring(2, 10)}`,
          price: i % 4 === 0 ? `${(Math.random() * 2).toFixed(2)}` : undefined,
          listed: i % 4 === 0,
        }));
        
        setNfts(mockNFTs);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNFTs();
  }, []);

  const handleMintNFT = (nftId: string) => {
    console.log(`Minting NFT with ID: ${nftId}`);
    // In a real implementation, this would call your minting API
  };

  const handleBuyNFT = (nftId: string) => {
    console.log(`Buying NFT with ID: ${nftId}`);
    // In a real implementation, this would call your marketplace contract
  };

  const handleListNFT = (nftId: string) => {
    console.log(`Listing NFT with ID: ${nftId}`);
    // In a real implementation, this would call your marketplace contract
  };

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          nft.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterCategory === 'all') return matchesSearch;
    if (filterCategory === 'forSale') return matchesSearch && nft.listed;
    if (filterCategory === 'notMinted') return matchesSearch && nft.owner === '';
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          NFT Gallery
        </h1>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search NFTs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter size={18} className="text-gray-400" />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All NFTs</option>
                  <option value="forSale">For Sale</option>
                  <option value="notMinted">Not Minted</option>
                </select>
              </div>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'bg-white text-gray-600'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'bg-white text-gray-600'
                  }`}
                  aria-label="List view"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* NFT Grid/List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredNFTs.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No NFTs Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
          }>
            {filteredNFTs.map((nft) => (
              <NFTCard
                key={nft.id}
                nft={nft}
                onMint={() => handleMintNFT(nft.id)}
                onBuy={() => handleBuyNFT(nft.id)}
                onList={() => handleListNFT(nft.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;