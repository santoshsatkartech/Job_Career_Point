import { useEffect, useState } from 'react';
import { jobService } from '../../api/jobService';
import '../../Styling/AdminJobsPage.css'; 

const EMPTY = {
  title: '',
  company: '',
  location: '',
  jobType: 'FULL_TIME',
  description: '',
  requirements: '',
  salaryRange: '',
  experience: '',
  qualification: '',
  category: '',
  vacancies: '',
  lastDate: '',
  status: 'ACTIVE',
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    load();
  }, []);

  // Filter jobs based on search and status
  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((job) => job.status === statusFilter);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, statusFilter, jobs]);

  const load = () =>
    jobService
      .adminGetAllJobs()
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .finally(() => setLoading(false));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, vacancies: Number(form.vacancies) || null };

    try {
      if (editId) {
        await jobService.updateJob(editId, payload);
        setMsg({ type: 'success', text: '✅ Job updated successfully!' });
      } else {
        await jobService.createJob(payload);
        setMsg({ type: 'success', text: '✅ Job created successfully!' });
      }
      setShowForm(false);
      setEditId(null);
      setForm(EMPTY);
      load();
      setTimeout(() => setMsg({ type: '', text: '' }), 3000);
    } catch (error) {
      setMsg({ type: 'error', text: '❌ Operation failed. Please try again.' });
    }
  };

  const handleEdit = (job) => {
    setForm({ ...job, lastDate: job.lastDate || '' });
    setEditId(job.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await jobService.deleteJob(jobToDelete.id);
      setMsg({ type: 'success', text: '✅ Job deleted successfully.' });
      load();
      setShowDeleteModal(false);
      setJobToDelete(null);
      setTimeout(() => setMsg({ type: '', text: '' }), 3000);
    } catch (error) {
      setMsg({ type: 'error', text: '❌ Failed to delete job.' });
    }
  };

  const viewDetails = (job) => {
    setSelectedJob(job);
    setShowDetailsModal(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'status-active';
      case 'INACTIVE':
        return 'status-inactive';
      case 'CLOSED':
        return 'status-closed';
      default:
        return 'status-inactive';
    }
  };

  const getJobTypeBadgeClass = (type) => {
    switch (type) {
      case 'FULL_TIME':
        return 'type-fulltime';
      case 'PART_TIME':
        return 'type-parttime';
      case 'CONTRACT':
        return 'type-contract';
      case 'INTERNSHIP':
        return 'type-internship';
      case 'REMOTE':
        return 'type-remote';
      default:
        return 'type-fulltime';
    }
  };

  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => j.status === 'ACTIVE').length,
    inactive: jobs.filter((j) => j.status === 'INACTIVE').length,
    closed: jobs.filter((j) => j.status === 'CLOSED').length,
    totalApplications: jobs.reduce(
      (sum, job) => sum + (job.applicationCount || 0),
      0
    ),
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="admin-jobs-page">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <div className="header-content">
            <div>
              <span className="header-badge">Jobs Management</span>
              <h1 className="header-title">
                Manage <span className="text-gradient">Jobs</span>
              </h1>
              <p className="header-description">
                Create, edit, and manage job postings
              </p>
            </div>
            <div className="header-stats">
              <div className="stat-badge">
                <span className="stat-label">Total Jobs</span>
                <span className="stat-value">{stats.total}</span>
              </div>
              <div className="stat-badge active">
                <span className="stat-label">Active</span>
                <span className="stat-value">{stats.active}</span>
              </div>
              <div className="stat-badge">
                <span className="stat-label">Applications</span>
                <span className="stat-value">{stats.totalApplications}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Message Alert */}
        {msg.text && (
          <div className={`message-alert ${msg.type}`}>
            <span className="message-icon">
              {msg.type === 'success' ? '✓' : '⚠'}
            </span>
            <span>{msg.text}</span>
          </div>
        )}

        {/* Action Bar */}
        <div className="action-bar">
          <button
            className={`btn ${showForm ? 'btn-outline' : 'btn-primary'}`}
            onClick={() => {
              setShowForm(!showForm);
              setEditId(null);
              setForm(EMPTY);
            }}
          >
            {showForm ? (
              <>
                Cancel
              </>
            ) : (
              <>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add New Job
              </>
            )}
          </button>
        </div>

        {/* Create/Edit Form */}
        {showForm && (
          <div className="form-container">
            <div className="form-header">
              <h2>{editId ? 'Edit Job' : 'Create New Job'}</h2>
              <p>
                {editId
                  ? 'Update the job details below'
                  : 'Fill in the details to create a new job posting'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="job-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Job Title *</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company *</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Tech Corp"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Pune, Maharashtra"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="e.g., IT, Marketing, Sales"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="salaryRange">Salary Range</label>
                  <input
                    id="salaryRange"
                    name="salaryRange"
                    type="text"
                    value={form.salaryRange}
                    onChange={handleChange}
                    placeholder="e.g., ₹5-8 LPA"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Experience</label>
                  <input
                    id="experience"
                    name="experience"
                    type="text"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="e.g., 2-3 years"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="qualification">Qualification</label>
                  <input
                    id="qualification"
                    name="qualification"
                    type="text"
                    value={form.qualification}
                    onChange={handleChange}
                    placeholder="e.g., B.Tech, MBA"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="vacancies">Vacancies</label>
                  <input
                    id="vacancies"
                    name="vacancies"
                    type="number"
                    value={form.vacancies}
                    onChange={handleChange}
                    placeholder="Number of openings"
                    min="1"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="jobType">Job Type</label>
                  <select
                    id="jobType"
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                  >
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERNSHIP">Internship</option>
                    <option value="REMOTE">Remote</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="lastDate">Last Date to Apply</label>
                  <input
                    id="lastDate"
                    name="lastDate"
                    type="date"
                    value={form.lastDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Job Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Describe the role, responsibilities, and expectations..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="requirements">Requirements</label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  rows="3"
                  placeholder="List the key requirements and skills needed..."
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
                    setForm(EMPTY);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editId ? 'Update Job' : 'Create Job'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-grid">
            <div className="search-box">
              <svg
                className="search-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by title, company, location, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            Showing <strong>{filteredJobs.length}</strong> of{' '}
            <strong>{jobs.length}</strong> jobs
          </p>
        </div>

        {/* Jobs Table */}
        <div className="table-container">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job Details</th>
                <th>Company & Location</th>
                <th>Type & Status</th>
                <th>Applications</th>
                <th>Last Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="job-row">
                    <td>
                      <div className="job-info">
                        <div className="job-title">{job.title}</div>
                        <div className="job-meta">
                          <span className="job-category">
                            {job.category || 'Uncategorized'}
                          </span>
                          <span className="job-experience">
                            {job.experience || 'Exp not specified'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="company-info">
                        <div className="company-name">{job.company}</div>
                        <div className="job-location">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {job.location}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="type-status">
                        <span
                          className={`job-type-badge ${getJobTypeBadgeClass(job.jobType)}`}
                        >
                          {job.jobType?.replace('_', ' ')}
                        </span>
                        <span
                          className={`status-badge ${getStatusBadgeClass(job.status)}`}
                        >
                          {job.status}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="applications-count">
                        <span className="count-number">
                          {job.applicationCount || 0}
                        </span>
                        <span className="count-label">applications</span>
                      </div>
                    </td>
                    <td>
                      <div className="last-date">
                        {formatDate(job.lastDate)}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon view"
                          onClick={() => viewDetails(job)}
                          title="View Details"
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        <button
                          className="btn-icon edit"
                          onClick={() => handleEdit(job)}
                          title="Edit Job"
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>

                        <button
                          className="btn-icon delete"
                          onClick={() => handleDeleteClick(job)}
                          title="Delete Job"
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-state">
                    <div className="empty-icon">💼</div>
                    <h3>No Jobs Found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Details Modal */}
      {showDetailsModal && selectedJob && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetailsModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Job Details</h2>
              <button
                className="close-btn"
                onClick={() => setShowDetailsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="job-detail-header">
                <h3>{selectedJob.title}</h3>
                <span
                  className={`status-badge ${getStatusBadgeClass(selectedJob.status)}`}
                >
                  {selectedJob.status}
                </span>
              </div>

              <div className="details-section">
                <h4>Basic Information</h4>
                <div className="details-grid">
                  <div className="detail-row">
                    <span className="detail-label">Company:</span>
                    <span className="detail-value">{selectedJob.company}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{selectedJob.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Job Type:</span>
                    <span className="detail-value">
                      <span
                        className={`job-type-badge ${getJobTypeBadgeClass(selectedJob.jobType)}`}
                      >
                        {selectedJob.jobType?.replace('_', ' ')}
                      </span>
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">
                      {selectedJob.category || 'Not specified'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h4>Requirements</h4>
                <div className="details-grid">
                  <div className="detail-row">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">
                      {selectedJob.experience || 'Not specified'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Qualification:</span>
                    <span className="detail-value">
                      {selectedJob.qualification || 'Not specified'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Salary:</span>
                    <span className="detail-value salary">
                      {selectedJob.salaryRange || 'Not disclosed'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Vacancies:</span>
                    <span className="detail-value">
                      {selectedJob.vacancies || 'Not specified'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h4>Description</h4>
                <div className="description-content">
                  {selectedJob.description}
                </div>
              </div>

              {selectedJob.requirements && (
                <div className="details-section">
                  <h4>Requirements</h4>
                  <div className="requirements-content">
                    {selectedJob.requirements}
                  </div>
                </div>
              )}

              <div className="details-section">
                <h4>Additional Information</h4>
                <div className="details-grid">
                  <div className="detail-row">
                    <span className="detail-label">Last Date:</span>
                    <span className="detail-value">
                      {formatDate(selectedJob.lastDate)}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Applications:</span>
                    <span className="detail-value">
                      {selectedJob.applicationCount || 0}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Created:</span>
                    <span className="detail-value">
                      {formatDate(selectedJob.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowDetailsModal(false);
                  handleEdit(selectedJob);
                }}
              >
                Edit Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && jobToDelete && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="modal-content small"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button
                className="close-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="confirm-icon">🗑️</div>
              <p className="confirm-message">
                Are you sure you want to delete{' '}
                <strong>"{jobToDelete.title}"</strong>?
              </p>
              <p className="confirm-warning">
                This action cannot be undone. All associated applications will
                also be deleted.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDeleteConfirm}>
                Delete Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
