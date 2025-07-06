

import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://carrer-code-server-two.vercel.app", 
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Redirect if unauthorized
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // force logout
    }
    return Promise.reject(error);
  }
);

export default axiosSecure;





