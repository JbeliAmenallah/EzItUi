import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  private baseUrl = 'http://localhost:8080/api/kpi';

  constructor(private http: HttpClient) { }

  getTotalAbsences(contactId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalAbsences/${contactId}`);
  }

  getTotalPrimes(contactId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalPrimes/${contactId}`);
  }

  getTotalAutorisations(contactId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalAutorisations/${contactId}`);
  }

  getTotalConges(contactId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalConges/${contactId}`);
  }

  getTotalCotisations(contactId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalCotisations/${contactId}`);
  }

  getAverageSalaryByGrade(gradeId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/averageSalaryByGrade/${gradeId}`);
  }

  getTotalEnfants(contactId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalEnfants/${contactId}`);
  }

}
