import type { User } from "../../types/user";
import type { AuthReducerActionTypes } from "./actions";

type AuthReducerInitialState = {
  user: User | null | false;
  expiredToken: boolean;
  hasRefreshedSession: boolean;
};

export const authReducerInitialState: AuthReducerInitialState = {
  user: null,
  expiredToken: false,
  hasRefreshedSession: false,
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

    case "SET_EXPIRED_TOKEN": {
      console.log("Updating expired token", action.payload);

      return {
        ...state,
        expiredToken: action.payload,
      };
    }

    case "SET_REFRESHED_SESSION": {
      return {
        ...state,
        hasRefreshedSession: action.payload,
      };
    }

    default:
      return state;
  }
};
