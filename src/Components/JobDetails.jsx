import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styling/JobDetails.css';

export default function JobDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeBase64, setResumeBase64] = useState('');
  const [fileName, setFileName] = useState('');

  if (!job) {
    return (
      <div className="job-details-container">
        <div className="job-not-found">
          <h2>Job not found</h2>
          <button onClick={() => navigate('/jobs')} className="back-btn">
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload and convert to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      e.target.value = '';
      return;
    }

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload PDF, DOC, DOCX, JPG or PNG files only');
      e.target.value = '';
      return;
    }

    setResumeFile(file);
    setFileName(file.name);

    // Convert file to base64 for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setResumeBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const generateWhatsAppMessage = () => {
    const message = `
🎯 *JOB APPLICATION: ${job.role.toUpperCase()}*

👤 *APPLICANT INFORMATION:*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 📛 *Full Name:* ${formData.fullName}
• 📧 *Email:* ${formData.email}
• 📱 *Phone:* ${formData.phone}
• 📄 *Resume:* ${fileName || 'Not attached'}

📋 *JOB DETAILS:*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 🎯 *Position:* ${job.role}
• 📍 *Location:* ${job.location}
• ⏳ *Experience Required:* ${job.experience} years
• 💰 *Salary Offered:* ${job.salary}
• ⏰ *Job Type:* ${job.type}
• 🎓 *Qualification:* ${job.qualification}

📝 *COVER LETTER / INTRODUCTION:*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.coverLetter || 'No cover letter provided.'}

🔄 *APPLICATION STATUS:* Pending Review
📅 *Applied On:* ${new Date().toLocaleDateString()}
⏰ *Applied At:* ${new Date().toLocaleTimeString()}

👉 *Please acknowledge receipt of this application.*
👉 *Send your resume as a file when you send this message.*

Best regards,
${formData.fullName}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*This application was submitted via Careers Portal*
    `.trim();

    return encodeURIComponent(message);
  };

  // Main WhatsApp submission handler
  const handleWhatsAppSubmit = () => {
    // Validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert(
        'Please fill in all required fields: Name, Email, and Phone Number'
      );
      return;
    }

    // Check if resume is selected
    if (!resumeFile) {
      const proceed = window.confirm(
        `⚠️ No resume attached!\n\n` +
          `It's recommended to attach your resume before sending.\n\n` +
          `You can either:\n` +
          `1. Attach resume now and try again\n` +
          `2. Send application without resume and attach later\n\n` +
          `Click OK to proceed without resume, or Cancel to add resume first.`
      );

      if (!proceed) return;
    }

    // WhatsApp number (replace with your actual number)
    const whatsappNumber = '918999112057';

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`;

    // Show instructions modal
    showWhatsAppInstructions(whatsappUrl);
  };

  // Show instructions modal
  const showWhatsAppInstructions = (whatsappUrl) => {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'whatsapp-instructions-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>How to Submit Your Application</h3>
        
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Send Message</h4>
              <p>Click "Open WhatsApp" to send your application details</p>
            </div>
          </div>
          
          ${
            resumeFile
              ? `
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Attach Resume</h4>
              <p>In WhatsApp, click the 📎 attachment icon</p>
              <p>Select "Document" and choose your resume file</p>
              <p><strong>File:</strong> ${fileName}</p>
            </div>
          </div>
          `
              : `
          <div class="step warning">
            <div class="step-number">⚠️</div>
            <div class="step-content">
              <h4>Resume Not Attached</h4>
              <p>You haven't attached a resume. We recommend sending it along with your application.</p>
              <p>You can attach it manually in WhatsApp.</p>
            </div>
          </div>
          `
          }
          
          <div class="step">
            <div class="step-number">${resumeFile ? '3' : '2'}</div>
            <div class="step-content">
              <h4>Review & Send</h4>
              <p>Review the pre-filled message</p>
              <p>Click the send button (➤) to submit</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">${resumeFile ? '4' : '3'}</div>
            <div class="step-content">
              <h4>Confirmation</h4>
              <p>You'll receive a confirmation message from HR</p>
              <p>Save our number: +91 8999112057 </p>
            </div>
          </div>
        </div>
        
        <div class="resume-preview">
          <h4>📄 Resume Preview:</h4>
          ${
            resumeFile
              ? `
          <div class="file-preview">
            <div class="file-icon">📄</div>
            <div class="file-info">
              <strong>${fileName}</strong>
              <small>${(resumeFile.size / 1024).toFixed(2)} KB</small>
            </div>
            <button onclick="window.downloadResume()" class="download-btn">
              ⬇️ Download
            </button>
          </div>
          `
              : `
          <p class="no-resume">No resume selected. You can attach it later in WhatsApp.</p>
          `
          }
        </div>
        
        <div class="modal-buttons">
          <button onclick="window.openWhatsApp()" class="open-whatsapp-btn">
            💬 Open WhatsApp
          </button>
          <button onclick="window.closeModal()" class="cancel-modal-btn">
            Cancel
          </button>
        </div>
        
        <p class="note">
          <strong>Note:</strong> WhatsApp doesn't allow automatic file sending from websites.<br>
          You need to manually attach your resume in WhatsApp.
        </p>
      </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
      .whatsapp-instructions-modal {
        position: fixed;
        top: 55px;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
      }
      .modal-content {
        background: white;
        border-radius: 15px;
        padding: 30px;
        max-width: 900px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
      }
      .steps {
        margin: 20px 0;
      }
      .step {
        display: flex;
        // margin-bottom: 20px;
        align-items: flex-start;
      }
      .step-number {
        background: #25D366;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        flex-shrink: 0;
        font-weight: 400;
        margin-start : 0;
      }
      .step.warning .step-number {
        background: #FF9800;
      }
      .step-content h4 {
        margin: 0 0 5px 0;
        color: #2c3e50;
      }
      .step-content p {
        margin: 0 0 5px 0;
        color: #666;
        font-size: 14px;
      }
      .resume-preview {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 10px;
        margin: 20px 0;
      }
      .file-preview {
        display: flex;
        align-items: center;
        padding: 10px;
        background: white;
        border-radius: 8px;
        margin-top: 10px;
        border: 2px solid #e8f4ff;
      }
      .file-icon {
        font-size: 30px;
        margin-right: 15px;
      }
      .file-info {
        flex: 1;
      }
      .download-btn {
        background: #4a6bff;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
      }
      .modal-buttons {
        display: flex;
        gap: 15px;
        margin-top: 25px;
      }
      .open-whatsapp-btn {
        flex: 1;
        padding: 15px;
        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }
      .cancel-modal-btn {
        flex: 1;
        padding: 15px;
        background: #f8f9fa;
        color: #666;
        border: 1px solid #ddd;
        border-radius: 10px;
        font-size: 16px;
        cursor: pointer;
      }
      .note {
        margin-top: 15px;
        font-size: 12px;
        color: #666;
        text-align: center;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Add global functions for the modal
    window.openWhatsApp = () => {
      window.open(whatsappUrl, '_blank');
      window.closeModal();
    };

    window.closeModal = () => {
      document.body.removeChild(modal);
      document.head.removeChild(style);
    };

    window.downloadResume = () => {
      if (resumeBase64) {
        const link = document.createElement('a');
        link.href = resumeBase64;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
  };

  // Alternative: Download resume and open WhatsApp
  const handleDownloadAndWhatsApp = () => {
    if (!resumeFile) {
      alert('Please select a resume file first');
      return;
    }

    // Create download link for resume
    const link = document.createElement('a');
    link.href = resumeBase64;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Open WhatsApp after a delay
    setTimeout(() => {
      const whatsappNumber = '918999112057';
      const message = `I have downloaded my resume "${fileName}" and I'm ready to send it with my application for ${job.role}`;
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        '_blank'
      );
    }, 1000);
  };

  // Clear resume
  const clearResume = () => {
    setResumeFile(null);
    setResumeBase64('');
    setFileName('');
    // Clear file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="job-details-container">
      <div className="forTopSpacing"></div>
      <div className="job-details-card">
        <button onClick={() => navigate('/jobs')} className="back-btn">
          ← Back to Jobs
        </button>

        <div className="job-details-header">
          <h1 className="job-details-title">{job.role}</h1>
          <div className="job-details-badges">
            <span className="badge type-badge">{job.type}</span>
            <span className="badge location-badge">📍 {job.location}</span>
            <span className="badge experience-badge">
              💼 {job.experience} years
            </span>
          </div>
        </div>

        <div className="job-details-content">
          {/* ... (previous sections remain same) ... */}

          <div className="application-section">
            <h2>📨 Apply for this Position</h2>
            <p className="application-instructions">
              Fill the form below. Your resume will need to be manually attached
              in WhatsApp.
            </p>

            <div className="application-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Enhanced File Upload Section */}
              <div className="form-group">
                <label>Upload Resume (Required for best chances)</label>
                <div className="file-upload-section">
                  {!resumeFile ? (
                    <div className="file-upload-area">
                      <div className="upload-icon">📄</div>
                      <p className="upload-text">Click to upload resume</p>
                      <p className="upload-subtext">
                        PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                        onChange={handleFileChange}
                        className="file-input"
                        id="resumeUpload"
                      />
                    </div>
                  ) : (
                    <div className="file-uploaded">
                      <div className="file-preview-card">
                        <div className="file-icon-large">📄</div>
                        <div className="file-details">
                          <h4>{fileName}</h4>
                          <p>{(resumeFile.size / 1024).toFixed(2)} KB</p>
                          <p className="file-type">
                            {resumeFile.type.includes('pdf')
                              ? 'PDF Document'
                              : resumeFile.type.includes('word')
                                ? 'Word Document'
                                : resumeFile.type.includes('image')
                                  ? 'Image File'
                                  : 'Document'}
                          </p>
                        </div>
                        <div className="file-actions">
                          <button
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = resumeBase64;
                              link.download = fileName;
                              link.click();
                            }}
                            className="action-btn download-action"
                          >
                            ⬇️ Download
                          </button>
                          <button
                            onClick={clearResume}
                            className="action-btn remove-action"
                          >
                            🗑️ Remove
                          </button>
                        </div>
                      </div>
                      <div className="upload-note">
                        <span className="note-icon">ℹ️</span>
                        This file will NOT be sent automatically. You'll need to
                        attach it manually in WhatsApp.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Cover Letter (Optional)</label>
                <textarea
                  name="coverLetter"
                  placeholder="Tell us why you're the right fit for this position..."
                  rows="4"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* WhatsApp Submission Options */}
          <div className="whatsapp-submission-section">
            <h3>📱 Submit via WhatsApp</h3>

            <div className="whatsapp-options">
              <div className="whatsapp-option">
                <div className="option-header">
                  <span className="option-icon">💬</span>
                  <h4>Standard Submission</h4>
                </div>
                <p>
                  Send application details via WhatsApp with instructions to
                  attach resume
                </p>
                <button
                  onClick={handleWhatsAppSubmit}
                  className="whatsapp-submit-btn"
                  disabled={
                    !formData.fullName || !formData.email || !formData.phone
                  }
                >
                  Send via WhatsApp
                </button>
              </div>

              {resumeFile && (
                <div className="whatsapp-option">
                  <div className="option-header">
                    <span className="option-icon">📥</span>
                    <h4>Download & Send</h4>
                  </div>
                  <p>
                    Download your resume first, then open WhatsApp to send both
                  </p>
                  <button
                    onClick={handleDownloadAndWhatsApp}
                    className="download-whatsapp-btn"
                  >
                    Download Resume & Open WhatsApp
                  </button>
                </div>
              )}

              <div className="whatsapp-instruction-card">
                <h4>📋 How to Submit with Resume:</h4>
                <ol>
                  <li>Fill all required fields above</li>
                  <li>Click "Send via WhatsApp"</li>
                  <li>WhatsApp will open with your details</li>
                  <li>Click the 📎 attachment icon in WhatsApp</li>
                  <li>Select "Document" and choose your resume</li>
                  <li>Review and send the message</li>
                </ol>
                <div className="whatsapp-tip">
                  <strong>💡 Tip:</strong> Save your resume in an easily
                  accessible location on your phone before starting.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="job-details-footer">
          <button onClick={() => navigate('/jobs')} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
