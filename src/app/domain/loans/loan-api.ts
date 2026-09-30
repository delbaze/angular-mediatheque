import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Loan } from '@domain/loans/models';
import { Measure } from '@core/decorators/measure';
import { API_BASE_URL } from '../../config/api-base-url';
import { toIsoDate } from '@shared/util/iso-date';

@Service()
export class LoanApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getAll() {
    return this.http.get<Loan[]>(`${this.baseUrl}/loans`);
  }

  getByMember(memberId: string) {
    return this.http.get<Loan[]>(`${this.baseUrl}/loans`, { params: { memberId } });
  }

  borrow(loan: Loan) {
    return this.http.post<Loan>(`${this.baseUrl}/loans`, loan);
  }

  giveBack(id: string, date = new Date()) {
    return this.http.patch<Loan>(`${this.baseUrl}/loans/${id}`, {
      returnedAt: toIsoDate(date),
    });
  }

  cancel(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/loans/${id}`);
  }

  @Measure('ping')
  async ping(): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return Date.now();
  }
}
