import * as egresoIngresoActions from './ingreso-egreso.action';
import { IngresoEgreso } from './ingreso-egreso.model';

export interface IngresoEgresoState {
  items: IngresoEgreso[];
}

const estadoInicial: IngresoEgresoState = {
  items: [],
};

export function ingresoEgresoReducer(
  state = estadoInicial,
  action: egresoIngresoActions.acciones,
): IngresoEgresoState {
  switch (action.type) {
    case egresoIngresoActions.SET_ITEMS:
      return {
        items: [
          ...action.items.map((item: any) => {
            return {
              ...item,
            };
          }),
        ],
      };
    case egresoIngresoActions.UNSET_ITEMS:
      return {
        items: [],
      };
    default:
      return state;
  }
}
