import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { StopTrainingComponenet } from './stop-training.component'

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter()
  progress = 0
  timer: number
  constructor (private dialog: MatDialog) {}
  ngOnInit () {
    this.timer = window.setInterval(() => {
      this.progress = this.progress + 5
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 1000)
  }
  startOrResumeTimer () {
    this.timer = window.setInterval(() => {
      this.progress = this.progress + 5
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 1000)
  }
  onStop () {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponenet, {
      data: {
        progress: this.progress
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)

      if (result) {
        this.trainingExit.emit()
      } else {
        this.startOrResumeTimer();
      }
    })
  }
}
