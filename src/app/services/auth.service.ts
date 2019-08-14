import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user;
  backendUrl='http://localhost:8080/'
  constructor(private http: HttpClient ) { }
  logout() {
  }

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    console.log(headers);
    return this.http.post('http://localhost:8080/' + 'oauth/token', loginPayload, {headers});
  }

  isAuthenticated(){
return JSON.parse(window.sessionStorage.getItem('token'))
  }
}
