import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FinancialComponent} from './stats/financial/financial.component';
import {SuppliesComponent} from './stats/supplies/supplies.component';
import {PotentialCustomerComponent} from './stats/potential-customer/potential-customer.component';


const routes: Routes = [

  {path: '', component: FinancialComponent},
  {path: 'supplies-stats', component: SuppliesComponent},
  {path: 'potential-customer', component: PotentialCustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
