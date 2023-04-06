import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Exercice } from '../exercice.module'
import { TrainingService } from '../training.service'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() stratTraining = new EventEmitter()
  exercices: Exercice[] = []

  constructor (private trainingService: TrainingService) {}
  ngOnInit () {
    this.exercices = this.trainingService.getAvailableExercices();
  }
  onStratTraining () {
    this.stratTraining.emit()
  }
}
