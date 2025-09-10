import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/schema";
import TextField from "../components/TextField";
import { Link } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) =>
        u.username.toLowerCase() === data.username.trim().toLowerCase() &&
        u.password === data.password
    );

    if (!user) {
      setError("password", { type: "manual", message: "Invalid username or password" });
      return;
    }

    alert(`Logged in as ${user.username}`);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <p className="muted">Sign in to continue</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="USERNAME"
            name="username"
            register={register}
            error={errors.username}
            placeholder="john_doe"
            autoComplete="username"
          />
          <TextField
            label="NEW PASSWORD"
            name="password"
            type="password"
            register={register}
            error={errors.password}
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          <button className="btn primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Please wait..." : "LOGIN"}
          </button>
        </form>

        <p className="muted">
          Don&apos;t have Account? <Link to="/signup">SignUp</Link>
        </p>
      </div>
    </div>
  );
}
