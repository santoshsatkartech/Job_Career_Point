import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../Styling/Navbar.css';

const Navbar = () => {
  const collapseRef = useRef(null);
  const togglerRef = useRef(null);

  const handleNavLinkClick = () => {
    const collapseEl = collapseRef.current;
    const togglerEl = togglerRef.current;
    if (collapseEl && collapseEl.classList.contains('show')) {
      collapseEl.classList.remove('show');
      if (togglerEl) {
        togglerEl.classList.add('collapsed');
        togglerEl.setAttribute('aria-expanded', 'false');
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg w-100 justify-content-center">
      <div className="container">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img src="/Logo_2.png" alt="Logo" />
        </NavLink>

        {/* Toggler */}
        <button
          ref={togglerRef}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          ref={collapseRef}
          className="collapse navbar-collapse mobile-center-menu"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center text-center">
            <li className="nav-item">
              <NavLink onClick={handleNavLinkClick} className="nav-link" to="/">
                HOME
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                onClick={handleNavLinkClick}
                className="nav-link"
                to="/about"
              >
                ABOUT
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                onClick={handleNavLinkClick}
                className="nav-link"
                to="/jobs"
              >
                JOBS
              </NavLink>
            </li>

            {/* <li className="nav-item">
              <NavLink
                onClick={handleNavLinkClick}
                className="nav-link"
                to="/testimonials"
              >
                TESTIMONIALS
              </NavLink>
            </li> */}

            {/* Mobile Contact */}
            <li className="nav-item d-lg-none">
              <NavLink
                onClick={handleNavLinkClick}
                className="nav-link nav-contact"
                to="/contact"
              >
                CONTACT US
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Desktop Contact */}
        <ul className="navbar-nav d-none d-lg-flex">
          <li className="nav-item">
            <NavLink className="nav-link nav-contact" to="/contact">
              CONTACT US
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
