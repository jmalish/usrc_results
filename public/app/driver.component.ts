import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {DriverService} from "./drivers.service";
import {Driver} from "./driver";


@Component({
    moduleId: module.id,
    selector: 'driver',
    templateUrl: 'driver.component.html',
    providers: [DriverService]

})
export class DriverComponent implements OnInit, OnDestroy {
    driver: Driver = {driverId: 0, driverName: ''};
    private sub: any;
    driverId: number;

    constructor(private route: ActivatedRoute, private driverService: DriverService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.driverId = +params['driverId'];
        });

        this.getDriver();
    }


    getDriver() {
        this.driverService.getOneDriver(this.driverId).subscribe(driver => {
            this.driver = driver[0];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}