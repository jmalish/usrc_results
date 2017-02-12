import {Component} from "@angular/core";
import {Result} from "./myClasses";
import {ResultsService} from "./results.service";

@Component({
    moduleId: module.id,
    selector: 'sessions',
    templateUrl: 'latestRace.component.html',
    styleUrls: ['latestRace.component.css'],
    providers: [ResultsService]
})
export class LatestRaceComponent {
    results: Result[];

    constructor(private resultsService:ResultsService) {
        this.resultsService.getLatestResult().subscribe(results => {
            this.results = results;
        });
    }
}


