import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent }  from './app.component';
import {CurrencyComponent} from "./currency.component";
import {routing} from "./app.routing";
import {UploadComponent} from "./upload.component";
import {LatestRaceComponent} from "./latestRace.component";
import {SessionDetailsComponent} from "./sessionDetails.component";
import {ResultsComponent} from "./results.component";
import {DriversComponent} from "./drivers.component";
import {DriverComponent} from "./driver.component";
import {StandingsComponent} from "./standings.component";
import {BonusComponent} from "./bonus.component";

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        routing,
        FormsModule
    ],
    declarations: [
        AppComponent,
        CurrencyComponent,
        UploadComponent,
        LatestRaceComponent,
        SessionDetailsComponent,
        ResultsComponent,
        DriversComponent,
        DriverComponent,
        StandingsComponent,
        BonusComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
