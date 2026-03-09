import '../Styling/About.css';

const logos = [
  'bajaj.jpg',
  'britannia.jpg',
  'capgemini.jpg',
  'cognizant.jpg',
  'fiat.jpg',
  'haier.jpg',
  'hcl.png',
  'ibm.jpg',
  'infosys.jpg',
  'itc.jpg',
  'lg.jpg',
  'tcs.jpg',
  'wipro.jpg',
];

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section - Matching Home Page Style */}
      <section className="about-hero-section">
        <div className="container">
          <div className="about-hero-content">
            <span className="hero-badge">About Us</span>
            <h1 className="about-hero-title">
              Connecting <span className="text-gradient">Talent</span> with{' '}
              <span className="text-gradient">Opportunity</span>
            </h1>
            <p className="about-hero-description">
              Your trusted partner in career advancement, transforming the way
              recruitment works in India since 2010.
            </p>
            <div className="hero-cta">
              <a href="/jobs" className="btn btn-primary">
                Explore Jobs
                <svg
                  className="btn-icon-og"
                  viewBox="0 0 20 20"
                  fill="white"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#mission" className="btn btn-outline">
                Our Mission
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Matching Home Page */}
      <section className="trust-badges">
        <div className="container">
          <div className="badges-grid">
            <div className="badge-item">
              <span className="badge-icon">🏆</span>
              <div className="badge-text">
                <strong>14+ Years</strong>
                <span>Industry Excellence</span>
              </div>
            </div>
            <div className="badge-item">
              <span className="badge-icon">🤝</span>
              <div className="badge-text">
                <strong>100+ Partners</strong>
                <span>Trusted Companies</span>
              </div>
            </div>
            <div className="badge-item">
              <span className="badge-icon">📈</span>
              <div className="badge-text">
                <strong>85%</strong>
                <span>Retention Rate</span>
              </div>
            </div>
            <div className="badge-item">
              <span className="badge-icon">⚡</span>
              <div className="badge-text">
                <strong>7,000+</strong>
                <span>Successful Placements</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Who We Are - Redesigned */}
        <section className="about-section">
          <div className="section-header">
            <span className="section-badge">Who We Are</span>
            <h2 className="section-title">
              India's Premier Recruitment Partner
            </h2>
            <p className="section-description">
              Bridging the gap between exceptional talent and top-tier companies
            </p>
          </div>

          <div className="about-grid">
            <div className="about-content">
              <p className="about-text-large">
                <strong>JobCareerPoint</strong> is a premier recruitment
                consultancy with over a decade of excellence in the staffing
                industry.
              </p>
              <p className="about-text">
                Our journey began with a simple vision: to transform the way
                recruitment works in India. Today, we stand as one of the most
                reliable placement agencies, having successfully placed{' '}
                <span className="text-highlight">7,000+ candidates</span> in
                reputed organizations nationwide.
              </p>

              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div>
                    <h4>Professional Consulting Services</h4>
                    <p>Expert guidance tailored to your career goals</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div>
                    <h4>Evolving Solutions</h4>
                    <p>Adapting to changing market dynamics</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div>
                    <h4>Ethical Practices</h4>
                    <p>Transparency in every interaction</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-stats-grid">
              <div className="stat-card">
                <div className="stat-number">7,000+</div>
                <div className="stat-card-label">Candidates Placed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100+</div>
                <div className="stat-card-label">Partner Companies</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">85%</div>
                <div className="stat-card-label">Retention Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">14</div>
                <div className="stat-card-label">Years Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision - Redesigned */}
        <section id="mission" className="mission-section">
          <div className="section-header">
            <span className="section-badge">Our Purpose</span>
            <h2 className="section-title">Mission & Vision</h2>
            <p className="section-description">
              Driving excellence in recruitment through innovation and integrity
            </p>
          </div>

          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To revolutionize the recruitment industry by providing
                innovative, efficient, and ethical staffing solutions that
                empower both candidates and employers.
              </p>
              <ul className="mission-list">
                <li>✓ Professional consulting services</li>
                <li>✓ Evolving recruitment solutions</li>
                <li>✓ Enhance productivity & profitability</li>
                <li>✓ Ethical business practices</li>
              </ul>
            </div>

            <div className="mission-card">
              <div className="mission-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>
                To be recognized as India's most impactful and innovative
                recruitment partner, setting new benchmarks in talent
                acquisition and career development.
              </p>
              <ul className="mission-list">
                <li>✓ Industry leadership</li>
                <li>✓ Global recognition</li>
                <li>✓ Technological innovation</li>
                <li>✓ Sustainable growth</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Core Values - Matching Process Section Style */}
        <section className="values-section">
          <div className="section-header">
            <span className="section-badge">Our Foundation</span>
            <h2 className="section-title">Core Values</h2>
            <p className="section-description">
              The principles that guide everything we do
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <span className="value-number">01</span>
              <div className="value-icon">🤝</div>
              <h3>Integrity</h3>
              <p>Transparent and honest in all our dealings</p>
            </div>
            <div className="value-card">
              <span className="value-number">02</span>
              <div className="value-icon">⚡</div>
              <h3>Efficiency</h3>
              <p>Quick and effective recruitment solutions</p>
            </div>
            <div className="value-card">
              <span className="value-number">03</span>
              <div className="value-icon">❤️</div>
              <h3>Empathy</h3>
              <p>Understanding candidate and client needs</p>
            </div>
            <div className="value-card">
              <span className="value-number">04</span>
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>Constantly evolving our processes</p>
            </div>
          </div>
        </section>

        {/* Partners Logo Slider - Redesigned */}
        <section className="partners-section">
          <div className="section-header">
            <span className="section-badge">Our Partners</span>
            <h2 className="section-title">Trusted by Industry Leaders</h2>
            <p className="section-description">
              Partnering with India's most respected companies
            </p>
          </div>

          <div className="logo-slider-container">
            <div className="logo-slider">
              <div className="logo-slider-track">
                {logos.concat(logos).map((logo, index) => (
                  <div className="logo-slide" key={index}>
                    <div className="logo-wrapper">
                      <img
                        src={`/illustration/${logo}`}
                        alt={`partner-${index}`}
                        className="partner-logo-image"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Matching Home Page Style */}
        <section className="why-choose-section">
          <div className="section-header">
            <span className="section-badge">Why Choose Us</span>
            <h2 className="section-title">The JobCareerPoint Advantage</h2>
            <p className="section-description">
              What makes us different from other recruitment agencies
            </p>
          </div>

          <div className="why-choose-grid">
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">✔</div>
                <div>
                  <h4>Verified Job Listings</h4>
                  <p>Every opportunity is thoroughly vetted for authenticity</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div>
                  <h4>Rapid Application Process</h4>
                  <p>
                    Apply with a single click and connect directly with
                    recruiters
                  </p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <div>
                  <h4>Secure & Confidential</h4>
                  <p>
                    Your personal information is protected with enterprise-grade
                    security
                  </p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <div>
                  <h4>End-to-End Support</h4>
                  <p>
                    From resume building to offer negotiation, we guide you at
                    every step
                  </p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <div>
                  <h4>Industry Expertise</h4>
                  <p>
                    Deep knowledge across IT, Manufacturing, FMCG, and Services
                  </p>
                </div>
              </div>
            </div>

            <div className="trust-badges-grid">
              <div className="trust-certificate">
                <div className="certificate-icon">✅</div>
                <h4>Government Compliant</h4>
                <p>Fully certified and compliant with all regulations</p>
              </div>
              <div className="trust-certificate">
                <div className="certificate-icon">🛡️</div>
                <h4>Data Privacy</h4>
                <p>Your information is always safe with us</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Matching Home Page */}
        <section className="cta-section">
          <div className="cta-card">
            <h2>Ready to Transform Your Career?</h2>
            <p>
              Join thousands of successful professionals who've found their
              dream jobs through JobCareerPoint.
            </p>
            <div className="cta-buttons">
              <a href="/jobs" className="btn btn-primary">
                Browse Jobs
              </a>
              <a href="/contact" className="btn btn-outline-light">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
