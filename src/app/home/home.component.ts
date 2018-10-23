import {Component, OnInit} from '@angular/core';
import {Course, CourseCategory} from "../model/course";
import {interval, Observable, of, timer, noop, throwError} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap, finalize} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    
    // beginnerCourses: Course[];

    // advancedCourses: Course[];

    // what are the sources of data - create observables for them
    // stream of data
    beginnerCourses$: Observable<Course[]>;

    // stream of data
    advancedCourses$: Observable<Course[]>;

    ngOnInit() {

        const http$ = createHttpObservable('/api/courses');

        // pipe allows us to chain operators
        // tap allows us to produce side effects are do other things not necessarily related to stream of data
        // updating a variable in component or logging
        // shareReplay allows us to executed 1 and then REPLAYED to other observable/subscription without calling http again
        // shareReplay is very commonly used!!

        // 1 method for error handling is catchError and replace with another value or observable

        // catchError(err => of([
        //     {
        //         id: 0,
        //         description: "RxJs In Practice Course",
        //         iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
        //         courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
        //         longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
        //         category: 'BEGINNER',
        //         lessonsCount: 10
        //     }
        // ]))

        // #2 method for error handling is catch and rethrow

        // catchError(err => {
        //     console.log("Error occurred", err);  // can use toastr message here

        //     return throwError(err);
        // }),
        // finalize(() => {

        //     console.log('Finalize executed...');
        // }),

        const courses$ = http$
            .pipe(
                tap(() => { console.log("HTTP done executing"); }),
                map(res => Object.values<Course>(res.payload)),
                shareReplay(),
                retryWhen(errors => errors.pipe(
                    delayWhen(() => timer(2000) )
                ))
            );

            

        // this is the reactive way to do this.. we don't subscribe in the component
        // use the async pipe to subscribe/retrieve data/unsubscribe
        // issue though is that we are doing 2 http calls here now
        this.beginnerCourses$ = courses$
            .pipe(
                map(courses => courses.filter(c => c.category == CourseCategory.beginner))
            );

        this.advancedCourses$ = courses$
            .pipe(
                map(courses => courses.filter(c => c.category == CourseCategory.advanced))
            )

        // if using rxjs we should have a bunch of logic inside subscribe calls
        // rxjs was built to avoid this - no nesting subscribe calls
        // this is imperative approach ok but won't scale well
        // courses$.subscribe(
        //     courses => {
        //         this.beginnerCourses = courses.filter(c => c.category == CourseCategory.beginner);

        //         this.advancedCourses = courses.filter(c => c.category == CourseCategory.advanced)
        //     },
        //     noop,
        //     () => console.log('complete')
        // );

    }

}
