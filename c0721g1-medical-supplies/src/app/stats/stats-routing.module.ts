import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FinancialComponent} from './financial/financial.component';


const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
