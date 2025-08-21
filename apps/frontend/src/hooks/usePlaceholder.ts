import { useReducer, type RefObject } from "react";

import {
  placeholderReducer,
  placeholderReducerInitialState,
} from "../reducers/PlaceholderReducer";
import type ReactQuill from "react-quill-new";
import { parsePlaceholders, type CustomAttrs } from "../utils/blot.parser";
import type { Placeholder, QueryItem } from "../types/placeholders";

export const usePlaceholder = () => {
  const [elements, dispatch] = useReducer(
    placeholderReducer,
    placeholderReducerInitialState
  );

  const { placeholders } = elements;

  const setPlaceholders = (placeholders: Placeholder[]) =>
    dispatch({ type: "SET_PLACEHOLDERS", payload: placeholders });

  const addPlaceholder = (placeholder: Placeholder) =>
    dispatch({ type: "ADD_PLACEHOLDER", payload: placeholder });

  const removePlaceholder = (placeholder: Placeholder) =>
    dispatch({ type: "REMOVE_PLACEHOLDER", payload: placeholder });

  const addQuery = (id: Placeholder, query: QueryItem) =>
    dispatch({ type: "ADD_QUERY", payload: { id, query } });

  const removeQuery = (id: Placeholder, query: QueryItem) =>
    dispatch({ type: "REMOVE_QUERY", payload: { id, query } });

  const clearPlaceholders = () => dispatch({ type: "CLEAR_PLACEHOLDERS" });

  return {
    placeholders,
    addPlaceholder,
    setPlaceholders,
    removePlaceholder,
    clearPlaceholders,
    addQuery,
    removeQuery,
  };
};
