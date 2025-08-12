import { Link } from "react-router-dom";
import { useContext } from "react";
import { FileText, ChevronRight } from "lucide-react";

import { Button } from "../components/Commons/Button";
import { AuthContext } from "../context";

export function LandingPage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </span>
            <span className="text-base font-semibold text-foreground">
              RepCom
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-sm text-muted-foreground">
                  Hola,{" "}
                  <span className="font-medium text-foreground">
                    {`${user.firstName} ${user.lastName}`}
                  </span>
                </div>
                <Link to="/dashboard">
                  <Button size="sm">Ir al dashboard</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/my-account"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link to="/register">
                  <Button size="sm">Registrarse</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main>
        <section className="relative">
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 to-transparent"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 min-h-[calc(100vh-64px)] flex items-center justify-center">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Sistema de Reportes genérico desacoplado
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Crea templates para reportes y genéralos sin ninguna
                complicación gracias a nuestro sistema inteligente de generación
                de reportes que a través de plantillas y etiquetas puedes crear
                gran variedad de reportes!
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to={user ? "/dashboard" : "/register"}>
                  <Button size="lg" className="">
                    {user ? "Dashboard" : "Registrarse"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                RepCom · 2025
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
