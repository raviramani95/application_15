import { Component, OnInit } from '@angular/core';
import { Department } from '../_models/department.model';
import { DepartmentService } from '../_services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: Department[];
  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    // this.departmentService.getDepartments().subscribe(
    //   dept => {
    //     console.log(dept);
    //   }
    // );
  }


}
