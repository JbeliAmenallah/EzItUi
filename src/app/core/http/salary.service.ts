import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private baseUrl = 'http://localhost:8080'; // Update with your backend URL

  constructor(private http: HttpClient) { }


  generateSalaryForContact(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-salary`, payload);
  }

  generateSalaryForAllContacts(year: number, month: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/generate-salary-all?year=${year}&month=${month}`);
  }

}
