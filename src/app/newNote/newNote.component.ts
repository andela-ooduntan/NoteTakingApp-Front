import {Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiServiceService } from '../service/api-service.service';

@Component({
    selector: 'app-new-note',
    templateUrl: 'newNote.component.html'
})
export class NewNoteComponent implements OnInit {
    public loadingNote = true;
    public  statusMessage = '';
    public responseStatus = 'alert-danger';
    public noteList = [];
    public tagList = [];
    public noteForm: FormGroup;

    constructor(private api: ApiServiceService, private fb: FormBuilder, private router: Router) {
        this.api.request('http://localhost:3000/api/tag', 'get', null)
            .subscribe(data => {
                console.log(data, 'result');
                // this.loadingNote = false;
                this.tagList = JSON.parse(data._body);
            }, err => {
                console.error(err, 'there was an error');
            });
    }

    ngOnInit() {
        this.noteForm = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            tagId: ['', Validators.required]
        });
    }

    createNote(noteForm) {
        this.statusMessage = '';
        if (noteForm.valid) {
            return this.api.request('http://localhost:3000/api/notes', 'post', noteForm.value)
                .subscribe(data => {
                    this.responseStatus = 'alert-success';
                    console.log(data, 'result');
                    this.statusMessage = 'You have successfully created a note';
                    this.loadingNote = false;
                    this.noteList = JSON.parse(data._body);
                    setTimeout( () => {
                        this.router.navigate(['/']);
                    }, 2500);
                }, err => {
                    console.error(err, 'there was an error');
                });
        }
        this.responseStatus = 'alert-danger';
        return this.statusMessage = 'Invalid Form';
    }
}
