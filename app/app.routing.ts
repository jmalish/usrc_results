import {NgModule, ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrencyComponent} from "./currency.component";
import {UploadComponent} from "./upload.component";

const routes:Routes = [
    {
        path: 'currency',
        component: CurrencyComponent
    },
    {
        path: 'upload',
        component: UploadComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);