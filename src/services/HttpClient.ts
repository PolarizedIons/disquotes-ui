import axios from "axios";

const HttpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  responseType: "json",
  validateStatus: () => true
});

export default HttpClient;
