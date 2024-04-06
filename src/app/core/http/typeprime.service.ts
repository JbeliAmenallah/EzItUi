
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TypePrime } from '../../shared/models/typeprime';

@Injectable({
  providedIn: 'root'
})
export class TypePrimeService {
  private apiUrl = 'http://localhost:8080/typeprimes'; 

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  getAllTypePrimes(): Observable<TypePrime[]> {
    return this.http.get<TypePrime[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTypePrimeById(id: number): Observable<TypePrime> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TypePrime>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  addTypePrime(typePrime: TypePrime): Observable<TypePrime> {
    return this.http.post<TypePrime>(this.apiUrl, typePrime)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateTypePrime(id: number, updatedTypePrime: TypePrime): Observable<TypePrime> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<TypePrime>(url, updatedTypePrime)
      .pipe(
        catchError(this.handleError)
      );
  }

  patchTypePrime(id: number, patchedTypePrime: Partial<TypePrime>): Observable<TypePrime> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<TypePrime>(url, patchedTypePrime)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTypePrime(typePrimeId: number): Observable<void> {
    const url = `${this.apiUrl}/${typePrimeId}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  fetchTypePrimes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
        map((typePrimes: any[]) => {
            return typePrimes.map(typePrime => {
                return { label: typePrime.code + ' - ' + typePrime.libele, value: typePrime.typePrimeId };
            });
        })
    );
}

 
}
