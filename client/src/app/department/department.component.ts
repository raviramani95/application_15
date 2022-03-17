import { Component, OnInit, TemplateRef } from '@angular/core';
import { DepartmentService } from '../_services/department.service';
import { map, Observable } from 'rxjs';
import { Department } from '../_models/department.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments = [];
  addMode = false;
  ModalTitle: string;
  ActivateAddEditDepComp = false;
  departmentLists$: Observable<Department[]>;

  newDepartmentName = "";

  updateDepartmentName = "";

  constructor(private deptService: DepartmentService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(){
    // this.departmentLists$ = this.deptService.getDepartments();
    this.deptService.getDepartments().subscribe(res =>{
      this.departments = res;
    })
  }

  onAddDepartment(){
    this.addMode =true;
    let department = { departmentName: this.newDepartmentName}
    this.deptService.addDepartment(department).subscribe(res => {
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
    this.getDepartments();
  }

  onUpdateDepartment(event: Event){
    var dept = {
      departmentId: 1,
      departmentName: this.updateDepartmentName
    }
    console.log(event);
    console.log(dept)
    this.deptService.updateDepartment(1, dept).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    });
  }
  updateDepartment(id: number){
    this.addMode =false;
    this.ModalTitle = "Update Department";  
  }

  
  onDelete(event: any){
    this.deptService.deleteDepartment(event.departmentId).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);

      this.departmentLists$ = this.deptService.getDepartments();
    });
  }


  onAddClick(){
    this.addMode = true;
    this.ModalTitle = "Add Department";
  }

  modalClose(){

  }
}
