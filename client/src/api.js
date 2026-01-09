import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const login = (form) => API.post('/auth/login', form);
export const signup = (form) => API.post('/auth/signup', form);
export const fetchExpenses = () => API.get('/expenses');
export const addExpense = (data) => API.post('/expenses', data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);
