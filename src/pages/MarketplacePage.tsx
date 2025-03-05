import React, { useState, useEffect } from 'react';
import NFTCard from '../components/NFTCard';
import { NFT } from '../types';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import {useGetAllNFTs} from '../services/contractcall';
import { useAccount } from 'wagmi';
const MarketplacePage: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('recent');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5]);

const {address , isConnected} = useAccount();
   const dataAllNFTs = useGetAllNFTs();
  useEffect(() => {
    // Simulate fetching NFTs from an API
    const fetchMarketplaceNFTs = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would call your marketplace API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data - only listed NFTs
        const mockNFTs: NFT[] = Array.from({ length: 8 }, (_, i) => ({
          id: `market-${i + 1}`,
          name: `Digital Masterpiece #${i + 1}`,
          description: `A stunning AI-generated artwork exploring digital landscapes and futuristic themes. This unique piece features vibrant colors and intricate details.`,
          imageUrl: `https://source.unsplash.com/random/800x600?art,digital,${i + 10}`,
          owner: `0x${Math.random().toString(16).substring(2, 10)}`,
          creator: `0x${Math.random().toString(16).substring(2, 10)}`,
          price: `${(Math.random() * 2 + 0.1).toFixed(2)}`,
          listed: true,
        }));
        
        setNfts(mockNFTs);
      } catch (error) {
        console.error('Error fetching marketplace NFTs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMarketplaceNFTs();
  }, []);

  const handleBuyNFT = (nftId: string) => {
    console.log(`Buying NFT with ID: ${nftId}`);
    // In a real implementation, this would call your marketplace contract
  };

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          nft.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const price = parseFloat(nft.price || '0');
    const matchesPriceRange = price >= priceRange[0] && price <= priceRange[1];
    
    return matchesSearch && matchesPriceRange;
  });

  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    if (sortOption === 'recent') {
      return parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]);
    } else if (sortOption === 'priceAsc') {
      return parseFloat(a.price || '0') - parseFloat(b.price || '0');
    } else if (sortOption === 'priceDesc') {
      return parseFloat(b.price || '0') - parseFloat(a.price || '0');
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          NFT Marketplace
        </h1>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search marketplace..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ArrowUpDown size={18} className="text-gray-400" />
              </div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none w-full"
              >
                <option value="recent">Most Recent</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range (ETH)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* NFT Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : sortedNFTs.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No NFTs Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedNFTs.map((nft) => (
              <NFTCard
                key={nft.id}
                nft={nft}
                onBuy={() => handleBuyNFT(nft.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;