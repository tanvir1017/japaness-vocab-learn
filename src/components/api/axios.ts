import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? "https://programming-hero-assessment-backend.vercel.app/api/v1"
    : "http://localhost:8080/api/v1";
export const axiosAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API Endpoints with Generics
export const APIeEndPoints = {
  base_url: BASE_URL,
  refreshToken: "/auth/refresh-token",
  changePassword: "/auth/change-password",
  signInUrl: "/auth/signin",
  admin: "/admin",
  users: "/users",
  vocabulary: "/vocabulary",
  lesson: "/lesson",
  tutorial: "/tutorial",
} as const;
