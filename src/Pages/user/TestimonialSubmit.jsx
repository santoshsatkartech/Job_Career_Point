// ✅ TestimonialSubmit.jsx - Redesigned to match Home page style
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { testimonialService } from '../../api/testimonialService';
import '../../Styling/TestimonialSubmit.css'; 

export default function TestimonialSubmit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    message: '',
    rating: '5',
    designation: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    try {
      await testimonialService.submit({ ...form, rating: Number(form.rating) });
      setMsg({
        type: 'success',
        text: 'Testimonial submitted successfully! It will appear after admin approval.',
      });
      setForm({ message: '', rating: '5', designation: '', company: '' });

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/testimonials');
      }, 3000);
    } catch (err) {
      setMsg({
        type: 'error',
        text:
          err.response?.data?.message || 'Submission failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="testimonial-submit-page">
      {/* Hero Section */}
      <section className="submit-hero">
        <div className="container">
          <div className="submit-hero-content">
            <span className="hero-badge">Share Your Story</span>
            <h1 className="submit-hero-title">
              Share Your <span className="text-gradient">Experience</span>
            </h1>
            <p className="submit-hero-description">
              Your success story can inspire others. Tell us how Job Career
              Point helped you find the right opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="submit-form-section">
        <div className="container">
          <div className="form-container">
            {/* Message Alert */}
            {msg.text && (
              <div className={`message-alert ${msg.type}`}>
                <span className="message-icon">
                  {msg.type === 'success' ? '✓' : '⚠'}
                </span>
                <span>{msg.text}</span>
                {msg.type === 'success' && (
                  <span className="redirect-note">
                    Redirecting to testimonials...
                  </span>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="testimonial-form">
              {/* Rating Section */}
              <div className="form-section">
                <h3 className="form-section-title">
                  <span className="section-icon">⭐</span>
                  Your Rating
                </h3>
                <div className="rating-container">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <label
                      key={star}
                      className={`rating-option ${Number(form.rating) === star ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={star}
                        checked={Number(form.rating) === star}
                        onChange={handleChange}
                      />
                      <div className="stars">{'⭐'.repeat(star)}</div>
                      <span className="rating-label">
                        {star === 5 && 'Excellent'}
                        {star === 4 && 'Very Good'}
                        {star === 3 && 'Good'}
                        {star === 2 && 'Fair'}
                        {star === 1 && 'Poor'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Testimonial Message */}
              <div className="form-section">
                <h3 className="form-section-title">
                  <span className="section-icon">💬</span>
                  Your Experience
                </h3>
                <div className="form-group">
                  <label htmlFor="message">Your Testimonial *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Share your experience working with Job Career Point... How did we help you? What was the process like?"
                  />
                  <small className="field-hint">
                    Minimum 20 characters. Be specific about your experience.
                  </small>
                </div>
              </div>

              {/* Professional Details */}
              <div className="form-section">
                <h3 className="form-section-title">
                  <span className="section-icon">💼</span>
                  Professional Details (Optional)
                </h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="designation">Your Designation</label>
                    <input
                      id="designation"
                      name="designation"
                      type="text"
                      value={form.designation}
                      onChange={handleChange}
                      placeholder="e.g., Software Engineer, Marketing Manager"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company you're working at"
                    />
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              {(form.message || form.designation || form.company) && (
                <div className="preview-section">
                  <h3 className="preview-title">Preview</h3>
                  <div className="preview-card">
                    <div className="preview-header">
                      <div className="preview-avatar">
                        {form.designation
                          ? form.designation.charAt(0).toUpperCase()
                          : 'U'}
                      </div>
                      <div className="preview-info">
                        <h4>{form.designation || 'Your Designation'}</h4>
                        {form.company && <p>{form.company}</p>}
                      </div>
                    </div>
                    <div className="preview-rating">
                      {'⭐'.repeat(Number(form.rating))}
                    </div>
                    <p className="preview-message">
                      "{form.message || 'Your testimonial will appear here...'}"
                    </p>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-small"></span>
                      Submitting...
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
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Submit Testimonial
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => navigate('/testimonials')}
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Guidelines */}
            <div className="guidelines-card">
              <h4>📝 Guidelines for Testimonials</h4>
              <ul>
                <li>Be honest and authentic about your experience</li>
                <li>Mention specific ways Job Career Point helped you</li>
                <li>Avoid sharing personal contact information</li>
                <li>Keep your language professional and respectful</li>
                <li>Your testimonial will be reviewed before publishing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
