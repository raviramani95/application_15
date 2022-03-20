import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Department } from '../_models/department.model';
import { Designation } from '../_models/designation.model';
import { Employee } from '../_models/employee.model';
import { DepartmentService } from '../_services/department.service';
import { DesignationService } from '../_services/designation.service';
import { EmployeeService } from '../_services/employee.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee: Employee = new Employee;
  empForm: FormGroup;

  addMode = false;
  ModalTitle: string;

  employeeList$: Observable<any[]>;
  departmentList$: Observable<Department[]>;
  designationList$: Observable<Designation[]>;

  empList: Employee[] = [];

  updateId: number;
  nFname = "";
  nLname = "";
  nGender: any;
  nDepartment: any;
  nDesignation: any;


  constructor(private empService: EmployeeService, 
      public deptService: DepartmentService,
      private fb:FormBuilder,
      private notifyService : NotificationService,
      public desigService: DesignationService
      ) 
  { 
    this.empForm = this.fb.group({
      newFname : ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z ]+')
      ])],
      newLname : ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z ]+')
      ])],
      newGender : ['', Validators.required],
      newDepartment : ['', Validators.required],
      newDesignation : ['', Validators.required]
    });
  }


  
  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();
    this.getDesignations();
  }


  getEmployees() {
    this.empService.getEmployees().subscribe(resData => {
      for(let i in resData){
            this.deptService.getDepartmentById(resData[i].department).subscribe(rr => {
              resData[i].department = rr.departmentName;
            });
            this.desigService.getDesignationById(resData[i].designation).subscribe(rr=> {
              resData[i].designation = rr.designationName;
            })
            if(resData[i].gender == 1){
              resData[i].gender = "Male";
            }else{
              resData[i].gender = "Female";
            }
      }
      this.empList = resData
      console.log(this.empList);
    });
  }

  getDepartments(){
    this.departmentList$ =  this.deptService.getDepartments();
  }

  getDesignations(){
    this.designationList$ = this.desigService.getDesignations();
  }

  onAddClick() {
    this.addMode = true;
    this.ModalTitle = "Add Employee";
  }

  onAddEmployee() {
    console.log(this.empForm.value);
    let employee = {
      employeeId: 0,
      employeeFirstName: this.nFname,
      employeeLastName: this.nLname,
      genderId: this.empForm.value.newGender,
      departmentId: this.empForm.value.newDepartment,
      designationId: this.empForm.value.newDesignation
    }
    console.log(employee);

    this.empService.addEmployee(employee).subscribe(res => {
      var closebtn = document.getElementById('add-edit-modal-close');
      if (closebtn) {
        closebtn.click();
      }
      this.getEmployees();
    });

    this.addMode = false;
    this.empForm.reset();
    this.notifyService.showSuccess("Successfully Employee Added :)", "Success");
  }

  updateEmployee(id: any) {
    this.empService.getEmployeeById(id).subscribe(res => {
      this.employee = res;

      this.nFname = res.employeeFirstName;
      this.nLname = res.employeeLastName;
      this.updateId = res.employeeId;
      this.nGender = res.genderId;
      this.nDepartment = res.departmentId;
    })
    
    this.addMode = false;
    this.ModalTitle = "Update Employee";

  }

  onUpdateEmployee() {
    let employee = {
      employeeId: this.updateId,
      employeeFirstName: this.nFname,
      employeeLastName: this.nLname,
      genderId: this.empForm.value.newGender,
      departmentId: this.empForm.value.newDepartment,
      designationId: this.empForm.value.newDesignation
    }
    console.log(employee);
    this.empService.updateEmployee(employee.employeeId, employee).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.getEmployees();
    });
    this.notifyService.showSuccess("Successfully Employee Updated :)", "Success");
    this.empForm.reset();
  }

  onDelete(data: any) {
    this.empService.deleteEmployee(data).subscribe(res => {
      this.getEmployees();
    });
    this.notifyService.showSuccess("Successfully Employee Delated :)", "Success");
    this.empForm.reset();
  }

  modalClose() { this.empForm.reset(); }

}
