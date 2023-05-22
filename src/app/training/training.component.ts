import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { TrainingService } from './training.service'
import * as fromTrainig from './training.reducer'
import { Store } from '@ngrx/store'
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>
  //exerciceSubscription: Subscription

  constructor (
    private traingingService: TrainingService,
    private store: Store<fromTrainig.State>
  ) {}

  ngOnInit () {
    // this.exerciceSubscription = this.traingingService.exerciceChange.subscribe(
    //   exercice => {
    //     if (exercice) {
    //       this.ongoingTraining = true
    //     } else {
    //       this.ongoingTraining = false
    //     }
    //   }
    // )
    this.ongoingTraining$=this.store.select(fromTrainig.getIsTraining)
  }
  // ngOnDestroy () {
  //   if (this.exerciceSubscription) {
  //     this.exerciceSubscription.unsubscribe()
  //   }
  // }
}
