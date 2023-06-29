import axios, { AxiosInstance, AxiosResponse } from "axios";

const instance: AxiosInstance  = axios.create({
  baseURL: "https://reqres.in",
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    let res: AxiosResponse  = {} as AxiosResponse;
    if (error.response) {
      res.data  = error.response.data;
      res.status = error.response.status;
      res.headers = error.response.headers;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
    return res;
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
  }
);

export default instance;
