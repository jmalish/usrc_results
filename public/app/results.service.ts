import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ResultsService {
    constructor (private http: Http) {}

    getOneResult(_sessionId) {
        return this.http.get('http://localhost:3000/api/result/' + _sessionId)
            .map(res => res.json());
    }

    getLatestResult() {
        return this.http.get('http://localhost:3000/api/session/latest')
            .map(res => res.json());
    }
}