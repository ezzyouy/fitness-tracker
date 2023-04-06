import { Exercice } from './exercice.module'

export class TrainingService {
  private availableEercice: Exercice[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 9 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 14 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 200, calories: 110 },
    { id: 'burpees', name: 'Burpees', duration: 55, calories: 1000 }
  ];

  getAvailableExercices() {
    return this.availableEercice.slice();
  }
}
