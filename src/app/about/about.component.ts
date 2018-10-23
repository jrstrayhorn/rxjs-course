import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, timer, fromEvent, Observable, noop, of, concat, merge } from 'rxjs';
import { createHttpObservable } from '../common/util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // const interval1$ = interval(1000);

    // // sub is a subscription / return type of subscribe
    // const sub = interval1$.subscribe(console.log);

    setTimeout(() => sub.unsubscribe(), 5000);

    const http$ = createHttpObservable('/api/courses');

    const sub = http$.subscribe(console.log);

    setTimeout(() => sub.unsubscribe(), 0);

    // simple merge example
    // const interval1$ = interval(1000);

    // const interval2$ = interval1$.pipe(map(val => 10 * val));

    // const results$ = merge(interval1$, interval2$);

    // results$.subscribe(console.log);

    // // simple concat example
    // // creates a simple observable that emits 1, 2, 3 then completes
    // const source1$ = of(1, 2, 3);

    // const source2$ = of(4, 5, 6);

    // const source3$ = of(7, 8, 9);
    
    // // concat observable means subscrive to first observable, then create output observable with input from first observalbe
    // // then subscrive to second oberserable put output in output observable
    // const result$ = concat(source1$, source2$, source3$);

    // result$.subscribe(val => console.log(val));
    
    // Observable.create(observer => {
    //   observer.next(1);
    //   observer.next(2);
    //   observer.next(3);
    //   observer.complete();
    // })

    // promise is immediately trigger when created
    // observable doesn't call until subscribed to
    //fetch('/api/courses');

    

    // in order to combine these stream of values to do something like
    // after a mouse click, wait 3 seconds THEN start counter
    // in order to do this you have to chain multiple call backs together - call back hell

    // front end dev is combinging and managing types of streams of data/values
    // caused by user interaction, back end requests, setTimeouts, intervals, async events,  etc.
    // to get final results

    // this is not convenient, readable

    /*
    // stream of values based on event handler / multi value stream, with multiple values over time that will never complete
    document.addEventListener('click', evt => {
      console.log(evt);

      // stream of values that emits one value then completes
      // like an ajax request without an error
      setTimeout(() => {

        console.log("Time out elapsed.... finished");

        // continuous stream of values / multi value stream, that never completes
        let counter = 0;

        setInterval(() => {
          console.log(counter);
          counter++;
        }, 1000);

      }, 3000);

    });
    */

    /*
    // definition of the stream, declaration
    // blueprint for how the stream should behave
    // $ means this is an observable Observable<number> the parameter in this generic 
    // denotes what type is being emitted from observable
    const interval$ = interval(1000);  
    */

  //  const interval$ = timer(3000, 1000);
  //   // an observable only becomes a stream when we subscribe to it
  //   // now that we've subscribed to the observable we can get the value
  //   // via the subscribe method
    
  //   const sub = interval$.subscribe(val => console.log(`stream 1 => ${val}`));

  //   setTimeout(() => sub.unsubscribe(), 5000);
    
  //   //interval$.subscribe(val => console.log(`stream 2 => ${val}`));
    
  //   // defining a click event
  //   const click$ = fromEvent(document, 'click');

  //   // one or another - either error or completed
  //   // will not emit values after erroring out
  //   click$.subscribe(
      
  //     evt => console.log(evt),

  //     err => console.log(err),

  //     () => console.log("completed")
      
  //   );


    
  }

}


