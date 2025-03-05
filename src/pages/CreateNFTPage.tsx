import React, { useState } from 'react';
import ImageGenerator from '../components/ImageGenerator';
import { Sparkles, Save } from 'lucide-react';
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { formatUnits, parseEther } from "ethers";
import { toast } from "react-hot-toast";


import { CONTRACT_ABI, CONTRACT_ADDRESS  } from '../contract/constant.ts'; // Import your contract ABI

const CreateNFTPage: React.FC = () => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [nftDetails, setNftDetails] = useState({
    name: '',
    description: '',
  });
  const [isMinting, setIsMinting] = useState(false);
  const [mintingSuccess, setMintingSuccess] = useState(false);
  const { writeContractAsync, isPending } = useWriteContract();
  const {address , isConnected} = useAccount()

  
  const mintNFT = async (e) => {
    e.preventDefault();
    console.log("Landing button clicked");
    /* 
     tokenURI , 
     address , 
     price = 0 , 
     prompt : "Nothing"
    */






    try {
      await toast.promise(
        (async () => {
          const amount = value.toString();
          // Prepare contract call
          console.log("Amount", amount);
          const { hash } = await writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: "deposit",
            args: ["tokenURI" , "address" , "price", "prompt"],
            // value: amount,
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

  // const handleImageGenerated = (imageUrl: string, promptText: string) => {
  //   setGeneratedImage(imageUrl);
  //   setPrompt(promptText);
    
  //   // Suggest a name based on the prompt
  //   const suggestedName = promptText
  //     .split(' ')
  //     .slice(0, 3)
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(' ');
    
  //   setNftDetails({
  //     name: suggestedName,
  //     description: promptText,
  //   });
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setNftDetails(prev => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleMintNFT = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (!generatedImage) return;
    
  //   setIsMinting(true);
    
  //   try {
  //     // In a real implementation, this would call your NFT minting API
  //     // For now, we'll simulate a delay
  //     await new Promise(resolve => setTimeout(resolve, 3000));
      
  //     setMintingSuccess(true);
      
  //     // Reset after 5 seconds
  //     setTimeout(() => {
  //       setMintingSuccess(false);
  //       setGeneratedImage(null);
  //       setPrompt('');
  //       setNftDetails({
  //         name: '',
  //         description: '',
  //       });
  //     }, 5000);
  //   } catch (error) {
  //     console.error('Error minting NFT:', error);
  //   } finally {
  //     setIsMinting(false);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Create Your AI-Generated NFT
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Generator */}
          <div>
            {!generatedImage ? (
              <ImageGenerator onImageGenerated={handleImageGenerated} />
            ) : (
              <div className="bg-white rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Generated Artwork</h2>
                <div className="relative">
                  <img 
                    src={generatedImage} 
                    alt="Generated artwork" 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="absolute top-2 right-2 bg-white text-gray-700 hover:text-gray-900 p-2 rounded-full shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-gray-700">Prompt:</h3>
                  <p className="text-gray-600 italic">{prompt}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - NFT Details Form */}
          <div>
            {generatedImage && (
              <div className="bg-white rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">NFT Details</h2>
                
                {mintingSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">NFT Minted Successfully!</h3>
                    <p className="text-gray-600 mb-4">
                      Your NFT has been minted and added to your collection.
                    </p>
                    <button
                      onClick={() => {
                        setGeneratedImage(null);
                        setMintingSuccess(false);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Create Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleMintNFT} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        NFT Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={nftDetails.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter a name for your NFT"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={nftDetails.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Describe your NFT"
                        required
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isMinting}
                        className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium ${
                          isMinting
                            ? 'bg-purple-400 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700'
                        } transition-colors`}
                      >
                        {isMinting ? (
                          <>
                            <Sparkles size={20} className="animate-spin mr-2" />
                            Minting NFT...
                          </>
                        ) : (
                          <>
                            <Save size={20} className="mr-2" />
                            Mint as NFT
                          </>
                        )}
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-500 pt-2">
                      <p>By minting this NFT, you confirm that:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>You own or have rights to use this image</li>
                        <li>Gas fees will apply for the minting process</li>
                        <li>The NFT will be stored on the blockchain permanently</li>
                      </ul>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFTPage;