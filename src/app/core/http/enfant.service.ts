import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Enfant } from '../../shared/models/Enfant';

@Injectable({
  providedIn: 'root'
})
export class EnfantService {
  private apiUrl = 'http://localhost:8080/enfants'; // Update with your API URL
  private contactUrl = 'http://localhost:8080/contacts'; // URL for contacts endpoint

  constructor(private http: HttpClient) {}

  // Get all enfants
  getAllEnfants(): Observable<Enfant[]> {
    return this.http.get<Enfant[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get enfant by ID
  getEnfantById(id: number): Observable<Enfant> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Enfant>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create enfant
  createEnfant(enfant: Enfant): Observable<Enfant> {
    return this.http.post<Enfant>(this.apiUrl, enfant)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update enfant
  updateEnfant(id: number, enfant: Enfant): Observable<Enfant> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Enfant>(url, enfant)
      .pipe(
        catchError(this.handleError)
      );
  }
  getEmployeeOptions(): Observable<any[]> {
    return this.http.get<any[]>(this.contactUrl).pipe(
      map((contacts: any[]) => {
        return contacts.map(contact => {
          return { label: contact.name, value: contact.contactId }; // Adjust to match your ContactDTO
        });
      })
    );
  }
  // Delete enfant by ID
  deleteEnfant(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
