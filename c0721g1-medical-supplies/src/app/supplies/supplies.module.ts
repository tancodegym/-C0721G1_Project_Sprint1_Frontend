import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SuppliesRoutingModule} from './supplies-routing.module';
import {EditComponent} from './edit/edit.component';
import {CreateComponent} from './create/create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [ EditComponent, CreateComponent],
  imports: [
    CommonModule,
    SuppliesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class SuppliesModule {
}
