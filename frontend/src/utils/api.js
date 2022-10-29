import axios from "axios";
import { BASE_URL } from "./urls";

export const request = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    credentials: 'same-origin',
    timeout: 300000,
  })