import {Component, OnInit} from '@angular/core';

import { ApiServiceService } from '../service/api-service.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
    public loadingNote = true;
    public noteList = [];
    public keyword = '';
    constructor(private api: ApiServiceService) {
        this.api.request('http://localhost:3000/api/notes', 'get', null)
            .subscribe(data => {
                console.log(data, 'result');
                this.loadingNote = false;
                this.noteList = JSON.parse(data._body);
            }, err => {
                console.error(err, 'there was an error');
            });
    }

    ngOnInit() {
    }

    searchNote() {
        this.loadingNote = true;
        if(this.keyword.length) {
            this.api.request('http://localhost:3000/api/find/?q=' + this.keyword, 'get', null)
                .subscribe(data => {
                    console.log(data, 'result');
                    this.loadingNote = false;
                    this.noteList = JSON.parse(data._body);
                }, err => {
                    console.error(err, 'there was an error');
                });
        }
    }
}
