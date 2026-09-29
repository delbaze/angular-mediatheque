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