import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SessionDetailsService {
    constructor (private http: Http) {}

    getSessionDetails() {
        return this.http.get('http://localhost:3000/api/sessionDetails')
            .map(res => res.json());
    }
}