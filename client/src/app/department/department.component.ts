import { Component, OnInit, TemplateRef } from '@angular/core';
import { DepartmentService } from '../_services/department.service';
import { map, Observable } from 'rxjs';
import { Department } from '../_models/department.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  department: Department;
  deptForm: FormGroup;
  listData: any;

  deptList: any[] = [];

  addMode = false;
  ModalTitle: string;
  departmentLists$: Observable<Department[]>;

  newDepartmentName = "";
  updateDepartmentName = "";
  updateId: number;

  constructor(private deptService: DepartmentService, private fb:FormBuilder, 
    private notifyService : NotificationService) { 
    this.listData = [];
    this.deptForm = this.fb.group({
      dipartmentName : ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z ]+')
      ])],
    });
  }

  updateDeptList(){

  }

  ngOnInit(): void {
    this.getDepartments();
    this.deptService.getDepartments().subscribe(res => {
      let l = res;
      // for(let i in res){
      //   l.push(res[i])
      // }
      // this.deptList.push();
      for(let i in l){
        this.deptList.push(l[i].departmentName);
      }
      console.log(l);
      
      console.log(this.deptList);
    })
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
    this.deptForm.reset();
    this.notifyService.showSuccess("Successfully Department add :)", "Success");
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
    this.notifyService.showSuccess("Successfully Department update :)", "Success");
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
    this.notifyService.showSuccess("Successfully Department Delete :)", "Success");
  }

  modalClose(){ this.deptForm.reset()}
}
