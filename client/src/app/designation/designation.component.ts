import { Component, OnInit, TemplateRef } from '@angular/core';
import { DesignationService } from '../_services/designation.service';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  designations: any = [];
  // modalRef?: BsModalRef;

  constructor(private designationService: DesignationService,
    ) { }

  ngOnInit(): void {
    this.getDesignations();
  }

  getDesignations(){
    this.designationService.getDesignations().subscribe( resData => {
      this.designations = resData;
    }, error => {
      console.log(error);
    })
  }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }
}
