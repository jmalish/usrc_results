import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import {apiURL} from "./myClasses";

@Injectable()
export class ResultsService {
    constructor (private http: Http) {}

    private apiUrl:string = new apiURL().getApiUrl();

    getOneResult(_sessionId) {
        return this.http.get(this.apiUrl + "/result/" + _sessionId)
            .map(res => res.json());
    }

    getLatestResult() {
        return this.http.get(this.apiUrl + "session/latest")
            .map(res => res.json());
    }
}