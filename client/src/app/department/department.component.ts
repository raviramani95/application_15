import { Component, OnInit, TemplateRef } from '@angular/core';
import { DepartmentService } from '../_services/department.service';
import { map, Observable } from 'rxjs';
import { Department } from '../_models/department.model';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  department: Department = new Department;
  deptForm: FormGroup;

  deptList: any[] = [];

  addMode = false;
  ModalTitle: string;
  departmentLists$: Observable<Department[]>;

  newDepartmentName = "";
  updateId: number;

  constructor(private deptService: DepartmentService, private fb:FormBuilder, 
    private notifyService : NotificationService) {
    this.deptForm = this.fb.group({
      departmentName : ['',Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z ]+')
      ]), this.deptValid()],
    });
  }

  deptValid(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.deptService.getDepartments().pipe(
        map( res => {
          for(let i in res){
            if(control.value.toLowerCase() == res[i].departmentName.toLowerCase()){
              return {'deptExists': true};
            }
          }
        })
      )
    };
  }


  ngOnInit(): void {
    this.getDepartments();
    this.updateDeptList();
  }

  updateDeptList(){
    this.deptService.getDepartments().subscribe(res => {
      for(let i in res){
        this.deptList.push(res[i].departmentName.toLowerCase());
      }
      console.log(this.deptList);
    })
  }

  // getDepartment(id: any){
  //   this.newDepartmentName = this.deptList[this.updateId -1];
  //   this.addMode = true;
  //   this.updateDepartment();
  //   this.updateId = id;
  //   console.log(id);
  //   this.deptService.getDepartmentById(id).subscribe(res => this.department = res);
  //   console.log(this.department);
  // }

  getDepartments(){
    this.departmentLists$ = this.deptService.getDepartments();
  }

  onAddClick(){
    this.addMode = true;
    this.ModalTitle = "Add Department";
    console.log(this.deptList);
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
      this.getDepartments();
    });
    this.addMode = false;
    this.deptForm.reset();
    this.notifyService.showSuccess("Successfully Department add :)", "Success");
    this.newDepartmentName = "";
  }

  updateDepartment(id: any){
    this.deptService.getDepartmentById(id).subscribe(res => {
      this.department = res;
      this.updateId = this.department.departmentId;
      this.newDepartmentName = this.department.departmentName;
    });

    console.log(this.department);
    this.addMode =false;
    this.ModalTitle = "Update Department";  
    console.log(this.updateId);
    
  }

  onUpdateDepartment(){
    let department = {
      departmentId: this.updateId,
      departmentName: this.newDepartmentName
    }

    this.deptService.updateDepartment(department.departmentId, department).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
      this.getDepartments();
    });
    this.notifyService.showSuccess("Successfully Department update :)", "Success");
    this.deptForm.reset();
  }

  onDelete(data: any){
    console.log(data);
    
    this.deptService.deleteDepartment(data).subscribe(res => {
      this.getDepartments();
      console.log(res);
    });
    this.notifyService.showSuccess("Successfully Department Delete :)", "Success");
  }

  modalClose(){ this.deptForm.reset()}
}
