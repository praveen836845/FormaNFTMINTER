import React from 'react';
import { NFT } from '../types';
import { ExternalLink, Heart, DollarSign } from 'lucide-react';

interface NFTCardProps {
  nft: NFT;
  onMint?: () => void;
  onBuy?: () => void;
  onList?: () => void;
  isMinting?: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onMint, onBuy, onList, isMinting }) => {
  const isOwned = nft.owner !== '';
  const isListed = nft.listed;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={nft.imageUrl} 
          alt={nft.name} 
          className="w-full h-64 object-cover"
        />
        {isListed && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <DollarSign size={12} className="mr-1" />
            For Sale
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{nft.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{nft.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            <span className="block">Creator: {nft.creator.substring(0, 6)}...</span>
            {isOwned && <span className="block">Owner: {nft.owner.substring(0, 6)}...</span>}
          </div>
          
          <div className="flex items-center text-gray-500">
            <Heart size={16} className="mr-1" />
            <span>{Math.floor(Math.random() * 100)}</span>
          </div>
        </div>
        
        {isListed && nft.price && (
          <div className="mb-4">
            <span className="text-lg font-bold text-purple-600">{nft.price} ETH</span>
          </div>
        )}
        
        <div className="flex space-x-2">
          {!isOwned && onMint && (
            <button
              onClick={onMint}
              disabled={isMinting}
              className={`flex-1 py-2 px-4 rounded-lg text-white font-medium ${
                isMinting
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              } transition-colors flex items-center justify-center`}
            >
              {isMinting ? (
                <>
                  <span className="animate-pulse">Minting...</span>
                </>
              ) : (
                'Mint NFT'
              )}
            </button>
          )}
          
          {isOwned && !isListed && onList && (
            <button
              onClick={onList}
              className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              List for Sale
            </button>
          )}
          
          {isListed && onBuy && (
            <button
              onClick={onBuy}
              className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Buy Now
            </button>
          )}
          
          <a
            href={`#/nft/${nft.id}`}
            className="py-2 px-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="View details"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;