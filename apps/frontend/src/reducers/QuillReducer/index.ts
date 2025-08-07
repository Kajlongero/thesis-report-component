import type { Delta } from "quill";
import type { DeltaStatic } from "react-quill-new";

import type { QueryDefinitions } from "../../types/quill";
import type { QuillReducerActionTypes } from "./actions";

export type QuillReducerInitialState = {
  delta: Delta | DeltaStatic | null;
  queries: QueryDefinitions[];

  selectedQueries: QueryDefinitions[];
};

export const quillReducerInitialState: QuillReducerInitialState = {
  delta: null,
  queries: [],

  selectedQueries: [],
};

export const quillReducer = (
  state = quillReducerInitialState,
  action: QuillReducerActionTypes
): QuillReducerInitialState => {
  switch (action.type) {
    case "SET_QUERIES": {
      return {
        ...state,
        queries: action.payload,
      };
    }

    case "ADD_QUERY": {
      return {
        ...state,
        selectedQueries: [...state.selectedQueries, action.payload],
      };
    }

    case "DELETE_QUERY": {
      return {
        ...state,
        selectedQueries: state.selectedQueries.filter(
          (sq) => sq.id !== action.payload
        ),
      };
    }

    case "SET_DELTA": {
      return {
        ...state,
        delta: action.payload,
      };
    }

    case "CLEAR_DELTA": {
      return {
        ...state,
        delta: null,
      };
    }

    default:
      return state;
  }
};
