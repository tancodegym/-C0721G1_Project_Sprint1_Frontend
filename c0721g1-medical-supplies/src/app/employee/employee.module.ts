import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ListComponent } from './list/list.component';

import { DetailComponent } from './detail/detail.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';


@NgModule({
  declarations: [
    ListComponent,
    EditEmployeeComponent,
    DetailComponent,
    ChangePasswordComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent
    ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EmployeeModule { }
