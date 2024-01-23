import axios from "axios";

const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// service.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = "Token " + token;
//   }
//   return config;
// });

export default service;
