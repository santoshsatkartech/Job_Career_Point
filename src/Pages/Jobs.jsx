import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/Jobs.css';

export default function Jobs() {
  const navigate = useNavigate();

  const data = [
    {
      title: 'IT & Software',
      icon: '💻',
      jobs: [
        {
          role: 'Full Stack Developer',
          experience: '0-2',
          qualification: 'B.Tech / BCA / MCA',
          skills: 'Java, Spring Boot, React, MySQL',
          type: 'Full Time',
          salary: '3 – 5 LPA',
          location: 'Pune',
          posted: '2 days ago',
        },
        {
          role: 'Java Backend Developer',
          experience: '1-3',
          qualification: 'B.Tech / MCA',
          skills: 'Java, Spring Boot, REST APIs',
          type: 'Full Time',
          salary: '4 – 7 LPA',
          location: 'Mumbai',
          posted: '1 day ago',
        },
        {
          role: 'React Developer',
          experience: '0-2',
          qualification: 'Any Graduate',
          skills: 'React, JS, CSS',
          type: 'Hybrid',
          salary: '3 – 6 LPA',
          location: 'Pune',
          posted: '3 days ago',
        },
        {
          role: 'Data Analyst',
          experience: '0-1',
          qualification: 'B.Sc / BCA / BE',
          skills: 'Excel, SQL, Power BI',
          type: 'Full Time',
          salary: '3 – 5 LPA',
          location: 'Bangalore',
          posted: 'Today',
        },
        {
          role: 'DevOps Engineer',
          experience: '2-4',
          qualification: 'B.Tech',
          skills: 'Docker, AWS, CI/CD',
          type: 'Remote',
          salary: '6 – 10 LPA',
          location: 'Remote',
          posted: '5 days ago',
        },
        {
          role: 'Python Developer',
          experience: '1-3',
          qualification: 'B.Tech / BCA',
          skills: 'Python, Django, Flask',
          type: 'Full Time',
          salary: '4 – 8 LPA',
          location: 'Bangalore',
          posted: '2 days ago',
        },
        {
          role: 'Mobile App Developer',
          experience: '0-2',
          qualification: 'B.Tech / BCA',
          skills: 'React Native, Flutter',
          type: 'Hybrid',
          salary: '3 – 6 LPA',
          location: 'Pune',
          posted: 'Today',
        },
        {
          role: 'UI/UX Designer',
          experience: '1-3',
          qualification: 'Any Design Graduate',
          skills: 'Figma, Adobe XD, Prototyping',
          type: 'Full Time',
          salary: '4 – 7 LPA',
          location: 'Mumbai',
          posted: '4 days ago',
        },
        {
          role: 'QA Engineer',
          experience: '0-2',
          qualification: 'B.Tech / BCA',
          skills: 'Manual Testing, Selenium',
          type: 'Full Time',
          salary: '3 – 5 LPA',
          location: 'Pune',
          posted: '1 day ago',
        },
        {
          role: 'Cloud Engineer',
          experience: '2-4',
          qualification: 'B.Tech / MCA',
          skills: 'AWS, Azure, GCP',
          type: 'Remote',
          salary: '8 – 12 LPA',
          location: 'Remote',
          posted: '3 days ago',
        },
      ],
    },

    {
      title: 'Bank Jobs',
      icon: '🏦',
      jobs: [
        {
          role: 'Bank Clerk',
          experience: '0-1',
          qualification: 'Any Graduate',
          skills: 'Documentation, Customer Handling',
          type: 'Full Time',
          salary: '2.8 – 4 LPA',
          location: 'Pune',
          posted: '2 days ago',
        },
        {
          role: 'Relationship Manager',
          experience: '1-3',
          qualification: 'Graduate / MBA',
          skills: 'Sales, Banking Products',
          type: 'Full Time',
          salary: '4 – 6 LPA',
          location: 'Nagpur',
          posted: 'Today',
        },
        {
          role: 'Credit Analyst',
          experience: '2-4',
          qualification: 'MBA Finance',
          skills: 'Risk Analysis, Excel',
          type: 'Full Time',
          salary: '5 – 8 LPA',
          location: 'Mumbai',
          posted: '4 days ago',
        },
        {
          role: 'Bank PO',
          experience: '0-0',
          qualification: 'Graduate with 55%',
          skills: 'Banking Operations',
          type: 'Full Time',
          salary: '5 – 7 LPA',
          location: 'Pune',
          posted: 'Today',
        },
        {
          role: 'Loan Officer',
          experience: '1-2',
          qualification: 'Graduate',
          skills: 'Loan Processing, Verification',
          type: 'Full Time',
          salary: '3 – 5 LPA',
          location: 'Mumbai',
          posted: '2 days ago',
        },
        {
          role: 'Teller',
          experience: '0-1',
          qualification: '12th Pass / Graduate',
          skills: 'Cash Handling, Customer Service',
          type: 'Full Time',
          salary: '2.5 – 3.5 LPA',
          location: 'Nagpur',
          posted: '3 days ago',
        },
        {
          role: 'Operations Manager',
          experience: '3-5',
          qualification: 'MBA / Graduate',
          skills: 'Team Management, Operations',
          type: 'Full Time',
          salary: '8 – 12 LPA',
          location: 'Mumbai',
          posted: '5 days ago',
        },
        {
          role: 'Wealth Manager',
          experience: '2-4',
          qualification: 'MBA Finance',
          skills: 'Investment Advice, Portfolio',
          type: 'Full Time',
          salary: '6 – 10 LPA',
          location: 'Pune',
          posted: 'Today',
        },
      ],
    },

    {
      title: 'Diploma / Engineering',
      icon: '🛠️',
      jobs: [
        {
          role: 'Mechanical Engineer',
          experience: '0-1',
          qualification: 'Diploma / BE Mechanical',
          skills: 'AutoCAD, Production',
          type: 'Full Time',
          salary: '18K – 22K',
          location: 'Aurangabad',
          posted: '3 days ago',
        },
        {
          role: 'Electrical Engineer',
          experience: '1-2',
          qualification: 'Diploma Electrical',
          skills: 'Maintenance, Wiring',
          type: 'Full Time',
          salary: '20K – 25K',
          location: 'Pune',
          posted: '1 day ago',
        },
        {
          role: 'Civil Engineer',
          experience: '0-2',
          qualification: 'Diploma / BE Civil',
          skills: 'AutoCAD, Site Supervision',
          type: 'Full Time',
          salary: '22K – 28K',
          location: 'Mumbai',
          posted: 'Today',
        },
        {
          role: 'Production Engineer',
          experience: '1-3',
          qualification: 'BE / Diploma Mechanical',
          skills: 'Production Planning, Quality',
          type: 'Full Time',
          salary: '25K – 35K',
          location: 'Pune',
          posted: '2 days ago',
        },
        {
          role: 'Quality Engineer',
          experience: '1-2',
          qualification: 'BE / Diploma',
          skills: 'Quality Control, Inspection',
          type: 'Full Time',
          salary: '20K – 30K',
          location: 'Nashik',
          posted: '4 days ago',
        },
        {
          role: 'Maintenance Engineer',
          experience: '2-4',
          qualification: 'BE / Diploma Electrical',
          skills: 'Troubleshooting, Maintenance',
          type: 'Full Time',
          salary: '30K – 40K',
          location: 'Pune',
          posted: 'Today',
        },
        {
          role: 'CAD Engineer',
          experience: '0-2',
          qualification: 'Diploma / BE',
          skills: 'AutoCAD, SolidWorks',
          type: 'Full Time',
          salary: '18K – 25K',
          location: 'Aurangabad',
          posted: '3 days ago',
        },
        {
          role: 'Site Engineer',
          experience: '1-3',
          qualification: 'BE Civil',
          skills: 'Construction Management',
          type: 'Full Time',
          salary: '25K – 35K',
          location: 'Mumbai',
          posted: '2 days ago',
        },
      ],
    },

    {
      title: 'ITI Jobs',
      icon: '🔧',
      jobs: [
        {
          role: 'Fitter',
          experience: '0-1',
          qualification: 'ITI Fitter',
          skills: 'Assembly, Tools',
          type: 'Full Time',
          salary: '15K – 18K',
          location: 'Nashik',
          posted: 'Today',
        },
        {
          role: 'Electrician',
          experience: '1-3',
          qualification: 'ITI Electrician',
          skills: 'Panel Wiring',
          type: 'Full Time',
          salary: '18K – 22K',
          location: 'Pune',
          posted: '2 days ago',
        },
        {
          role: 'Welder',
          experience: '0-2',
          qualification: 'ITI Welder',
          skills: 'Arc Welding, Gas Welding',
          type: 'Full Time',
          salary: '16K – 20K',
          location: 'Pune',
          posted: '3 days ago',
        },
        {
          role: 'Machinist',
          experience: '1-3',
          qualification: 'ITI Machinist',
          skills: 'Lathe, Milling',
          type: 'Full Time',
          salary: '18K – 24K',
          location: 'Aurangabad',
          posted: 'Today',
        },
        {
          role: 'Tool & Die Maker',
          experience: '2-4',
          qualification: 'ITI Tool & Die',
          skills: 'Tool Making, Grinding',
          type: 'Full Time',
          salary: '22K – 30K',
          location: 'Pune',
          posted: '4 days ago',
        },
        {
          role: 'Turner',
          experience: '0-2',
          qualification: 'ITI Turner',
          skills: 'Turning Operations',
          type: 'Full Time',
          salary: '15K – 20K',
          location: 'Nashik',
          posted: '2 days ago',
        },
        {
          role: 'Mechanic Diesel',
          experience: '1-3',
          qualification: 'ITI Diesel Mechanic',
          skills: 'Engine Repair, Maintenance',
          type: 'Full Time',
          salary: '18K – 25K',
          location: 'Pune',
          posted: 'Today',
        },
        {
          role: 'Refrigeration AC',
          experience: '0-2',
          qualification: 'ITI Refrigeration',
          skills: 'AC Repair, Installation',
          type: 'Full Time',
          salary: '16K – 22K',
          location: 'Mumbai',
          posted: '3 days ago',
        },
      ],
    },

    {
      title: 'General Worker',
      icon: '🧹',
      jobs: [
        {
          role: 'Warehouse Helper',
          experience: '0-1',
          qualification: '10th / 12th',
          skills: 'Loading, Packing',
          type: 'Full Time',
          salary: '12K – 15K',
          location: 'Pune',
          posted: 'Today',
        },
        {
          role: 'Office Assistant',
          experience: '0-1',
          qualification: '12th Pass',
          skills: 'Filing, Office Support',
          type: 'Full Time',
          salary: '10K – 14K',
          location: 'Kolhapur',
          posted: '1 day ago',
        },
        {
          role: 'Delivery Boy',
          experience: '0-1',
          qualification: '10th Pass',
          skills: 'Driving, Navigation',
          type: 'Full Time',
          salary: '13K – 18K',
          location: 'Pune',
          posted: 'Today',
        },
        {
          role: 'Security Guard',
          experience: '0-2',
          qualification: '10th Pass',
          skills: 'Vigilance, Security',
          type: 'Full Time',
          salary: '12K – 16K',
          location: 'Mumbai',
          posted: '2 days ago',
        },
        {
          role: 'Housekeeping Staff',
          experience: '0-1',
          qualification: '8th Pass',
          skills: 'Cleaning, Maintenance',
          type: 'Full Time',
          salary: '10K – 14K',
          location: 'Pune',
          posted: 'Today',
        },
        {
          role: 'Packaging Helper',
          experience: '0-1',
          qualification: '10th Pass',
          skills: 'Packaging, Quality Check',
          type: 'Full Time',
          salary: '11K – 15K',
          location: 'Nashik',
          posted: '3 days ago',
        },
        {
          role: 'Driver',
          experience: '1-3',
          qualification: '10th Pass + License',
          skills: 'Driving, Vehicle Maintenance',
          type: 'Full Time',
          salary: '15K – 22K',
          location: 'Pune',
          posted: 'Today',
        },
        {
          role: 'Sales Assistant',
          experience: '0-1',
          qualification: '12th Pass',
          skills: 'Customer Service, Sales',
          type: 'Full Time',
          salary: '12K – 16K',
          location: 'Mumbai',
          posted: '2 days ago',
        },
      ],
    },

    {
      title: 'MBA Jobs',
      icon: '📊',
      jobs: [
        {
          role: 'HR Executive',
          experience: '0-1',
          qualification: 'MBA HR',
          skills: 'Recruitment, Excel',
          type: 'Full Time',
          salary: '20K – 28K',
          location: 'Pune',
          posted: 'Today',
        },
        {
          role: 'Marketing Executive',
          experience: '1-2',
          qualification: 'MBA Marketing',
          skills: 'Campaigns, SEO',
          type: 'Full Time',
          salary: '25K – 35K',
          location: 'Mumbai',
          posted: '2 days ago',
        },
        {
          role: 'Finance Executive',
          experience: '0-2',
          qualification: 'MBA Finance',
          skills: 'Accounting, Tally',
          type: 'Full Time',
          salary: '22K – 30K',
          location: 'Pune',
          posted: '3 days ago',
        },
        {
          role: 'Operations Manager',
          experience: '3-5',
          qualification: 'MBA Operations',
          skills: 'Process Optimization',
          type: 'Full Time',
          salary: '8 – 12 LPA',
          location: 'Mumbai',
          posted: 'Today',
        },
        {
          role: 'Business Analyst',
          experience: '1-3',
          qualification: 'MBA / B.Tech + MBA',
          skills: 'Data Analysis, Reporting',
          type: 'Full Time',
          salary: '5 – 8 LPA',
          location: 'Pune',
          posted: '2 days ago',
        },
        {
          role: 'Digital Marketing',
          experience: '0-2',
          qualification: 'MBA Marketing',
          skills: 'SEO, Social Media, Google Ads',
          type: 'Hybrid',
          salary: '3 – 5 LPA',
          location: 'Bangalore',
          posted: 'Today',
        },
        {
          role: 'Sales Manager',
          experience: '2-4',
          qualification: 'MBA Sales',
          skills: 'Team Handling, Sales Strategy',
          type: 'Full Time',
          salary: '6 – 9 LPA',
          location: 'Mumbai',
          posted: '4 days ago',
        },
        {
          role: 'Supply Chain Manager',
          experience: '2-4',
          qualification: 'MBA Operations',
          skills: 'Logistics, Inventory',
          type: 'Full Time',
          salary: '7 – 10 LPA',
          location: 'Pune',
          posted: '3 days ago',
        },
      ],
    },

    {
      title: 'Pharmacy Jobs',
      icon: '💊',
      jobs: [
        {
          role: 'Pharmacist',
          experience: '0-1',
          qualification: 'B.Pharm / D.Pharm',
          skills: 'Medicine Dispensing',
          type: 'Full Time',
          salary: '22K – 30K',
          location: 'Pune',
          posted: '3 days ago',
        },
        {
          role: 'Medical Representative',
          experience: '1-2',
          qualification: 'B.Pharm',
          skills: 'Field Sales',
          type: 'Full Time',
          salary: '25K – 40K',
          location: 'Nagpur',
          posted: 'Today',
        },
        {
          role: 'Hospital Pharmacist',
          experience: '1-3',
          qualification: 'B.Pharm',
          skills: 'Medicine Management',
          type: 'Full Time',
          salary: '25K – 35K',
          location: 'Mumbai',
          posted: '2 days ago',
        },
        {
          role: 'Pharmacy Manager',
          experience: '3-5',
          qualification: 'B.Pharm / M.Pharm',
          skills: 'Store Management, Inventory',
          type: 'Full Time',
          salary: '35K – 50K',
          location: 'Pune',
          posted: 'Today',
        },
        {
          role: 'Clinical Research',
          experience: '0-2',
          qualification: 'B.Pharm / M.Pharm',
          skills: 'Clinical Trials, Documentation',
          type: 'Full Time',
          salary: '3 – 5 LPA',
          location: 'Bangalore',
          posted: '4 days ago',
        },
        {
          role: 'Quality Control',
          experience: '1-3',
          qualification: 'B.Pharm',
          skills: 'QC Testing, Documentation',
          type: 'Full Time',
          salary: '22K – 32K',
          location: 'Pune',
          posted: '3 days ago',
        },
        {
          role: 'Medical Transcriptionist',
          experience: '0-1',
          qualification: 'D.Pharm / Science Graduate',
          skills: 'Typing, Medical Terms',
          type: 'Remote',
          salary: '15K – 22K',
          location: 'Remote',
          posted: 'Today',
        },
        {
          role: 'Drug Inspector',
          experience: '2-4',
          qualification: 'B.Pharm / M.Pharm',
          skills: 'Regulatory Compliance',
          type: 'Government',
          salary: '6 – 9 LPA',
          location: 'Mumbai',
          posted: '5 days ago',
        },
      ],
    },

    // ADDED NEW CATEGORIES
    {
      title: 'Healthcare Jobs',
      icon: '🏥',
      jobs: [
        {
          role: 'Staff Nurse',
          experience: '0-2',
          qualification: 'GNM / B.Sc Nursing',
          skills: 'Patient Care, Medication',
          type: 'Full Time',
          salary: '20K – 30K',
          location: 'Pune',
          posted: 'Today',
        },
        {
          role: 'Lab Technician',
          experience: '1-3',
          qualification: 'DMLT / B.Sc',
          skills: 'Sample Testing, Equipment',
          type: 'Full Time',
          salary: '18K – 28K',
          location: 'Mumbai',
          posted: '2 days ago',
        },
        {
          role: 'Physiotherapist',
          experience: '0-2',
          qualification: 'BPT',
          skills: 'Therapy, Rehabilitation',
          type: 'Full Time',
          salary: '25K – 35K',
          location: 'Pune',
          posted: '3 days ago',
        },
        {
          role: 'X-Ray Technician',
          experience: '1-2',
          qualification: 'Diploma in Radiography',
          skills: 'X-Ray Operation, Safety',
          type: 'Full Time',
          salary: '20K – 30K',
          location: 'Nagpur',
          posted: 'Today',
        },
        {
          role: 'Hospital Admin',
          experience: '2-4',
          qualification: 'BBA / MBA Healthcare',
          skills: 'Administration, Management',
          type: 'Full Time',
          salary: '30K – 45K',
          location: 'Mumbai',
          posted: '4 days ago',
        },
      ],
    },

    {
      title: 'Teaching Jobs',
      icon: '👨‍🏫',
      jobs: [
        {
          role: 'Primary Teacher',
          experience: '0-2',
          qualification: 'B.Ed / D.Ed',
          skills: 'Teaching, Child Care',
          type: 'Full Time',
          salary: '15K – 25K',
          location: 'Pune',
          posted: 'Today',
        },
        {
          role: 'Science Teacher',
          experience: '1-3',
          qualification: 'B.Sc + B.Ed',
          skills: 'Physics/Chemistry/Bio',
          type: 'Full Time',
          salary: '20K – 35K',
          location: 'Mumbai',
          posted: '2 days ago',
        },
        {
          role: 'Computer Teacher',
          experience: '0-2',
          qualification: 'BCA / B.Tech + B.Ed',
          skills: 'Basic Computer, Programming',
          type: 'Full Time',
          salary: '18K – 30K',
          location: 'Pune',
          posted: '3 days ago',
        },
        {
          role: 'Spoken English Trainer',
          experience: '1-2',
          qualification: 'Any Graduate',
          skills: 'English Fluency, Teaching',
          type: 'Part Time',
          salary: '15K – 25K',
          location: 'Bangalore',
          posted: 'Today',
        },
        {
          role: 'College Lecturer',
          experience: '2-4',
          qualification: 'Post Graduate + NET',
          skills: 'Subject Expertise, Research',
          type: 'Full Time',
          salary: '40K – 60K',
          location: 'Pune',
          posted: '5 days ago',
        },
      ],
    },
  ];
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');

  // ⭐ NEW STATE
  const [visibleCount, setVisibleCount] = useState(8);

  // Flatten jobs
  const allJobs = data.flatMap((cat) =>
    cat.jobs.map((job) => ({
      ...job,
      category: cat.title,
    }))
  );

  // Filtering
  const filtered = allJobs.filter((job) => {
    return (
      (!category || job.category === category) &&
      (!location || job.location === location) &&
      (!experience || job.experience === experience)
    );
  });

  // ⭐ RESET visible count when filter changes
  useEffect(() => {
    setVisibleCount(8);
  }, [category, location, experience]);

  // ⭐ SHOW ONLY LIMITED JOBS
  const visibleJobs = filtered.slice(0, visibleCount);

  // Unique values for dropdown
  const locations = [...new Set(allJobs.map((j) => j.location))];
  const experiences = [...new Set(allJobs.map((j) => j.experience))];

  const handleApplyNow = (job) => {
    // Navigate to job details page with job data
    navigate('/job-details', {
      state: {
        ...job,
        description: getJobDescription(job.role), // Add description based on role
      },
    });
  };

  // Function to get job description based on role
  const getJobDescription = (role) => {
    // You can expand this with more descriptions
    const descriptions = {
      'Full Stack Developer': `✅ Complete Job Description\n🧑‍💻 Full Stack Developer\n\nWe are seeking a passionate Full Stack Developer to build and maintain scalable web applications...`,
      'React Developer': `✅ Complete Job Description\n🧑‍💻 React Developer\n\nLooking for a React Developer to build responsive user interfaces using modern frontend technologies...`,
      'Java Backend Developer': `✅ Complete Job Description\n🧑‍💻 Java Backend Developer\n\nWe are hiring a Java Backend Developer to design and develop robust server-side applications...`,
      // Add descriptions for other roles as needed
    };
    return descriptions[role] || `Complete job description for ${role}`;
  };

  return (
    <div style={{ padding: 20 }} className="searchTop">
      {/* DROPDOWNS */}
      <div className="filter-container">
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {data.map((cat) => (
            <option key={cat.title} value={cat.title}>
              {cat.title}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setLocation(e.target.value)}
          className="filter-select"
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
        >
          <option value="">All Experience</option>
          {experiences.map((exp) => (
            <option key={exp} value={exp}>
              {exp}
            </option>
          ))}
        </select>
      </div>

      {/* RESULTS */}
      <div className="job-cards-container">
        {visibleJobs.map((job, i) => (
          <div key={i} className="job-card">
            <div className="job-card-header">
              <h3 className="job-role">{job.role}</h3>
              <span className="job-type">{job.type}</span>
            </div>

            <div className="job-details">
              <div className="detail-item">
                <span className="detail-label">📍 Location:</span>
                <span className="detail-value">{job.location}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🎓 Qualification:</span>
                <span className="detail-value">{job.qualification}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">💼 Experience:</span>
                <span className="detail-value">{job.experience} years</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">💰 Salary:</span>
                <span className="detail-value salary">{job.salary}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🛠️ Skills:</span>
                <span className="detail-value skills">{job.skills}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">📅 Posted:</span>
                <span className="detail-value posted">{job.posted}</span>
              </div>
            </div>

            <button className="apply-btn" onClick={() => handleApplyNow(job)}>
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* LOAD MORE BUTTON */}
      {visibleCount < filtered.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 8)}
          className="load-more-btn"
        >
          View More Jobs
        </button>
      )}
    </div>
  );
}
