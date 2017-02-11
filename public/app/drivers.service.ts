import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DriverService {
    constructor (private http: Http) {}

    private driversUrl = 'http://localhost:3000/api/drivers/'; //TODO: make this the correct url

    getAllDrivers() {
        return this.http.get(this.driversUrl)
            .map(res => res.json());
    }

    getOneDriver(_driverId) {
        return this.http.get("http://localhost:3000/api/driver/" + _driverId)
            .map(res => res.json());
    }
}