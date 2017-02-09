import {NgModule, ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrencyComponent} from "./currency.component";

const routes:Routes = [
    {
        path: 'currency',
        component: CurrencyComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);