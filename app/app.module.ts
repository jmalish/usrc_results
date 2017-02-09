import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import {CurrencyComponent} from "./currency.component";
import {routing} from "./app.routing";
import {UploadComponent} from "./upload.component";


@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        CurrencyComponent,
        UploadComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
