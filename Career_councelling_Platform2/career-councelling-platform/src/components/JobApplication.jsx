import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPaperclip, FaUser, FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa';
import { toast } from 'react-toastify';

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    resume: null,
    coverLetter: '',
  });

  // Fetch job details
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Simulate API call with mock data
        setTimeout(() => {
          const mockJobs = [
            {
              id: 1,
              title: 'Frontend Developer (React)',
              company: 'Tech Innovations Inc.',
              location: 'San Francisco, CA (Remote)',
              type: 'Full-time',
              description: 'We are looking for a skilled React developer to join our team building cutting-edge web applications.',
              requirements: ['3+ years React experience', 'Proficient with Redux', 'Familiar with TypeScript'],
            },
            {
              id: 2,
              title: 'UX/UI Designer',
              company: 'Creative Solutions LLC',
              location: 'New York, NY',
              type: 'Contract',
              description: 'Join our design team to create beautiful and functional user experiences for our clients.',
              requirements: ['Portfolio required', 'Figma expertise', 'User research experience'],
            },
            {
              id: 3,
              title: 'Data Scientist',
              company: 'Data Analytics Corp',
              location: 'Remote',
              type: 'Full-time',
              description: 'Work with large datasets to derive insights and build predictive models for our enterprise clients.',
              requirements: ['Python/R proficiency', 'Machine learning experience', 'SQL knowledge'],
            },
            {
              id: 4,
              title: 'DevOps Engineer',
              company: 'Cloud Systems',
              location: 'Austin, TX',
              type: 'Full-time',
              description: 'Implement and maintain CI/CD pipelines and cloud infrastructure for our development teams.',
              requirements: ['AWS/GCP experience', 'Terraform knowledge', 'Docker/Kubernetes'],
            }
          ];
          
          const foundJob = mockJobs.find(job => job.id === parseInt(jobId));
          if (foundJob) {
            setJob(foundJob);
          } else {
            toast.error('Job not found');
            navigate('/jobboard');
          }
          setLoading(false);
        }, 500);
      } catch (error) {
        toast.error('Failed to load job details');
        navigate('/jobboard');
      }
    };

    fetchJobDetails();
  }, [jobId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.name || !formData.email || !formData.resume) {
      toast.error('Please fill all required fields');
      return;
    }
    
    // Simulate form submission
    toast.success('Application submitted successfully!');
    setTimeout(() => {
      navigate('/jobboard');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back to Job Board
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-gray-600">{job.company} • {job.location}</p>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Description</h2>
            <p className="text-gray-700 mb-6">{job.description}</p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Requirements</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Application Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLinkedin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPaperclip className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">PDF, DOC, or DOCX (Max 5MB)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={5}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us why you're a good fit for this position..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;