import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { DetailEditComponent } from './detail-edit/detail-edit.component';


@NgModule({
  declarations: [EmployeeComponent, ListComponent, CreateComponent, EditComponent, DetailComponent, ChangePasswordComponent, DetailUserComponent, DetailEditComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
