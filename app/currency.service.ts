import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class CurrencyService {
    constructor (private http: Http) {}

    private currencyUrl = 'http://localhost:3000/api/currency'; //TODO: make this the correct url

    getCurrencies() {
        return this.http.get(this.currencyUrl)
            .map(res => res.json());
    }
}