import { Component, OnInit, TemplateRef } from '@angular/core';
import { DepartmentService } from '../_services/department.service';
import { map, Observable } from 'rxjs';
import { Department } from '../_models/department.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  department: Department;
  deptForm: FormGroup;
  listData: any;

  addMode = false;
  ModalTitle: string;
  departmentLists$: Observable<Department[]>;

  newDepartmentName = "";
  updateDepartmentName = "";
  updateId: number;

  constructor(private deptService: DepartmentService, private fb:FormBuilder) { 
    this.listData = [];
    this.deptForm = this.fb.group({
      dipartmentId : ['', Validators.required],
      dipartmentName : ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(){
    this.departmentLists$ = this.deptService.getDepartments();
  }

  getDepartment(id: any){
    this.addMode = false;
    this.updateDepartment();
    this.updateId = id;
    console.log(id);
    this.deptService.getDepartmentById(id).subscribe(res => this.department = res);
    console.log(this.department);
  }

  onAddClick(){
    this.addMode = true;
    this.ModalTitle = "Add Department";
  }

  onAddDepartment(){

    let department = {
      departmentId: 0,
      departmentName: this.newDepartmentName
    }

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
    this.departmentLists$;
    this.addMode = false;
  }

  updateDepartment(){
    this.addMode =false;
    this.ModalTitle = "Update Department";  
  }

  onUpdateDepartment(){
    
    let department = {
      departmentId: this.updateId,
      departmentName: this.updateDepartmentName
    }

    this.deptService.updateDepartment(department.departmentId, department).subscribe(res => {
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
    this.departmentLists$ = this.deptService.getDepartments();
  }

  onDelete(data: any){
    console.log(data);
    
    this.deptService.deleteDepartment(data).subscribe(res => {
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
    });
    this.departmentLists$ = this.deptService.getDepartments();
  }

  modalClose(){ }
}
