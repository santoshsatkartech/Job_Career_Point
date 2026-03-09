import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../api/jobService';
import { useAuth } from '../context/AuthContext';
import '../Styling/Jobs.css';

export default function Jobs() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth(); // Get user from auth context

  const [allJobs, setAllJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const [appliedIds, setAppliedIds] = useState([]);
  const [applyMsg, setApplyMsg] = useState('');

  // Offcanvas state
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    resumeLink: '', // Changed from coverLetter to resumeLink
  });
  const [submitting, setSubmitting] = useState(false);

  // Prevent body scroll when offcanvas is open
  useEffect(() => {
    if (isOffcanvasOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOffcanvasOpen]);

  // Fetch jobs from backend on load
  useEffect(() => {
    jobService
      .getAllActiveJobs()
      .then((data) => {
        setAllJobs(data);
        setFiltered(data);
      })
      .catch(() => setError('Failed to load jobs. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  // Re-filter when dropdowns change
  useEffect(() => {
    const result = allJobs.filter(
      (job) =>
        (!category || job.category === category) &&
        (!location || job.location === location) &&
        (!experience || job.experience === experience)
    );
    setFiltered(result);
    setVisibleCount(8);
  }, [category, location, experience, allJobs]);

  // Unique dropdown values from live data
  const categories = [
    ...new Set(allJobs.map((j) => j.category).filter(Boolean)),
  ];
  const locations = [
    ...new Set(allJobs.map((j) => j.location).filter(Boolean)),
  ];
  const experiences = [
    ...new Set(allJobs.map((j) => j.experience).filter(Boolean)),
  ];
  const visibleJobs = filtered.slice(0, visibleCount);

  const handleApplyClick = (job) => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    // Pre-fill form with user data from auth context
    setApplicationForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      qualification: user?.qualification || '',
      experience: user?.experience || '',
      resumeLink: user?.resumeLink || '', // Pre-fill resume link if available
    });

    setSelectedJob(job);
    setIsOffcanvasOpen(true);
  };

  const handleFormChange = (e) => {
    setApplicationForm({
      ...applicationForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setApplyMsg('');

    try {
      const { applicationService } = await import('../api/applicationService');
      await applicationService.applyForJob(selectedJob.id, {
        ...applicationForm,
        jobId: selectedJob.id,
      });

      setAppliedIds((prev) => [...prev, selectedJob.id]);
      setApplyMsg(`✅ Applied for ${selectedJob.title} successfully!`);
      closeOffcanvas();
    } catch (err) {
      const msg = err.response?.data?.message || '';
      if (msg.toLowerCase().includes('already')) {
        setAppliedIds((prev) => [...prev, selectedJob.id]);
        setApplyMsg('ℹ️ You have already applied for this job.');
        closeOffcanvas();
      } else {
        setApplyMsg('❌ Application failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
    // Delay clearing selected job to allow animation to complete
    setTimeout(() => {
      setSelectedJob(null);
    }, 300);
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading jobs...</p>
      </div>
    );

  return (
    <div className="jobs-page">
      {/* Hero Section */}
      <section className="jobs-hero">
        <div className="container">
          <div className="jobs-hero-content">
            <span className="hero-badge">Find Your Dream Job</span>
            <h1 className="jobs-hero-title">
              Discover <span className="text-gradient">Opportunities</span>
            </h1>
            <p className="jobs-hero-description">
              Browse through thousands of job opportunities tailored to your
              skills and experience
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-container">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="filter-select"
              value={category}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setLocation(e.target.value)}
              className="filter-select"
              value={location}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setExperience(e.target.value)}
              className="filter-select"
              value={experience}
            >
              <option value="">All Experience</option>
              {experiences.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message Display */}
        {error && (
          <div className="message-alert error">
            <span className="message-icon">⚠</span>
            {error}
          </div>
        )}

        {applyMsg && (
          <div
            className={`message-alert ${
              applyMsg.startsWith('✅')
                ? 'success'
                : applyMsg.startsWith('ℹ️')
                  ? 'info'
                  : 'error'
            }`}
          >
            <span className="message-icon">
              {applyMsg.startsWith('✅')
                ? '✓'
                : applyMsg.startsWith('ℹ️')
                  ? 'ℹ️'
                  : '⚠'}
            </span>
            {applyMsg}
          </div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No Jobs Found</h3>
            <p>
              {allJobs.length === 0
                ? 'No jobs posted yet. Check back soon!'
                : 'No jobs match your filters. Try adjusting your criteria.'}
            </p>
          </div>
        )}

        {/* Job Cards Grid */}
        <div className="jobs-grid">
          {visibleJobs.map((job, index) => (
            <div
              key={job.id}
              className="job-card"
              style={{ '--card-index': index }}
            >
              <div className="job-card-header">
                <div>
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-badges">
                    <span className="job-badge location">
                      <svg
                        className="badge-icon"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {job.location}
                    </span>
                    <span className="job-badge type">
                      <svg
                        className="badge-icon"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {job.jobType?.replace('_', ' ') || 'Full Time'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="job-card-content">
                <div className="job-detail-item">
                  <span className="detail-icon">🎓</span>
                  <span className="detail-text">
                    <strong>Qualification:</strong>{' '}
                    {job.qualification || 'Not specified'}
                  </span>
                </div>

                <div className="job-detail-item">
                  <span className="detail-icon">💼</span>
                  <span className="detail-text">
                    <strong>Experience:</strong>{' '}
                    {job.experience || 'Not specified'}
                  </span>
                </div>

                {job.salaryRange && (
                  <div className="job-detail-item">
                    <span className="detail-icon">💰</span>
                    <span className="detail-text">
                      <strong>Salary:</strong>{' '}
                      <span className="salary-text">{job.salaryRange}</span>
                    </span>
                  </div>
                )}

                {job.category && (
                  <div className="job-detail-item">
                    <span className="detail-icon">📂</span>
                    <span className="detail-text">
                      <strong>Category:</strong> {job.category}
                    </span>
                  </div>
                )}

                {job.skills && (
                  <div className="skills-preview">
                    <strong>Skills:</strong>
                    <div className="skill-tags">
                      {job.skills
                        .split(',')
                        .slice(0, 3)
                        .map((skill, i) => (
                          <span key={i} className="skill-tag">
                            {skill.trim()}
                          </span>
                        ))}
                      {job.skills.split(',').length > 3 && (
                        <span className="skill-tag more">
                          +{job.skills.split(',').length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="job-card-footer">
                <button
                  className={`apply-button ${appliedIds.includes(job.id) ? 'applied' : ''}`}
                  onClick={() => handleApplyClick(job)}
                  disabled={appliedIds.includes(job.id)}
                >
                  {appliedIds.includes(job.id) ? (
                    <>
                      <svg
                        className="button-icon"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Applied
                    </>
                  ) : (
                    'Apply Now'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filtered.length && (
          <div className="load-more-container">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="load-more-button"
            >
              View More Jobs
              <svg
                className="button-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Offcanvas - Application Form */}
      <div className={`offcanvas-wrapper ${isOffcanvasOpen ? 'active' : ''}`}>
        <div className="offcanvas-overlay" onClick={closeOffcanvas}></div>
        <div className="offcanvas-panel">
          {selectedJob && (
            <>
              <div className="offcanvas-header">
                <h2>{selectedJob.title}</h2>
                <button className="close-button" onClick={closeOffcanvas}>
                  ×
                </button>
              </div>

              <div className="offcanvas-body">
                {/* Job Summary */}
                <div className="job-summary">
                  <h3>Job Details</h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Location</span>
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Type</span>
                      <span>
                        {selectedJob.jobType?.replace('_', ' ') || 'Full Time'}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Experience</span>
                      <span>{selectedJob.experience || 'Not specified'}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Salary</span>
                      <span className="salary-text">
                        {selectedJob.salaryRange || 'Not disclosed'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                {selectedJob.skills && (
                  <div className="skills-section">
                    <h3>Required Skills</h3>
                    <div className="skills-grid">
                      {selectedJob.skills.split(',').map((skill, index) => (
                        <span key={index} className="skill-badge">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Job Description */}
                {selectedJob.description && (
                  <div className="description-section">
                    <h3>Job Description</h3>
                    <div className="description-content">
                      {selectedJob.description
                        .split('\n')
                        .map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                  </div>
                )}

                {/* Application Form - Updated */}
                <form onSubmit={handleApplySubmit} className="application-form">
                  <h3>Application Details</h3>

                  <p className="form-note">
                    <span className="info-icon">ℹ️</span>
                    Your profile information has been pre-filled. You can edit
                    if needed.
                  </p>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={applicationForm.name}
                        onChange={handleFormChange}
                        required
                        placeholder="Enter your full name"
                        className="prefilled"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={applicationForm.email}
                        onChange={handleFormChange}
                        required
                        placeholder="Enter your email"
                        className="prefilled"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={applicationForm.phone}
                        onChange={handleFormChange}
                        required
                        placeholder="Enter your phone number"
                        className="prefilled"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="qualification">Qualification</label>
                      <input
                        type="text"
                        id="qualification"
                        name="qualification"
                        value={applicationForm.qualification}
                        onChange={handleFormChange}
                        placeholder="e.g., B.Tech, MBA"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="experience">Years of Experience</label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={applicationForm.experience}
                      onChange={handleFormChange}
                      placeholder="e.g., 2 years, Fresher"
                    />
                  </div>

                  {/* New Resume Link Field - Optional */}
                  <div className="form-group">
                    <label htmlFor="resumeLink">
                      Resume Link{' '}
                      <span className="optional-badge">Optional</span>
                    </label>
                    <input
                      type="url"
                      id="resumeLink"
                      name="resumeLink"
                      value={applicationForm.resumeLink}
                      onChange={handleFormChange}
                      placeholder="https://drive.google.com/your-resume-link"
                    />
                    <small className="field-hint">
                      Share a link to your resume (Google Drive, Dropbox, etc.)
                    </small>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={closeOffcanvas}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-small"></span>
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
