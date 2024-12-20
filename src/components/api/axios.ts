import axios from "axios";

// Set up axios instance
export const axiosAPI = axios.create({
  baseURL:
    process.env.NODE_ENV !== "development"
      ? "https://programming-hero-assessment-backend.vercel.app/api/v1"
      : "http://localhost:8080/api/v1",
});

// API Endpoints with Generics
export const APIeEndPoints = {
  base_url:
    process.env.NODE_ENV !== "development"
      ? "https://programming-hero-assessment-backend.vercel.app/api/v1"
      : "http://localhost:8080/api/v1",
  refreshToken: "/auth/refresh-token",
  changePassword: "/auth/change-password",
  signInUrl: "/auth/signin",
  signUpUrl: "/users/create-lerner",
  lerner: "/lerner",
  admin: "/admin",
  users: "/users",
  vocabulary: "/vocabulary",
  lesson: "/lesson",
  tutorial: "/tutorial",
} as const;
