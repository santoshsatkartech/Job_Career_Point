// ✅ NEW FILE: src/pages/user/AppliedJobsPage.jsx
import { useEffect, useState } from 'react';
import { applicationService } from '../../api/applicationService';

const STATUS_STYLE = {
  PENDING: { background: '#fff3cd', color: '#856404' },
  APPROVED: { background: '#d1e7dd', color: '#0f5132' },
  REJECTED: { background: '#f8d7da', color: '#842029' },
};

export default function AppliedJobsPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService
      .getMyApplications()
      .then(setApps)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="container my-5 text-center">
        <p>Loading your applications...</p>
      </div>
    );

  return (
    <div className="container my-5">
      <h3 className="fw-bold mb-4">My Job Applications ({apps.length})</h3>

      {apps.length === 0 ? (
        <div className="neo-card p-5 text-center">
          <p style={{ fontSize: 18, color: '#888' }}>
            You haven't applied for any jobs yet.
          </p>
          <a href="/jobs" className="btn btn-jobs mt-3">
            Browse Jobs
          </a>
        </div>
      ) : (
        <div className="row g-3">
          {apps.map((app) => (
            <div key={app.id} className="col-md-6">
              <div className="neo-card p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="fw-bold mb-1">{app.jobTitle}</h5>
                    <p className="text-muted mb-1">
                      {app.company} — {app.location}
                    </p>
                    <small className="text-muted">
                      Applied:{' '}
                      {new Date(app.appliedAt).toLocaleDateString('en-IN')}
                    </small>
                  </div>
                  <span
                    className="badge"
                    style={{
                      ...STATUS_STYLE[app.status],
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontWeight: 600,
                    }}
                  >
                    {app.status}
                  </span>
                </div>
                {app.adminNote && (
                  <p
                    className="mt-2 mb-0"
                    style={{ fontSize: 13, color: '#555' }}
                  >
                    <strong>Note:</strong> {app.adminNote}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
