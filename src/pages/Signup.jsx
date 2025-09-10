import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../validation/schema";
import TextField from "../components/TextField";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    const username = data.username.trim().toLowerCase();
    const email = data.email.trim().toLowerCase();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check duplicates (by username or email)
    const duplicate = users.find(
      (u) =>
        u.username.toLowerCase() === username || u.email.toLowerCase() === email
    );

    if (duplicate) {
      if (duplicate.username.toLowerCase() === username) {
        setError("username", {
          type: "manual",
          message: "Username already exists",
        });
      }
      if (duplicate.email.toLowerCase() === email) {
        setError("email", { type: "manual", message: "Email already exists" });
      }
      return;
    }

    users.push({
      name: data.name.trim(),
      username: data.username.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      password: data.password, // For demo only; never store plain text in production
    });

    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login", { replace: true });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create new Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="NAME"
            name="name"
            register={register}
            error={errors.name}
            placeholder="John Doe"
          />
          <TextField
            label="USERNAME"
            name="username"
            register={register}
            error={errors.username}
            placeholder="john_doe"
          />
          <TextField
            label="EMAIL"
            name="email"
            register={register}
            error={errors.email}
            placeholder="john.doe@gmail.com"
          />
          <TextField
            label="PHONE NO."
            name="phone"
            register={register}
            error={errors.phone}
            placeholder="+919876543210"
          />
          <TextField
            label="NEW PASSWORD"
            name="password"
            type="password"
            register={register}
            error={errors.password}
            placeholder="Enter a strong password"
            autoComplete="new-password"
          />
          <TextField
            label="CONFIRM NEW PASSWORD"
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword}
            placeholder="Re-enter password"
            autoComplete="new-password"
          />

          <button className="btn primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Please wait..." : "SIGN UP"}
          </button>
        </form>

        <p className="muted">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
