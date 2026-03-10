import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7036/api",
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default api;