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

  designation: Designation = new Designation;
  desigForm: FormGroup;

  desigList: any[] = [];

  addMode = false;
  ModalTitle: string;
  designationsList$: Observable<Designation[]>;

  newDesignationName = "";
  updateId: number;

  constructor(private desigService: DesignationService, private fb:FormBuilder,
    private notifyService : NotificationService) { 
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
    this.updateDesigList();
  }

  updateDesigList(){
    this.desigService.getDesignations().subscribe(res => {
      for(let i in res){
        this.desigList.push(res[i].designationName.toLowerCase());
      }
      console.log(this.desigList);
    })
  }

  getDesignations(){
    this.designationsList$ = this.desigService.getDesignations();
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
      this.getDesignations();
    });
    this.addMode = false;
    this.desigForm.reset();
    this.notifyService.showSuccess("Successfully Designation Added :)", "Success");
    this.newDesignationName = "";
  }

  updateDesignation(id: any){
    this.desigService.getDesignationById(id).subscribe(res => {
      this.designation = res;
      this.newDesignationName = res.designationName;
      this.updateId = res.designationId;
    })

    this.addMode =false;
    this.ModalTitle = "Update Designation"; 
    console.log(this.designation);
  }

  onUpdateDesignation(){
    
    let designation = {
      designationId: this.updateId,
      designationName: this.newDesignationName
    }

    this.desigService.updateDesignation(designation.designationId, designation).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
      this.getDesignations();
    });
    this.notifyService.showSuccess("Successfully Designation Updated :)", "Success");
    this.desigForm.reset();
  }

  onDelete(data: any){
    console.log(data);
    
    this.desigService.deleteDesignation(data).subscribe(res => {
      this.getDesignations();
    });
    this.notifyService.showSuccess("Successfully Designation Delete :)", "Success");
  }

  modalClose(){ this.desigForm.reset();}
}
