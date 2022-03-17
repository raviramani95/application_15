import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  apiUrl = environment.apiUrl;
  depts: any;
  title= "client";
  constructor(private http: HttpClient){ }
  
  ngOnInit(): void {
  
  }

}
