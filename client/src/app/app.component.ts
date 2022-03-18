import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from './_services/notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  apiUrl = environment.apiUrl;
  depts: any;
  title= "client";
  constructor(private http: HttpClient, private notifyService : NotificationService){ }
  
  ngOnInit(): void {
  
  }

  showToasterSuccess(){
    this.notifyService.showSuccess("Data shown successfully !!", "tutsmake.com")
}
 
showToasterError(){
    this.notifyService.showError("Something is wrong", "tutsmake.com")
}
 
showToasterInfo(){
    this.notifyService.showInfo("This is info", "tutsmake.com")
}
 
showToasterWarning(){
    this.notifyService.showWarning("This is warning", "tutsmake.com")
}

}
