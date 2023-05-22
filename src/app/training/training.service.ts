import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { Subject, Subscription } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { UIService } from '../shared/ui.service'

import { Exercice } from './exercice.module'
import * as UI from '../shared/ui.action'
import * as Training from './training.actions'

import { Store } from '@ngrx/store'
import * as fromTrainig from './training.reducer'

@Injectable()
export class TrainingService {
  exerciceChange = new Subject<Exercice>()
  exercisesChange = new Subject<Exercice[]>()
  finishedExercisesChange = new Subject<Exercice[]>()
  private availableEercice: Exercice[] = []
  private runningExercice: Exercice
  private finishedExercises: Exercice[] = []
  private fbSubs: Subscription[] = []

  constructor (
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTrainig.State>
  ) {}

  fetchAvailableExercices () {
    //this.uiService.loadingStateCahnged.next(true)
    this.store.dispatch(new UI.StartLoading())
    this.fbSubs.push(
      this.db
        .collection('availableExercice')
        .snapshotChanges()
        .pipe(
          map(docArray => {
            //throw(new Error())
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                data: doc.payload.doc.data()
              }
            })
          })
        )
        .subscribe(
          (exercices: any) => {
            //this.uiService.loadingStateCahnged.next(false)
            this.store.dispatch(new UI.StopLoading())

            this.store.dispatch(new Training.SetAvailableTraining(exercices))
            // this.availableEercice = exercices
            // this.exercisesChange.next([...this.availableEercice])
          },
          error => {
            //this.uiService.loadingStateCahnged.next(false);
            this.store.dispatch(new UI.StopLoading())

            this.uiService.showSnackbar(
              'Fteching Exercises failed, please try again',
              null!,
              3000
            )
            this.exerciceChange.next(null!)
          }
        )
    )
  }

  startExercice (selectedId: string) {
    // this.db
    //   .doc('availableExercice/' + selectedId)
    // //   .update({ lastSelected: new Date() })
    // this.runningExercice = this.availableEercice.find(
    //   ex => ex.id === selectedId
    // )!
    // this.exerciceChange.next({ ...this.runningExercice })
    this.store.dispatch(new Training.StartTraining(selectedId))
  }
  completeExercice () {
    this.store.select(fromTrainig.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.adddataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      })
      // this.runningExercice = null!
      // this.exerciceChange.next(null!)
      this.store.dispatch(new Training.StopTraining())
    })
  }
  cancelExercice (progress: number) {
    this.store.select(fromTrainig.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.adddataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'canceled'
      })
      // this.runningExercice = null!
      // this.exerciceChange.next(null!)
      this.store.dispatch(new Training.StopTraining())
    })
    // this.runningExercice = null!
    // this.exerciceChange.next(null!)

    this.store.dispatch(new Training.StopTraining())
  }
  // getRunningExercice () {
  //   return { ...this.runningExercice }
  // }

  fetchCompletedOrCanceledExercises () {
    this.fbSubs.push(
      this.db
        .collection('finishedExercices')
        .valueChanges()
        .subscribe((exercises: any) => {
          console.log(exercises)

          this.finishedExercises = exercises
          this.store.dispatch(new Training.SetFinishedTraining(exercises))
        })
    )
  }
  cancelSubscription () {
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }

  private adddataToDatabase (exercice: Exercice) {
    this.db.collection('finishedExercices').add(exercice)
  }
}
