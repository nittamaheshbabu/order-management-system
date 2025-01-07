import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' }); // Backend URL

// Set the token for authentication
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth
export const login = (email, password) => API.post('/auth/users/login', { email, password });

// Products
export const fetchProducts = () => API.get('/products');
export const createProduct = (product) => API.post('/products', product);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Orders
export const fetchOrders = () => API.get('/orders');
export const createOrder = (order) => API.post('/orders', order);
export const updateOrder = (id, order) => API.put(`/orders/${id}`, order);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);
