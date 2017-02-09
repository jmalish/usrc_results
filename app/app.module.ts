import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import {CurrencyComponent} from "./currency.component";


@NgModule({
    imports:      [
        BrowserModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        CurrencyComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
