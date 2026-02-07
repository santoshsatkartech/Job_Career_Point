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
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-overlay">
          <h1>Connecting Talent with Opportunity</h1>
          <p className="hero-subtitle">
            Your trusted partner in career advancement since 2010
          </p>
        </div>
      </div>

      <div className="about-container">
        {/* Who We Are */}
        <section className="about-section">
          <div className="section-header">
            <h2 className="section-title">Who We Are</h2>
            <div className="title-underline"></div>
          </div>
          <div className="content-wrapper">
            <div className="about-text">
              <p>
                <strong>JobCareerPoint</strong> is a premier recruitment
                consultancy with over a decade of excellence in the staffing
                industry. We specialize in bridging the gap between exceptional
                talent and top-tier companies across diverse sectors.
              </p>
              <p>
                Our journey began with a simple vision: to transform the way
                recruitment works in India. Today, we stand as one of the most
                reliable placement agencies, having successfully placed
                <span className="highlight-text"> 2,000+ candidates </span>
                in reputed organizations nationwide.
              </p>
              <div className="stats-container">
                <div className="stat-item">
                  <h3>7,000+</h3>
                  <p>Candidates Placed</p>
                </div>
                <div className="stat-item">
                  <h3>100+</h3>
                  <p>Partner Companies</p>
                </div>
                <div className="stat-item">
                  <h3>85%</h3>
                  <p>Retention Rate</p>
                </div>
                <div className="stat-item">
                  <h3>14 Years</h3>
                  <p>Industry Experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="about-section mission-section">
          <div className="section-header">
            <h2 className="section-title">Our Mission & Vision</h2>
            <div className="title-underline"></div>
          </div>
          <div className="mission-vision">
            <div className="about-card mission-card">
              <h3>Our Mission</h3>
              <p>
                To revolutionize the recruitment industry by providing
                innovative, efficient, and ethical staffing solutions that
                empower both candidates and employers to achieve their
                professional goals.
              </p>
              <ul className="mission-list">
                <li>Provide professional consulting services</li>
                <li>Offer evolving recruitment solutions</li>
                <li>Enhance productivity and profitability</li>
                <li>Ensure ethical business practices</li>
              </ul>
            </div>

            <div className="about-card vision-card">
              <h3>Our Vision</h3>
              <p>
                To be recognized as India's most impactful and innovative
                recruitment partner, setting new benchmarks in talent
                acquisition and career development.
              </p>
              <ul className="vision-list">
                <li>Industry leadership in recruitment solutions</li>
                <li>Global recognition as a trusted partner</li>
                <li>Technological innovation in staffing</li>
                <li>Sustainable growth and social impact</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="about-section values-section">
          <div className="section-header">
            <h2 className="section-title">Our Core Values</h2>
            <div className="title-underline"></div>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Integrity</h3>
              <p>Transparent and honest in all our dealings</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Efficiency</h3>
              <p>Quick and effective recruitment solutions</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Empathy</h3>
              <p>Understanding candidate and client needs</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>Constantly evolving our processes</p>
            </div>
          </div>
        </section>

        {/* Logo Slider */}
        <section className="about-section partners-section">
          <div className="section-header">
            <h2 className="section-title">Our Esteemed Partners</h2>
            <div className="title-underline"></div>
            <p className="section-subtitle">
              Trusted by India's leading companies across industries
            </p>
          </div>

          <div className="slider-container">
            <div className="slider">
              <div className="slider-track">
                {logos.concat(logos).map((logo, index) => (
                  <div className="slider-item" key={index}>
                    <div className="logo-container">
                      <img
                        src={`/illustration/${logo}`}
                        alt={`partner-logo-${index}`}
                        className="partner-logo"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        {/* <section className="about-section process-section">
          <div className="section-header">
            <h2 className="section-title">Our Recruitment Process</h2>
            <div className="title-underline"></div>
          </div>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Profile Assessment</h3>
              <p>Comprehensive evaluation of skills and experience</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Career Counseling</h3>
              <p>Personalized guidance for career growth</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Job Matching</h3>
              <p>Smart matching with suitable opportunities</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Interview Prep</h3>
              <p>Comprehensive interview training</p>
            </div>
            <div className="step">
              <div className="step-number">5</div>
              <h3>Placement</h3>
              <p>Successful onboarding and follow-up</p>
            </div>
          </div>
        </section> */}

        {/* Build Trust */}
        <section className="about-section trust-section">
          <div className="section-header">
            <h2 className="section-title">Building Trust & Credibility</h2>
            <div className="title-underline"></div>
          </div>
          <div className="trust-content">
            <p>
              Trust is the cornerstone of every successful career journey. At
              <strong> JobCareerPoint</strong>, we've built our reputation on
              transparency, reliability, and exceptional service. Our commitment
              to ethical recruitment practices ensures that every interaction
              adds value to your career progression.
            </p>
            <div className="trust-points">
              <div className="trust-item">
                <span className="check-icon">✅</span>
                <span>Government compliance certified</span>
              </div>
              <div className="trust-item">
                <span className="check-icon">✅</span>
                <span>Zero attrition with partnered companies</span>
              </div>
              <div className="trust-item">
                <span className="check-icon">✅</span>
                <span>Data privacy and security assured</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Trust Us */}
        <section className="about-section why-trust-section">
          <div className="section-header">
            <h2 className="section-title">Why Choose JobCareerPoint?</h2>
            <div className="title-underline"></div>
          </div>
          <div className="why-trust-grid">
            <div className="feature-card">
              <div className="feature-icon">✔</div>
              <h3>Verified Job Listings</h3>
              <p>
                Every opportunity is thoroughly vetted to ensure authenticity
                and eliminate fake or misleading offers.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Rapid Application Process</h3>
              <p>
                Apply with a single click and connect directly with recruiters
                through integrated WhatsApp communication.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Confidential</h3>
              <p>
                Your personal information is protected with enterprise-grade
                security and used exclusively for legitimate recruitment
                purposes.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>End-to-End Support</h3>
              <p>
                From resume building to interview preparation and offer
                negotiation, we guide you at every step.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Industry Expertise</h3>
              <p>
                Our consultants bring deep industry knowledge across sectors
                including IT, Manufacturing, FMCG, and Services.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Career Growth Focus</h3>
              <p>
                We don't just find you a job; we help build sustainable careers
                with long-term growth potential.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-section cta-section">
          <div className="cta-content">
            <h2>Ready to Transform Your Career?</h2>
            <p>
              Join thousands of successful professionals who've found their
              dream jobs through JobCareerPoint.
            </p>
            <div className="cta-buttons">
              <a href="/jobs" className="btn cta-button secondary">
                Browse Jobs
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
