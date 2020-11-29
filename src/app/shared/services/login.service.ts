import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.app.apiHostName}:${environment.app.port}/oauth/token`;

  constructor(private http: HttpClient) { }


  login(usuario: string, clave: string) {
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(clave)}`;

    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(`${environment.app.token_auth_username}:${environment.app.token_auth_password}`))
    });
  }


}
