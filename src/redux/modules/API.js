import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  validateStatus: (status) => {
    return status < 500;
  },
});
