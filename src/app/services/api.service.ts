import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASE_URL = 'https://rirajtik-001-site1.ktempurl.com/api';
//https://localhost:7055/api/Authentication

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

    // ------------------- AUTH -------------------
  login(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/Authentication/login`, data);
  }


  // GET all cars
  getCars(): Observable<any> {
    return this.http.get(`${BASE_URL}/Car`);
  }
}
