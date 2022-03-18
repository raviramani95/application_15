import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Designation } from '../_models/designation.model';
import { DesignationService } from '../_services/designation.service'
import { NotificationService } from '../_services/notification.service';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  designation: Designation;
  desigForm: FormGroup;
  listData: any;

  addMode = false;
  ModalTitle: string;
  designationsList$: Observable<Designation[]>;

  newDesignationName = "";
  updateDesignationName = "";
  updateId: number;

  constructor(private desigService: DesignationService, private fb:FormBuilder,
    private notifyService : NotificationService) { 
    this.listData = [];
    this.desigForm = this.fb.group({
      designationName : ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z ]+')
      ]), this.desigValid()],
    });
  }

  desigValid(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.desigService.getDesignations().pipe(
        map( res => {
          for(let i in res){
            if(control.value.toLowerCase() == res[i].designationName.toLowerCase()){
              return {'desigExists': true};
            }
          }
        })
      )
    };
  }

  ngOnInit(): void {
    this.getDesignations();
  }

  getDesignations(){
    this.designationsList$ = this.desigService.getDesignations();
  }

  getDesignation(id: any){
    this.addMode = false;
    this.updateId = id;
    this.updateDesignation();
    console.log(id);
    this.desigService.getDesignationById(id).subscribe(res => this.designation = res);
    console.log(this.designation);
  }

  onAddClick(){
    this.addMode = true;
    this.ModalTitle = "Add Designation";
  }

  onAddDesignation(){

    let designation = {
      designationId: 0,
      designationName: this.newDesignationName
    }

    this.desigService.addDesignation(designation).subscribe(res => {
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
    this.designationsList$;
    this.addMode = false;
    this.notifyService.showSuccess("Successfully Designation Added :)", "Success");
  }

  updateDesignation(){
    this.addMode =false;
    this.ModalTitle = "Update Designation";  
  }

  onUpdateDesignation(){
    
    let designation = {
      designationId: this.updateId,
      designationName: this.updateDesignationName
    }

    this.desigService.updateDesignation(designation.designationId, designation).subscribe(res => {
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
    this.designationsList$ = this.desigService.getDesignations();
    this.notifyService.showSuccess("Successfully Designation Updated :)", "Success");
  }

  onDelete(data: any){
    console.log(data);
    
    this.desigService.deleteDesignation(data).subscribe(res => {
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
    });
    this.designationsList$ = this.desigService.getDesignations();
    this.notifyService.showSuccess("Successfully Designation Delete :)", "Success");
  }

  modalClose(){ }
}
