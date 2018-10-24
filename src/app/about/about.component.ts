import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {concat, fromEvent, interval, noop, observable, Observable, of, timer, merge, Subject, BehaviorSubject} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

        const subject = new BehaviorSubject(0);  // always provide the latest value regardless of subscription time, need to pass an initial value

        // this emit value of subject
        const series$ = subject.asObservable();

        // early subscription
        series$.subscribe(val => console.log(`early sub:${val}`));

        // really we should try to create observables as close to the source as possible
        // for a promise use, fromPromise
        // from browser event, from(document, 'keyup')

        subject.next(1);
        subject.next(2);
        subject.next(3);
        subject.complete();

        setTimeout(() => {

            series$.subscribe(val => console.log(`late sub:${val}`));

            //subject.next(4);

        }, 3000)

        
    }


}






