import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'https://rirajtik-001-site1.ktempurl.com/api';
//https://localhost:7055/api/Authentication

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // ------------------- AUTH -------------------
  login(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/Authentication/login`, data);
  }

  // Driver API=================================================

  CreateDriver(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/Driver`, data);
  }
  GetAllDriver(): Observable<any> {
    return this.http.get(`${BASE_URL}/Driver`);
  }
  DeleteDriverbyId(id: number): Observable<any> {
  return this.http.delete(`${BASE_URL}/Driver/${id}`);
}
   EditdriverById(id:number,obj:any):Observable<any>{
   return this.http.put(`${BASE_URL}/Driver/${id}`,obj);
 }
 
// Contact API=================================================

  CreateContact(obj:any): Observable<any>{
    return this.http.post(`${BASE_URL}/Contanct`,obj)
  }


// car Type API=================================================

 GetCars(): Observable<any> {
    return this.http.get(`${BASE_URL}/Car`);
  }
  
}