import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Member } from '@domain/members/models';

@Service()
export class MemberApi {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<Member[]>('/api/members');
  }

  getById(id: string) {
    return this.http.get<Member>(`/api/members/${id}`);
  }
}
