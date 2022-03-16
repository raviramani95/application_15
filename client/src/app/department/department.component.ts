import { Component, OnInit, TemplateRef } from '@angular/core';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { DepartmentService } from '../_services/department.service';
import { Department } from '../_models/department.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: any =[];
  // modalRef?: BsModalRef;
  apiUrl = environment.apiUrl;

  ModalTitle: string;
  ActivateAddEditDepComp = false;
  dept: any;


  constructor(private departmentService: DepartmentService,
    )
   { }

  ngOnInit(){
    this.getDepartments();
    this.dd();
  }

  getDepartments(){
    this.departmentService.getDepartments().subscribe( resData => {
      this.departments = resData;
    },error => {
      console.log(error);
    });
  }

  onClose(){
    this.ActivateAddEditDepComp = false;
    this.getDepartments();
  }

  onAddClick(){
    this.dept = {
      departmentId:0,
      departmentName:"  "
    }
    this.ModalTitle = "Department";
    this.ActivateAddEditDepComp = true;
    console.log("i am click");
  }

  dd(){
    console.log(this.departments);
  //   let li = [];
  //   for(let de of this.departments){
  //     li.push(de);
  //   }
    

  //   for (let i = 0; i < this.departments.length; i++) {
  //     li.push(this.departments[i]);
  //   }
  // console.log(li);
  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }
  }

}
