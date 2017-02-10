import {Component} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'my-upload',
    templateUrl: 'upload.component.html',
    styleUrls: ['upload.component.css'],
    providers: []
})
export class UploadComponent {
    fileName: string = '';
}


