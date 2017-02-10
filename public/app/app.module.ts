import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import {CurrencyComponent} from "./currency.component";
import {routing} from "./app.routing";
import {UploadComponent} from "./upload.component";
import {HomeComponent} from "./home.component";
import {SessionDetailsComponent} from "./sessionDetails.component";
import {ResultsComponent} from "./results.component";


@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        CurrencyComponent,
        UploadComponent,
        HomeComponent,
        SessionDetailsComponent,
        ResultsComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
