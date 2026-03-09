import api from './axios';

export const jobService = {

  // PUBLIC - no login needed
  getAllActiveJobs: async () => {
    const res = await api.get('/jobs/public');
    return res.data.data;
  },

  getJobById: async (id) => {
    const res = await api.get(`/jobs/public/${id}`);
    return res.data.data;
  },

  searchJobs: async (keyword) => {
    const res = await api.get(`/jobs/public/search?keyword=${keyword}`);
    return res.data.data;
  },

  // ADMIN only
  adminGetAllJobs: async () => {
    const res = await api.get('/admin/jobs');
    return res.data.data;
  },

  createJob: async (jobData) => {
    const res = await api.post('/admin/jobs', jobData);
    return res.data.data;
  },

  updateJob: async (id, jobData) => {
    const res = await api.put(`/admin/jobs/${id}`, jobData);
    return res.data.data;
  },

  deleteJob: async (id) => {
    await api.delete(`/admin/jobs/${id}`);
  },
};