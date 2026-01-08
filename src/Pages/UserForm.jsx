import { useState } from 'react';
import '../Styling/UserForm.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    qualification: '',
    experience: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = '919960008802';

    const message = `
*New Job Application*
---------------------
Name: ${formData.name}
Mobile: ${formData.mobile}
Email: ${formData.email || 'N/A'}
Location: ${formData.location}
Qualification: ${formData.qualification}
Experience: ${formData.experience}
`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, '_blank');

    setFormData({
      name: '',
      mobile: '',
      email: '',
      location: '',
      qualification: '',
      experience: '',
    });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="neo-card p-5">
            <h3 className="text-center fw-bold mb-4">Job Application</h3>

            <form onSubmit={handleSubmit}>
              <input
                className="neo-input"
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                className="neo-input"
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

              <input
                className="neo-input"
                type="email"
                name="email"
                placeholder="Email (Optional)"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                className="neo-input"
                type="text"
                name="location"
                placeholder="Current Location"
                value={formData.location}
                onChange={handleChange}
                required
              />

              <select
                className="neo-input"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
              >
                <option value="">Select Qualification</option>
                <option>10th</option>
                <option>12th</option>
                <option>ITI</option>
                <option>Diploma</option>
                <option>Graduate</option>
                <option>MBA</option>
                <option>Pharmacy</option>
              </select>

              <select
                className="neo-input"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="">Experience</option>
                <option>Fresher</option>
                <option>1–2 Years</option>
                <option>3–5 Years</option>
                <option>5+ Years</option>
              </select>

              <button type="submit" className="neo-btn mt-4">
                Apply via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
