import { useEffect, useState } from 'react';
import { applicationService } from '../../api/applicationService';
import { userService } from '../../api/userService';
import '../../Styling/ProfilePage.css';

const STATUS_STYLE = {
  PENDING: { background: '#fff3cd', color: '#856404', label: 'Pending' },
  APPROVED: { background: '#d1e7dd', color: '#0f5132', label: 'Approved' },
  REJECTED: { background: '#f8d7da', color: '#842029', label: 'Rejected' },
  REVIEWING: { background: '#cfe2ff', color: '#084298', label: 'Reviewing' },
  SHORTLISTED: {
    background: '#d1e7dd',
    color: '#0f5132',
    label: 'Shortlisted',
  },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'applications'

  useEffect(() => {
    // Load profile data
    userService
      .getProfile()
      .then((data) => {
        setProfile(data);
        setForm(data);
      })
      .catch(() => {
        setMsg({ type: 'error', text: 'Failed to load profile' });
      })
      .finally(() => setLoading(false));

    // Load applications data
    applicationService
      .getMyApplications()
      .then(setApplications)
      .catch(() => {
        // Silent fail for applications
      })
      .finally(() => setApplicationsLoading(false));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await userService.updateProfile(form);
      setProfile(updated);
      setEditing(false);
      setMsg({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMsg({ type: '', text: '' }), 3000);
    } catch {
      setMsg({ type: 'error', text: 'Update failed. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const getApplicationStats = () => {
    const stats = {
      total: applications.length,
      pending: applications.filter((app) => app.status === 'PENDING').length,
      approved: applications.filter(
        (app) => app.status === 'APPROVED' || app.status === 'SHORTLISTED'
      ).length,
      rejected: applications.filter((app) => app.status === 'REJECTED').length,
    };
    return stats;
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  const stats = getApplicationStats();

  return (
    <div className="profile-page">
      {/* Hero Section */}
      <section className="profile-hero">
        <div className="container">
          <div className="profile-hero-content">
            <span className="hero-badge">My Account</span>
            <h1 className="profile-hero-title">
              Welcome back,{' '}
              <span className="text-gradient">
                {profile?.firstName} {profile?.lastName}
              </span>
            </h1>
            <p className="profile-hero-description">
              Manage your profile and track your job applications
            </p>
          </div>
        </div>
      </section>

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

        {/* Tab Navigation */}
        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <svg className="tab-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            Profile Information
          </button>
          <button
            className={`tab-button ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <svg className="tab-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            My Applications ({stats.total})
          </button>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {activeTab === 'profile' ? (
            /* Profile Tab Content */
            !editing ? (
              /* View Mode */
              <div className="profile-view-card">
                <div className="profile-header">
                  <div className="profile-avatar">
                    {profile?.firstName?.[0]}
                    {profile?.lastName?.[0]}
                  </div>
                  <div className="profile-title">
                    <h2>
                      {profile?.firstName} {profile?.lastName}
                    </h2>
                    <p>{profile?.email}</p>
                  </div>
                  <button
                    className="btn btn-primary edit-btn"
                    onClick={() => setEditing(true)}
                  >
                    <svg
                      className="btn-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Profile
                  </button>
                </div>

                <div className="profile-stats">
                  <div
                    className="stat-item"
                    onClick={() => setActiveTab('applications')}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="stat-value">{stats.total}</span>
                    <span className="stat-label">Total Applications</span>
                  </div>
                  <div
                    className="stat-item"
                    onClick={() => setActiveTab('applications')}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="stat-value">{stats.pending}</span>
                    <span className="stat-label">Pending</span>
                  </div>
                  <div
                    className="stat-item"
                    onClick={() => setActiveTab('applications')}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="stat-value">{stats.approved}</span>
                    <span className="stat-label">Approved</span>
                  </div>
                </div>

                <div className="profile-details-grid">
                  {/* Personal Information */}
                  <div className="details-section">
                    <h3 className="section-subtitle">
                      <span className="section-icon">👤</span>
                      Personal Information
                    </h3>
                    <div className="details-list">
                      <div className="detail-row">
                        <span className="detail-label">Full Name</span>
                        <span className="detail-value">
                          {profile?.firstName} {profile?.lastName}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Email Address</span>
                        <span className="detail-value">{profile?.email}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Phone Number</span>
                        <span className="detail-value">
                          {profile?.phone || 'Not provided'}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Location</span>
                        <span className="detail-value">
                          {profile?.city || 'Not provided'}
                          {profile?.city && profile?.state && ', '}
                          {profile?.state || ''}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Address</span>
                        <span className="detail-value">
                          {profile?.address || 'Not provided'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="details-section">
                    <h3 className="section-subtitle">
                      <span className="section-icon">💼</span>
                      Professional Information
                    </h3>
                    <div className="details-list">
                      <div className="detail-row">
                        <span className="detail-label">Qualification</span>
                        <span className="detail-value">
                          {profile?.qualification || 'Not provided'}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Experience</span>
                        <span className="detail-value">
                          {profile?.experience || 'Not provided'}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Skills</span>
                        <span className="detail-value skills-value">
                          {profile?.skills
                            ? profile.skills.split(',').map((skill, index) => (
                                <span key={index} className="skill-tag">
                                  {skill.trim()}
                                </span>
                              ))
                            : 'Not provided'}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Resume</span>
                        <span className="detail-value">
                          {profile?.resumeUrl ? (
                            <a
                              href={profile.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="resume-link"
                            >
                              View Resume
                              <svg
                                className="link-icon"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </a>
                          ) : (
                            'Not uploaded'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Edit Mode */
              <div className="profile-edit-card">
                <div className="edit-header">
                  <h2>Edit Profile</h2>
                  <p>Update your personal and professional information</p>
                </div>

                <form onSubmit={handleSave} className="edit-form">
                  <div className="form-grid">
                    {/* Personal Information Section */}
                    <div className="form-section">
                      <h3 className="form-section-title">
                        Personal Information
                      </h3>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name *</label>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={form.firstName || ''}
                            onChange={handleChange}
                            required
                            placeholder="Enter your first name"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="lastName">Last Name *</label>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={form.lastName || ''}
                            onChange={handleChange}
                            required
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="phone">Phone Number</label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone || ''}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="address">Address</label>
                          <input
                            id="address"
                            name="address"
                            type="text"
                            value={form.address || ''}
                            onChange={handleChange}
                            placeholder="Enter your address"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="city">City</label>
                          <input
                            id="city"
                            name="city"
                            type="text"
                            value={form.city || ''}
                            onChange={handleChange}
                            placeholder="Enter your city"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="state">State</label>
                          <input
                            id="state"
                            name="state"
                            type="text"
                            value={form.state || ''}
                            onChange={handleChange}
                            placeholder="Enter your state"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Professional Information Section */}
                    <div className="form-section">
                      <h3 className="form-section-title">
                        Professional Information
                      </h3>

                      <div className="form-group">
                        <label htmlFor="qualification">
                          Highest Qualification
                        </label>
                        <input
                          id="qualification"
                          name="qualification"
                          type="text"
                          value={form.qualification || ''}
                          onChange={handleChange}
                          placeholder="e.g., B.Tech, MBA, B.Sc"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="experience">Years of Experience</label>
                        <input
                          id="experience"
                          name="experience"
                          type="text"
                          value={form.experience || ''}
                          onChange={handleChange}
                          placeholder="e.g., 2 years, Fresher"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="skills">Skills</label>
                        <textarea
                          id="skills"
                          name="skills"
                          value={form.skills || ''}
                          onChange={handleChange}
                          placeholder="Enter your skills (comma separated)"
                          rows="3"
                        />
                        <small className="field-hint">
                          Separate skills with commas (e.g., JavaScript, React,
                          Python)
                        </small>
                      </div>

                      <div className="form-group">
                        <label htmlFor="resumeUrl">
                          Resume URL (Google Drive/Cloud)
                        </label>
                        <input
                          id="resumeUrl"
                          name="resumeUrl"
                          type="url"
                          value={form.resumeUrl || ''}
                          onChange={handleChange}
                          placeholder="Link to your online resume"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-small"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg
                            className="btn-icon"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Save Changes
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => {
                        setEditing(false);
                        setForm(profile);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )
          ) : (
            /* Applications Tab Content */
            <div className="applications-card">
              <div className="applications-header">
                <h2>My Job Applications</h2>
                <p>Track the status of your job applications</p>
              </div>

              {applicationsLoading ? (
                <div className="loading-state small">
                  <div className="spinner-small"></div>
                  <p>Loading applications...</p>
                </div>
              ) : applications.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📋</div>
                  <h3>No Applications Yet</h3>
                  <p>
                    You haven't applied for any jobs yet. Start exploring
                    opportunities!
                  </p>
                  <a href="/jobs" className="btn btn-primary">
                    Browse Jobs
                    <svg
                      className="btn-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              ) : (
                <>
                  {/* Application Stats Summary */}
                  <div className="application-summary">
                    <div className="summary-item">
                      <span className="summary-value">{stats.total}</span>
                      <span className="summary-label">Total</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-value pending">
                        {stats.pending}
                      </span>
                      <span className="summary-label">Pending</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-value approved">
                        {stats.approved}
                      </span>
                      <span className="summary-label">Approved</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-value rejected">
                        {stats.rejected}
                      </span>
                      <span className="summary-label">Rejected</span>
                    </div>
                  </div>

                  {/* Applications Grid */}
                  <div className="applications-grid">
                    {applications.map((app) => (
                      <div key={app.id} className="application-card">
                        <div className="application-header">
                          <div>
                            <h3 className="application-title">
                              {app.jobTitle}
                            </h3>
                            <p className="application-company">
                              {app.company} • {app.location}
                            </p>
                          </div>
                          <span
                            className="status-badge"
                            style={{
                              background:
                                STATUS_STYLE[app.status]?.background ||
                                '#e2e3e5',
                              color:
                                STATUS_STYLE[app.status]?.color || '#383d41',
                            }}
                          >
                            {STATUS_STYLE[app.status]?.label || app.status}
                          </span>
                        </div>

                        <div className="application-details">
                          <div className="detail-item">
                            <span className="detail-label">Applied On:</span>
                            <span className="detail-value">
                              {new Date(app.appliedAt).toLocaleDateString(
                                'en-IN',
                                {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                }
                              )}
                            </span>
                          </div>

                          {app.adminNote && (
                            <div className="admin-note">
                              <span className="note-label">Admin Note:</span>
                              <p className="note-text">{app.adminNote}</p>
                            </div>
                          )}

                          {app.interviewDate && (
                            <div className="interview-info">
                              <span className="interview-badge">
                                📅 Interview:{' '}
                                {new Date(app.interviewDate).toLocaleDateString(
                                  'en-IN'
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
