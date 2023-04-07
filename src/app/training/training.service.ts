import { Subject } from 'rxjs'
import { Exercice } from './exercice.module'

export class TrainingService {
  exerciceChange = new Subject<Exercice>()

  private availableEercice: Exercice[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 9 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 14 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 200, calories: 110 },
    { id: 'burpees', name: 'Burpees', duration: 55, calories: 1000 }
  ]
  private runningExercice: Exercice
  private exercises: Exercice[] = []
  getAvailableExercices () {
    return this.availableEercice.slice()
  }

  startExercice (selectedId: string) {
    this.runningExercice = this.availableEercice.find(
      ex => ex.id === selectedId
    )!
    this.exerciceChange.next({ ...this.runningExercice })
  }
  completeExercice () {
    this.exercises.push({
      ...this.runningExercice,
      date: new Date(),
      state: 'completed'
    })
    this.runningExercice = null!
    this.exerciceChange.next(null!)
  }
  cancelExercice (progress: number) {
    this.exercises.push({
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

  getCompletedOrCanceledExercises() {
    return this.exercises.slice();
  }
}
