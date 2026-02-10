import axios from "axios";

const API_URL = "https://localhost:7119/api/Student";

export const getStudents = (params) =>
  axios.get(API_URL, { params });

export const addStudent = (data) =>
  axios.post(API_URL, data);

export const updateStudent = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteStudent = (id) =>
  axios.delete(`${API_URL}/${id}`);


