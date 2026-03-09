import '../Styling/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-title">Job Career Point</h3>
            <p className="footer-description">
              Your trusted job placement and career guidance partner. We connect
              candidates with verified employers across India, ensuring the
              perfect match for every career journey.
            </p>
            <div className="footer-stats">
              <div className="stat-mini">
                <span className="stat-mini-value">7k+</span>
                <span className="stat-mini-label">Placements</span>
              </div>
              <div className="stat-mini">
                <span className="stat-mini-value">100+</span>
                <span className="stat-mini-label">Partners</span>
              </div>
              <div className="stat-mini">
                <span className="stat-mini-value">14y</span>
                <span className="stat-mini-label">Experience</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/jobs">Browse Jobs</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Location & Map */}
          <div className="footer-section">
            <h3 className="footer-title">Our Location</h3>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3789.156210719893!2d74.2896609!3d18.781204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc3293aac30771d%3A0xab4b9f7827b15d02!2sKohakade%20Hospital%20Karegaon!5e0!3m2!1sen!2sin!4v1736330000000"
                title="Job Career Point Location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="location-details">
              <svg
                className="location-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>3rd Floor Trimurti Complex, Karegaon, Pune - 411014</span>
            </div>
            <a
              href="https://www.google.com/maps/place/Kohakade+Hospital+Karegaon"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              View on Google Maps
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
          </div>

          {/* Connect With Us */}
          <div className="footer-section">
            <h3 className="footer-title">Connect With Us</h3>
            <p className="footer-contact-text">
              Stay updated with the latest job openings and career tips.
            </p>

            <div className="social-links">
              <a
                href="https://www.facebook.com/people/Job-Career-Point/61585488399707/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/job.career.point/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </a>
              <a
                href="https://wa.me/918999112057?text=Hello%20this%20is%20in%20reference%20to%20your%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link whatsapp"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.01.6 3.88 1.64 5.44L2.05 22l4.78-1.6a9.93 9.93 0 005.21 1.42c5.46 0 9.91-4.45 9.91-9.91 0-5.45-4.45-9.9-9.91-9.9zm0 18.01c-1.61 0-3.17-.47-4.51-1.35l-.33-.2-3.04 1.01 1.02-2.98-.19-.35A7.95 7.95 0 014.13 11.9c0-4.44 3.62-8.06 8.06-8.06s8.06 3.62 8.06 8.06-3.62 8.05-8.06 8.05zM16.4 13.4c-.22-.11-1.3-.64-1.5-.71-.2-.07-.35-.11-.5.11s-.63.71-.78.85c-.14.14-.29.16-.51.06-.22-.11-.96-.35-1.82-1.11-.68-.6-1.14-1.33-1.27-1.56-.14-.22-.02-.34.1-.45.11-.1.24-.26.35-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.2-.69-1.64-.18-.43-.37-.37-.5-.38h-.42c-.15 0-.38.06-.58.28-.2.22-.77.75-.77 1.83 0 1.08.79 2.13.9 2.27.11.15 1.52 2.43 3.75 3.31.52.21.92.33 1.24.42.52.15.99.13 1.36.08.42-.06 1.3-.53 1.48-1.04.18-.51.18-.94.13-1.03-.05-.09-.19-.15-.41-.26z" />
                </svg>
              </a>
            </div>

            <div className="contact-info">
              <div className="contact-item">
                <svg
                  className="contact-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+91 8999112057</span>
              </div>
              <div className="contact-item">
                <svg
                  className="contact-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>jobcareerpoint23@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} Job Career Point. All rights
              reserved.
            </p>
            <div className="bottom-links">
              <a href="/privacy">Privacy</a>
              <span className="separator">•</span>
              <a href="/terms">Terms</a>
              <span className="separator">•</span>
              <a href="/sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
