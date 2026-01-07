import '../Styling/Home.css';

const Home = () => {
  const categories = [
    { title: 'IT & Software', count: '320+ Jobs', icon: '💻' },
    { title: 'Marketing', count: '210+ Jobs', icon: '📈' },
    { title: 'Finance', count: '180+ Jobs', icon: '💰' },
    { title: 'Healthcare', count: '150+ Jobs', icon: '🏥' },
    { title: 'Education', count: '120+ Jobs', icon: '🎓' },
    { title: 'Manufacturing', count: '95+ Jobs', icon: '🏭' },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <img
            className="hero-img"
            src="./background/hero_img.jpg"
            alt="hero"
          />
          <div className="hero_collect">
            <h3 className="hero-title">
              FIND YOUR <br />
              DREAM JOB
            </h3>
            <h1 className="heading">JOB CAREER POINT</h1>
            <p className="caption">Your Career Start Here.</p>
            <p className="caption">
              Your Trusted Partner In Job Placement And Career Growth.
            </p>

            <div className="hero-buttons">
              <a href="tel:+918999112057" className="btn call-btn">
                📞 Call Now
              </a>

              <a
                href="https://wa.me/918999112057?text=Hello%20this%20is%20in%20reference%20to%20your%20website%20i%20would%20to%20like%20you%20know%20a%20few%20thing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn whatsapp-btn"
              >
                <i className="bi bi-whatsapp"></i> &nbsp; WhatsApp Us
              </a>

              <a href="/jobs" className="btn job-btn">
                🔍 View Jobs
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="home-card">
          <h2>1000+ Candidates placed</h2>
        </div>
        <div className="home-card">
          <h2>Trusted Placement Consultancy</h2>
        </div>
        <div className="home-card">
          <h2>Fresher and Experienced Jobs</h2>
        </div>
      </section>

      <section className="job-categories">
        <div className="container">
          <h2 className="section-title">Job Categories</h2>
          <p className="section-subtitle">
            Explore jobs by category and find the right opportunity
          </p>

          <div className="categories-grid">
            {categories.map((cat, index) => (
              <div className="category-card" key={index}>
                <div className="category-icon">{cat.icon}</div>
                <h3>{cat.title}</h3>
                <span>{cat.count}</span>
              </div>
            ))}
          </div>

          <div className="category-btn">
            <a href="/jobs" className="btn jobs-btn">
              View All Jobs
            </a>
          </div>
        </div>
      </section>

      <section className="why-choose">
        <div className="container why-wrapper">
          {/* Left Content */}
          <div className="why-left">
            <h2>Why Choose Job Career Point?</h2>
            <p>
              We connect job seekers with verified employers and guide them
              throughout their career journey with trust and transparency.
            </p>

            <div className="why-points">
              <div className="point">
                <span>✔</span>
                <p>100% verified and genuine job listings</p>
              </div>
              <div className="point">
                <span>✔</span>
                <p>Trusted by companies across India</p>
              </div>
              <div className="point">
                <span>✔</span>
                <p>Career guidance & placement support</p>
              </div>
              <div className="point">
                <span>✔</span>
                <p>Quick and easy application process</p>
              </div>
            </div>
          </div>

          {/* Right Highlights */}
          <div className="why-right">
            <div className="highlight">
              <h3>5K+</h3>
              <span>Jobs Posted</span>
            </div>
            <div className="highlight">
              <h3>10K+</h3>
              <span>Happy Candidates</span>
            </div>
            <div className="highlight">
              <h3>500+</h3>
              <span>Partner Companies</span>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Simple steps to start your career journey with us
          </p>

          <div className="steps">
            <div className="step-card">
              <span>01</span>
              <h3>Contact Us</h3>
              <p>Call or WhatsApp us to discuss your job requirements.</p>
            </div>

            <div className="step-card">
              <span>02</span>
              <h3>Job Matching</h3>
              <p>We match your profile with verified job opportunities.</p>
            </div>

            <div className="step-card">
              <span>03</span>
              <h3>Apply & Interview</h3>
              <p>Apply easily and attend interviews with guidance.</p>
            </div>

            <div className="step-card">
              <span>04</span>
              <h3>Get Placed</h3>
              <p>Start your career with the right company.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>

          <div className="faq-list">
            <div className="faq-item">
              <h4>Is Job Career Point genuine?</h4>
              <p>Yes, we provide verified and genuine job opportunities.</p>
            </div>

            <div className="faq-item">
              <h4>Do you provide jobs for freshers?</h4>
              <p>
                Yes, we offer jobs for both freshers and experienced candidates.
              </p>
            </div>

            <div className="faq-item">
              <h4>How long does placement take?</h4>
              <p>
                Placement time depends on your profile and job availability.
              </p>
            </div>

            <div className="faq-item">
              <h4>How can I apply for a job?</h4>
              <p>You can call or WhatsApp us directly to apply.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
