import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("Axios baseURL:", axiosAPI.defaults.baseURL);

// API Endpoints with Generics
export const APIeEndPoints = {
  base_url:
    process.env.NODE_ENV !== "development"
      ? "https://programming-hero-assessment-backend.vercel.app/api/v1"
      : "http://localhost:8080/api/v1",
  refreshToken: "/auth/refresh-token",
  changePassword: "/auth/change-password",
  signInUrl: "/auth/signin",
  admin: "/admin",
  users: "/users",
  vocabulary: "/vocabulary",
  lesson: "/lesson",
  tutorial: "/tutorial",
} as const;
