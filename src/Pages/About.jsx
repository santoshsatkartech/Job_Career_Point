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
      <div className="about-container">
        <h1>About Us</h1>

        {/* Who We Are */}
        <section className="about-section">
          <p>
            We are Best Job consultancy we been working as placement agency all
            types of jobs as placement consultant we have successfully placed
            many candidates over the years, we provide our own job site or job
            portal for job recruitment, we have highly qualified staff and we
            follow all government compliances we have no attrition as off date
            and we don't have any obligation from any client or candidate. we
            believe in Ethical business
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="about-section">
          <h2>Our Mission & Vision</h2>
          <div className="mission-vision">
            <div className="about-card">
              <h3>🎯 Our Mission</h3>
              <p>
                We are a professional, enthusiastic and innovative team.
                dedicated to providing professional Consulting Services and
                evolving Recruitment Solutions that help our customers become
                more productive and profitable.
              </p>
            </div>

            <div className="about-card">
              <h3>👁️ Our Vision</h3>
              <p>
                To be recognized as an impactful, innovative and efficient
                Consulting partner.
              </p>
            </div>
          </div>
        </section>

        {/* <section className="founder-section">
          <motion.div
            className="founder-wrapper"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
          
            <div className="founder-image-box">
              <img className='w-100' src="./illustration/owner.jpg" alt="Managing Director" />
            </div>

            <div className="founder-text">
              <h2>Meet the Owner</h2>
              <h3>Mr. Santosh Satkar</h3>
              <p className="role">Managing Director (MD)</p>

              <p className="message">
                JobCareerPoint is managed with a strong focus on trust,
                transparency, and genuine opportunities for job seekers. Our
                goal is to create a reliable bridge between candidates and
                employers.
              </p>

              <div className="owner-details">
                <p>
                  <strong>📞 Mobile:</strong> 9960008802
                </p>
                <p>
                  <strong>📧 Email:</strong>{' '}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=santoshsatkar2011@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    santoshsatkar2011@gmail.com
                  </a>
                </p>
                <p>
                  <strong>📍 Address:</strong>
                  <br />
                  Trimurti Complex, Nagar Road, Ranjangaon MIDC Karegaon
                  <br />
                  (Near Police Station)
                  <br />
                  Tal: Shirur, Dist: Pune – 412220
                </p>
              </div>
            </div>
          </motion.div>
        </section> */}

        {/* Logo Slider */}
        <h2 className="Slider_heading">Our Partners</h2>
        <div
          className="slider"
          style={{
            '--width': '150px',
            '--height': '80px',
            '--imageQuantity': logos.length,
          }}
        >
          <div className="list">
            {/* Original Logos */}
            {logos.map((logo, index) => (
              <div className="item" key={index}>
                <img src={`/illustration/${logo}`} alt={`logo-${index}`} />
              </div>
            ))}

            {/* Duplicate Logos for Seamless Loop */}
            {logos.map((logo, index) => (
              <div className="item" key={`dup-${index}`}>
                <img src={`/illustration/${logo}`} alt={`logo-dup-${index}`} />
              </div>
            ))}
          </div>
        </div>

        <div
          className="slider"
          style={{
            '--width': '150px',
            '--height': '80px',
            '--imageQuantity': logos.length,
          }}
        >
          <div className="list_2">
            {/* Original Logos */}
            {logos.map((logo, index) => (
              <div className="item" key={index}>
                <img src={`/illustration/${logo}`} alt={`logo-${index}`} />
              </div>
            ))}

            {/* Duplicate Logos for Seamless Loop */}
            {logos.map((logo, index) => (
              <div className="item" key={`dup-${index}`}>
                <img src={`/illustration/${logo}`} alt={`logo-dup-${index}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Build Trust */}
        <section className="about-section">
          <h2>Building Trust & Credibility</h2>
          <p>
            We believe trust is the foundation of every successful career
            journey. That’s why JobCareerPoint focuses on verified job listings,
            transparent communication, and direct interaction with employers.
          </p>
        </section>

        {/* Why Trust Us */}
        <section className="about-section">
          <h2>Why Trust Us?</h2>
          <div className="why-trust">
            <div className="about-card">
              <h3>✔ Verified Jobs</h3>
              <p>
                Every job listing is reviewed to avoid fake or misleading
                offers.
              </p>
            </div>

            <div className="about-card">
              <h3>⚡ Quick Applications</h3>
              <p>
                Apply easily and connect directly with recruiters via WhatsApp.
              </p>
            </div>

            <div className="about-card">
              <h3>🔒 Secure & Transparent</h3>
              <p>
                Your information is safe and used only for job-related purposes.
              </p>
            </div>

            <div className="about-card">
              <h3>🤝 Career Support</h3>
              <p>We guide job seekers at every step of their career journey.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
