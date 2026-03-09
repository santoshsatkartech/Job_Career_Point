import { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../Styling/Navbar.css';

const Navbar = () => {
  const collapseRef = useRef(null);
  const togglerRef = useRef(null);

  const {logout, isAdmin, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (
        window.innerWidth > 991 &&
        collapseRef.current?.classList.contains('show')
      ) {
        collapseRef.current.classList.remove('show');
        togglerRef.current?.classList.add('collapsed');
        togglerRef.current?.setAttribute('aria-expanded', 'false');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = () => {
    if (collapseRef.current?.classList.contains('show')) {
      collapseRef.current.classList.remove('show');
      togglerRef.current?.classList.add('collapsed');
      togglerRef.current?.setAttribute('aria-expanded', 'false');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleNavClick();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid navbar-container">
        {/* Logo Only - No Text */}
        <NavLink className="navbar-brand" to="/" onClick={handleNavClick}>
          <img
            src="./illustration/Logo_2.png"
            alt="Company Logo"
            className="navbar-logo"
          />
        </NavLink>

        {/* Mobile Toggler */}
        <button
          ref={togglerRef}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="toggler-icon"></span>
        </button>

        {/* Navigation Content */}
        <div
          ref={collapseRef}
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          {/* Main Navigation Links */}
          <ul className="navbar-nav mx-auto nav-links">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                onClick={handleNavClick}
              >
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                onClick={handleNavClick}
              >
                ABOUT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                onClick={handleNavClick}
              >
                JOBS
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                onClick={handleNavClick}
              >
                CONTACT
              </NavLink>
            </li>

            {/* Conditional User Links */}
            {isLoggedIn() && !isAdmin() && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                    onClick={handleNavClick}
                  >
                    PROFILE
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/testimonials"
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                    onClick={handleNavClick}
                  >
                    TESTIMONIALS
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Link */}
            {isAdmin() && (
              <li className="nav-item">
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? 'nav-link admin-link active'
                      : 'nav-link admin-link'
                  }
                  onClick={handleNavClick}
                >
                  ADMIN
                </NavLink>
              </li>
            )}
          </ul>

          {/* Right Side Actions */}
          <div className="nav-actions">
            {!isAdmin() && (
              <a href="tel:+918999112057" className="action-link">
                <svg
                  className="btn-icon-og"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8 10a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>CALL NOW</span>
              </a>
            )}

            {isLoggedIn() ? (
              <button onClick={handleLogout} className="btn btn-logout">
                <svg
                  className="btn-icon-og"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <path d="M16 17l5-5-5-5" />
                  <path d="M21 12H9" />
                </svg>
                <span>LOGOUT</span>
              </button>
            ) : (
              <NavLink
                to="/login"
                className="btn btn-login"
                onClick={handleNavClick}
              >
                <svg
                  className="btn-icon-og"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                  <path d="M10 17l5-5-5-5" />
                  <path d="M15 12H3" />
                </svg>
                <span>LOGIN</span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
