import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import {  Subscription } from 'rxjs'
import { map } from 'rxjs/operators'

import { Exercice } from '../exercice.module'
import { TrainingService } from '../training.service'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercices: any
  exerciceSubscription:Subscription

  constructor (
    private trainingService: TrainingService,
  ) {}
  ngOnInit() {
    this.exerciceSubscription=this.trainingService.exercisesChange.subscribe(exercices=> this.exercices=exercices);
    this.trainingService.fetchAvailableExercices();
  }
  ngOnDestroy(){
      this.exerciceSubscription.unsubscribe()
  }
  onStratTraining (form: NgForm) {
    this.trainingService.startExercice(form.value.exercice)
  }
}
