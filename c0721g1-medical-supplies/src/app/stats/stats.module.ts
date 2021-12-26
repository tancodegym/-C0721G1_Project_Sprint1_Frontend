import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { FinancialComponent } from './financial/financial.component';
import { PotentialCustomerComponent } from './potential-customer/potential-customer.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { TrendingSuppliesComponent } from './trending-supplies/trending-supplies.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [FinancialComponent, PotentialCustomerComponent, SuppliesComponent, TrendingSuppliesComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    ReactiveFormsModule,
  ]
})
export class StatsModule { }
