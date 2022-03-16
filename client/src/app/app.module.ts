import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeComponent } from './employee/employee.component';
import { GenderComponent } from './gender/gender.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditDepartmentComponent } from './department/add-edit-department/add-edit-department.component';
import { ShowDeleteDepartmentComponent } from './department/show-delete-department/show-delete-department.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    DesignationComponent,
    EmployeeComponent,
    GenderComponent,
    HeaderComponent,
    AddEditDepartmentComponent,
    ShowDeleteDepartmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
