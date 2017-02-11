import {Component} from "@angular/core";
import {SessionDetails} from "./sessionDetails";
import {SessionDetailsService} from "./sessionDetails.service";

@Component({
    moduleId: module.id,
    selector: 'sessions',
    templateUrl: 'sessionDetails.component.html',
    providers: [SessionDetailsService]
})
export class SessionDetailsComponent {
    sessionDetails: SessionDetails[];

    constructor(private sessionDetailsService:SessionDetailsService) {
        this.sessionDetailsService.getSessionDetails().subscribe(sessionDetails => {
            this.sessionDetails = sessionDetails;
        });
    }
}