import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

const baseURL = '/api/products';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {
  products;

  constructor(
    private http: HttpClient
  ) {}

  public getData(): Observable<any> {
    return this.products = this.http.get<any>(baseURL).pipe(
      catchError(err => {
        throw 'error getting data. Details: ' + err;
      })
    );
  }
}
