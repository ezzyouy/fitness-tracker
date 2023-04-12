import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { Subject, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'

import { Exercice } from './exercice.module'

@Injectable()
export class TrainingService {
  exerciceChange = new Subject<Exercice>()
  exercisesChange = new Subject<Exercice[]>()
  finishedExercisesChange = new Subject<Exercice[]>()
  private availableEercice: Exercice[] = []
  private runningExercice: Exercice
  private finishedExercises: Exercice[] = []
  private fbSubs: Subscription[]=[]

  constructor (private db: AngularFirestore) {}
  fetchAvailableExercices () {
    this.fbSubs.push(this.db
      .collection('availableExercice')
      .snapshotChanges()
      .pipe(
        map(docArray => {
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
          this.availableEercice = exercices
          this.exercisesChange.next([...this.availableEercice])
        }
      ))
  }

  startExercice (selectedId: string) {
    this.db
      .doc('availableExercice/' + selectedId)
      .update({ lastSelected: new Date() })
    this.runningExercice = this.availableEercice.find(
      ex => ex.id === selectedId
    )!
    this.exerciceChange.next({ ...this.runningExercice })
  }
  completeExercice () {
    this.adddataToDatabase({
      ...this.runningExercice,
      date: new Date(),
      state: 'completed'
    })
    this.runningExercice = null!
    this.exerciceChange.next(null!)
  }
  cancelExercice (progress: number) {
    this.adddataToDatabase({
      ...this.runningExercice,
      duration: this.runningExercice.duration * (progress / 100),
      calories: this.runningExercice.calories * (progress / 100),
      date: new Date(),
      state: 'canceled'
    })
    this.runningExercice = null!
    this.exerciceChange.next(null!)
  }
  getRunningExercice () {
    return { ...this.runningExercice }
  }

  fetchCompletedOrCanceledExercises () {
    this.fbSubs.push(this.db
      .collection('finishedExercices')
      .valueChanges()
      .subscribe(
        (exercises: any) => {
          console.log(exercises)

          this.finishedExercises = exercises
          this.finishedExercisesChange.next(exercises)
        }
      ))
  }
  cancelSubscription() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private adddataToDatabase (exercice: Exercice) {
    this.db.collection('finishedExercices').add(exercice)
  }
}
