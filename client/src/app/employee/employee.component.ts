import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../_models/employee.model';
import { EmployeeService } from '../_services/employee.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee: Employee;
  empForm: FormGroup;
  listData: any;

  addMode = false;
  ModalTitle: string;
  updateMode = false;

  employeeList$: Observable<any[]>;
  empList: any[];

  updateId: number;


  constructor(private empService: EmployeeService, private fb:FormBuilder,
    private notifyService : NotificationService) 
  { 
    this.listData = [];
    this.empForm = this.fb.group({
      newFname : ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z ]+')
      ])],
      newLname : ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z ]+')
      ])],
      newGenderId : ['', Validators.required],
      newDepartmentId : ['', Validators.required],
      newDesignationId : ['', Validators.required]
    });
  }

    nFname = "";
    nLname = "";
    nGenderId: number;
    nDepartmentId: number;
    nDesignationId: number;
  
    ngOnInit(): void {
      this.getEmployees();
    }

    updateEmpList(){

    }
  
    getEmployees(){
      // this.employeeList$ = this.empService.getEmployees();
      this.empService.getEmployees().subscribe(res => {
        const l = [];
        this.empList = res;
        for(let i in res){
          // this.empList.push(res);
          l.push(res[i]);
        }
        // this.empList.push(l);
        this.empList = l;
        console.log(this.empList);
      })
      console.log(this.employeeList$);
      console.log(this.empList);
    }
    
    getEmployee(id: any){
      this.updateEmployee();
      this.updateId = id;
      console.log(id);
      this.empService.getEmployeeById(id).subscribe(res => this.employee = res);
      console.log(this.employee);
    }

    onAddClick(){
      this.addMode = true;
      this.ModalTitle = "Add Employee";
    }

    onAddEmployee(){
      this.addMode =true;

      let employee = {
        employeeId: 0,
        employeeFirstName: this.nFname,
        employeeLastName: this.nLname,
        genderId: this.nGenderId,
        departmentId: this.nDepartmentId,
        designationId: this.nDesignationId
      }
  
      this.empService.addEmployee(employee).subscribe(res => {
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
      this.employeeList$;
      this.addMode = false;
      this.empForm.reset();
      this.notifyService.showSuccess("Successfully Employee Added :)", "Success");
    }
    
    updateEmployee(){
      this.addMode =false;
      this.updateMode = true;
      this.ModalTitle = "Update Employee";  
    }

    onUpdateEmployee(){
      let employee = {
        employeeId: this.updateId,
        employeeFirstName: this.nFname,
        employeeLastName: this.nLname,
        genderId: this.nGenderId,
        departmentId: this.nDepartmentId,
        designationId: this.nDesignationId
      }
      this.empService.updateEmployee(employee.employeeId, employee).subscribe(res => {
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
      this.employeeList$ = this.empService.getEmployees();
      this.notifyService.showSuccess("Successfully Employee Updated :)", "Success");
      this.empForm.reset();
    }
  
    onDelete(data: any){
      this.empService.deleteEmployee(data).subscribe(res => {
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
  
        this.employeeList$ = this.empService.getEmployees();
      });
      this.notifyService.showSuccess("Successfully Employee Delated :)", "Success");
      this.empForm.reset();
    }

    modalClose(){ this.empForm.reset(); }

}
