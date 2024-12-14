import axios from "axios";

// RESPONSIBLE FOR BACKEND BASE API
export const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL_FOR_DEV;

// RESPONSIBLE FOR FRONT-END API
export const BASE_URL_FRONT_END =
  process.env.NODE_ENV !== "development"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : process.env.NEXT_PUBLIC_BASE_URL_FOR_DEV;

// RESPONSIBLE FOR FRONT-END API
export const BASE_URL_FRONT_END_AUTH_URL =
  process.env.NODE_ENV !== "development"
    ? process.env.NEXT_PUBLIC_AUTH_URL
    : process.env.NEXT_PUBLIC_AUTH_URL_FOR_DEV;

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
