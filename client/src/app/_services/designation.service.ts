import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Designation } from '../_models/designation.model';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  designation: Designation[];
  apiUrl = environment.apiUrl + 'designations/';

  constructor(private http: HttpClient) { }

  getDesignations():Observable<Designation[]>{
    return this.http.get<any>(this.apiUrl);
  }
  
  getDesignationById(deptId: any): Observable<Designation>{
    return this.http.get<Designation>(this.apiUrl + deptId);
  }

  addDesignation(designation: Designation): Observable<Designation>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

    return this.http.post<Designation>(this.apiUrl ,designation, httpOptions);  
  }

  updateDesignation(id: any,designation: Designation): Observable<Designation>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

    return this.http.put<Designation>(this.apiUrl + id, designation, httpOptions);  
  }

  deleteDesignation(deptId: any): Observable<Designation> { 
    return this.http.delete<Designation>(this.apiUrl +deptId); 
  }  
}
