import * as authActions from './auth.actions';
import { User } from './auth.model';

export interface AuthState {
  readonly autenticado: boolean;
  readonly user: User;
}

export const estadoInicial: AuthState = {
  user: null,
  autenticado: false,
};

export function AuthReducer(
  state = estadoInicial,
  action: authActions.acciones,
): AuthState {
  switch (action.type) {
    case authActions.SET_USER:
      return {
        autenticado: action.autenticado,
        user: { ...action.user },
      };
    default:
      return state;
  }
}
