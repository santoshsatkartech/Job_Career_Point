import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Particles from '../Components/Particles';
import '../Styling/Home.css';

const Home = () => {
  useEffect(() => {
    const section = document.querySelector('.why-choose');
    const counters = document.querySelectorAll('.counter');
    const reveals = document.querySelectorAll('.reveal');

    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;

            counters.forEach((counter) => {
              const target = +counter.dataset.target;

              const update = () => {
                const current = +counter.innerText;
                const increment = target / 80;

                if (current < target) {
                  counter.innerText = Math.ceil(current + increment);
                  requestAnimationFrame(update);
                } else {
                  counter.innerText = target.toLocaleString() + '+';
                }
              };
              update();
            });

            reveals.forEach((el) => el.classList.add('active'));
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      q: 'Is Job Career Point genuine?',
      a: 'Yes, we provide verified and genuine job opportunities.',
    },
    {
      q: 'Do you provide jobs for freshers?',
      a: 'Yes, we offer jobs for both freshers and experienced candidates.',
    },
    {
      q: 'How long does placement take?',
      a: 'Placement time depends on your profile and job availability.',
    },
    {
      q: 'How can I apply for a job?',
      a: 'You can call or WhatsApp us directly to apply.',
    },

    {
      q: 'Which locations do you provide jobs in?',
      a: 'We provide opportunities across multiple cities depending on employer availability.',
    },
    {
      q: 'Will you help with interview preparation?',
      a: 'Yes, we guide candidates with interview tips and preparation support.',
    },
  ];

  const toggle = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // close if same clicked
    } else {
      setActiveIndex(index);
    }
  };

  const categories = [
    {
      title: 'IT & Software',
      count: '342 Jobs',
      icon: '💻',
      desc: 'Developer, QA, DevOps & software roles',
    },
    {
      title: 'Digital Marketing',
      count: '218 Jobs',
      icon: '📈',
      desc: 'SEO, social media & performance marketing',
    },
    {
      title: 'Finance & Accounting',
      count: '186 Jobs',
      icon: '💰',
      desc: 'Accounts, audit, banking & finance roles',
    },
    {
      title: 'Healthcare & Pharma',
      count: '154 Jobs',
      icon: '🏥',
      desc: 'Medical, pharma & healthcare services',
    },
    {
      title: 'Education & Training',
      count: '129 Jobs',
      icon: '🎓',
      desc: 'Teaching, trainers & academic roles',
    },
    {
      title: 'Manufacturing',
      count: '97 Jobs',
      icon: '🏭',
      desc: 'Factory, production & quality jobs',
    },
    {
      title: 'Sales & Business Dev',
      count: '204 Jobs',
      icon: '🤝',
      desc: 'Sales, growth & client management',
    },
    {
      title: 'HR & Recruitment',
      count: '88 Jobs',
      icon: '🧑‍💼',
      desc: 'Hiring, payroll & people operations',
    },
  ];

  return (
    <>
      <section className="hero">
        <Particles />
        <div className="hero-container">
          <img
            src="./background/search.png"
            alt="hero_bg"
            className="Hero_bg"
            data-aos="zoom-in-left"
          />
          <img
            src="./background/circle.png"
            alt="hero_bg"
            className="Hero_bg_mo"
            data-aos="zoom-in-left"
          />
          <div
            className="hero_collect "
            data-aos="zoom-in-up"
            data-aos-duration="1500"
          >
            <h3 className="hero-title">
              FIND YOUR <br />
              DREAM JOB
            </h3>
            <h1 className="heading">JOB CAREER POINT</h1>
            <p className="caption">Easiest way to find a perfect job.</p>
            <p className="caption">
              Your Trusted Partner In Job Placement And Career Growth.
            </p>

            <div className="hero-buttons">
              <a href="tel:+918999112057" className="btn call-btn d-lg-none">
                📞 Call Now
              </a>

              <a
                href="https://wa.me/918999112057?text=Hello%20this%20is%20in%20reference%20to%20your%20website%20i%20would%20to%20like%20you%20know%20a%20few%20thing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn whatsapp-btn d-lg-none"
              >
                <i className="bi bi-whatsapp"></i> &nbsp; WhatsApp Us
              </a>

              <a href="/jobs" className="btn job-btn d-lg-none">
                🔍 View Jobs
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="highlights row d-flex  g-0 justify-content-center">
        <div className="home-card col-12 col-md-4" data-aos="zoom-in-up">
          <h2>7,000+ Candidates placed</h2>
        </div>
        <div className="home-card col-12 col-md-4" data-aos="zoom-in-up">
          <h2>Trusted Placement Consultancy</h2>
        </div>
        <div className="home-card col-12 col-md-4" data-aos="zoom-in-up">
          <h2>Fresher and Experienced Jobs</h2>
        </div>
      </section>

      <section className="job-categories">
        <div className="container">
          <h2 className="section-title">
            <span>1000+</span> Active Jobs
          </h2>
          <h2 className="section-title">Browse From Our Top Categories</h2>

          <p className="section-subtitle">
            Explore verified jobs across multiple industries
          </p>

          {/* Infinite Scroll Wrapper */}
          <div className="categories-scroll-wrapper">
            <div className="categories-scroll-track">
              {[...categories, ...categories].map((cat, index) => (
                <div className="category-card" key={index}>
                  <div className="category-icon">{cat.icon}</div>
                  <h3>{cat.title}</h3>
                  <p className="category-desc">{cat.desc}</p>
                  <span>{cat.count}</span>
                  <br />
                  <Link to="/jobs" className="btn job-card-btn">
                    View Jobs
                  </Link>
                </div>
              ))}
            </div>
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
            <div className="highlight reveal">
              <h3 className="counter" data-target="1000">
                0
              </h3>
              <span>Jobs Posted</span>
            </div>

            <div className="highlight reveal">
              <h3 className="counter" data-target="7000">
                0
              </h3>
              <span>Happy Candidates</span>
            </div>

            <div className="highlight reveal">
              <h3 className="counter" data-target="100">
                0
              </h3>
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
            {faqs.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              >
                <div className="faq-question" onClick={() => toggle(index)}>
                  <h4>{item.q}</h4>
                  <span>{activeIndex === index ? '-' : '+'}</span>
                </div>

                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
