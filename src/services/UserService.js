import axios from "./customize-axios";

function fetchDataUser(page) {
  return axios.get(`/api/users?page=${page}`);
}

function postCreateUser(name, job) {
  return axios.post("/api/users", { name, job });
}

function putUpdateUser(name, job) {
  return axios.put("/api/users/", { name, job });
}

function deleteUser(id) {
  return axios.delete(`/api/users/${id}`);
}

function loginApi(email, password) {
  return axios.post("/api/login", { email, password });
}

export { fetchDataUser, postCreateUser, putUpdateUser, deleteUser, loginApi };
