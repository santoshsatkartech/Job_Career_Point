// ✅ src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { applicationService } from '../../api/applicationService';
import { contactService } from '../../api/contactService';
import { jobService } from '../../api/jobService';
import { testimonialService } from '../../api/testimonialService';
import { userService } from '../../api/userService';
import '../../Styling/AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    users: 0,
    applications: 0,
    pendingT: 0,
    unreadC: 0,
    recentApplications: [],
    recentContacts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      jobService.adminGetAllJobs(),
      userService.getAllUsers(),
      applicationService.getAllApplications(),
      testimonialService.getAll(),
      contactService.getAll(),
    ])
      .then(([jobs, users, apps, testimonials, contacts]) => {
        setStats({
          jobs: jobs.length,
          users: users.filter((u) => u.role === 'USER').length,
          applications: apps.length,
          pendingT: testimonials.filter((t) => t.status === 'PENDING').length,
          unreadC: contacts.filter((c) => c.status === 'UNREAD').length,
          recentApplications: apps.slice(0, 5),
          recentContacts: contacts.slice(0, 3),
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: 'Total Jobs',
      value: stats.jobs,
      icon: '💼',
      link: '/admin/jobs',
      color: '#F97316',
      bgColor: 'rgba(249, 115, 22, 0.1)',
    },
    {
      label: 'Active Users',
      value: stats.users,
      icon: '👤',
      link: '/admin/users',
      color: '#3B82F6',
      bgColor: 'rgba(59, 130, 246, 0.1)',
    },
    {
      label: 'Applications',
      value: stats.applications,
      icon: '📝',
      link: '/admin/applications',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
    {
      label: 'Pending Reviews',
      value: stats.pendingT,
      icon: '⏳',
      link: '/admin/testimonials',
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
    },
    {
      label: 'Unread Messages',
      value: stats.unreadC,
      icon: '✉️',
      link: '/admin/contacts',
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
    },
  ];

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div>
              <span className="header-badge">Administration</span>
              <h1 className="header-title">
                Welcome back, <span className="text-gradient">Admin</span>
              </h1>
              <p className="header-description">
                Here's what's happening with your platform today
              </p>
            </div>
            <div className="header-date">
              <span className="date-badge">
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">

        {/* Statistics Grid */}
        <div className="statistics-section">
          <h2 className="section-title">Platform Overview</h2>
          <div className="stats-grid">
            {statCards.map((stat) => (
              <Link key={stat.label} to={stat.link} className="stat-card">
                <div
                  className="stat-icon"
                  style={{ background: stat.bgColor, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
                <div className="stat-trend">
                  <svg
                    className="trend-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity & Quick Links */}
        <div className="dashboard-grid">
          {/* Recent Applications */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Applications</h3>
              <Link to="/admin/applications" className="view-all">
                View All
                <svg
                  className="arrow-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <div className="card-content">
              {stats.recentApplications.length > 0 ? (
                stats.recentApplications.map((app, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-avatar">
                      {app.userName?.charAt(0) || 'U'}
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">{app.jobTitle}</div>
                      <div className="activity-meta">
                        <span>{app.userName}</span>
                        <span className="dot">•</span>
                        <span>
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`status-badge ${app.status?.toLowerCase()}`}
                    >
                      {app.status || 'PENDING'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="empty-message">No recent applications</p>
              )}
            </div>
          </div>

          {/* Recent Contacts */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Messages</h3>
              <Link to="/admin/contacts" className="view-all">
                View All
                <svg
                  className="arrow-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <div className="card-content">
              {stats.recentContacts.length > 0 ? (
                stats.recentContacts.map((contact, index) => (
                  <div key={index} className="activity-item">
                    <div
                      className="activity-avatar"
                      style={{ background: '#F97316' }}
                    >
                      {contact.name?.charAt(0) || '?'}
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">{contact.name}</div>
                      <div className="activity-meta">
                        <span>{contact.email}</span>
                        <span className="dot">•</span>
                        <span>
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {contact.status === 'UNREAD' && (
                      <span className="unread-badge">New</span>
                    )}
                  </div>
                ))
              ) : (
                <p className="empty-message">No recent messages</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
