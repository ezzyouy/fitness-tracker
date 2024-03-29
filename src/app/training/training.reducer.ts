import { Action, createFeatureSelector, createSelector } from '@ngrx/store'
import { Exercice } from './exercice.module'
import {
  SET_AVAILABLE_TRAINING,
  SET_FINIDHED_TRAINING,
  START_TRAINING,
  STOP_TRAINING,
  TrainingActions
} from './training.actions'
import * as fromRoot from '../app.reducer'

export interface TrainingState {
  availableExercises: Exercice[]
  finishedExercises: Exercice[]
  activeTraining: Exercice
}
export interface State extends fromRoot.State {
  training: TrainingState
}
const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null!
}

export function trainingReducer (state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAINING:
      return {
        ...state,
        availableExercises: action.payload
      }
    case SET_FINIDHED_TRAINING:
      return {
        ...state,
        finishedExercises: action.payload
      }
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {...state.availableExercises.find(
          ex => ex.id === action.payload
        )}
      }
    case STOP_TRAINING:
      return {
        activeTraining: null!
      }
    default:
      return state
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training')

export const getAvailableTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
)

export const getFinishedTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
)

export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
)

export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining != null
)

