import {Component} from "@angular/core";
import {Driver} from "./myClasses";
import {DriverService} from "./drivers.service";


@Component({
    moduleId: module.id,
    selector: 'bonus',
    templateUrl: 'bonus.component.html',
    styleUrls: ['bonus.component.css'],
    providers: [DriverService]
})
export class BonusComponent {
    drivers: Driver[];

    constructor(private driverService:DriverService) {
        this.driverService.getAllDrivers().subscribe(drivers => {
            this.drivers = drivers;
        });
    }
}