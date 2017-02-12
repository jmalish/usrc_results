import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class StandingsService {
    constructor (private http: Http) {}

    getCurrentStandings() {
        return this.http.get("http://localhost:80/api/currentStandings")
            .map(res => res.json());
    }

    getOneDriver(_driverId) {
        return this.http.get("http://localhost:80/api/driver/" + _driverId)
            .map(res => res.json());
    }
}