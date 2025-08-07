import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1 p-6">
        <Routes>
          <Route
            index
            path="/"
            element={
              <div>
                <h1>Hola mundo</h1>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
