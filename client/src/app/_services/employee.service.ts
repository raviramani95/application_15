import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: any;
  apiUrl = environment.apiUrl + 'employee';

  constructor(private http: HttpClient) { }

  getEmployees():Observable<any[]>{
    return this.http.get<any>(this.apiUrl);
  }
  
  getEmployee(emp: any){
    return this.http.post(this.apiUrl, emp);
  }

  addEmployee(emp: any){
    return this.http.put(this.apiUrl ,emp);
  }

  updateEmployee(emp: any){
    return this.http.put(this.apiUrl, emp);
  }

  deleteEmployee(emp: any){
    return this.http.delete(this.apiUrl, emp)
  }
}
