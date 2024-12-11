import axios from "axios";

// Set up axios instance
export const axiosAPI = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// API Endpoints with Generics
export const APIeEndPoints = {
  refreshToken: "/auth/refresh-token",
  changePassword: "/auth/change-password",
  signInUrl: "/auth/signin",
  signUpUrl: "/users/create-lerner",
  lerner: "/lerner",
  admin: "/admin",
  vocabulary: "/vocabulary",
  lesson: "/lesson",
  tutorial: "/tutorial",
} as const;
