import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeComponent } from './employee/employee.component';
import { GenderComponent } from './gender/gender.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditDepartmentComponent } from './department/add-edit-department/add-edit-department.component';
import { MatSliderModule } from '@angular/material/slider';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatRadioModule } from '@angular/material/radio';
import { ShowDeleteDepartmentComponent } from './department/show-delete-department/show-delete-department.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    DesignationComponent,
    EmployeeComponent,
    GenderComponent,
    HeaderComponent,
    AddEditDepartmentComponent,
    ShowDeleteDepartmentComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
