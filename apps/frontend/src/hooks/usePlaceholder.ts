import { useReducer } from "react";

import type { DeltaStatic } from "react-quill-new";

import type { Placeholder } from "../types/placeholders";
import {
  placeholderReducer,
  placeholderReducerInitialState,
} from "../reducers/PlaceholderReducer";

export const usePlaceholder = () => {
  const [placeholders, dispatch] = useReducer(
    placeholderReducer,
    placeholderReducerInitialState
  );

  const scanDeltaForPlaceholders = (delta: DeltaStatic) => {
    if (!delta?.ops) return dispatch({ type: "CLEAR_PLACEHOLDERS" });

    const found: Placeholder[] = [];
    const regex = /{{([^}]+)}}/g;
  };

  const addPlaceholder = (placeholder: Placeholder, delta: DeltaStatic) => {
    dispatch({ type: "ADD_PLACEHOLDER", payload: placeholder });

    scanDeltaForPlaceholders(delta);
  };

  const setPlaceholders = (placeholders: Placeholder[], delta: DeltaStatic) => {
    dispatch({ type: "SET_PLACEHOLDERS", payload: placeholders });

    scanDeltaForPlaceholders(delta);
  };

  const removePlaceholder = (placeholder: Placeholder) =>
    dispatch({ type: "REMOVE_PLACEHOLDER", payload: placeholder });

  const updatePlaceholder = (placeholder: Placeholder) =>
    dispatch({ type: "UPDATE_PLACEHOLDER", payload: placeholder });

  const clearPlaceholders = () => dispatch({ type: "CLEAR_PLACEHOLDERS" });

  return {
    placeholders,
    addPlaceholder,
    setPlaceholders,
    removePlaceholder,
    updatePlaceholder,
    clearPlaceholders,
  };
};
