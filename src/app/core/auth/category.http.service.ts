import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {Category} from "../../shared/models/category";

export class CategoryHttpService {
    url: string = "http://localhost:8000";
    type: string = "type=";
    optionRequete = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Acces-Control-Expose-Headers': '*',
            'Acces-Control-Allow-Methods': '*',
            'Acces-Control-Allow-Headers': '*',
        }),
    }

    constructor(private httpClient: HttpClient, private endpoint: string) {}

    public create(category: Category): Observable<Category> {
        return this.httpClient.post<Category>(`${this.url}/${this.endpoint}`, category)
    }

    public createFormData(data: FormData) {
        return this.httpClient.post(`${this.url}/${this.endpoint}`, data)
    }

    public update(category: Category): Observable<Category> {
        return this.httpClient.put<Category>(
            `${this.url}/${this.endpoint}/${category.id}`,
            category,
        )
    }

    read(id: number): Observable<Category> {
        return this.httpClient.get<Category>(`${this.url}/${this.endpoint}/${id}`)
    }


    list(/*queryOptions: QueryOptions*/): Observable<Category[]> {
        return this.httpClient.get<Category[]>(
            `${this.url}/${this.endpoint}`,
            this.optionRequete,
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
