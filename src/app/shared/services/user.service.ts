import { Injectable } from '@angular/core';

import { ApiResponse } from '@shared/api-rest';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiRequestService } from './api-request.service';
import { UtilRequestService } from './util-request.service';
import { LocalStorageService } from './storage.service';

export interface User {
  id?: number;
  correo?: string;
  clave?: string;
  rol?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  appResource = environment.app;

  path = 'usuarios';

  constructor(private _apiRequestService: ApiRequestService,
    private _utilRequestService: UtilRequestService, private _localStorageBackend: LocalStorageService) { }

    allUsers(): Observable<ApiResponse<User[]>> {
      return this._utilRequestService.convertObserver(
        this._apiRequestService.get(this.appResource, this.path)
      );
    }

    getUser(correo:string){
      var sesion=this._localStorageBackend.get(correo);
      return sesion.
    }
}
