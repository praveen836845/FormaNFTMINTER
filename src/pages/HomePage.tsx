import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Image, ShoppingCart } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your Ideas Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">NFT Art</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200">
            Create unique AI-generated artwork and mint them as NFTs on the blockchain.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/create"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors"
            >
              Start Creating
            </Link>
            <Link
              to="/marketplace"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-purple-900 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors"
            >
              Explore Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles size={28} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">1. Describe Your Idea</h3>
              <p className="text-gray-600">
                Enter a detailed description of the artwork you want to create using our AI image generator.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Image size={28} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">2. Generate & Customize</h3>
              <p className="text-gray-600">
                Our AI will generate unique artwork based on your description. Customize it until you're satisfied.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart size={28} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">3. Mint & Trade</h3>
              <p className="text-gray-600">
                Mint your artwork as an NFT on the blockchain, then list it on our marketplace or keep it in your collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Featured Artworks
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={`https://source.unsplash.com/random/800x600?art,digital,${i}`} 
                  alt={`Featured Artwork ${i}`} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Digital Dreamscape #{i}</h3>
                  <p className="text-gray-600 mb-4">
                    A stunning AI-generated artwork exploring digital landscapes and futuristic themes.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-600 font-bold">{(Math.random() * 2).toFixed(2)} ETH</span>
                    <Link
                      to="/marketplace"
                      className="text-purple-600 hover:text-purple-800 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              View All Artworks
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Own NFT?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-200">
            Join our community of creators and collectors. Start generating unique AI artwork and mint your NFTs today.
          </p>
          <Link
            to="/create"
            className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-medium transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;