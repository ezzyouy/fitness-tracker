import { Action } from '@ngrx/store'
import { Exercice } from './exercice.module'

export const SET_AVAILABLE_TRAINING = '[Training] Set Available Training'
export const SET_FINIDHED_TRAINING = '[Training] Set Finished Training'
export const START_TRAINING = '[Training] Start Training'
export const STOP_TRAINING = '[Training] Stop Training'


export class SetAvailableTraining implements Action {
  readonly type = SET_AVAILABLE_TRAINING

  constructor(public payload: Exercice[]){}
}

export class SetFinishedTraining implements Action {
  readonly type = SET_FINIDHED_TRAINING

  constructor(public payload: Exercice[]){}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING
  constructor(public payload: string){}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING

}


export type TrainingActions = SetAvailableTraining | SetFinishedTraining | StartTraining | StopTraining
