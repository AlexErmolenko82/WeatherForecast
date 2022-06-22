import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
});

instance.interceptors.response.use(function (response) {
  return response.data;
});

export default instance;
