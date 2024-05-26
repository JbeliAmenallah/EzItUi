import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prime } from '../../shared/models/prime';

@Injectable({
  providedIn: 'root'
})
export class PrimeService {  private apiUrl = ' http://localhost:8080/primes'; 


  constructor(private http: HttpClient) {}

  getAllPrimes(): Observable<Prime[]> {
    return this.http.get<Prime[]>(this.apiUrl);
  }

  getPrimeById(id: number): Observable<Prime> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Prime>(url);
  }

  addPrime(prime: Prime): Observable<Prime> {
    return this.http.post<Prime>(this.apiUrl, prime);
  }

  updatePrime(id: number, prime: Prime): Observable<Prime> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Prime>(url, prime);
  }

  deletePrime(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }


  getPrime(id: number): Observable<Prime> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Prime>(url);
  }

  getContactIdsByPrimeId(primeId: number): Observable<number[]> {
    const url = `${this.apiUrl}/contact-ids/${primeId};`
    return this.http.get<number[]>(url);
  }
  addPrimeToEmployeesByCategoryGradeOrGroup(prime: Prime): Observable<Prime[]> {
    return this.http.post<Prime[]>(`${this.apiUrl}/addByCategoryGradeOrGroup`, prime);
  }
    // Add the new method to fetch primes by contactId
    getPrimesByContactId(contactId: number): Observable<Prime[]> {
      const url = `${this.apiUrl}/contact/${contactId}/primes`; // Adjust the API endpoint as per your backend route
      return this.http.get<Prime[]>(url);
    }
}
