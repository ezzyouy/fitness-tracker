import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>Are you sure?</h1>
  <div mat-dialog-content>
  <p>You already got {{passedData.progress}}</p>
</div>
<div mat-dialog-actions>
  <button mat-button mat-dialog-close="true">Yes</button>
  <button mat-button mat-dialog-close="false" >No</button>
</div>
  `
})

export class StopTrainingComponenet implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData:any) { }

  ngOnInit() { }
}
