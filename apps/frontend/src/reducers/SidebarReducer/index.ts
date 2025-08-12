import type { SidebarReducerActionTypes } from "./actions";

type SidebarReducerInitialState = {
  open: boolean;
};

export const sidebarReducerInitialState: SidebarReducerInitialState = {
  open: false,
};

export const sidebarReducer = (
  state = sidebarReducerInitialState,
  action: SidebarReducerActionTypes
): SidebarReducerInitialState => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR": {
      return {
        ...state,
        open: !state.open,
      };
    }

    default:
      return state;
  }
};
