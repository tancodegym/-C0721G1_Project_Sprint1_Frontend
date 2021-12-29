import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FinancialComponent} from './stats/financial/financial.component';
import {SuppliesComponent} from './stats/supplies/supplies.component';
import {PotentialCustomerComponent} from './stats/potential-customer/potential-customer.component';
import {TrendingSuppliesComponent} from "./stats/trending-supplies/trending-supplies.component";


const routes: Routes = [

  {path: 'financial', component: FinancialComponent},
  {path: 'finalcial/:checkSearch', component: FinancialComponent,
  },

  {path: 'supplies-stats', component: SuppliesComponent},
  {path: 'potential-customer', component: PotentialCustomerComponent},
  {
    path: 'trending',
    component: TrendingSuppliesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
