import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Currency} from '../currency';
import {Observable} from 'rxjs';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class CurrencyService {
    constructor (private http: Http) {}

    private currencyUrl = 'localhost:3000/api/currency'; //TODO: make this the correct url

    getCurrency() : Observable<Currency[]> {
        return this.http.get(this.currencyUrl)
            .map((res:Response) => res.json().Currency);
    }
}