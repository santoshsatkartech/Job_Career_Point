import api from './axios';

export const testimonialService = {
  // PUBLIC
  getApproved: async () => {
    const res = await api.get('/testimonials/public');
    return res.data.data;
  },
  // USER
  submit: async ({ message, rating, designation, company }) => {
    const res = await api.post('/user/testimonials', { message, rating, designation, company });
    return res.data.data;
  },
  // ADMIN
  getAll: async () => {
    const res = await api.get('/admin/testimonials');
    return res.data.data;
  },
  updateStatus: async (id, status) => {
    // status = 'APPROVED' | 'REJECTED'
    const res = await api.patch(`/admin/testimonials/${id}/status?status=${status}`);
    return res.data.data;
  },
};