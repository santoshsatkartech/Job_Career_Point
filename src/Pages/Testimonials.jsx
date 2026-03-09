// ✅ Testimonials.jsx - Redesigned to match Home page style
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { testimonialService } from '../api/testimonialService';
import { useAuth } from '../context/AuthContext';
import '../Styling/Testimonials.css'; // We'll create this CSS file

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    testimonialService
      .getApproved()
      .then(setTestimonials)
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="testimonials-page">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading success stories...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="testimonials-page">
      {/* Hero Section */}
      <section className="testimonials-hero">
        <div className="container">
          <div className="testimonials-hero-content">
            <span className="hero-badge">Success Stories</span>
            <h1 className="testimonials-hero-title">
              What Our <span className="text-gradient">Candidates</span> Say
            </h1>
            <p className="testimonials-hero-description">
              Real experiences from real job seekers placed by Job Career Point.
              Join thousands of professionals who found their dream jobs through
              us.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta">
              {isLoggedIn() ? (
                <Link to="/submit-testimonial" className="btn btn-primary">
                  Share Your Experience
                  <svg
                    className="btn-icon-og"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              ) : (
                <Link to="/login" className="btn btn-outline">
                  Login to Share Your Experience
                  <svg
                    className="btn-icon-og"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="testimonials-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{testimonials.length}+</span>
              <span className="stat-label">Success Stories</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">4.8/5</span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">100+</span>
              <span className="stat-label">Partner Companies</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">14 Years</span>
              <span className="stat-label">Of Excellence</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="testimonials-grid-section">
        <div className="container">
          {testimonials.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💬</div>
              <h3>No Testimonials Yet</h3>
              <p>
                Be the first to share your success story and inspire others!
              </p>
              {isLoggedIn() ? (
                <Link to="/submit-testimonial" className="btn btn-primary">
                  Share Your Experience
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Login to Share
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Featured Testimonial (if any) */}
              {/* {testimonials[0] && (
                <div className="featured-testimonial">
                  <div className="featured-content">
                    <span className="featured-badge">Featured Story</span>
                    <div className="featured-quote">"</div>
                    <p className="featured-message">
                      {testimonials[0].message}
                    </p>
                    <div className="featured-author">
                      <div className="featured-avatar">
                        {testimonials[0].profileImageUrl ? (
                          <img
                            src={testimonials[0].profileImageUrl}
                            alt={testimonials[0].userName}
                          />
                        ) : (
                          <span>
                            {testimonials[0].userName?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="featured-info">
                        <h4>{testimonials[0].userName}</h4>
                        <p>
                          {testimonials[0].designation}
                          {testimonials[0].company
                            ? ` at ${testimonials[0].company}`
                            : ''}
                        </p>
                        <div className="featured-rating">
                          {'⭐'.repeat(testimonials[0].rating || 5)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}

              {/* Testimonials Grid */}
              <div className="testimonials-grid">
                {testimonials.slice(1).map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-card">
                    <div className="testimonial-card-header">
                      <div className="testimonial-avatar">
                        {testimonial.profileImageUrl ? (
                          <img
                            src={testimonial.profileImageUrl}
                            alt={testimonial.userName}
                          />
                        ) : (
                          <span>
                            {testimonial.userName?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="testimonial-user">
                        <h4>{testimonial.userName}</h4>
                        {testimonial.designation && (
                          <p className="testimonial-designation">
                            {testimonial.designation}
                            {testimonial.company && ` • ${testimonial.company}`}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="testimonial-rating">
                      {'⭐'.repeat(testimonial.rating || 5)}
                    </div>

                    <p className="testimonial-message">
                      "{testimonial.message}"
                    </p>

                    <div className="testimonial-date">
                      {testimonial.createdAt && (
                        <span>
                          {new Date(testimonial.createdAt).toLocaleDateString(
                            'en-IN',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            }
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="testimonials-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Success Story?</h2>
            <p>
              Join thousands of professionals who found their dream jobs through
              Job Career Point
            </p>
            <div className="cta-buttons">
              <Link to="/jobs" className="btn btn-primary">
                Browse Jobs
              </Link>
              <Link to="/contact" className="btn btn-outline-light">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
