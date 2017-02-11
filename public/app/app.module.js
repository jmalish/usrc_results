"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var currency_component_1 = require("./currency.component");
var app_routing_1 = require("./app.routing");
var upload_component_1 = require("./upload.component");
var home_component_1 = require("./home.component");
var sessionDetails_component_1 = require("./sessionDetails.component");
var results_component_1 = require("./results.component");
var drivers_component_1 = require("./drivers.component");
var driver_component_1 = require("./driver.component");
var standings_component_1 = require("./standings.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            currency_component_1.CurrencyComponent,
            upload_component_1.UploadComponent,
            home_component_1.HomeComponent,
            sessionDetails_component_1.SessionDetailsComponent,
            results_component_1.ResultsComponent,
            drivers_component_1.DriversComponent,
            driver_component_1.DriverComponent,
            standings_component_1.StandingsComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map