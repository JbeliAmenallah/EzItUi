import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Deduction } from '../../shared/models/deduction';

@Injectable({
  providedIn: 'root'
})
export class DeductionService {

  private apiUrl = 'http://localhost:8080/api/deductions'; // Assuming your backend API endpoint

  constructor(private http: HttpClient) { }

  getAllDeductions(): Observable<Deduction[]> {
    return this.http.get<Deduction[]>(this.apiUrl).pipe(
        catchError(error => {
          console.error('Error fetching deductions:', error);
          throw error; // Rethrow the error to propagate it to the caller
        })
    );
  }

  getDeductionById(id: number): Observable<Deduction> {
    return this.http.get<Deduction>(`${this.apiUrl}/${id}`);
  }

  createDeduction(deduction: Deduction): Observable<Deduction> {
    return this.http.post<Deduction>(this.apiUrl, deduction);
  }

  updateDeduction(id: number, deduction: Deduction): Observable<Deduction> {
    return this.http.put<Deduction>(`${this.apiUrl}/${id}`, deduction);
  }

  patchDeduction(id: number, deduction: Partial<Deduction>): Observable<Deduction> {
    return this.http.patch<Deduction>(`${this.apiUrl}/${id}`, deduction);
  }

  deleteDeduction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
