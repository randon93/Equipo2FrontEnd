import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '@shared/api-rest';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilRequestService {
  convertObserver(callback: Observable<any>): Observable<ApiResponse<any>> {
    return callback.pipe(
      map(respJson => {
        return {
          status: true,
          message: respJson.message,
          data: respJson.data || undefined
        }
      }),
      catchError(err => {
        let resp: ApiResponse<any> = { status: false, message: 'error del sistema' }
        if (err.error && err.error.hasOwnProperty('message')) {
          resp.message = err.error.message;
          resp.data = err.error.data || undefined;
        }
        return of(resp)
      })

    )
  }
}
