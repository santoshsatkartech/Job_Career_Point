import { Analytics } from '@vercel/analytics/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import JobDetails from './Components/JobDetails';
import Navbar from './Components/Navbar';
import ScrollToTop from './Components/ScrollToTop';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Jobs from './Pages/Jobs';
import Testimonials from './Pages/Testimonials';

// ✅ Auth pages — inside src/Pages/auth/
import LoginPage from './Pages/auth/LoginPage';
import RegisterPage from './Pages/auth/RegisterPage';

// ✅ User pages — inside src/Pages/user/
import AppliedJobsPage from './Pages/user/AppliedJobsPage';
import ProfilePage from './Pages/user/ProfilePage';
import TestimonialSubmit from './Pages/user/TestimonialSubmit';

// ✅ Admin pages — inside src/Pages/admin/
import AdminApplicationsPage from './Pages/admin/AdminApplicationsPage';
import AdminContactsPage from './Pages/admin/AdminContactsPage';
import AdminDashboard from './Pages/admin/AdminDashboard';
import AdminJobsPage from './Pages/admin/AdminJobsPage';
import AdminTestimonialsPage from './Pages/admin/AdminTestimonialsPage';
import AdminUsersPage from './Pages/admin/AdminUsersPage';

// ✅ ProtectedRoute — inside src/Components/common/
import ProtectedRoute from './Components/common/ProtectedRoute';

const App = () => {
  AOS.init();
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        {/* Your existing routes — UNCHANGED */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/job-details" element={<JobDetails />} />

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User routes (require login) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <AppliedJobsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-testimonial"
          element={
            <ProtectedRoute>
              <TestimonialSubmit />
            </ProtectedRoute>
          }
        />

        {/* Admin routes (require ADMIN role) */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute adminOnly>
              <AdminJobsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute adminOnly>
              <AdminApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <ProtectedRoute adminOnly>
              <AdminTestimonialsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute adminOnly>
              <AdminContactsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <Analytics />
    </>
  );
};

export default App;
