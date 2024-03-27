import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../../shared/models/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url: string = "http://localhost:8000";
  endpoint: string = 'contacts';
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Acces-Control-Expose-Headers': '*',
      'Acces-Control-Allow-Methods': '*',
      'Acces-Control-Allow-Headers': '*',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public create(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(`${this.url}/${this.endpoint}`, contact, this.optionRequete);
  }

  public update(contact: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(
      `${this.url}/${this.endpoint}/${contact.id}`,
      contact,
      this.optionRequete
    );
  }

  read(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }

  list(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.url}/${this.endpoint}`, this.optionRequete);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }
}
