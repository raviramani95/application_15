import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  designation: any;
  apiUrl = environment.apiUrl + 'designations';

  constructor(private http: HttpClient) { }

  getDesignations():Observable<any[]>{
    return this.http.get<any>(this.apiUrl);
  }
  
  addDesignation(desig: any){
    return this.http.post(this.apiUrl, desig);
  }

  updateDesignation(desig: any){
    return this.http.put(this.apiUrl, desig);
  }

  deleteDesignation(desig: any){
    return this.http.delete(this.apiUrl, desig)
  }
}
