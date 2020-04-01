import * as actionsUi from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initState: State = {
  isLoading: false,
};

export function UiReducer(
  state = initState,
  action: actionsUi.acciones,
): State {
  switch (action.type) {
    case actionsUi.ACTIVAR_LOADING:
      return {
        isLoading: true,
      };
    case actionsUi.DESACTIVAR_LOADING:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
}
