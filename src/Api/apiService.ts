import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://hw62-de869-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default api;