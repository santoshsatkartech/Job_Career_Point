import '../Styling/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        {/* About */}
        <div className="footer-col ">
          <h3 className="foot-title">Job Career Point</h3>
          <p>
            Your trusted job placement and career guidance partner. We connect
            candidates with verified employers across India.
          </p>

          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
            <a
              href="https://wa.me/918999112057?text=Hello%20this%20is%20in%20reference%20to%20your%20website%20i%20would%20to%20like%20you%20know%20a%20few%20thing"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>
        </div>

        {/* Map + Address */}
        <div className="footer-col address">
          <h3>Our Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3789.156210719893!2d74.2896609!3d18.781204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc3293aac30771d%3A0xab4b9f7827b15d02!2sKohakade%20Hospital%20Karegaon!5e0!3m2!1sen!2sin!4v1736330000000"
            width="100%"
            height="180"
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Job Career Point Location"
          />
          <p>📍3rd Floor Trimurti Complex, Karegaon, Pune</p>
          <a
            href="https://www.google.com/maps/place/Kohakade+Hospital+Karegaon"
            target="_blank"
            rel="noreferrer"
          >
            View on Google Maps
          </a>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/jobs">Jobs</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        {/* Contact + Job Alerts */}
        <div className="footer-col">
          <h3>Contact Us</h3>
          <p>
            <a href="tel:+918999112057">📞 +91 89991 12057</a>
          </p>

          <p>
            <a
              href="https://wa.me/918999112057?text=Hello%20this%20is%20in%20reference%20to%20your%20website%20i%20would%20to%20like%20you%20know%20a%20few%20thing"
              target="_blank"
              rel="noreferrer"
            >
              💬 WhatsApp Us
            </a>
          </p>

          <p>
            <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=jobcarrerpoint23@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    ✉️ jobcareerpoint23@gmail.com
  </a>
          </p>

          <p>🕘 Mon – Sat: 9:30 AM – 5:30 PM</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Job Career Point. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
