import axios from "axios";

const baseUrl = process.env.VUE_APP_API_URL || "http://localhost:5000";

const HttpClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: sessionStorage.getItem("access_token")
      ? `Bearer ${sessionStorage.getItem("access_token")}`
      : undefined
  },
  responseType: "json",
  validateStatus: () => true
});

export default HttpClient;
