// ✅ src/pages/admin/AdminApplicationsPage.jsx
import { useEffect, useState } from 'react';
import { applicationService } from '../../api/applicationService';
import '../../Styling/AdminApplicationsPage.css';

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [currentAppId, setCurrentAppId] = useState(null);

  useEffect(() => {
    applicationService
      .getAllApplications()
      .then((data) => {
        setApps(data);
        setFilteredApps(data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter applications based on search and status
  useEffect(() => {
    let filtered = apps;

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.applicantEmail
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    setFilteredApps(filtered);
  }, [searchTerm, statusFilter, apps]);

  const handleStatus = async (id, status, note = '') => {
    try {
      const updated = await applicationService.updateStatus(id, status, note);
      setApps(
        apps.map((a) =>
          a.id === id
            ? { ...a, status: updated.status, adminNote: updated.adminNote }
            : a
        )
      );
      setMsg({
        type: 'success',
        text: `✅ Application marked as ${status.toLowerCase()}.`,
      });
      setTimeout(() => setMsg({ type: '', text: '' }), 3000);
    } catch (error) {
      setMsg({
        type: 'error',
        text: '❌ Failed to update status. Please try again.',
      });
    }
  };

  const handleApprove = (id) => {
    handleStatus(id, 'APPROVED');
  };

  const handleRejectClick = (id) => {
    setCurrentAppId(id);
    setRejectionReason('');
    setShowRejectionModal(true);
  };

  const handleRejectConfirm = () => {
    handleStatus(currentAppId, 'REJECTED', rejectionReason);
    setShowRejectionModal(false);
    setRejectionReason('');
  };

  const viewDetails = (app) => {
    setSelectedApp(app);
    setShowDetailsModal(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PENDING':
        return 'status-pending';
      case 'APPROVED':
        return 'status-approved';
      case 'REJECTED':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  const stats = {
    total: apps.length,
    pending: apps.filter((a) => a.status === 'PENDING').length,
    approved: apps.filter((a) => a.status === 'APPROVED').length,
    rejected: apps.filter((a) => a.status === 'REJECTED').length,
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="admin-applications-page">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <div className="header-content">
            <div>
              <span className="header-badge">Applications Management</span>
              <h1 className="header-title">
                Job <span className="text-gradient">Applications</span>
              </h1>
              <p className="header-description">
                Review and manage all job applications from candidates
              </p>
            </div>
            <div className="header-stats">
              <div className="stat-badge">
                <span className="stat-label">Total</span>
                <span className="stat-value">{stats.total}</span>
              </div>
              <div className="stat-badge pending">
                <span className="stat-label">Pending</span>
                <span className="stat-value">{stats.pending}</span>
              </div>
              <div className="stat-badge approved">
                <span className="stat-label">Approved</span>
                <span className="stat-value">{stats.approved}</span>
              </div>
              <div className="stat-badge rejected">
                <span className="stat-label">Rejected</span>
                <span className="stat-value">{stats.rejected}</span>
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
                placeholder="Search by name, email, job title, or company..."
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
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            Showing <strong>{filteredApps.length}</strong> of{' '}
            <strong>{apps.length}</strong> applications
          </p>
        </div>

        {/* Applications Table */}
        <div className="table-container">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Job Details</th>
                <th>Applied On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <tr key={app.id} className="application-row">
                    <td>
                      <div className="applicant-info">
                        <div className="applicant-avatar">
                          {app.applicantName?.charAt(0) || '?'}
                        </div>
                        <div className="applicant-details">
                          <div className="applicant-name">
                            {app.applicantName}
                          </div>
                          <div className="applicant-email">
                            {app.applicantEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="job-info">
                        <div className="job-title">{app.jobTitle}</div>
                        <div className="job-company">{app.company}</div>
                      </div>
                    </td>
                    <td>
                      <div className="applied-date">
                        {new Date(app.appliedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${getStatusBadgeClass(app.status)}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon view"
                          onClick={() => viewDetails(app)}
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

                        {app.status === 'PENDING' && (
                          <>
                            <button
                              className="btn-icon approve"
                              onClick={() => handleApprove(app.id)}
                              title="Approve"
                            >
                              <svg viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <button
                              className="btn-icon reject"
                              onClick={() => handleRejectClick(app.id)}
                              title="Reject"
                            >
                              <svg viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">
                    <div className="empty-icon">📋</div>
                    <h3>No Applications Found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {showDetailsModal && selectedApp && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetailsModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Application Details</h2>
              <button
                className="close-btn"
                onClick={() => setShowDetailsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="details-section">
                <h3>Applicant Information</h3>
                <div className="details-grid">
                  <div className="detail-row">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">
                      {selectedApp.applicantName}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">
                      {selectedApp.applicantEmail}
                    </span>
                  </div>
                  {selectedApp.applicantPhone && (
                    <div className="detail-row">
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value">
                        {selectedApp.applicantPhone}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="details-section">
                <h3>Job Information</h3>
                <div className="details-grid">
                  <div className="detail-row">
                    <span className="detail-label">Position:</span>
                    <span className="detail-value">{selectedApp.jobTitle}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Company:</span>
                    <span className="detail-value">{selectedApp.company}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Applied On:</span>
                    <span className="detail-value">
                      {new Date(selectedApp.appliedAt).toLocaleDateString(
                        'en-IN',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {selectedApp.coverLetter && (
                <div className="details-section">
                  <h3>Cover Letter</h3>
                  <div className="cover-letter">{selectedApp.coverLetter}</div>
                </div>
              )}

              {selectedApp.adminNote && (
                <div className="details-section">
                  <h3>Admin Note</h3>
                  <div className="admin-note">{selectedApp.adminNote}</div>
                </div>
              )}

              <div className="details-section">
                <h3>Status</h3>
                <div className="status-display">
                  <span
                    className={`status-badge ${getStatusBadgeClass(selectedApp.status)}`}
                  >
                    {selectedApp.status}
                  </span>
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
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {showRejectionModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowRejectionModal(false)}
        >
          <div
            className="modal-content small"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Rejection Reason</h2>
              <button
                className="close-btn"
                onClick={() => setShowRejectionModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-description">
                Please provide a reason for rejection (optional):
              </p>
              <textarea
                className="rejection-input"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
                rows="4"
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowRejectionModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary reject"
                onClick={handleRejectConfirm}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
