import axios from "axios";

// Set up axios instance

const axiosApi = axios.create({
  baseURL: "http://192.168.31.138:8080/api/v1",
});

export default axiosApi;
