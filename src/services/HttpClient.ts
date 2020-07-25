import axios from "axios";
import router from "@/router";

const HttpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  responseType: "json",
  validateStatus: () => true
});

HttpClient.interceptors.response.use(
  res => {
    if (res.status === 401) {
      router.push({ name: "logout" });
    }
    return res;
  },
  error => {
    // Do something with response error
    router.push({ name: "logout" });
    return Promise.reject(error);
  }
);

export default HttpClient;
