import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BsDropdownModule, ButtonsModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BlogRoutingModule} from './app-routing.module';
import {BlogService} from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ButtonsModule,
    FormsModule,
    HttpClientModule,
    BlogRoutingModule,
    BsDropdownModule.forRoot()
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
