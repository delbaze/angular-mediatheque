import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Loan } from './models';

@Service()
export class LoanApi {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<Loan[]>('/api/loans');
  }

  getByMember(memberId: string) {
    return this.http.get<Loan[]>('/api/loans', { params: { memberId } });
  }

  borrow(loan: Loan) {
    return this.http.post<Loan>('/api/loans', loan);
  }

  giveBack(id: string, date = new Date()) {
    return this.http.patch<Loan>(`/api/loans/${id}`, { returnedAt: date.toISOString().slice(0, 10) });
  }

  cancel(id: string) {
    return this.http.delete<void>(`/api/loans/${id}`);
  }
}