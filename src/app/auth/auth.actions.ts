import { Action } from '@ngrx/store';
import { User } from './auth.model';

export const SET_USER = '[AUTH] Set user';

export class SetUserAction implements Action {
  readonly type = SET_USER;
  constructor(public user: User, public autenticado: boolean) {}
}

export type acciones = SetUserAction;
