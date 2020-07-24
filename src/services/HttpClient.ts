import axios from "axios";

const HttpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
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
