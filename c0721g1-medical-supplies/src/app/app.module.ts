import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { LeftSideBarComponent } from './common/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './common/right-side-bar/right-side-bar.component';
import {HttpClientModule} from '@angular/common/http';
import {StatsModule} from './stats/stats.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {FormsModule} from "@angular/forms";

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftSideBarComponent,
    RightSideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StatsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
