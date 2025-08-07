import { useReducer } from "react";
import type { Delta } from "quill";
import type { DeltaStatic } from "react-quill-new";

import { QuillContext } from "..";
import {
  quillReducer,
  quillReducerInitialState,
} from "../../reducers/QuillReducer";

import type { QueryDefinitions } from "../../types/quill";

export const QuillProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, dispatch] = useReducer(quillReducer, quillReducerInitialState);

  const { delta, queries, selectedQueries } = data;

  const setQueries = (queries: QueryDefinitions[]) =>
    dispatch({ type: "SET_QUERIES", payload: queries });

  const addQuery = (query: QueryDefinitions) =>
    dispatch({ type: "ADD_QUERY", payload: query });

  const deleteQuery = (query: number | string) =>
    dispatch({ type: "DELETE_QUERY", payload: query });

  const setDelta = (delta: Delta | DeltaStatic) =>
    dispatch({ type: "SET_DELTA", payload: delta });

  const clearDelta = () => dispatch({ type: "CLEAR_DELTA" });

  return (
    <QuillContext.Provider
      value={{
        delta,
        queries,
        selectedQueries,
        addQuery,
        setQueries,
        deleteQuery,
        setDelta,
        clearDelta,
      }}
    >
      {children}
    </QuillContext.Provider>
  );
};
