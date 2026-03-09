import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { contactService } from '../api/contactService';
import '../Styling/Contact.css';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Save to backend database (runs in background)
    const formData = new FormData(e.target);
    contactService
      .submit({
        name: formData.get('name') || '',
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        subject: formData.get('role') || 'Career Enquiry',
        message: formData.get('message') || '',
      })
      .catch(() => {}); // silent — don't block EmailJS if API fails

    // EmailJS logic
    emailjs
      .sendForm(
        'service_bww6d2t',
        'template_0dsw0jr',
        e.target,
        'Lp7ZVUYzy6CugnEcr'
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus('sent');
          e.target.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus('error');
        }
      );
  };

  return (
    <div className="contact-page">
      {/* Hero Section - Matching Home Page Style */}
      <section className="contact-hero-section">
        <div className="container">
          <div className="contact-hero-content">
            <span className="hero-badge">Get In Touch</span>
            <h1 className="contact-hero-title">
              Let's Connect & Build Your{' '}
              <span className="text-gradient">Career</span>
            </h1>
            <p className="contact-hero-description">
              Have questions about job opportunities, career guidance, or our
              services? Our team is here to help you take the next step in your
              professional journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="contact-info-cards">
        <div className="container">
          <div className="info-cards-grid">
            {/* Support Hours Card */}
            <div className="info-card">
              <div className="info-card-icon">🕒</div>
              <h3>Support Hours</h3>
              <div className="info-card-content">
                <p>Monday – Saturday</p>
                <p className="time">9:30 AM – 6:30 PM</p>
                <p className="note">Sunday: Closed</p>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="info-card highlight">
              <div className="info-card-icon">📍</div>
              <h3>Visit Our Office</h3>
              <div className="info-card-content">
                <p>3rd Floor Trimurti Complex,</p>
                <p>Karegaon, Pune</p>
                <p>Maharashtra – 412220</p>
              </div>
              <a
                href="https://www.google.com/maps/place/Kohakade+Hospital+Karegaon"
                target="_blank"
                rel="noopener noreferrer"
                className="info-card-link"
              >
                Get Directions →
              </a>
            </div>

            {/* Career Assistance Card */}
            <div className="info-card">
              <div className="info-card-icon">💼</div>
              <h3>Career Assistance</h3>
              <div className="info-card-content">
                <p>Jobs • Internships</p>
                <p>Career Guidance</p>
                <p>Resume Building</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Numbers Section */}
      <section className="contact-numbers-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Reach Us Directly</span>
            <h2 className="section-title">Call Our Career Experts</h2>
            <p className="section-description">
              Speak directly with our team for immediate assistance
            </p>
          </div>

          <div className="contact-numbers-grid">
            <a href="tel:9545304038" className="contact-number-card">
              <span className="number-icon">📞</span>
              <span className="number">9545304038</span>
            </a>
            <a href="tel:9561305022" className="contact-number-card">
              <span className="number-icon">📞</span>
              <span className="number">9561305022</span>
            </a>
            <a href="tel:9545514038" className="contact-number-card">
              <span className="number-icon">📞</span>
              <span className="number">9545514038</span>
            </a>
            <a href="tel:9270449690" className="contact-number-card">
              <span className="number-icon">📞</span>
              <span className="number">9270449690</span>
            </a>
            <a href="tel:7249677652" className="contact-number-card">
              <span className="number-icon">📞</span>
              <span className="number">7249677652</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Office Details */}
      <section className="office-details-section">
        <div className="container">
          <div className="office-details-grid">
            <div className="office-info">
              <span className="office-badge">Main Branch</span>
              <h2 className="office-title">Job Career Point</h2>

              <div className="office-details-list">
                <div className="office-detail-item">
                  <span className="detail-icon">🏢</span>
                  <div className="detail-text">
                    <h4>Address</h4>
                    <p>3rd Floor Trimurti Complex, Karegaon, Pune - 412220</p>
                  </div>
                </div>

                <div className="office-detail-item">
                  <span className="detail-icon">📞</span>
                  <div className="detail-text">
                    <h4>Phone</h4>
                    <p>+91 8999112057</p>
                  </div>
                </div>

                <div className="office-detail-item">
                  <span className="detail-icon">✉️</span>
                  <div className="detail-text">
                    <h4>Email</h4>
                    <p>jobcareerpoint23@gmail.com</p>
                  </div>
                </div>

                <div className="office-detail-item">
                  <span className="detail-icon">🕒</span>
                  <div className="detail-text">
                    <h4>Working Days</h4>
                    <p>Monday – Saturday (9:30 AM – 6:30 PM)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="office-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3789.156210719893!2d74.2896609!3d18.781204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc3293aac30771d%3A0xab4b9f7827b15d02!2sKohakade%20Hospital%20Karegaon!5e0!3m2!1sen!2sin!4v1736330000000"
                title="Job Career Point Location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <span className="section-badge">Send Your Query</span>
              <h2 className="section-title">Career Enquiry Form</h2>
              <p className="section-description">
                Fill out the form below and our career experts will get back to
                you with the best opportunities tailored to your profile.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input type="text" name="phone" placeholder="Mobile Number" />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="qualification"
                    placeholder="Qualification"
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="role"
                  placeholder="Interested Job Role"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message / Career Query... *"
                  required
                  rows="5"
                />
              </div>

              <div className="form-footer">
                <button type="submit" className="btn btn-primary submit-btn">
                  {status === 'sending' ? 'Sending...' : 'Submit Enquiry'}
                  <svg
                    className="btn-icon-og"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {status === 'sent' && (
                  <div className="form-message success">
                    <span className="message-icon">✓</span>
                    Message sent successfully! We'll contact you shortly.
                  </div>
                )}

                {status === 'error' && (
                  <div className="form-message error">
                    <span className="message-icon">⚠</span>
                    Failed to send. Please try again later.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
