import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeComponent } from './employee/employee.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path: ' ', redirectTo: "/departments",pathMatch: "full"},
  {path: 'departments', component: DepartmentComponent},
  {path: 'designation', component: DesignationComponent},
  {path: 'employee', component: EmployeeComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
