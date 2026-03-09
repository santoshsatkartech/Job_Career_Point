import api from './axios';

export const authService = {

  // Register new user
  register: async (data) => {
    // data = { firstName, lastName, email, password, phone }
    const res = await api.post('/auth/register', data);
    return res.data.data; // returns { token, tokenType, id, email, firstName, lastName, role }
  },

  // Login
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const user = res.data.data;
    // Save to localStorage
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if logged in
  isLoggedIn: () => !!localStorage.getItem('token'),

  // Check if admin
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'ADMIN';
  },
};