import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Autorisation } from '../../shared/models/autorisation';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {
  private apiUrl = 'http://localhost:8080/api/autorisations';

  constructor(private http: HttpClient) {}

  getAllAutorisations(): Observable<Autorisation[]> {
    return this.http.get<Autorisation[]>(this.apiUrl);
  }

  saveAutorisation(autorisation: Autorisation): Observable<Autorisation> {
    return this.http.post<Autorisation>(this.apiUrl, autorisation);
  }

  updateAutorisation(autorisationId: number, autorisation: Autorisation): Observable<Autorisation> {
    const url = `${this.apiUrl}/${autorisationId}`;
    return this.http.put<Autorisation>(url, autorisation).pipe(
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

  patchAutorisation(autorisationId: number, autorisation: Partial<Autorisation>): Observable<Autorisation> {
    const url = `${this.apiUrl}/${autorisationId}`;
    return this.http.patch<Autorisation>(url, autorisation);
  }

  deleteAutorisation(autorisationId: number): Observable<void> {
    const url = `${this.apiUrl}/${autorisationId}`;
    return this.http.delete<void>(url);
  }

  getAutorisationsByContactId(contactId: number): Observable<Autorisation[]> {
    const url = `${this.apiUrl}/contact/${contactId}`;
    return this.http.get<Autorisation[]>(url);
  }

  getAutorisationsWithDurationMoreThanTwoHours(): Observable<Autorisation[]> {
    const url = `${this.apiUrl}/duration-more-than-two-hours`;
    return this.http.get<Autorisation[]>(url);
  }
  
  getAutorisationById(id: number): Observable<Autorisation> {
    const url = `${this.apiUrl}/autorisations/${id}`;
    return this.http.get<Autorisation>(url);
  }
  submitAutorisationRequest(formData: any): Observable<any> {
    // Format dates to ISO 8601 format
    const formattedStartDate = this.formatDate(formData.startDate);
    const formattedEndDate = this.formatDate(formData.endDate);

    // Construct HttpParams with formatted dates and keycloakUserId
    let params = new HttpParams()
      .set('startDate', formattedStartDate)
      .set('endDate', formattedEndDate)
      .set('keycloakUserId', formData.keycloakUserId);

    // Make HTTP POST request with query parameters and empty body
    return this.http.post<any>(`${this.apiUrl}/demande`, {}, { params: params });
  }

  private formatDate(date: Date): string {
    return date.toISOString(); // Convert date to ISO string
  }
  
  
}
