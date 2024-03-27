import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}
@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl: "http://localhost:8000";
  apiUrl: "http://localhost:8000";
  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    console.log(credentials);
    return this.http.post(
        this.apiUrl + "/login",
        credentials,
        httpOptions
    );
  }
  register(user: any): Observable<any> {
    return this.http.post(this.apiUrl + "/users", user, httpOptions);
  }
  passwordReset(login: any): Observable<any> {
    return this.http.post(this.baseUrl + "/reset/password", login, httpOptions);
  }
}
