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
    case "SET_PLACEHOLDERS": {
      return {
        ...state,
        placeholders: action.payload,
      };
    }

    case "ADD_PLACEHOLDER": {
      return {
        ...state,
        placeholders: [...state.placeholders, action.payload],
      };
    }

    case "REMOVE_PLACEHOLDER": {
      return {
        ...state,
        placeholders: state.placeholders.filter(
          (placeholder) => placeholder.id !== action.payload.id
        ),
      };
    }

    case "CLEAR_PLACEHOLDERS": {
      return {
        ...state,
        placeholders: [],
      };
    }

    case "ADD_QUERY": {
      const findPlaceholder = state.placeholders.find(
        (placeholder) => placeholder.id === action.payload.id.id
      );
      if (!findPlaceholder) return state;

      const hasQuery = findPlaceholder.queryIds.find(
        (query) => query.id === action.payload.query.id
      );
      if (hasQuery) return state;

      findPlaceholder.queryIds.push(action.payload.query);

      const newPlaceholders = state.placeholders.map((elem) =>
        elem.id === action.payload.id.id ? findPlaceholder : elem
      );

      return {
        ...state,
        placeholders: [...newPlaceholders],
      };
    }

    case "REMOVE_QUERY": {
      const findPlaceholder = state.placeholders.find(
        (placeholder) => placeholder.id === action.payload.id.id
      );
      if (!findPlaceholder) return state;

      const hasQuery = findPlaceholder.queryIds.find(
        (query) => query.id === action.payload.query.id
      );
      if (!hasQuery) return state;

      findPlaceholder.queryIds = findPlaceholder.queryIds.filter(
        (query) => query.id !== action.payload.query.id
      );

      return {
        ...state,
        placeholders: [...state.placeholders],
      };
    }

    default:
      return state;
  }
};
