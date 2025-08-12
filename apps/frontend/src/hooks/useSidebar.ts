import { useReducer } from "react";
import {
  sidebarReducer,
  sidebarReducerInitialState,
} from "../reducers/SidebarReducer";

export const useSidebar = () => {
  const [sidebar, dispatch] = useReducer(
    sidebarReducer,
    sidebarReducerInitialState
  );

  const { open } = sidebar;

  const setOpen = () => dispatch({ type: "TOGGLE_SIDEBAR" });

  return {
    open,
    setOpen,
  };
};
