import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiResource {
  apiHostName: string;
  port?: number;
  apiBase?: string;
}

interface ApiParams {
  urlParams?: HttpParams;
  headerParams?: {[key: string]: string};
}

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(
    private http: HttpClient,
  ) { }

  getHeaders(optionalHeaders?: any): HttpHeaders {
    let headers;
    if (optionalHeaders) {
      headers = new HttpHeaders();
      for (const prop in optionalHeaders) {
        headers = headers.append(prop, String(optionalHeaders[prop]));
      }
    } else {
      headers = new HttpHeaders();
    }

    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }


  getBaseApiPath(apirest: ApiResource): string {
    let url: string;
      if(apirest.port){
        url = `${apirest.apiHostName}:${apirest.port}/`;
      } else {
        url = `${apirest.apiHostName}/`;
      }

      if(apirest.apiBase) {
        url = `${url}${apirest.apiBase}/`;
      }
      return url;
  }

  get(apirest: ApiResource, url: string, config?: ApiParams): Observable<any> {
    let baseApiPath = this.getBaseApiPath(apirest);
    return this.http.get(baseApiPath + url,
      { headers: this.getHeaders(config?.headerParams), params: config?.urlParams })
  }

  post(apirest: ApiResource, url: string, body: Object, config?: ApiParams): Observable<any> {
    let baseApiPath = this.getBaseApiPath(apirest);
    return this.http.post(baseApiPath + url, JSON.stringify(body),
      { headers: this.getHeaders(config?.headerParams), params: config?.urlParams })
  }

  put(apirest: ApiResource, url: string, body: Object, config?: ApiParams): Observable<any> {
    let baseApiPath = this.getBaseApiPath(apirest);
    return this.http.put(baseApiPath + url, JSON.stringify(body),
      { headers: this.getHeaders(config?.headerParams), params: config?.urlParams })
  }

  delete(apirest: ApiResource, url: string, config: ApiParams): Observable<any> {
    let baseApiPath = this.getBaseApiPath(apirest);
    return this.http.delete(baseApiPath + url,
      { headers: this.getHeaders(config?.headerParams), params: config?.urlParams })
  }
}
