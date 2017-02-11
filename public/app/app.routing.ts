import {NgModule, ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrencyComponent} from "./currency.component";
import {UploadComponent} from "./upload.component";
import {HomeComponent} from "./home.component";
import {SessionDetailsComponent} from "./sessionDetails.component";
import {ResultsComponent} from "./results.component";
import {DriversComponent} from "./drivers.component";
import {DriverComponent} from "./driver.component";

const routes:Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'currency',
        component: CurrencyComponent
    },
    {
        path: 'upload',
        component: UploadComponent
    },
    {
        path: 'results',
        component: SessionDetailsComponent
    },
    {
        path: 'results/:sessionId',
        component: ResultsComponent
    },
    {
        path: 'drivers',
        component: DriversComponent
    },
    {
        path: 'drivers/:driverId',
        component: DriverComponent
    },
    {
        path: '**',
        component: HomeComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);