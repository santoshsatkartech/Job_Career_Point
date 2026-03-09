import api from './axios';

export const userService = {

  // USER - get own profile
  getProfile: async () => {
    const res = await api.get('/user/profile');
    return res.data.data;
  },

  // USER - update own profile
  updateProfile: async (profileData) => {
    const res = await api.put('/user/profile', profileData);
    return res.data.data;
  },

  // ADMIN - get all users
  getAllUsers: async () => {
    const res = await api.get('/admin/users');
    return res.data.data;
  },

  // ADMIN - get user by id
  getUserById: async (id) => {
    const res = await api.get(`/admin/users/${id}`);
    return res.data.data;
  },

  // ADMIN - block or activate user
  toggleUserStatus: async (id) => {
    const res = await api.patch(`/admin/users/${id}/toggle-status`);
    return res.data.data;
  },
};