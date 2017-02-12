import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DriverService {
    constructor (private http: Http) {}

    private apiUrl:string = "jordanmalish.com/api/";

    getAllDrivers() {
        return this.http.get(this.apiUrl + "drivers")
            .map(res => res.json());
    }

    getOneDriver(_driverId) {
        return this.http.get(this.apiUrl + "/currency/" + _driverId)
            .map(res => res.json());
    }
}