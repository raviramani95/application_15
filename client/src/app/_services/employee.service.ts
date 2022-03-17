import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../_models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: Employee[];
  apiUrl = environment.apiUrl + 'employee/';

  constructor(private http: HttpClient) { }

  getEmployees():Observable<Employee[]>{
    return this.http.get<any>(this.apiUrl);
  }
  
  getEmployeeById(deptId: any): Observable<Employee>{
    return this.http.get<Employee>(this.apiUrl + deptId);
  }

  addEmployee(employee: Employee): Observable<Employee>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

    return this.http.post<Employee>(this.apiUrl ,employee, httpOptions);  
  }

  updateEmployee(id: any,employee: Employee): Observable<Employee>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

    return this.http.put<Employee>(this.apiUrl + id, employee, httpOptions);  
  }

  deleteEmployee(deptId: any): Observable<Employee> { 
    return this.http.delete<Employee>(this.apiUrl +deptId); 
  }  
}
