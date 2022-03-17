import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from 'src/app/_models/department.model';
import { DepartmentService } from 'src/app/_services/department.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-delete-department',
  templateUrl: './show-delete-department.component.html',
  styleUrls: ['./show-delete-department.component.css']
})
export class ShowDeleteDepartmentComponent implements OnInit {

  departments: Department[] = [];
  departmentLists$: Observable<Department[]>;
  // modalRef?: BsModalRef;
  apiUrl = environment.apiUrl;
  addMode = false;
  

  ModalTitle: string;
  ActivateAddEditDepComp = false;
  department: Department;


  constructor(private departmentService: DepartmentService,
    )
   { }

  ngOnInit(){
    this.getDepartments();
  }

  getDepartments(){
    this.departmentLists$ = this.departmentService.getDepartments();
    this.departmentService.getDepartments().subscribe(resData => {
      for(let i=0; i<resData.length; i++){
        this.departments.push(resData[i]);
      }
    },error => console.log(error));
  }

  modalClose(){
    this.department = new Department;
    this.ActivateAddEditDepComp = false;
    this.departmentLists$ = this.departmentService.getDepartments();
  }

  onAddClick(){
    this.department = {
      departmentId: 0,
      departmentName: ""
    }
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepComp = true;
    this.addMode = true;
  }

  modalUpdate(data: Department){
    this.department = data;
    this.ModalTitle = "Update Department";
    this.ActivateAddEditDepComp = true;
  }

  onDelete(data: any){
    // console.log(data);
    // this.departmentService.deleteDepartment(data.departmentId.toString()).subscribe(res => {
    //   var closeModalBtn = document.getElementById('add-edit-modal-close');
    //   if(closeModalBtn) {
    //     closeModalBtn.click();
    //   }

    //   var showDeleteSuccess = document.getElementById('delete-success-alert');
    //   if(showDeleteSuccess) {
    //     showDeleteSuccess.style.display = "block";
    //   }
    //   setTimeout(function() {
    //     if(showDeleteSuccess) {
    //       showDeleteSuccess.style.display = "none"
    //     }
    //   }, 4000);

    //   this.departmentLists$ = this.departmentService.getDepartments();
    // });
  }

}
