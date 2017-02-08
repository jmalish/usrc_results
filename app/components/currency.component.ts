import {Component} from "@angular/core";
import {Currency} from "../currency";
import {CurrencyService} from "../services/currency.service";


@Component({
    selector: 'my-currency',
    templateUrl: '../html/currency.component.html'
})
export class CurrencyComponent {
    currency = Currency[];

    constructor (private currencyService: CurrencyService) {}

    ngOnInit() {
        this.currencyService.getCurrency()
            .subscribe(data => this.currency = data);
    }
}