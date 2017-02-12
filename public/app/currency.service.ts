import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class CurrencyService {
    constructor (private http: Http) {}

    private currencyUrl = 'http://localhost:80/api/currency';

    getCurrencies() {
        return this.http.get(this.currencyUrl)
            .map(res => res.json());
    }
}