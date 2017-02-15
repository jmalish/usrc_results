import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import {apiURL} from "./myClasses";

@Injectable()
export class SessionDetailsService {
    constructor (private http: Http) {}

    private apiUrl:string = new apiURL().getApiUrl();

    getSessionDetails() {
        return this.http.get(this.apiUrl + '/sessions')
            .map(res => res.json());
    }
}