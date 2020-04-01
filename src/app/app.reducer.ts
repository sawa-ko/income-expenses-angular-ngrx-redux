import * as UiReducer from './share/ui.reducer';
import * as AuthReducer from './auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  ui: UiReducer.State;
  auth: AuthReducer.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: UiReducer.UiReducer,
  auth: AuthReducer.AuthReducer,
};
