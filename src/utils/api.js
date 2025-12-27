import axios from "axios";

const API = axios.create({
  baseURL: "https://productify-backend-2.onrender.com/",  // ✔ no extra slash
});

export default API;
