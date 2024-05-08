import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    const formattedData = {
      dateDebut: formData.startDate,
      dateFin: formData.endDate,
      contactId: formData.contactId
    };

    console.log('Sending request:', formattedData); // Log the data being sent

    return this.http.post<any>(`${this.apiUrl}/demande`, formattedData).pipe(
      tap(response => console.log('Received response:', response)), // Log the response
      catchError(error => {
        console.error('Error submitting autorisation request:', error); // Log any errors
        throw error; // Rethrow the error
      })
    );
  }
  
  
}
