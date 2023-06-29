import axios from "./customize-axios";
import { AxiosResponse } from "axios";

function fetchDataUser(page: number) {
  return axios.get(`/api/users?page=${page}`);
}

function postCreateUser(name: string, job: string) {
  return axios.post("/api/users", { name, job });
}

function putUpdateUser(name: string, job: string) {
  return axios.put("/api/users/", { name, job });
}

function deleteUser(id: string) {
  return axios.delete(`/api/users/${id}`);
}

function loginApi(email: any, password: any) {
  return axios.post("/api/login", { email, password });
}

export interface ApiResponse<T = any> extends AxiosResponse {
  data: T;
  status: number;
  token: string;
  statusCode: number;
  total: number;
  total_pages: number;
}

export { fetchDataUser, postCreateUser, putUpdateUser, deleteUser, loginApi };
