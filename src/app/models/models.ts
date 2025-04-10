export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  authorId: number;
  author?: Author;
  pubYear: string;
  img?: File;
  imgPath?: string; 
  description?: string;
  categoryId: number;
  category?: Category;
}

export interface BooksByCategory {
  bookCategoryId: number;
  category: string;
  subCategory: string;
  books: Book[];
}

export interface Favorites {
  id: number;
  userId: number;
  userName: string | null;
  bookId: number;
  bookTitle: string;
}
