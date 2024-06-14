import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policies } from '../../shared/models/policies';

@Injectable({
  providedIn: 'root'
})
export class PoliciesService  {

  private baseUrl = '/api/policies';

  constructor(private http: HttpClient) { }

  getPolicies(): Observable<Policies[]> {
    return this.http.get<Policies[]>(this.baseUrl);
  }

  createPolicy(policy: Policies): Observable<Policies> {
    return this.http.post<Policies>(this.baseUrl, policy);
  }

  getPolicyById(id: number): Observable<Policies> {
    return this.http.get<Policies>(`${this.baseUrl}/${id}`);
  }

  deletePolicy(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
