import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/api-rest';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiRequestService } from './api-request.service';
import { UtilRequestService } from './util-request.service';

export interface Book {
  id?: number;
  isbn?: string;
  nombre?: string;
  numero_libros?: number;
  libros_disponibles?: number;
}
@Injectable({providedIn: 'root'})
export class BookService {

  appResource = environment.app;

  path = 'books';

  constructor(private _apiRequestService: ApiRequestService,
    private _utilRequestService: UtilRequestService) { }

  allBooks(): Observable<ApiResponse<Book[]>> {
    return this._utilRequestService.convertObserver(
      this._apiRequestService.get(this.appResource, this.path)
    );
  }

  register( book: Book ): Observable<ApiResponse<void>> {
    return this._utilRequestService.convertObserver(
      this._apiRequestService.post(this.appResource, this.path, book)
    );
  }

  update(bookId: number, book: Book): Observable<ApiResponse<void>> {
    return this._utilRequestService.convertObserver(
      this._apiRequestService.put(this.appResource, `${this.path}/${bookId}`, book )
    );
  }

}
