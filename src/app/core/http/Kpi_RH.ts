
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KpiRh } from '../../shared/models/KpiRH';

@Injectable({
  providedIn: 'root'
})
export class KpiRhService {

  private apiUrl = 'http://localhost:8080/api/kpiRh';

  constructor(private http: HttpClient) { }

  addKpiRhForContact(username: string): Observable<KpiRh> {
    const params = new HttpParams().set('username', username);
    return this.http.post<KpiRh>(`${this.apiUrl}/add`, {}, { params });
  }
}
