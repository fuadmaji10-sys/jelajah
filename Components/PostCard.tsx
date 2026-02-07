
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const categoryColors = {
    'Wisata': 'bg-blue-100 text-blue-700',
    'Kuliner': 'bg-orange-100 text-orange-700',
    'Akomodasi': 'bg-teal-100 text-teal-700',
    'Semua': 'bg-gray-100 text-gray-700'
  };

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
      onClick={() => onClick(post)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[post.category]}`}>
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-xs text-gray-500 mb-2 space-x-2">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center space-x-2">
             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
               {post.author.charAt(0)}
             </div>
             <span className="text-sm font-medium text-gray-700">{post.author}</span>
          </div>
          <span className="text-xs text-blue-600 font-semibold">{post.location}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
