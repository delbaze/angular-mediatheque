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

export interface Member {
  id: string;
  name: string;
  email: string;
  since: string;
  category: 'adulte' | 'jeune';
}

export interface Loan {
  id?: string;
  bookId: string;
  memberId: string;
  from: string;
  due: string;
  returnedAt: string | null;
}

export interface LoanStatsSummary {
  total: number;
  active: number;
  late: number;
  returned: number;
  lateRate: number;
}