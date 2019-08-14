import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseurl = 'http://localhost:8080/';
  constructor(private http:HttpClient) { }
  getDispo(){
    return this.http.get(this.baseurl);
    }

    getAll(){
      return this.http.get(this.baseurl+'all');

    }
}
