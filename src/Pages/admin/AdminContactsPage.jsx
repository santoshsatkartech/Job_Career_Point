import { useEffect, useState } from 'react';
import { contactService } from '../../api/contactService';
import '../../Styling/AdminContactsPage.css'; 

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    contactService
      .getAll()
      .then((data) => {
        setContacts(data);
        setFilteredContacts(data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter contacts based on search and status
  useEffect(() => {
    let filtered = contacts;

    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((contact) => contact.status === statusFilter);
    }

    setFilteredContacts(filtered);
  }, [searchTerm, statusFilter, contacts]);

  const handleView = async (id) => {
    try {
      const detail = await contactService.getById(id);
      setSelected(detail);
      setContacts(
        contacts.map((c) => (c.id === id ? { ...c, status: detail.status } : c))
      );

      // If it's UNREAD, mark as READ when viewed
      if (detail.status === 'UNREAD') {
        setMsg({ type: 'info', text: 'Message marked as read' });
        setTimeout(() => setMsg({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setMsg({ type: 'error', text: 'Failed to load message details' });
    }
  };

  const handleReplyClick = (contact) => {
    setReplyingTo(contact);
    setReply('');
    setShowReplyModal(true);
  };

  const handleReplySubmit = async () => {
    if (!reply.trim()) {
      setMsg({ type: 'error', text: 'Please enter a reply message' });
      return;
    }

    try {
      const updated = await contactService.reply(replyingTo.id, reply);
      setSelected(updated);
      setContacts(
        contacts.map((c) =>
          c.id === updated.id ? { ...c, status: 'REPLIED' } : c
        )
      );
      setMsg({ type: 'success', text: '✅ Reply sent successfully!' });
      setShowReplyModal(false);
      setReply('');
      setTimeout(() => setMsg({ type: '', text: '' }), 3000);
    } catch (error) {
      setMsg({
        type: 'error',
        text: 'Failed to send reply. Please try again.',
      });
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'UNREAD':
        return 'status-unread';
      case 'READ':
        return 'status-read';
      case 'REPLIED':
        return 'status-replied';
      default:
        return 'status-unread';
    }
  };

  const stats = {
    total: contacts.length,
    unread: contacts.filter((c) => c.status === 'UNREAD').length,
    read: contacts.filter((c) => c.status === 'READ').length,
    replied: contacts.filter((c) => c.status === 'REPLIED').length,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading contact enquiries...</p>
      </div>
    );
  }

  return (
    <div className="admin-contacts-page">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <div className="header-content">
            <div>
              <span className="header-badge">Contact Management</span>
              <h1 className="header-title">
                Contact <span className="text-gradient">Enquiries</span>
              </h1>
              <p className="header-description">
                Manage and respond to user messages and inquiries
              </p>
            </div>
            <div className="header-stats">
              <div className="stat-badge">
                <span className="stat-label">Total</span>
                <span className="stat-value">{stats.total}</span>
              </div>
              <div className="stat-badge unread">
                <span className="stat-label">Unread</span>
                <span className="stat-value">{stats.unread}</span>
              </div>
              <div className="stat-badge read">
                <span className="stat-label">Read</span>
                <span className="stat-value">{stats.read}</span>
              </div>
              <div className="stat-badge replied">
                <span className="stat-label">Replied</span>
                <span className="stat-value">{stats.replied}</span>
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
              {msg.type === 'success' ? '✓' : msg.type === 'info' ? 'ℹ️' : '⚠'}
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
                placeholder="Search by name, email, subject, or message..."
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
              <option value="UNREAD">Unread</option>
              <option value="READ">Read</option>
              <option value="REPLIED">Replied</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            Showing <strong>{filteredContacts.length}</strong> of{' '}
            <strong>{contacts.length}</strong> enquiries
          </p>
        </div>

        {/* Main Content */}
        <div className="contacts-grid">
          {/* Contacts List */}
          <div className="contacts-list">
            <div className="list-header">
              <h3>All Messages</h3>
            </div>
            <div className="list-content">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`contact-item ${selected?.id === contact.id ? 'selected' : ''}`}
                    onClick={() => handleView(contact.id)}
                  >
                    <div className="contact-item-header">
                      <div className="contact-avatar">
                        {contact.name?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div className="contact-info">
                        <div className="contact-name">{contact.name}</div>
                        <div className="contact-subject">{contact.subject}</div>
                      </div>
                      <span
                        className={`status-badge ${getStatusBadgeClass(contact.status)}`}
                      >
                        {contact.status}
                      </span>
                    </div>
                    <div className="contact-meta">
                      <span className="contact-email">{contact.email}</span>
                      <span className="contact-date">
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-list">
                  <div className="empty-icon">📭</div>
                  <p>No messages found</p>
                </div>
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="message-detail">
            {selected ? (
              <div className="detail-card">
                <div className="detail-header">
                  <h3>Message Details</h3>
                  <span
                    className={`status-badge ${getStatusBadgeClass(selected.status)}`}
                  >
                    {selected.status}
                  </span>
                </div>

                <div className="detail-content">
                  <div className="detail-section">
                    <h4>Contact Information</h4>
                    <div className="info-grid">
                      <div className="info-row">
                        <span className="info-label">Name:</span>
                        <span className="info-value">{selected.name}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{selected.email}</span>
                      </div>
                      {selected.phone && (
                        <div className="info-row">
                          <span className="info-label">Phone:</span>
                          <span className="info-value">{selected.phone}</span>
                        </div>
                      )}
                      <div className="info-row">
                        <span className="info-label">Received:</span>
                        <span className="info-value">
                          {new Date(selected.createdAt).toLocaleString(
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
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Subject</h4>
                    <div className="subject-box">{selected.subject}</div>
                  </div>

                  <div className="detail-section">
                    <h4>Message</h4>
                    <div className="message-box">{selected.message}</div>
                  </div>

                  {selected.adminReply && (
                    <div className="detail-section">
                      <h4>Your Reply</h4>
                      <div className="reply-box">
                        <div className="reply-header">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            Sent on{' '}
                            {new Date(selected.updatedAt).toLocaleString()}
                          </span>
                        </div>
                        <p>{selected.adminReply}</p>
                      </div>
                    </div>
                  )}

                  {selected.status !== 'REPLIED' && (
                    <div className="detail-section">
                      <button
                        className="btn btn-primary reply-button"
                        onClick={() => handleReplyClick(selected)}
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Reply to this message
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="empty-detail">
                <div className="empty-icon">💬</div>
                <h3>No Message Selected</h3>
                <p>Click on a message from the list to view its details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && replyingTo && (
        <div className="modal-overlay" onClick={() => setShowReplyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Reply to {replyingTo.name}</h2>
              <button
                className="close-btn"
                onClick={() => setShowReplyModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="reply-preview">
                <div className="preview-subject">
                  <strong>Subject:</strong> {replyingTo.subject}
                </div>
                <div className="preview-message">
                  <strong>Original Message:</strong>
                  <p>{replyingTo.message}</p>
                </div>
              </div>

              <div className="reply-input-section">
                <label htmlFor="reply">Your Reply:</label>
                <textarea
                  id="reply"
                  className="reply-textarea"
                  rows="6"
                  placeholder="Type your reply here..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowReplyModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleReplySubmit}
                disabled={!reply.trim()}
              >
                Send Reply
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
