"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var results_service_1 = require("./results.service");
var ResultsComponent = (function () {
    function ResultsComponent(route, resultsService) {
        this.route = route;
        this.resultsService = resultsService;
    }
    ResultsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.sessionId = +params['sessionId'];
        });
        this.getResults();
    };
    ResultsComponent.prototype.getResults = function () {
        var _this = this;
        this.resultsService.getOneResult(this.sessionId).subscribe(function (results) {
            _this.results = results;
        });
    };
    ResultsComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return ResultsComponent;
}());
ResultsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'results',
        templateUrl: 'results.component.html',
        providers: [results_service_1.ResultsService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, results_service_1.ResultsService])
], ResultsComponent);
exports.ResultsComponent = ResultsComponent;
//# sourceMappingURL=results.component.js.map