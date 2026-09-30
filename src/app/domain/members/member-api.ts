import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Member } from '@domain/members/models';
import { API_BASE_URL } from '../../config/api-base-url';

@Service()
export class MemberApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getAll() {
    return this.http.get<Member[]>(`${this.baseUrl}/members`);
  }

  getById(id: string) {
    return this.http.get<Member>(`${this.baseUrl}/members/${id}`);
  }
}
