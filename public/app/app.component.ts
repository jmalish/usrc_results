import {Component, enableProdMode} from '@angular/core';
import {apiURL} from "./myClasses";

let isDevMode:boolean = new apiURL().isDevBuild;

if (!isDevMode) {
    enableProdMode();
}

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent  {

}
