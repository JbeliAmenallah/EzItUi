import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {Product} from "../../shared/models/product";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    url: string = "http://localhost:8000";
    type: string = "type=";
    endpoint: string = 'products'
    optionRequete = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Acces-Control-Expose-Headers': '*',
            'Acces-Control-Allow-Methods': '*',
            'Acces-Control-Allow-Headers': '*',
        }),
    }

    constructor(private httpClient: HttpClient) {}

    public create(product: Product): Observable<Product> {
        return this.httpClient.post<Product>(`${this.url}/${this.endpoint}`, product)
    }

    public createFormData(data: FormData) {
        return this.httpClient.post(`${this.url}/${this.endpoint}`, data)
    }

    public update(product: Product): Observable<Product> {
        return this.httpClient.put<Product>(
            `${this.url}/${this.endpoint}/${product.id}`,
            product,
        )
    }

    read(id: number): Observable<Product> {
        return this.httpClient.get<Product>(`${this.url}/${this.endpoint}/${id}`)
    }


    list(/*queryOptions: QueryOptions*/): Observable<Product[]> {
        return this.httpClient.get<Product[]>(
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
