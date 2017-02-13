import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ResultsService {
    constructor (private http: Http) {}

    private apiUrl:string = "localhost/api/";

    getOneResult(_sessionId) {
        return this.http.get(this.apiUrl + "/result/" + _sessionId)
            .map(res => res.json());
    }

    getLatestResult() {
        return this.http.get(this.apiUrl + "session/latest")
            .map(res => res.json());
    }
}