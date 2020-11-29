import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/api-rest';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiRequestService } from './api-request.service';
import { LoanService } from './loan.service';
import { UtilRequestService } from './util-request.service';

export interface Loan {
  id?: number;
  isbn?: string;
  nombre?: string;
  numero_libros?: number;
  libros_disponibles?: number;
}
@Injectable({providedIn: 'root'})
export class PersonService {

  private appResource = environment.app;
  private path = '/usuario'

  constructor(private _apiRequestService: ApiRequestService,
    private _utilRequestService: UtilRequestService) {}


  register(body: any) {
    return this._utilRequestService.convertObserver(
      this._apiRequestService.post(this.appResource, this.path, body)
    );
  }

  public verifyDocumento(document: string) {
    return this._utilRequestService.convertObserver(
      this._apiRequestService.get(this.appResource, `${this.path}/buscar-identificacion/${document}`,)
    );
  }


}
