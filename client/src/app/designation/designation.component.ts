import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Designation } from '../_models/designation.model';
import { DesignationService } from '../_services/designation.service'
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  designations: Designation[];

  constructor(private desService: DesignationService,
    ) { }

    addMode = false;
    ModalTitle: string;
    ActivateAddEditDepComp = false;

    departmentLists$: Observable<Designation[]>;
  
    newDesignationName = "";
    updateDesignationName = "";
  
    ngOnInit(): void {
      this.getDesignation();
    }
  
    getDesignation(){
      this.desService.getDesignations().subscribe(res =>{
        this.designations = res;
      })
    }
  
    onAddDesignation(){
      this.addMode =true;
      let designation = { designationName: this.newDesignationName}
      this.desService.addDesignation(designation).subscribe(res => {
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
      this.getDesignation();
    }
  
    onUpdateDesignation(event: Event){
      var designation = {
        designationId: 1,
        designationName: this.updateDesignationName
      }
      console.log(event);
      console.log(designation)
      this.desService.updateDesignation(designation).subscribe(res => {
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

    updateDesignation(id: number){
      this.addMode =false;
      this.ModalTitle = "Update Designation";  
    }
  
    
    onDelete(event: any){
      this.desService.deleteDesignation(event.designationId).subscribe(res => {
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
  
        this.departmentLists$ = this.desService.getDesignations();
      });
    }
  
  
    onAddClick(){
      this.addMode = true;
      this.ModalTitle = "Add Designation";
    }
  
    modalClose(){
  
    }
}
