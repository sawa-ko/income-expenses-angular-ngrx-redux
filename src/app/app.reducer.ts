import * as UiReducer from './share/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  ui: UiReducer.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: UiReducer.UiReducer,
};
