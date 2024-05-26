import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Absence } from '../../shared/models/absence';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl = 'http://localhost:8080/absences';
  private contactUrl = 'http://localhost:8080/contacts'; // URL for contacts endpoint

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
  countAbsencesByYear(year: number): Observable<number> {
    const url = `${this.apiUrl}/count-by-year`;
    const params = new HttpParams().set('year', year.toString());
    return this.http.get<number>(url, { params }).pipe(
      catchError(this.handleError)
    );
  }
  getAbsencesByUsername(username: string): Observable<Absence[]> {
    const url = `${this.apiUrl}/by-username/${username}`; // Corrected URL
    return this.http.get<Absence[]>(url).pipe(
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


  getAllAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getEmployeeOptions(): Observable<any[]> {
    return this.http.get<any[]>(this.contactUrl).pipe(
      map((contacts: any[]) => {
        return contacts.map(contact => {
          return { label: contact.name, value: contact.contactId };
        });
      }),
      catchError(this.handleError)
    );
  }

  addAbsence(absence: Absence): Observable<Absence> {
    return this.http.post<Absence>(this.apiUrl, absence).pipe(
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
 /* private handlarError(error: HttpErrorResponse) {
    console.error('Error:', error);
    if (error.status === 400 && error.error && error.error.message === 'Validation Error') {
      const validationErrors = error.error.errors;
      const formattedErrors = Object.entries(validationErrors).map(([field, errorMessage]) => ({
        field,
        message: errorMessage
      }));
      return throwError(formattedErrors);
    } else {
      return throwError('Something bad happened; please try again later.');
    }
  }*/
  updateAbsence(id: number, updatedAbsence: Absence): Observable<Absence> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Absence>(url, updatedAbsence).pipe(
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

  patchAbsence(id: number, patchedAbsence: Partial<Absence>): Observable<Absence> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Absence>(url, patchedAbsence).pipe(
      catchError(this.handleError)
    );
  }

  deleteAbsence(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  getAbsencesByContactId(contactId: number): Observable<Absence[]> {
    const url = `${this.apiUrl}/by-contact/${contactId}`;
    return this.http.get<Absence[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  getAbsencesBetweenDates(startDate: Date, endDate: Date): Observable<Absence[]> {
    const url = `${this.apiUrl}/between-dates`;
    const params = { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
    return this.http.get<Absence[]>(url, { params }).pipe(
      catchError(this.handleError)
    );
  }
 
  getAbsenceById(id: number): Observable<Absence> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.get<Absence>(url);
  }

  
}
