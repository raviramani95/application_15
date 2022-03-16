import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/_services/department.service';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.css']
})
export class AddEditDepartmentComponent implements OnInit {

  departments = [];
  DepartmentName: string = '';
  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    // this.departmentService.getDepartmentList();
    // console.log(this.departments);
  }

  onAdd(){

  }

  onCancel(){

  }

}
