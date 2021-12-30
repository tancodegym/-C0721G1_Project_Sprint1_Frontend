import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
// @ts-ignore
import {EmployeeComponent} from './employee.component';
import {ListComponent} from './list/list.component';
import {CreateComponent} from './create/create.component';
import {EditComponent} from './edit/edit.component';
import {DetailComponent} from './detail/detail.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
// @ts-ignore
import {DetailUserComponent} from './detail-user/detail-user.component';
import {DetailEditComponent} from './detail-edit/detail-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [
    DetailEditComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class EmployeeModule {
}
