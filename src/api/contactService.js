import api from './axios';

export const contactService = {
  submit: async ({ name, email, phone, subject, message }) => {
    const res = await api.post('/contact', { name, email, phone, subject, message });
    return res.data.data;
  },
  // ADMIN
  getAll: async () => {
    const res = await api.get('/admin/contacts');
    return res.data.data;
  },
  getById: async (id) => {
    const res = await api.get(`/admin/contacts/${id}`);
    return res.data.data;
  },
  reply: async (id, reply) => {
    const res = await api.patch(`/admin/contacts/${id}/reply`, { reply });
    return res.data.data;
  },
};