import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {
 
  code: string;
  httpOptions: { headers: HttpHeaders; };
   public baseUrl=''

  constructor(public http: HttpClient, public routes: Router) { }

  // Api Structuring Functionality
  
  getApi(url) {
    if (localStorage.getItem('Auth')) {
      this.code = localStorage.getItem('Auth')
    }
    if (localStorage.getItem('data') || localStorage.getItem('Auth')) {
      this.httpOptions = {
        headers: new HttpHeaders({ 'token': `${this.code}` })
      }
    }
    return this.http.get(this.baseUrl + url, this.httpOptions);
  }

  getThirdPartyApi(url) {
    return this.http.get(url,{observe:'response'})
  }

  // Form Data Api Structure
  postApi(endPoint, data): Observable<any> {
    if (localStorage.getItem('Auth')) {
      this.code = localStorage.getItem('Auth')
    }
    if (localStorage.getItem('data') || localStorage.getItem('Auth')) {

      this.httpOptions = {
        headers: new HttpHeaders({ 'token': `${this.code}` })
      }
    }
    return this.http.post(this.baseUrl + endPoint, data, this.httpOptions);
  }

  
}

