import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from 'src/app/_models/department.model';
import { DepartmentService } from 'src/app/_services/department.service';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.css']
})
export class AddEditDepartmentComponent implements OnInit {

  
  
  @Input() department: Department;


  departmnetList$ : Observable<any[]>;
  departments = [];

  newDepartmentName: string = '';
  updateDepartmentName: string = '';
  departmentId: number = 0;

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    // this.departmentId = this.department.departmentId;
    // this.newDepartmentName = this.department.departmentName;
    this.departmnetList$ = this.departmentService.getDepartments();
  }

  onAdd(){
   var dept = {
    departmentId: this.departmentId,
    departmentName: this.newDepartmentName
   }
   this.departmentService.addDepartment(dept).subscribe(res => {
     var closebtn = document.getElementById('add-edit-modal-close');
     if(closebtn){
       closebtn.click();
     }
     var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
   });
  }

  onUpdate(){
    // var dept = {
    //   departmentId: this.departmentId,
    //   departmentName: this.updateDepartmentName
    // }
    // console.log(dept)
    // this.departmentService.updateDepartment(dept).subscribe(res => {
    //   var closeModalBtn = document.getElementById('add-edit-modal-close');
    //   if(closeModalBtn) {
    //     closeModalBtn.click();
    //   }

    //   var showUpdateSuccess = document.getElementById('update-success-alert');
    //   if(showUpdateSuccess) {
    //     showUpdateSuccess.style.display = "block";
    //   }
    //   setTimeout(function() {
    //     if(showUpdateSuccess) {
    //       showUpdateSuccess.style.display = "none"
    //     }
    //   }, 4000);
    // });
   }

  onCancel(){

  }

}
