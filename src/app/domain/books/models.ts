export interface Book {
  id: string;
  title: string;
  authorId: string;
  genre: string;
  year: number;
  isbn: string;
  rating: number;
  copies: number;
  available: number;
  addedAt: string;
}

export interface Author {
  id: string;
  name: string;
}
