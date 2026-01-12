import { Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import ScrollToTop from './Components/ScrollToTop';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Jobs from './Pages/Jobs';
import Testimonials from './Pages/Testimonials';
import UserForm from './Pages/UserForm';

const App = () => {
  return (
    <>
      <Navbar />

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user-form" element={<UserForm />} />
      </Routes>

      <Footer />
      <Analytics />
    </>
  );
};

export default App;
