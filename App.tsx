
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PostCard from './components/PostCard';
import AIChat from './components/AIChat';
import { BLOG_POSTS } from './constants';
import { Post, Category } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'explore' | 'detail'>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'Semua' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setCurrentPage('detail');
    window.scrollTo(0, 0);
  };

  const renderHome = () => (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden rounded-3xl mx-4 sm:mx-8 mt-4">
        <img 
          src="https://picsum.photos/seed/travel/1600/900" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Travel Hero"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Temukan Keindahan Nusantara
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Inspirasi perjalanan, kuliner lezat, dan penginapan ternyaman di seluruh penjuru Indonesia.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setCurrentPage('explore')}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg"
            >
              Mulai Eksplorasi
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Topik Terpopuler</h2>
            <p className="text-gray-500">Pilih kategori yang ingin Anda jelajahi</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0 overflow-x-auto pb-2">
            {(['Semua', 'Wisata', 'Kuliner', 'Akomodasi'] as Category[]).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(0, 6).map(post => (
            <PostCard key={post.id} post={post} onClick={handlePostClick} />
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Punya Pertanyaan Seputar Travel?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Tanyakan langsung pada JelajahBot, asisten AI kami yang siap memberikan rekomendasi personal untuk liburan Anda berikutnya.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <span className="bg-blue-100 p-1 rounded-full text-blue-600 text-sm">✓</span>
                  <span className="text-gray-700 font-medium">Rekomendasi rute perjalanan</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="bg-blue-100 p-1 rounded-full text-blue-600 text-sm">✓</span>
                  <span className="text-gray-700 font-medium">Saran kuliner lokal autentik</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="bg-blue-100 p-1 rounded-full text-blue-600 text-sm">✓</span>
                  <span className="text-gray-700 font-medium">Tips hemat saat traveling</span>
                </li>
              </ul>
            </div>
            <div className="relative">
               <img src="https://picsum.photos/seed/ai-bot/600/400" className="rounded-3xl shadow-2xl" alt="AI Feature" />
               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
                 <p className="italic text-gray-600">"Bot ini sangat membantu saya mencari penginapan unik di pelosok Bali!"</p>
                 <p className="mt-2 font-bold text-blue-600">- Maya, Traveler</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderExplore = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Eksplorasi Nusantara</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari destinasi, kuliner, atau hotel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select 
            className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value as Category)}
          >
            {(['Semua', 'Wisata', 'Kuliner', 'Akomodasi'] as Category[]).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} onClick={handlePostClick} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
             <div className="text-6xl mb-4">🔍</div>
             <h3 className="text-xl font-bold text-gray-800">Tidak ada hasil ditemukan</h3>
             <p className="text-gray-500">Coba gunakan kata kunci lain</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderDetail = () => {
    if (!selectedPost) return null;
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={() => setCurrentPage('home')}
          className="flex items-center space-x-2 text-blue-600 font-semibold mb-8 hover:translate-x-[-4px] transition-transform"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Kembali</span>
        </button>

        <img src={selectedPost.image} className="w-full h-[400px] object-cover rounded-3xl mb-8 shadow-lg" alt={selectedPost.title} />
        
        <div className="flex items-center space-x-4 mb-6">
          <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold uppercase">
            {selectedPost.category}
          </span>
          <span className="text-gray-500 text-sm">{selectedPost.date}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {selectedPost.title}
        </h1>

        <div className="flex items-center space-x-4 border-y py-6 mb-8">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {selectedPost.author.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900">{selectedPost.author}</p>
            <p className="text-sm text-gray-500">{selectedPost.location} • {selectedPost.readTime}</p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
          {selectedPost.content.split('\n').map((para, i) => (
            <p key={i} className="mb-4">{para}</p>
          ))}
          <p>Destinasi ini menawarkan pengalaman unik yang tidak akan Anda temukan di tempat lain. Bagi para petualang sejati, tempat ini adalah destinasi wajib yang harus ada dalam daftar perjalanan Anda tahun ini. Pastikan untuk mempersiapkan segala kebutuhan dengan matang sebelum berangkat.</p>
        </div>

        <div className="bg-gray-100 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Suka dengan artikel ini?</h3>
          <p className="text-gray-600 mb-6">Bagikan informasi ini kepada teman-teman Anda untuk inspirasi liburan mereka!</p>
          <div className="flex justify-center space-x-4">
             <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Share</button>
             <button className="bg-white border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-50">Komentar</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onNavigate={(page) => setCurrentPage(page)} currentPage={currentPage} />
      
      <main className="flex-1">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'explore' && renderExplore()}
        {currentPage === 'detail' && renderDetail()}
      </main>

      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                JelajahNusantara
              </span>
              <p className="mt-4 text-gray-500 max-w-sm">
                Inspirasi terpercaya untuk setiap langkah perjalanan Anda di Indonesia. Temukan keajaiban di setiap sudut negeri.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Navigasi</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button onClick={() => setCurrentPage('home')}>Beranda</button></li>
                <li><button onClick={() => setCurrentPage('explore')}>Eksplorasi</button></li>
                <li><a href="#">Tentang Kami</a></li>
                <li><a href="#">Kontak</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Sosial Media</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#">Instagram</a></li>
                <li><a href="#">TikTok</a></li>
                <li><a href="#">YouTube</a></li>
                <li><a href="#">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-gray-500 text-sm">
            © 2024 JelajahNusantara. Semua Hak Dilindungi.
          </div>
        </div>
      </footer>

      <AIChat />
    </div>
  );
};

export default App;
