import api from './axios';

export const applicationService = {

  // USER - apply for a job
  applyForJob: async (jobId, coverLetter = '', resumeUrl = '') => {
    const res = await api.post('/user/applications', { jobId, resumeUrl });
    return res.data.data;
  },

  // USER - get my applications
  getMyApplications: async () => {
    const res = await api.get('/user/applications');
    return res.data.data;
  },

  // ADMIN - get all applications
  getAllApplications: async () => {
    const res = await api.get('/admin/applications');
    return res.data.data;
  },

  // ADMIN - get applications for a specific job
  getApplicationsByJob: async (jobId) => {
    const res = await api.get(`/admin/applications/job/${jobId}`);
    return res.data.data;
  },

  // ADMIN - update application status
  updateStatus: async (applicationId, status, adminNote = '') => {
    // status = 'PENDING' | 'APPROVED' | 'REJECTED'
    const res = await api.patch(`/admin/applications/${applicationId}/status`, { status, adminNote });
    return res.data.data;
  },
};