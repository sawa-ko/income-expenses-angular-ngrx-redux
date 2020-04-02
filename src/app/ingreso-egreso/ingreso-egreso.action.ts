import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';

export const SET_ITEMS = '[INGRESO-EGRESO] Añadir items ingreso-egreso.';
export const UNSET_ITEMS = '[INGRESO-EGRESO] Remover items ingreso-egreso.';

export class SetIemsAction implements Action {
  readonly type = SET_ITEMS;

  constructor(public items: IngresoEgreso[]) {}
}

export class UnSetIemsAction implements Action {
  readonly type = UNSET_ITEMS;
}

export type acciones = SetIemsAction | UnSetIemsAction;
