import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: any = [];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(resData => {
      this.employees = resData;
    }, error => {
      console.log(error);
    })
  }

}
