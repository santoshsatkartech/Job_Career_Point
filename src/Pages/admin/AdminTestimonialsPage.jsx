
import { useEffect, useState } from 'react';
import { testimonialService } from '../../api/testimonialService';
import '../../Styling/AdminTestimonialsPage.css';

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    testimonialService
      .getAll()
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter testimonials based on search and status
  useEffect(() => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    setFilteredItems(filtered);
  }, [searchTerm, statusFilter, items]);

  const handleStatus = async (id, status) => {
    try {
      const updated = await testimonialService.updateStatus(id, status);
      setItems(
        items.map((t) => (t.id === id ? { ...t, status: updated.status } : t))
      );
      setMsg({
        type: 'success',
        text: `✅ Testimonial ${status.toLowerCase()} successfully!`,
      });

      // Update selected testimonial if it's the one being modified
      if (selectedTestimonial?.id === id) {
        setSelectedTestimonial({
          ...selectedTestimonial,
          status: updated.status,
        });
      }

      setTimeout(() => setMsg({ type: '', text: '' }), 3000);
    } catch (error) {
      setMsg({
        type: 'error',
        text: '❌ Failed to update status. Please try again.',
      });
    }
  };

  const viewDetails = (testimonial) => {
    setSelectedTestimonial(testimonial);
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
    total: items.length,
    pending: items.filter((t) => t.status === 'PENDING').length,
    approved: items.filter((t) => t.status === 'APPROVED').length,
    rejected: items.filter((t) => t.status === 'REJECTED').length,
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
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
        <p>Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div className="admin-testimonials-page">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <div className="header-content">
            <div>
              <span className="header-badge">Testimonials Management</span>
              <h1 className="header-title">
                Manage <span className="text-gradient">Testimonials</span>
              </h1>
              <p className="header-description">
                Review and manage user testimonials and success stories
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
                placeholder="Search by name, message, designation, or company..."
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
            Showing <strong>{filteredItems.length}</strong> of{' '}
            <strong>{items.length}</strong> testimonials
          </p>
        </div>

        {/* Testimonials Grid */}
        {filteredItems.length > 0 ? (
          <div className="testimonials-grid">
            {filteredItems.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="card-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      {testimonial.userName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{testimonial.userName}</div>
                      {testimonial.designation && (
                        <div className="user-designation">
                          {testimonial.designation}
                          {testimonial.company && ` at ${testimonial.company}`}
                        </div>
                      )}
                    </div>
                  </div>
                  <span
                    className={`status-badge ${getStatusBadgeClass(testimonial.status)}`}
                  >
                    {testimonial.status}
                  </span>
                </div>

                <div className="card-rating">
                  {'⭐'.repeat(testimonial.rating || 0)}
                  <span className="rating-text">
                    ({testimonial.rating || 0}/5)
                  </span>
                </div>

                <div className="card-message">
                  "
                  {testimonial.message.length > 150
                    ? `${testimonial.message.substring(0, 150)}...`
                    : testimonial.message}
                  "
                </div>

                <div className="card-footer">
                  <div className="testimonial-meta">
                    {testimonial.createdAt && (
                      <span className="testimonial-date">
                        {formatDate(testimonial.createdAt)}
                      </span>
                    )}
                  </div>

                  <div className="card-actions">
                    <button
                      className="btn-icon view"
                      onClick={() => viewDetails(testimonial)}
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

                    {testimonial.status === 'PENDING' && (
                      <>
                        <button
                          className="btn-icon approve"
                          onClick={() =>
                            handleStatus(testimonial.id, 'APPROVED')
                          }
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
                          onClick={() =>
                            handleStatus(testimonial.id, 'REJECTED')
                          }
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3>No Testimonials Found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Testimonial Details Modal */}
      {showDetailsModal && selectedTestimonial && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetailsModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Testimonial Details</h2>
              <button
                className="close-btn"
                onClick={() => setShowDetailsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="details-section">
                <h3>User Information</h3>
                <div className="details-grid">
                  <div className="detail-row">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">
                      {selectedTestimonial.userName}
                    </span>
                  </div>
                  {selectedTestimonial.designation && (
                    <div className="detail-row">
                      <span className="detail-label">Designation:</span>
                      <span className="detail-value">
                        {selectedTestimonial.designation}
                      </span>
                    </div>
                  )}
                  {selectedTestimonial.company && (
                    <div className="detail-row">
                      <span className="detail-label">Company:</span>
                      <span className="detail-value">
                        {selectedTestimonial.company}
                      </span>
                    </div>
                  )}
                  {selectedTestimonial.createdAt && (
                    <div className="detail-row">
                      <span className="detail-label">Submitted:</span>
                      <span className="detail-value">
                        {new Date(selectedTestimonial.createdAt).toLocaleString(
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
                  )}
                </div>
              </div>

              <div className="details-section">
                <h3>Rating</h3>
                <div className="rating-display">
                  <div className="stars">
                    {'⭐'.repeat(selectedTestimonial.rating || 0)}
                  </div>
                  <span className="rating-number">
                    {selectedTestimonial.rating}/5
                  </span>
                </div>
              </div>

              <div className="details-section">
                <h3>Testimonial Message</h3>
                <div className="message-content">
                  "{selectedTestimonial.message}"
                </div>
              </div>

              <div className="details-section">
                <h3>Status</h3>
                <div className="status-display">
                  <span
                    className={`status-badge ${getStatusBadgeClass(selectedTestimonial.status)}`}
                  >
                    {selectedTestimonial.status}
                  </span>
                </div>
              </div>

              {selectedTestimonial.status === 'PENDING' && (
                <div className="details-section actions-section">
                  <h3>Actions</h3>
                  <div className="action-buttons">
                    <button
                      className="btn btn-primary approve"
                      onClick={() => {
                        handleStatus(selectedTestimonial.id, 'APPROVED');
                        setShowDetailsModal(false);
                      }}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Approve
                    </button>
                    <button
                      className="btn btn-outline reject"
                      onClick={() => {
                        handleStatus(selectedTestimonial.id, 'REJECTED');
                        setShowDetailsModal(false);
                      }}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Reject
                    </button>
                  </div>
                </div>
              )}
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
    </div>
  );
}
