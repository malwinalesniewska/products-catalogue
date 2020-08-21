import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';

const baseURL = '/api/products';

export const defaultPrice = 0;

export interface ProductDto {
  id: number;
  name: string;
  description: string;
  prices: PriceDto[];
  image: string;
}

export interface PriceDto {
  id: number;
  value: number;
}
export interface PriceDtoArray extends Array<PriceDto>{}

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {
  products;

  constructor(
    private http: HttpClient
  ) {}
  
  // TODO: add prices to array
  public getData(): Observable<ProductDto> {
    return this.products = this.http.get<ProductDto>(baseURL).pipe(
      catchError(this.handleError)
    );
  }

  public editData(id: number, product: ProductDto) {
    return this.http.put<ProductDto>(`${baseURL}\\${id}`, product).pipe(
      catchError(this.handleError)
    );
  }

  public postData(product: ProductDto) {
    return this.http.post<ProductDto>(baseURL, product).pipe(
      catchError(this.handleError)
    );
  }

  public deleteData(id: number) {
    return this.http.delete<ProductDto>(`${baseURL}\\${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError (
      'Something bad happened; please try again later.');
  }
}
