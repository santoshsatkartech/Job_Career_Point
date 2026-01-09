import emailjs from '@emailjs/browser';
import { useState } from 'react';
import '../Styling/Contact.css';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Send form via EmailJS
    emailjs
      .sendForm(
        'service_bww6d2t', // replace with your EmailJS Service ID
        'template_0dsw0jr', // replace with your EmailJS Template ID
        e.target,
        'Lp7ZVUYzy6CugnEcr' // replace with your EmailJS Public Key
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
    <>
      {/* Contact Address Area */}
      <section className="contact-address-area">
        <div className="container">
          <div className="sec-title-style1 text-center max-width">
            <div className="title">Contact Us</div>
            <div className="text">
              <div className="decor-left">
                <span />
              </div>
              <p>Quick Support</p>
              <div className="decor-right">
                <span />
              </div>
            </div>
            <div className="bottom-text">
              <p>
                Job Career Point helps students and professionals find the right
                career opportunities, job openings, and guidance to build a
                successful future.
              </p>
            </div>
          </div>

          <div className="contact-address-box row">
            <div className="col-sm-4 single-contact-address-box text-center">
              <div className="icon-holder">
                <span className="icon-clock-1" />
              </div>
              <h3>Support Hours</h3>
              <h2>Mon – Sat: 9:30 AM – 6:30 PM</h2>
            </div>

            <div className="col-sm-4 single-contact-address-box main-branch">
              <h3>Job Career Point</h3>
              <div className="inner">
                <ul>
                  <li>
                    <div className="title">
                      <h4>Address:</h4>
                    </div>
                    <div className="text">
                      <p>
                        3rd Floor Trimurti Complex,
                        <br />
                        Karegaon, Pune
                        <br />
                        Maharashtra – 412220
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="title">
                      <h4>
                        Phone: <br /> Email:
                      </h4>
                    </div>
                    <div className="text">
                      <p>
                        +91 8999112057 <br /> jobcareerpoint23@gmail.com
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="title">
                      <h4>
                        Working <br /> Days:
                      </h4>
                    </div>
                    <div className="text">
                      <p>
                        Monday – Saturday
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-4 single-contact-address-box text-center">
              <div className="icon-holder">
                <span className="icon-question-2" />
              </div>
              <h3>Career Assistance</h3>
              <h2>Jobs • Internships • Guidance</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Numbers</h2>
        <div className="contact-cards">
          <a href="tel:9545304038" className="contact-card">
            📞 9545304038
          </a>
          <a href="tel:9561305022" className="contact-card">
            📞 9561305022
          </a>
          <a href="tel:9545514038" className="contact-card">
            📞 9545514038
          </a>
          <a href="tel:9270449690" className="contact-card">
            📞 9270449690
          </a>
          <a href="tel:7249677652" className="contact-card">
            📞 7249677652
          </a>
        </div>
      </section>

      {/* Contact Form Area */}
      <section className="contact-info-area">
        <div className="container">
          <div className="contact-form">
            <div className="row">
              <div className="col-xl-12">
                <div className="sec-title-style1 float-left">
                  <div className="title">Send Your Query</div>
                  <div className="text">
                    <div className="decor-left">
                      <span />
                    </div>
                    <p>Career Enquiry Form</p>
                  </div>
                </div>
                <div className="text-box float-right">
                  <p>
                    Fill out the form below and our career experts will get back
                    to you with the best opportunities.
                  </p>
                </div>
              </div>
            </div>

            <div className="inner-box">
              <form className="default-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-6 col-lg-12">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="input-box">
                          <input
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            required
                          />
                        </div>
                        <div className="input-box">
                          <input
                            name="phone"
                            type="text"
                            placeholder="Mobile Number"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="input-box">
                          <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            required
                          />
                        </div>
                        <div className="input-box">
                          <input
                            name="qualification"
                            type="text"
                            placeholder="Qualification"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="input-box">
                      <input
                        name="role"
                        type="text"
                        placeholder="Interested Job Role"
                      />
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12">
                    <div className="input-box">
                      <textarea
                        name="message"
                        placeholder="Your Message / Career Query..."
                        required
                      />
                    </div>
                    <div className="button-box">
                      <button type="submit">Submit Enquiry</button>
                      {status === 'sending' && (
                        <div className="form-note">Sending...</div>
                      )}
                      {status === 'sent' && (
                        <div className="form-note success">
                          Message sent — we will contact you shortly.
                        </div>
                      )}
                      {status === 'error' && (
                        <div className="form-note error">
                          Failed to send. Try again later.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
