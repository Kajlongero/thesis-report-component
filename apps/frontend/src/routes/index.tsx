import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Hola En Root</h1>
          </>
        }
      />
      <Route
        path="/about"
        element={
          <>
            <h1>Hola En About</h1>
          </>
        }
      />
    </Routes>
  );
}
