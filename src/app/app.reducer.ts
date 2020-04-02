import * as UiReducer from './share/ui.reducer';
import * as AuthReducer from './auth/auth.reducer';
import * as IngresoEgresoReducer from './ingreso-egreso/ingreso.egreso.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  ui: UiReducer.State;
  auth: AuthReducer.AuthState;
  ingreso_egresos: IngresoEgresoReducer.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: UiReducer.UiReducer,
  auth: AuthReducer.AuthReducer,
  ingreso_egresos: IngresoEgresoReducer.ingresoEgresoReducer,
};
