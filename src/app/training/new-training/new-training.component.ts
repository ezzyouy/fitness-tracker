import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Exercice } from '../exercice.module'
import { TrainingService } from '../training.service'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercices: Exercice[] = []

  constructor (private trainingService: TrainingService) {}
  ngOnInit () {
    this.exercices = this.trainingService.getAvailableExercices();
  }
  onStratTraining (form: NgForm) {
    this.trainingService.startExercice(form.value.exercice)
  }
}
