import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Wallet, Menu } from 'lucide-react';

interface HeaderProps {
  walletConnected: boolean;
  walletAddress: string | null;
  onConnectWallet: () => void;
}

const Header: React.FC<HeaderProps> = ({ walletConnected, walletAddress, onConnectWallet }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Palette size={28} className="text-purple-300" />
            <span className="text-xl font-bold">AI NFT Creator</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-purple-300 transition-colors">
              Home
            </Link>
            <Link to="/create" className="hover:text-purple-300 transition-colors">
              Create NFT
            </Link>
            <Link to="/gallery" className="hover:text-purple-300 transition-colors">
              Gallery
            </Link>
            <Link to="/marketplace" className="hover:text-purple-300 transition-colors">
              Marketplace
            </Link>
            {walletConnected ? (
              <div className="flex items-center bg-purple-700 rounded-full px-4 py-2">
                <Wallet size={16} className="mr-2" />
                <span className="text-sm">
                  {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}
                </span>
              </div>
            ) : (
              // <button
              //   onClick={onConnectWallet}
              //   className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors"
              // >
              //   Connect Wallet
              // </button>
              <></>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-4 pb-4">
            <Link
              to="/"
              className="hover:text-purple-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/create"
              className="hover:text-purple-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create NFT
            </Link>
            <Link
              to="/gallery"
              className="hover:text-purple-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/marketplace"
              className="hover:text-purple-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </Link>
            {walletConnected ? (
              <div className="flex items-center bg-purple-700 rounded-full px-4 py-2 w-fit">
                <Wallet size={16} className="mr-2" />
                <span className="text-sm">
                  {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}
                </span>
              </div>
            ) : (
              <button
                onClick={() => {
                  onConnectWallet();
                  setMobileMenuOpen(false);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors w-fit"
              >
                Connect Wallet
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;