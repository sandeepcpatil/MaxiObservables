import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";
import {map, filter} from 'rxjs/operators'

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription =  interval(period: 1000).subscribe(next: count =>{
    //   console.log(count)
    // })
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 2){
          observer.complete();
        }
        if(count> 3){
          observer.error(new Error('Count is greater than 3!'))
        }
        count++;
      }, 1000);
    }, () =>{
      console.log('Completed!')
    });

    customIntervalObservable.pipe(filter(data =>{
      return data > 0;
    }),map((data: number) =>{
      return 'Round: ' + (data + 1);
    }))

    this.firstObsSubscription = customIntervalObservable.pipe(map((data: number) => {
      return 'round: ' + (data + 1)
    })).subscribe((data) => {
      console.log(data);
    }, error =>{
      console.log(error)
      alert(error.message)
    });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
