import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { LeftSideBarComponent } from './common/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './common/right-side-bar/right-side-bar.component';
import {SuppliesModule} from './supplies/supplies.module';
import {AngularFireModule} from '@angular/fire';
import { environment } from 'src/environments/environment.prod';


// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
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
    SuppliesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
