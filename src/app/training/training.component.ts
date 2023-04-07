import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining = false;
  exerciceSubscription: Subscription
  constructor(private traingingService:TrainingService) { }

  ngOnInit() {
    this.exerciceSubscription = this.traingingService.exerciceChange.subscribe(
      exercice => {
        if (exercice) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    )
  }
}
