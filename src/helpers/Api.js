import axios from "axios";

export default axios.create({
  baseURL: "https://archaeology-backend.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json"
  },
});