import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Styling/Jobs.css';

const data = [
  {
    title: 'IT & Software',
    icon: '💻',
    jobs: [
      {
        role: 'Full Stack Developer',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
      {
        role: 'Java Developer',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
      {
        role: 'React Developer',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
      {
        role: 'Software Developer',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
      {
        role: 'Frontend Developer',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
      {
        role: 'Backend Developer',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
      {
        role: 'UI/UX Developer',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
      {
        role: 'Data Analyst',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
      {
        role: 'AI / ML Engineer',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
      {
        role: 'DevOps Engineer',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
      {
        role: 'Cloud Engineer',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
      {
        role: 'QA / Software Tester',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
      {
        role: 'Automation Tester',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
      {
        role: 'Cyber Security Analyst',
        salary: 'Fresher: 3–6 LPA | Experience: 20% Hike',
        location: 'Pune (All Locations)',
      },
    ],
  },
  {
    title: 'Bank Jobs',
    icon: '🏦',
    jobs: [
      {
        role: 'Bank Clerk',
        salary: 'Fresher: 3–6 LPA | Experience: 6 LPA & Above',
        location: 'Pune (All Locations) / PAN India',
      },
      {
        role: 'Probationary Officer (PO)',
        salary: 'Fresher: 3–6 LPA | Experience: 6 LPA & Above',
        location: 'Pune (All Locations) / PAN India',
      },
      {
        role: 'Relationship Manager',
        salary: 'Fresher: 3–6 LPA | Experience: 6 LPA & Above',
        location: 'Pune (All Locations) / PAN India',
      },
      {
        role: 'Banking Executive',
        salary: 'Fresher: 3–6 LPA | Experience: 6 LPA & Above',
        location: 'Pune (All Locations) / PAN India',
      },
      {
        role: 'Customer Service Officer',
        salary: 'Fresher: 3–6 LPA | Experience: 6 LPA & Above',
        location: 'Pune (All Locations) / PAN India',
      },
      {
        role: 'Credit Analyst',
        salary: 'Fresher: 3–6 LPA | Experience: 6 LPA & Above',
        location: 'Pune (All Locations) / PAN India',
      },
      {
        role: 'Loan Officer',
        salary: 'Fresher: 3–6 LPA | Experience: 6 LPA & Above',
        location: 'Pune (All Locations) / PAN India',
      },
      {
        role: 'Branch Manager',
        salary: 'Fresher: 3–6 LPA | Experience: 6 LPA & Above',
        location: 'Pune (All Locations) / PAN India',
      },
      {
        role: 'Operations Executive',
        salary: 'Fresher: 3–6 LPA | Experience: 6 LPA & Above',
        location: 'Pune (All Locations) / PAN India',
      },
      {
        role: 'Risk Analyst',
        salary: 'Fresher: 3–6 LPA | Experience: 6 LPA & Above',
        location: 'Pune (All Locations) / PAN India',
      },
      {
        role: 'Compliance Officer',
        salary: 'Fresher: 3–6 LPA | Experience: 6 LPA & Above',
        location: 'Pune (All Locations) / PAN India',
      },
      {
        role: 'Accounts Officer',
        salary: 'Fresher: 3–6 LPA | Experience: 6 LPA & Above',
        location: 'Pune (All Locations) / PAN India',
      },
    ],
  },
  {
    title: 'Diploma / Engineering (All Trades)',
    icon: '🛠️',
    jobs: [
      {
        role: 'Mechanical Engineer',
        salary: 'Fresher: ₹18K–₹20K | Experience: ₹21K & Above',
        location: 'Pan India',
      },
      {
        role: 'Electrical Engineer',
        salary: 'Fresher: ₹18K–₹20K | Experience: ₹21K & Above',
        location: 'Pan India',
      },
      {
        role: 'Electronics Engineer',
        salary: 'Fresher: ₹18K–₹20K | Experience: ₹21K & Above',
        location: 'Pan India',
      },
      {
        role: 'Automobile Engineer',
        salary: 'Fresher: ₹18K–₹20K | Experience: ₹21K & Above',
        location: 'Pan India',
      },
      {
        role: 'Production Engineer',
        salary: 'Fresher: ₹18K–₹20K | Experience: ₹21K & Above',
        location: 'Pan India',
      },
      {
        role: 'Instrumentation Engineer',
        salary: 'Fresher: ₹18K–₹20K | Experience: ₹21K & Above',
        location: 'Pan India',
      },
    ],
  },
  {
    title: 'ITI (All Trades)',
    icon: '🔧',
    jobs: [
      {
        role: 'Fitter',
        salary: 'Fresher: ₹15K–₹18K | Experience: ₹20K & Above',
        location: 'Pan India',
      },
      {
        role: 'Electrician',
        salary: 'Fresher: ₹15K–₹18K | Experience: ₹20K & Above',
        location: 'Pan India',
      },
      {
        role: 'Plumber',
        salary: 'Fresher: ₹15K–₹18K | Experience: ₹20K & Above',
        location: 'Pan India',
      },
      {
        role: 'Welder',
        salary: 'Fresher: ₹15K–₹18K | Experience: ₹20K & Above',
        location: 'Pan India',
      },
      {
        role: 'Turner',
        salary: 'Fresher: ₹15K–₹18K | Experience: ₹20K & Above',
        location: 'Pan India',
      },
      {
        role: 'Machinist',
        salary: 'Fresher: ₹15K–₹18K | Experience: ₹20K & Above',
        location: 'Pan India',
      },
      {
        role: 'Diesel Mechanic',
        salary: 'Fresher: ₹15K–₹18K | Experience: ₹20K & Above',
        location: 'Pan India',
      },
      {
        role: 'Motor Mechanic',
        salary: 'Fresher: ₹15K–₹18K | Experience: ₹20K & Above',
        location: 'Pan India',
      },
      {
        role: 'Refrigeration & Air Conditioning (RAC) Mechanic',
        salary: 'Fresher: ₹15K–₹18K | Experience: ₹20K & Above',
        location: 'Pan India',
      },
      {
        role: 'CNC Operator',
        salary: 'Fresher: ₹15K–₹18K | Experience: ₹20K & Above',
        location: 'Pan India',
      },
      {
        role: 'Painter',
        salary: 'Fresher: ₹15K–₹18K | Experience: ₹20K & Above',
        location: 'Pan India',
      },
      {
        role: 'Carpenter',
        salary: 'Fresher: ₹15K–₹18K | Experience: ₹20K & Above',
        location: 'Pan India',
      },
    ],
  },
  {
    title: 'General Worker & Support Staff',
    icon: '🧹',
    jobs: [
      {
        role: 'Helper',
        salary: '₹10K–₹15K',
        location: 'All Over Maharashtra',
      },
      {
        role: 'Housekeeping Staff',
        salary: '₹10K–₹15K',
        location: 'All Over Maharashtra',
      },
      {
        role: 'Office Boy',
        salary: '₹10K–₹15K',
        location: 'All Over Maharashtra',
      },
      {
        role: 'Factory Helper',
        salary: '₹10K–₹15K',
        location: 'All Over Maharashtra',
      },
      {
        role: 'Warehouse Helper',
        salary: '₹10K–₹15K',
        location: 'All Over Maharashtra',
      },
      {
        role: 'Cleaning Staff',
        salary: '₹10K–₹15K',
        location: 'All Over Maharashtra',
      },
      {
        role: 'Peon',
        salary: '₹10K–₹15K',
        location: 'All Over Maharashtra',
      },
      {
        role: 'Security Helper',
        salary: '₹10K–₹15K',
        location: 'All Over Maharashtra',
      },
    ],
  },
  {
    title: 'MBA Jobs',
    icon: '📊',
    jobs: [
      {
        role: 'HR Executive',
        salary: 'Fresher: 20–25K | Experience: 25K+',
        location: 'PAN India',
      },
      {
        role: 'Marketing Executive',
        salary: 'Fresher: 20–25K | Experience: 25K+',
        location: 'PAN India',
      },
      {
        role: 'Business Analyst',
        salary: 'Fresher: 20–25K | Experience: 25K+',
        location: 'PAN India',
      },
      {
        role: 'Operations Executive',
        salary: 'Fresher: 20–25K | Experience: 25K+',
        location: 'PAN India',
      },
      {
        role: 'Finance Executive',
        salary: 'Fresher: 20–25K | Experience: 25K+',
        location: 'PAN India',
      },
      {
        role: 'Sales Manager',
        salary: 'Fresher: 20–25K | Experience: 25K+',
        location: 'PAN India',
      },
    ],
  },
  {
    title: 'Pharmacy Jobs',
    icon: '💊',
    jobs: [
      {
        role: 'Pharmacist',
        salary: 'Fresher: 20–25K | Experience: 25K+',
        location: 'PAN India',
      },
      {
        role: 'Medical Representative',
        salary: 'Fresher: 20–25K | Experience: 25K+',
        location: 'PAN India',
      },
      {
        role: 'Clinical Research Associate',
        salary: 'Fresher: 20–25K | Experience: 25K+',
        location: 'PAN India',
      },
      {
        role: 'Quality Control Executive',
        salary: 'Fresher: 20–25K | Experience: 25K+',
        location: 'PAN India',
      },
      {
        role: 'Production Executive',
        salary: 'Fresher: 20–25K | Experience: 25K+',
        location: 'PAN India',
      },
      {
        role: 'Drug Safety Associate',
        salary: 'Fresher: 20–25K | Experience: 25K+',
        location: 'PAN India',
      },
    ],
  },
];

const Jobs = () => {
  const scrollRefs = useRef([]);

  const scroll = (idx, dir) => {
    const el = scrollRefs.current[idx];
    if (!el) return;
    el.scrollBy({
      left: dir === 'next' ? el.offsetWidth / 2 : -el.offsetWidth / 2,
      behavior: 'smooth',
    });
  };

  const handleDrag = (el) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    el.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });

    el.addEventListener('mouseleave', () => (isDown = false));
    el.addEventListener('mouseup', () => (isDown = false));

    el.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    });
  };

  useEffect(() => {
    scrollRefs.current.forEach((el) => el && handleDrag(el));
  }, []);

  return (
    <>
      <div className="for_margin"></div>
      <div className="jobs-container">
        {data.map((cat, idx) => (
          <section key={idx} className="jobs-group">
            {/* Header */}
            <div className="jobs-header">
              <h4 className="jobs-title">
                {cat.icon} {cat.title}
              </h4>
            </div>

            {/* Cards with overlayed caret buttons */}
            <div className="hs-wrapper">
              <button
                className="hs-prev caret-btn"
                onClick={() => scroll(idx, 'prev')}
                aria-label={`Scroll ${cat.title} left`}
              >
                <i className="bi bi-caret-left" />
              </button>

              <div className="hs" ref={(el) => (scrollRefs.current[idx] = el)}>
                {cat.jobs.map((job, j) => (
                  <article key={j} className="hs-item job-card">
                    <div className="job-card-body">
                      <h6 className="job-role">{job.role}</h6>
                      <p className="job-salary">💰 {job.salary}</p>
                      <p className="job-location">📍 {job.location}</p>
                      <Link to="/user-form" className="apply-btn">
                        Apply Now
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <button
                className="hs-next caret-btn"
                onClick={() => scroll(idx, 'next')}
                aria-label={`Scroll ${cat.title} right`}
              >
                <i className="bi bi-caret-right" />
              </button>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Jobs;
