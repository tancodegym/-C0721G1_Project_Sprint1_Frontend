import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ListSuppliesComponent } from './list-supplies/list-supplies.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [HomepageComponent, ListSuppliesComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule
    ]
})
export class HomeModule { }
