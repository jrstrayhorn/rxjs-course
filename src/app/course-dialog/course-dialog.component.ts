import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {fromEvent, concat} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

    form: FormGroup;
    course:Course;

    @ViewChild('saveButton') saveButton: ElementRef;

    @ViewChild('searchInput') searchInput : ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngOnInit() {

        // filter operator will return value from observalbe only when predicate is true
        this.form.valueChanges
            .pipe(
                filter(() => this.form.valid),
                concatMap(changes => this.saveCourse(changes))  
            )
            .subscribe();

            // this is the imperative way of doing this
            // not the reactive way should be using observables
            // should convert promise to observable using fromPromise method
            // nested subscribes "subscribe inside subscribe" is an anti-pattern in rxjs
            // issue doing it this way is that all save calls will fire at the same time
            // no way to know if save actually completed....
            // need to use concatMap which will only do next call when first one completes
            // .subscribe(changes => {

            //     const saveCourse$ = fromPromise(fetch(`/api/courses/${this.course.id}`, {
            //         method: 'PUT',
            //         body: JSON.stringify(changes),
            //         headers: {
            //             'content-type': 'application/json'
            //         }
            //     }));

            //     saveCourse$.subscribe();

            // });
            
            // this will emit the value from observable to console because subscribe takes a function that takes a parameter
            //.subscribe(console.log);

    }

    saveCourse(changes) {
        return fromPromise(fetch(`/api/courses/${this.course.id}`, {
            method: 'PUT',
            body: JSON.stringify(changes),
            headers: {
                'content-type': 'application/json'
            }
        }));
    }



    ngAfterViewInit() {

        fromEvent(this.saveButton.nativeElement, 'click')
            .pipe(
                exhaustMap(() => this.saveCourse(this.form.value))
            )
            .subscribe();
    }



    close() {
        this.dialogRef.close();
    }

}
