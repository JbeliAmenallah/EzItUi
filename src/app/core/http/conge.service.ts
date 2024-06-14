import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Conge } from '../../shared/models/conge';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private baseUrl = 'http://localhost:8080/conges'; // Replace with your API base URL

  constructor(private http: HttpClient) { }
  // Save Conge
  saveConge(conge: Conge): Observable<Conge> {
    return this.http.post<Conge>(`${this.baseUrl}`, conge).pipe(
      catchError((error) => {
        if (error.status === 400 && error.error) {
          // Handle the validation error response
          return throwError(error.error);
        } else {
          // Handle other errors
          return throwError('Une erreur ');
        }
      }
    )
    );
  
  }

  // Get Conge by ID
  getCongeById(congeId: number): Observable<Conge> {
    return this.http.get<Conge>(`${this.baseUrl}/${congeId}`);
  }

  getPendingCongeCount(): Observable<number> {
    const url = `${this.baseUrl}/pending/count`; 
    return this.http.get<number>(url);
  }


  getCongesPerMonth(): Observable<{ month: string, congesCount: number }[]> {
    return this.http.get<{ month: string, congesCount: number }[]>(`${this.baseUrl}/per-month`);
  }

  
  updateConge(congeId: number, conge: Conge): Observable<Conge> {
    return this.http.put<Conge>(`${this.baseUrl}/${congeId}`, conge).pipe(
      catchError((error) => {
        if (error.status === 400 && error.error) {
          // Handle the validation error response
          return throwError(error.error);
        } else {
          // Handle other errors
          return throwError('Une erreur ');
        }
      })
    );
  }
  

  // Delete Conge
  deleteConge(congeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${congeId}`);
  }

  // Get All Conges
  getAllConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.baseUrl}`);
    console.log("aa")
  }

  // Get Conges by Contact ID
  getCongesByContactId(contactId: number): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.baseUrl}/byContact/${contactId}`);
  }

  submitLeaveRequest(formData: any): Observable<any> {
    // Format dates to ISO 8601 format
    const formattedStartDate = this.formatDate(formData.startDate);
    const formattedEndDate = this.formatDate(formData.endDate);

    // Construct HttpParams with formatted dates and keycloakUserId
    let params = new HttpParams()
      .set('startDate', formattedStartDate)
      .set('endDate', formattedEndDate)
      .set('keycloakUserId', formData.keycloakUserId);

    // Make HTTP POST request with query parameters and empty body
    return this.http.post<any>(`${this.baseUrl}/demande`, {}, { params: params });
  }
  getCongesByUsername(username: string): Observable<Conge[]> {
    const url = `${this.baseUrl}/by-username/${username}`; // Corrected URL
    return this.http.get<Conge[]>(url).pipe(
      catchError((error) => {
        if (error.status === 400 && error.error) {
          // Handle the validation error response
          return throwError(error.error);
        } else {
          // Handle other errors
          return throwError('Une erreur ');
        }
      })
    );
  }
  private formatDate(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
}