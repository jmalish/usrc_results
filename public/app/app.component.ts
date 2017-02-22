import {Component, enableProdMode} from '@angular/core';
import {apiURL} from "./myClasses";
import {AuthService} from "./auth.service";

let isDevMode:boolean = new apiURL().isDevBuild;

if (!isDevMode) {
    enableProdMode();
}

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [AuthService]
})
export class AppComponent  {
    userLoggedIn: boolean;
    userProfile: Object;
    userEmail: string;

    constructor(private auth: AuthService) {
        this.userProfile = JSON.parse(localStorage.getItem('profile'));

        if (this.userProfile === null) {
            this.userLoggedIn = false;
        } else {
            this.userLoggedIn = true;
            this.userEmail = this.userProfile.email;
        }


        console.log(this.userEmail);

        console.log(this.userLoggedIn);
    }

    login() {
        this.auth.login();
    }
    logout() {
        this.auth.logout();
        location.reload();
    }
}
