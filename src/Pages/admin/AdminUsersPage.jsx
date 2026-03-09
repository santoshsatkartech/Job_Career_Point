import { useEffect, useState } from 'react';
import { userService } from '../../api/userService';
import '../../Styling/AdminUsersPage.css';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToToggle, setUserToToggle] = useState(null);

  useEffect(() => {
    userService
      .getAllUsers()
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data.filter((u) => u.role === 'USER'));
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter users based on search and status
  useEffect(() => {
    let filtered = users.filter((u) => u.role === 'USER');

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.city?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, statusFilter, users]);

  const handleToggleClick = (user) => {
    setUserToToggle(user);
    setShowConfirmModal(true);
  };

  const handleToggleConfirm = async () => {
    try {
      const updated = await userService.toggleUserStatus(userToToggle.id);
      setUsers(
        users.map((u) =>
          u.id === userToToggle.id ? { ...u, status: updated.status } : u
        )
      );
      setMsg({
        type: 'success',
        text: `✅ User ${updated.status === 'BLOCKED' ? 'blocked' : 'activated'} successfully.`,
      });

      // Update selected user if it's the one being modified
      if (selectedUser?.id === userToToggle.id) {
        setSelectedUser({ ...selectedUser, status: updated.status });
      }

      setTimeout(() => setMsg({ type: '', text: '' }), 3000);
    } catch (error) {
      setMsg({ type: 'error', text: '❌ Failed to update user status.' });
    } finally {
      setShowConfirmModal(false);
      setUserToToggle(null);
    }
  };

  const viewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const getStatusBadgeClass = (status) => {
    return status === 'ACTIVE' ? 'status-active' : 'status-blocked';
  };

  const stats = {
    total: users.filter((u) => u.role === 'USER').length,
    active: users.filter((u) => u.role === 'USER' && u.status === 'ACTIVE')
      .length,
    blocked: users.filter((u) => u.role === 'USER' && u.status === 'BLOCKED')
      .length,
  };

  const formatDate = (dateString) => {
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
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="admin-users-page">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <div className="header-content">
            <div>
              <span className="header-badge">User Management</span>
              <h1 className="header-title">
                Manage <span className="text-gradient">Users</span>
              </h1>
              <p className="header-description">
                View and manage registered users and their account status
              </p>
            </div>
            <div className="header-stats">
              <div className="stat-badge">
                <span className="stat-label">Total</span>
                <span className="stat-value">{stats.total}</span>
              </div>
              <div className="stat-badge active">
                <span className="stat-label">Active</span>
                <span className="stat-value">{stats.active}</span>
              </div>
              <div className="stat-badge blocked">
                <span className="stat-label">Blocked</span>
                <span className="stat-value">{stats.blocked}</span>
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
                placeholder="Search by name, email, phone, or city..."
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
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            Showing <strong>{filteredUsers.length}</strong> of{' '}
            <strong>{stats.total}</strong> users
          </p>
        </div>

        {/* Users Table */}
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="user-row">
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.firstName?.charAt(0)}
                          {user.lastName?.charAt(0)}
                        </div>
                        <div className="user-details">
                          <div className="user-name">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        {user.phone ? (
                          <>
                            <span className="contact-item">
                              <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                              {user.phone}
                            </span>
                          </>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </div>
                    </td>
                    <td>
                      {user.city || user.state ? (
                        <div className="location-info">
                          {user.city && <span>{user.city}</span>}
                          {user.city && user.state && <span>, </span>}
                          {user.state && <span>{user.state}</span>}
                          {!user.city && !user.state && (
                            <span className="text-muted">—</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${getStatusBadgeClass(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="joined-date">
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon view"
                          onClick={() => viewDetails(user)}
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
                          className={`btn-icon ${user.status === 'ACTIVE' ? 'block' : 'activate'}`}
                          onClick={() => handleToggleClick(user)}
                          title={
                            user.status === 'ACTIVE'
                              ? 'Block User'
                              : 'Activate User'
                          }
                        >
                          {user.status === 'ACTIVE' ? (
                            <svg viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-state">
                    <div className="empty-icon">👥</div>
                    <h3>No Users Found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {showDetailsModal && selectedUser && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetailsModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>User Details</h2>
              <button
                className="close-btn"
                onClick={() => setShowDetailsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-profile-header">
                <div className="profile-avatar">
                  {selectedUser.firstName?.charAt(0)}
                  {selectedUser.lastName?.charAt(0)}
                </div>
                <div className="profile-title">
                  <h3>
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h3>
                  <span
                    className={`status-badge ${getStatusBadgeClass(selectedUser.status)}`}
                  >
                    {selectedUser.status}
                  </span>
                </div>
              </div>

              <div className="details-section">
                <h3>Personal Information</h3>
                <div className="details-grid">
                  <div className="detail-row">
                    <span className="detail-label">Full Name:</span>
                    <span className="detail-value">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedUser.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">
                      {selectedUser.phone || 'Not provided'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Location Information</h3>
                <div className="details-grid">
                  <div className="detail-row">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">
                      {selectedUser.address || 'Not provided'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">City:</span>
                    <span className="detail-value">
                      {selectedUser.city || 'Not provided'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">State:</span>
                    <span className="detail-value">
                      {selectedUser.state || 'Not provided'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Professional Information</h3>
                <div className="details-grid">
                  <div className="detail-row">
                    <span className="detail-label">Qualification:</span>
                    <span className="detail-value">
                      {selectedUser.qualification || 'Not provided'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">
                      {selectedUser.experience || 'Not provided'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Skills:</span>
                    <span className="detail-value skills-value">
                      {selectedUser.skills
                        ? selectedUser.skills.split(',').map((skill, index) => (
                            <span key={index} className="skill-tag">
                              {skill.trim()}
                            </span>
                          ))
                        : 'Not provided'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Account Information</h3>
                <div className="details-grid">
                  <div className="detail-row">
                    <span className="detail-label">User ID:</span>
                    <span className="detail-value">{selectedUser.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Role:</span>
                    <span className="detail-value">{selectedUser.role}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Joined:</span>
                    <span className="detail-value">
                      {new Date(selectedUser.createdAt).toLocaleString(
                        'en-IN',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </span>
                  </div>
                  {selectedUser.resumeUrl && (
                    <div className="detail-row">
                      <span className="detail-label">Resume:</span>
                      <span className="detail-value">
                        <a
                          href={selectedUser.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resume-link"
                        >
                          View Resume
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </span>
                    </div>
                  )}
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
                className={`btn ${selectedUser.status === 'ACTIVE' ? 'btn-danger' : 'btn-success'}`}
                onClick={() => {
                  setShowDetailsModal(false);
                  handleToggleClick(selectedUser);
                }}
              >
                {selectedUser.status === 'ACTIVE'
                  ? 'Block User'
                  : 'Activate User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && userToToggle && (
        <div
          className="modal-overlay"
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className="modal-content small"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Confirm Action</h2>
              <button
                className="close-btn"
                onClick={() => setShowConfirmModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="confirm-icon">
                {userToToggle.status === 'ACTIVE' ? '🔒' : '🔓'}
              </div>
              <p className="confirm-message">
                Are you sure you want to{' '}
                <strong>
                  {userToToggle.status === 'ACTIVE' ? 'block' : 'activate'}
                </strong>{' '}
                user{' '}
                <strong>
                  {userToToggle.firstName} {userToToggle.lastName}
                </strong>
                ?
              </p>
              {userToToggle.status === 'ACTIVE' && (
                <p className="confirm-warning">
                  Blocked users will not be able to log in or apply for jobs.
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className={`btn ${userToToggle.status === 'ACTIVE' ? 'btn-danger' : 'btn-success'}`}
                onClick={handleToggleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
