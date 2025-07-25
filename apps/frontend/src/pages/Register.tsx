import { RegisterForm } from "../components/Forms/RegisterForm";

export const RegisterPage = () => {
  return (
    <main className="min-h-screen w-full">
      <div className="flex items-center justify-center min-h-screen py-8">
        <div className="min-w-md relative bg-card/90 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.1)] rounded-3xl p-8 border border-border/30 ring-1 ring-white/20 dark:ring-white/10 max-w-md max-h-fit">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
};
