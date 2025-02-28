import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreateNFTPage from './pages/CreateNFTPage';
import GalleryPage from './pages/GalleryPage';
import MarketplacePage from './pages/MarketplacePage';
import { connectWallet } from './services/web3Service';
import { WalletState } from './types';

function App() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
  });

  const handleConnectWallet = async () => {
    try {
      const { address, chainId } = await connectWallet();
      setWalletState({
        isConnected: true,
        address,
        chainId,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  // Check if wallet was previously connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      // In a real implementation, this would check if the user's wallet is already connected
      // For now, we'll just simulate a disconnected state
    };
    
    checkWalletConnection();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header 
          walletConnected={walletState.isConnected}
          walletAddress={walletState.address}
          onConnectWallet={handleConnectWallet}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateNFTPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;