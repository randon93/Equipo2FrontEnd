import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/api-rest';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiRequestService } from './api-request.service';
import { UtilRequestService } from './util-request.service';

export interface Loan {
  id?: number;
  isbn?: string;
  nombre?: string;
  numero_libros?: number;
  libros_disponibles?: number;
}
@Injectable({providedIn: 'root'})
export class LoanService {

  appResource = environment.app;

  path = 'loans';

  constructor(private _apiRequestService: ApiRequestService,
    private _utilRequestService: UtilRequestService) { }

  allLoans(): Observable<ApiResponse<Loan[]>> {
    return this._utilRequestService.convertObserver(
      this._apiRequestService.get(this.appResource, this.path)
    );
  }


  register( loan: Loan ): Observable<ApiResponse<void>> {
    return this._utilRequestService.convertObserver(
      this._apiRequestService.post(this.appResource, this.path, loan)
    );
  }

  update(loanId: number, book: Loan): Observable<ApiResponse<void>> {
    return this._utilRequestService.convertObserver(
      this._apiRequestService.put(this.appResource, `${this.path}/${loanId}`, book )
    );
  }

}
