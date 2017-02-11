import {Component, OnInit, OnDestroy} from "@angular/core";
import {Result} from "./myClasses";
import {ActivatedRoute} from "@angular/router";
import {ResultsService} from "./results.service";


@Component({
    moduleId: module.id,
    selector: 'results',
    templateUrl: 'results.component.html',
    providers: [ResultsService]

})
export class ResultsComponent implements OnInit, OnDestroy {
    results: Result[];
    private sub: any;
    sessionId: number;

    constructor(private route: ActivatedRoute, private resultsService: ResultsService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.sessionId = +params['sessionId'];
            console.log(this.sessionId);
        });

        this.getResults();
    }


    getResults() {
        this.resultsService.getOneResult(this.sessionId).subscribe(results => {
            this.results = results;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}