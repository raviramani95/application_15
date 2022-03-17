import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../_models/employee.model';
import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];

  constructor(private empService: EmployeeService
    ) { }

    addMode = false;
    ModalTitle: string;
    ActivateAddEditDepComp = false;

    employeeList$: Observable<Employee[]>;
  
    nFname = "";
    nLname = "";
    nGenderId: number;
    nDepartmentId: number;
    nDesignationId: number;
  
    ngOnInit(): void {
      this.getEmployees();
    }
  
    getEmployees(){
      this.employeeList$ = this.empService.getEmployees();
    }
  
    onAddEmployee(){
      this.addMode =true;
      let employee = [{
        employeeId: 0,
        employeeFirstName: this.nFname,
        employeeLastName: this.nLname,
        genderId: this.nGenderId,
        departmentId: this.nDepartmentId,
        designationId: this.nDesignationId
      }]
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
      this.getEmployees();
    }
  
    onUpdateEmployee(event: Event){
      let employee = [{
        employeeId: 0,
        employeeFirstName: this.nFname,
        employeeLastName: this.nLname,
        genderId: this.nGenderId,
        departmentId: this.nDepartmentId,
        designationId: this.nDesignationId
      }]
      this.empService.updateEmployee(employee).subscribe(res => {
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

    updateEmployee(id: number){
      this.addMode =false;
      this.ModalTitle = "Update Employee";  
    }
  
    
    onDelete(event: any){
      this.empService.deleteEmployee(event.designationId).subscribe(res => {
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
    }
  
  
    onAddClick(){
      this.addMode = true;
      this.ModalTitle = "Add Employee";
    }
  
    modalClose(){
  
    }

}
