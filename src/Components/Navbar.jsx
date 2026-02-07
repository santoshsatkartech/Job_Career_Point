import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../Styling/Navbar.css';

const Navbar = () => {
  const collapseRef = useRef(null);
  const togglerRef = useRef(null);

  const handleNavClick = () => {
    if (collapseRef.current?.classList.contains('show')) {
      collapseRef.current.classList.remove('show');
      togglerRef.current?.classList.add('collapsed');
      togglerRef.current?.setAttribute('aria-expanded', 'false');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top justify-content-center">
      <div className="container custom-navbar">
        {/* LEFT – LOGO */}
        <NavLink className="navbar-brand" to="/">
          <img src="./illustration/Logo_2.png" alt="Logo" />
        </NavLink>

        {/* TOGGLER */}
        <button
          ref={togglerRef}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CENTER + RIGHT */}
        <div
          ref={collapseRef}
          className="collapse navbar-collapse"
          id="mainNavbar"
        >
          {/* CENTER MENU */}
          <ul className="navbar-nav mx-auto nav-center text-center">
            <li className="nav-item">
              <NavLink onClick={handleNavClick} className="nav-link" to="/">
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={handleNavClick}
                className="nav-link"
                to="/about"
              >
                ABOUT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={handleNavClick} className="nav-link" to="/jobs">
                JOBS
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={handleNavClick}
                className="nav-link"
                to="/contact"
              >
                CONTACT
              </NavLink>
            </li>
          </ul>

          {/* RIGHT BUTTONS */}
          <div className="nav-actions ms-lg-auto text-center">
            <a href="tel:8999112057" className="btn btn-call">
              CALL NOW
            </a>
            <NavLink to="/jobs" className="btn btn-jobs">
              VIEW JOBS
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
