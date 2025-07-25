import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
