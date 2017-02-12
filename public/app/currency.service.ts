import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class CurrencyService {
    constructor (private http: Http) {}

    private apiUrl:string = "jordanmalish.com/api/";

    getCurrencies() {
        return this.http.get(this.apiUrl + "currency")
            .map(res => res.json());
    }
}