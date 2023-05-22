import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { UIService } from 'src/app/shared/ui.service'

import * as fromRoot from '../../app.reducer'
import * as fromTrainig from '../training.reducer'

import { Exercice } from '../exercice.module'
import { TrainingService } from '../training.service'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit /*, OnDestroy*/ {
  exercices$: Observable<Exercice[]>
  //private exerciceSubscription: Subscription
  isLoading$: Observable<boolean>

  constructor (
    private trainingService: TrainingService,
    private uiService: UIService,
    private store:Store<fromTrainig.State>
  ) {}
  ngOnInit () {
    // this.loadingSubscription = this.uiService.loadingStateCahnged.subscribe(
    //   isLoading => {
    //     this.isLoading = isLoading
    //   }
    // )
    this.isLoading$= this.store.select(fromRoot.getIsLoading)
    // this.exerciceSubscription = this.trainingService.exercisesChange.subscribe(
    //   exercices => {
    //     //this.isLoading = false;
    //     this.exercices = exercices
    //   }
    // )
    this.exercices$=this.store.select(fromTrainig.getAvailableTraining)
    this.fetchExercises()
  }

  fetchExercises () {
    this.trainingService.fetchAvailableExercices()
  }
  /*ngOnDestroy () {
    if (this.exerciceSubscription) {
      this.exerciceSubscription.unsubscribe()
    }
    // if (this.loadingSubscription) {
    //   this.loadingSubscription.unsubscribe()
    // }
  }*/
  onStratTraining (form: NgForm) {
    this.trainingService.startExercice(form.value.exercice)
  }
}
