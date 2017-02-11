"use strict";
var router_1 = require("@angular/router");
var currency_component_1 = require("./currency.component");
var upload_component_1 = require("./upload.component");
var home_component_1 = require("./home.component");
var sessionDetails_component_1 = require("./sessionDetails.component");
var results_component_1 = require("./results.component");
var drivers_component_1 = require("./drivers.component");
var driver_component_1 = require("./driver.component");
var routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: 'currency',
        component: currency_component_1.CurrencyComponent
    },
    {
        path: 'upload',
        component: upload_component_1.UploadComponent
    },
    {
        path: 'results',
        component: sessionDetails_component_1.SessionDetailsComponent
    },
    {
        path: 'results/:sessionId',
        component: results_component_1.ResultsComponent
    },
    {
        path: 'drivers',
        component: drivers_component_1.DriversComponent
    },
    {
        path: 'drivers/:driverId',
        component: driver_component_1.DriverComponent
    },
    {
        path: '**',
        component: home_component_1.HomeComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map