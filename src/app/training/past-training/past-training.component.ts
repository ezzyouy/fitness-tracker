import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'

import { Exercice } from '../exercice.module'
import { TrainingService } from '../training.service'

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
  dataSource = new MatTableDataSource<Exercice>()
private exChangedSubscription:Subscription
  @ViewChild(MatSort) sort: MatSort
    @ViewChild(MatPaginator) paginator: MatPaginator

  constructor (private trainingService: TrainingService) {}

  ngOnInit() {
    this.exChangedSubscription= this.trainingService.finishedExercisesChange.subscribe((exercises: Exercice[]) => {
      this.dataSource.data = exercises
    });
      this.trainingService.fetchCompletedOrCanceledExercises()
  }
  ngAfterViewInit () {
    this.dataSource.sort = this.sort
    this.dataSource.paginator=this.paginator
  }
  doFilter(event: Event) {

    this.dataSource.filter=(event.target as HTMLInputElement).value.trim().toLowerCase()
  }
  ngOnDestroy() {
      this.exChangedSubscription.unsubscribe()
  }
}
