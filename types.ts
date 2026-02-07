
export type Category = 'Wisata' | 'Kuliner' | 'Akomodasi' | 'Semua';

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: Category;
  author: string;
  date: string;
  readTime: string;
  location: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
