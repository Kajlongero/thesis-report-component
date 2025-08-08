import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../context";
import { validateLoginSchema } from "./model";

import type { User } from "../../types/user";
import type { LoginCredentials } from "../../types/credentials";

export function LoginForm() {
  const navigate = useNavigate();
  const { clearUserData, setUserData } = useContext(AuthContext);

  const { isPending, process } = useFetch({
    tx: "Login",
    fnName: "login-fn",
  });

  const formik = useFormik({
    validationSchema: validateLoginSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values: LoginCredentials) => {
      const response = await process<User>(values);

      if (response.error) {
        clearUserData();

        return toast.error(response.message, {
          autoClose: 4000,
          draggable: false,
          hideProgressBar: true,
        });
      }

      setUserData(response.data);
      navigate("/dashboard");
    },
  });

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
        <p className="mt-2 text-muted-foreground">
          Sign in to your admin dashboard
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-ring border-border rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-muted-foreground"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-primary hover:opacity-80 transition-opacity"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-primary-foreground bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-all duration-200 shadow-lg"
            disabled={isPending}
          >
            {isPending ? "Signin in..." : "Sign In"}
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              type="button"
              className="font-medium text-primary hover:opacity-80 transition-opacity"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
