import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

const baseURL = '/api/products';

export const defaultPrice = 0;

export class ProductDto {
  id: number;
  name: string;
  description: string;
  prices: [];
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {
  products;

  constructor(
    private http: HttpClient
  ) {}

  public getData(): Observable<ProductDto> {
    return this.products = this.http.get<ProductDto>(baseURL).pipe(
      catchError(err => {
        throw 'error getting data. Details: ' + err;
      })
    );
  }

  public editData(id: number) {

  }
}
