import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {Supplier} from "../../shared/models/supplier";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    url: string = "http://localhost:8000";
    type: string = "type=";
    endpoint: string = 'suppliers'
    optionRequete = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Acces-Control-Expose-Headers': '*',
            'Acces-Control-Allow-Methods': '*',
            'Acces-Control-Allow-Headers': '*',
        }),
    }

    constructor(private httpClient: HttpClient) {}

    public create(supplier: Supplier): Observable<Supplier> {
        return this.httpClient.post<Supplier>(`${this.url}/${this.endpoint}`, supplier)
    }

    public createFormData(data: FormData) {
        return this.httpClient.post(`${this.url}/${this.endpoint}`, data)
    }

    public update(supplier: Supplier): Observable<Supplier> {
        return this.httpClient.put<Supplier>(
            `${this.url}/${this.endpoint}/${supplier.id}`,
            supplier,
        )
    }

    read(id: number): Observable<Supplier> {
        return this.httpClient.get<Supplier>(`${this.url}/${this.endpoint}/${id}`)
    }


    list(/*queryOptions: QueryOptions*/): Observable<Supplier[]> {
        return this.httpClient.get<Supplier[]>(
            `${this.url}/${this.endpoint}`
        ) /* ?${queryOptions.toQueryString()} */
    }

    delete(id: number) {
        return this.httpClient.delete(`${this.url}/${this.endpoint}/${id}`)
    }

    public addFile(data: FormData, itemId: number, fileName: string) {
        return this.httpClient.post(
            `${this.url}/${this.endpoint}/${itemId}/${fileName}`,
            data,
        )
    }
}
