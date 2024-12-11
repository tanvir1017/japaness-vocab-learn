import axios from "axios";

// Set up axios instance
export const axiosAPI = axios.create({
  baseURL: "http://192.168.31.138:8080/api/v1",
});

export const APIeEndPoints = {
  signInUrl: "/auth/signin",
  signUpUrl: "users/create-lerner",
  lerner: "/lerner",
};
