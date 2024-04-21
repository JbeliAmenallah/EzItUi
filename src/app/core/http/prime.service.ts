import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prime } from '../../shared/prime';

@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
export class PrimeService {

  private apiUrl = ' http://localhost:8080/primes'; 

=======
export class PrimeService {  private apiUrl = ' http://localhost:8080/primes'; 
>>>>>>> 0ac8781cff189dc75c8ed4165497538b1133056d


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
}
