import {Component} from "@angular/core";
import {Currency} from "./currency";
import {CurrencyService} from "./currency.service";


@Component({
    moduleId: module.id,
    selector: 'my-currency',
    templateUrl: 'currency.component.html',
    providers: [CurrencyService]
})
export class CurrencyComponent {
    currencies: Currency[];
    error: any;

    constructor(private currencyService:CurrencyService) {
        this.currencyService.getCurrencies().subscribe(currencies => {
            this.currencies = currencies;
        });
    }
}


