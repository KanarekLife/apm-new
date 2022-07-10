import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl: string = 'api/products/products.json';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.productsUrl).pipe(
      tap((data) => console.log(`All`, JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      const message = `An error occured: ${err.error.message}`;
      console.error(message);
      return throwError(() => message);
    }
    const message = `Server returned code: ${err.status}, error message is: ${err.message}`;
    console.error(message);
    return throwError(() => message);
  }
}
