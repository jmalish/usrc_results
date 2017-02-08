import { Component } from '@angular/core';
import {CurrencyService} from './services/currency.service';

@Component({
    selector: 'my-app',
    templateUrl: '/html/app.component.html',
    styleUrls: ['/css/app.component.css']
})
export class AppComponent  {
  name = 'Angular';

}
