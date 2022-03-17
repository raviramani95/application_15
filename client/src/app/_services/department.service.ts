import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../_models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  apiUrl = environment.apiUrl;
  existsDepartment = ["HR", "Administrator", "Account", "Research & Development"];
  departments: Department[];

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(this.apiUrl + 'departments');
  }
  
  getDepartmentById(deptId: string): Observable<Department>{
    return this.http.get<Department>(this.apiUrl + 'departments/' + deptId);
  }

  addDepartment(department: Department): Observable<Department>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

    return this.http.post<Department>(this.apiUrl + 'departments/',  
      department, httpOptions);  
  }

  updateDepartment(id: number,department: Department): Observable<Department>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

    return this.http.put<Department>(this.apiUrl + 'departments/' + id, department, httpOptions);  
  }

  deleteDepartment(deptId: any): Observable<Department> { 
    return this.http.delete<Department>(this.apiUrl + 'departments/' +deptId); 
  }  
  

  
}
