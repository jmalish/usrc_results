import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SessionDetailsService {
    constructor (private http: Http) {}

    private apiUrl:string = "http://jordanmalish.com/api/";

    getSessionDetails() {
        return this.http.get(this.apiUrl + '/sessions')
            .map(res => res.json());
    }
}