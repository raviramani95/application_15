import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../_models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departments: Department;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDepartments(){
    // return this.http.get(this.baseUrl + 'departments').pipe(
    //   map(dept => {
    //     console.log(dept);
    //   })
    // )
  }
}
