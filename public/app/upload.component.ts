import {Component, ElementRef, ViewChild} from "@angular/core";
import {Http, Headers, RequestOptions} from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'my-upload',
    templateUrl: 'upload.component.html',
    styleUrls: ['upload.component.css'],
    providers: []
})
export class UploadComponent {
    fileList: any;
    file: File;
    fileName: string;
    message: string;
    disableButton: boolean = true;

    @ViewChild('fileInput') myFileInput: ElementRef;

    constructor(private http: Http) {}

    fileChange(event) {
        this.fileList = event.target.files;
        if (this.fileList.length > 0) {
            this.file = this.fileList[0];
            this.fileName = this.myFileInput.nativeElement.files[0].name;

            let fileNameCheck = new RegExp(/eventresult_[0-9]{8}\.csv/);

            if (fileNameCheck.test(this.fileName)) {
                this.disableButton = false;
                this.message = null;
            } else {
                this.disableButton = true;
                this.message = "File name does not match! Make sure it is similar to 'eventresult_12345678.csv'"
            }
        }
    }

    fileUploadButton() {
        let formData: FormData = new FormData();
        formData.append('fileUpload', this.file, this.file.name);

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post('/api/upload', formData, options)
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
            );

        this.disableButton = true;
    }
}