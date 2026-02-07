
import React from 'react';

interface NavbarProps {
  onNavigate: (page: 'home' | 'explore') => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              JelajahNusantara
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'} font-medium transition`}
            >
              Beranda
            </button>
            <button 
              onClick={() => onNavigate('explore')}
              className={`${currentPage === 'explore' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'} font-medium transition`}
            >
              Eksplorasi
            </button>
          </div>
          <div className="flex items-center space-x-4">
             <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
              Langganan
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
