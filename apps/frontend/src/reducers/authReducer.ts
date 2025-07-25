import type { User } from "../types/user";
import type { AuthReducerActionTypes } from "./actions/authReducerActions";

type AuthReducerInitialState = {
  user: User | null;
};

export const authReducerInitialState: AuthReducerInitialState = {
  user: null,
};

export const authReducer = (
  state = authReducerInitialState,
  action: AuthReducerActionTypes
) => {
  switch (action.type) {
    case "SET_USER_DATA": {
      return {
        ...state,
        user: action.payload,
      };
    }

    case "CLEAR_USER_DATA": {
      return {
        ...state,
        user: null,
      };
    }

    default:
      return state;
  }
};
