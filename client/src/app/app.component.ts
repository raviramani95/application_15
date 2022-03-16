import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from './_models/department.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  apiUrl = environment.apiUrl;
  depts: Department[]=[];
  title= "client";
  constructor(private http: HttpClient){ }
  
  ngOnInit(): void {
    this.http.get<{[key: string]: Department}>(this.apiUrl + 'departments')
    .pipe(map( (resData ) => {
      const ress:Department[] = [];
      for(const key in resData){
        ress.push({...resData[key], id: key});
      }
      // for(const rr in ress[1]){
      //   // var departmentId = rr[].depatmentId;
      //   // var departmentName = ress[1][1].departmentName;
      //   this.depts.push(rr);
      // }
      this.depts.push();
    }))
    .subscribe(res => {
      console.log(this.depts);
    },error => {
      console.log(error);
    })
  }

}
