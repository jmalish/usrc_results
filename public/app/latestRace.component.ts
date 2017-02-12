import {Component} from "@angular/core";
import {LatestRace} from "./myClasses";
import {ResultsService} from "./results.service";

@Component({
    moduleId: module.id,
    selector: 'sessions',
    templateUrl: 'latestRace.component.html',
    styleUrls: ['latestRace.component.css'],
    providers: [ResultsService]
})
export class LatestRaceComponent {
    results: LatestRace[];

    constructor(private resultsService:ResultsService) {
        this.resultsService.getLatestResult().subscribe(latestRace => {
            this.results = latestRace;
        });
    }
}


