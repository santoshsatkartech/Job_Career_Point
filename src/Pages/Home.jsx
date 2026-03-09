import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Particles from '../Components/Particles';
import '../Styling/Home.css';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const statsRef = useRef(null);
  const [countersStarted, setCountersStarted] = useState(false);

  // Stats counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            setCountersStarted(true);

            const counters = document.querySelectorAll('.stat-number');
            counters.forEach((counter) => {
              const target = parseInt(counter.getAttribute('data-target'));
              let current = 0;
              const increment = target / 50;
              const updateCounter = () => {
                if (current < target) {
                  current += increment;
                  counter.innerText = Math.ceil(current).toLocaleString();
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.innerText = target.toLocaleString() + '+';
                }
              };
              updateCounter();
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  const faqs = [
    {
      q: 'Is Job Career Point genuine?',
      a: 'Yes, we provide 100% verified and genuine job opportunities from trusted employers across India.',
    },
    {
      q: 'Do you provide jobs for freshers?',
      a: 'Absolutely! We have dedicated opportunities for both freshers and experienced candidates.',
    },
    {
      q: 'How long does placement take?',
      a: 'Placement time varies based on your profile and job availability. On average, candidates get placed within 2-4 weeks.',
    },
    {
      q: 'How can I apply for a job?',
      a: 'You can apply by calling us directly, sending a WhatsApp message, or browsing our job listings online.',
    },
    {
      q: 'Which locations do you provide jobs in?',
      a: 'We provide opportunities across major cities in India including Mumbai, Delhi, Bangalore, Pune, and more.',
    },
    {
      q: 'Will you help with interview preparation?',
      a: 'Yes, we provide interview tips, resume guidance, and preparation support to help you succeed.',
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    {
      title: 'IT & Software',
      count: '342',
      icon: '💻',
      bgColor: '#EFF6FF',
      iconBg: '#3B82F6',
    },
    {
      title: 'Digital Marketing',
      count: '218',
      icon: '📈',
      bgColor: '#FEF3F2',
      iconBg: '#F97316',
    },
    {
      title: 'Finance & Accounting',
      count: '186',
      icon: '💰',
      bgColor: '#F0F9FF',
      iconBg: '#0EA5E9',
    },
    {
      title: 'Healthcare & Pharma',
      count: '154',
      icon: '🏥',
      bgColor: '#F0FDF4',
      iconBg: '#10B981',
    },
    {
      title: 'Education & Training',
      count: '129',
      icon: '🎓',
      bgColor: '#FEFCE8',
      iconBg: '#EAB308',
    },
    {
      title: 'Sales & Business Dev',
      count: '204',
      icon: '🤝',
      bgColor: '#F1F5F9',
      iconBg: '#6366F1',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Contact Us',
      description:
        'Reach out via call or WhatsApp to discuss your career goals and requirements.',
      icon: '📞',
    },
    {
      number: '02',
      title: 'Profile Assessment',
      description:
        'We evaluate your skills and experience to find the best matching opportunities.',
      icon: '📋',
    },
    {
      number: '03',
      title: 'Job Matching',
      description:
        'Get personalized job recommendations from our verified employer network.',
      icon: '🎯',
    },
    {
      number: '04',
      title: 'Interview & Placement',
      description: 'Prepare with our guidance and secure your dream job.',
      icon: '✨',
    },
  ];

  return (
    <>
      {/* Hero Section - Fixed */}
      <section className="hero-section">
        <Particles />
        <div className="hero-container">
          <div className="hero-content container">
            <div
              className="hero-text"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <span className="hero-badge">Your Career Partner</span>
              <h1 className="hero-title">
                Find Your <span className="text-gradient">Dream Job</span>
              </h1>
              <h2 className="hero-subtitle">JOB CAREER POINT</h2>
              <p className="hero-description">
                Your trusted partner in job placement and career growth. We
                connect talented professionals with leading companies.
              </p>

              <div className="hero-cta">
                <a href="tel:+918999112057" className="btn btn-primary">
                  <svg
                    className="btn-icon-og"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8 10a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Call Now
                </a>
                <a
                  href="https://wa.me/918999112057?text=Hello%20this%20is%20in%20reference%20to%20your%20website%20i%20would%20to%20like%20you%20know%20a%20few%20thing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <svg
                    className="btn-icon-og"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                  WhatsApp Us
                </a>
                <Link to="/jobs" className="btn btn-secondary">
                  Browse Jobs
                  <svg
                    className="btn-icon-og"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-value">7000+</span>
                  <span className="stat-label">Candidates Placed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">1000+</span>
                  <span className="stat-label">Active Jobs</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">100+</span>
                  <span className="stat-label">Partner Companies</span>
                </div>
              </div>
            </div>

            {/* Fixed Hero Image with Wrapper */}
            <div
              className="hero-image"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="hero-image-wrapper">
                <img
                  src="./background/search.png"
                  alt="Job Career Point"
                  className="hero-logo"
                />
                <div className="hero-shape"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-badges">
        <div className="container">
          <div className="badges-grid">
            <div className="badge-item">
              <div className="badge-text">
                <strong>100% Verified</strong>
                <span>Genuine jobs only</span>
              </div>
            </div>
            <div className="badge-item">
              <div className="badge-text">
                <strong>Quick Process</strong>
                <span>Apply in minutes</span>
              </div>
            </div>
            <div className="badge-item">
              <div className="badge-text">
                <strong>Free Guidance</strong>
                <span>Career support</span>
              </div>
            </div>
            <div className="badge-item">
              <div className="badge-text">
                <strong>Trusted</strong>
                <span>Since 2015</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Browse Jobs</span>
            <h2 className="section-title">
              Popular <span className="text-gradient">Categories</span>
            </h2>
            <p className="section-description">
              Explore thousands of job opportunities across various industries
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="category-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div
                  className="category-icon"
                  style={{ backgroundColor: cat.bgColor }}
                >
                  <span style={{ color: cat.iconBg }}>{cat.icon}</span>
                </div>
                <h3>{cat.title}</h3>
                <p className="category-count">{cat.count}+ jobs available</p>
                <Link to="/jobs" className="category-link">
                  View Jobs →
                </Link>
              </div>
            ))}
          </div>

          <div className="section-footer">
            <Link to="/jobs" className="btn btn-primary btn-large">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section" ref={statsRef}>
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left Column - Content */}
            <div className="col-lg-6" data-aos="fade-up">
              <span className="section-badge">Why Choose Us</span>
              <h2 className="section-title">
                Your Career Growth Starts{' '}
                <span className="text-gradient">Here</span>
              </h2>
              <p className="section-description mb-4">
                We're committed to helping you find the perfect job opportunity
                that matches your skills and career aspirations.
              </p>

              <div className="features-list mt-4">
                <div className="feature-item mb-4">
                  <div className="d-flex gap-3">
                    <div className="feature-icon flex-shrink-0">✓</div>
                    <div>
                      <h4 className="h5 fw-bold mb-2">Verified Employers</h4>
                      <p className="text-muted mb-0">
                        All job listings are verified and updated daily
                      </p>
                    </div>
                  </div>
                </div>

                <div className="feature-item mb-4">
                  <div className="d-flex gap-3">
                    <div className="feature-icon flex-shrink-0">✓</div>
                    <div>
                      <h4 className="h5 fw-bold mb-2">Personalized Support</h4>
                      <p className="text-muted mb-0">
                        Dedicated career counselors to guide you
                      </p>
                    </div>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="d-flex gap-3">
                    <div className="feature-icon flex-shrink-0">✓</div>
                    <div>
                      <h4 className="h5 fw-bold mb-2">Quick Placements</h4>
                      <p className="text-muted mb-0">
                        Efficient process to get you hired faster
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="col-lg-6" data-aos="fade-up">
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="stat-card text-center p-4">
                    <div
                      className="stat-number display-3 fw-bold"
                      data-target="7000"
                    >
                      0
                    </div>
                    <div className="stat-card-label text-muted">
                      Happy Candidates
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="stat-card text-center p-4">
                    <div
                      className="stat-number display-3 fw-bold"
                      data-target="1000"
                    >
                      0
                    </div>
                    <div className="stat-card-label text-muted">
                      Jobs Posted
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="stat-card text-center p-4">
                    <div
                      className="stat-number display-3 fw-bold"
                      data-target="100"
                    >
                      0
                    </div>
                    <div className="stat-card-label text-muted">
                      Partner Companies
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="stat-card text-center p-4">
                    <div
                      className="stat-number display-3 fw-bold"
                      data-target="95"
                    >
                      0
                    </div>
                    <div className="stat-card-label text-muted">
                      Success Rate %
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Simple Process</span>
            <h2 className="section-title">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="section-description">
              Four simple steps to kickstart your career journey
            </p>
          </div>

          <div className="process-grid">
            {steps.map((step, index) => (
              <div
                key={index}
                className="process-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="process-number">{step.number}</div>
                <div className="process-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="process-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-grid">
            <div className="faq-content" data-aos="fade-up">
              <span className="section-badge">FAQ</span>
              <h2 className="section-title">
                Frequently Asked{' '}
                <span className="text-gradient">Questions</span>
              </h2>
              <p className="section-description">
                Got questions? We've got answers to help you understand our
                process better.
              </p>

              <div className="faq-contact">
                <p>Still have questions?</p>
                <a href="tel:+918999112057" className="contact-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8 10a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Call us now
                </a>
              </div>
            </div>

            <div className="faq-list" data-aos="fade-up">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="faq-question">
                    <h4>{faq.q}</h4>
                    <span className="faq-icon">
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Start Your Career Journey?</h2>
            <p>
              Join thousands of successful candidates who found their dream job
              through us
            </p>
            <div className="cta-buttons">
              <a href="tel:+918999112057" className="btn btn-primary btn-large">
                Call Us Now
              </a>
              <Link to="/jobs" className="btn btn-outline-light btn-large">
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
