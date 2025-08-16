import type { Placeholder } from "../../types/placeholders";
import type { PlaceholderReducerActionTypes } from "./actions";

export type PlaceholderReducerInitialState = {
  placeholders: Placeholder[];
};

export const placeholderReducerInitialState: PlaceholderReducerInitialState = {
  placeholders: [],
};

export const placeholderReducer = (
  state = placeholderReducerInitialState,
  action: PlaceholderReducerActionTypes
) => {
  switch (action.type) {
    case "ADD_PLACEHOLDER":
      return {
        ...state,
        placeholders: [...state.placeholders, action.payload],
      };

    case "REMOVE_PLACEHOLDER":
      return {
        ...state,
        placeholders: state.placeholders.filter(
          (placeholder) => placeholder.id !== action.payload.id
        ),
      };

    case "UPDATE_PLACEHOLDER":
      return {
        ...state,
        placeholders: state.placeholders.map((placeholder) =>
          placeholder.id === action.payload.id ? action.payload : placeholder
        ),
      };

    case "CLEAR_PLACEHOLDERS":
      return {
        ...state,
        placeholders: [],
      };

    default:
      return state;
  }
};
