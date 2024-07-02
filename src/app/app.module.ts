import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    jqxGridModule,
    jqxDropDownListModule,
    jqxButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
