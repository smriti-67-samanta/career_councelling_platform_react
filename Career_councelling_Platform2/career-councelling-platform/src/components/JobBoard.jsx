import React, { useState, useEffect } from 'react';
import { 
  FaSearch,
  FaBriefcase,
  FaMapMarkerAlt,
  FaFilter,
  FaBell,
  FaRegBell,
  FaExternalLinkAlt,
  FaStar,
  FaRegStar,
  FaClock,
  FaBuilding,
  FaCode
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const JobBoard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [savedJobs, setSavedJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  // Mock job data
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setJobs([
            {
              id: 1,
              title: 'Frontend Developer (React)',
              company: 'Tech Innovations Inc.',
              location: 'San Francisco, CA (Remote)',
              type: 'Full-time',
              salary: '$90,000 - $120,000',
              posted: '2 days ago',
              description: 'We are looking for a skilled React developer to join our team building cutting-edge web applications.',
              requirements: ['3+ years React experience', 'Proficient with Redux', 'Familiar with TypeScript'],
              skills: ['React', 'JavaScript', 'HTML/CSS', 'Redux'],
              experience: 'Mid-level',
              isNew: true,
            },
            {
              id: 2,
              title: 'UX/UI Designer',
              company: 'Creative Solutions LLC',
              location: 'New York, NY',
              type: 'Contract',
              salary: '$50 - $70/hr',
              posted: '1 week ago',
              description: 'Join our design team to create beautiful and functional user experiences for our clients.',
              requirements: ['Portfolio required', 'Figma expertise', 'User research experience'],
              skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
              experience: 'Entry-level',
              isNew: false,
            },
            {
              id: 3,
              title: 'Data Scientist',
              company: 'Data Analytics Corp',
              location: 'Remote',
              type: 'Full-time',
              salary: '$110,000 - $140,000',
              posted: '3 days ago',
              description: 'Work with large datasets to derive insights and build predictive models for our enterprise clients.',
              requirements: ['Python/R proficiency', 'Machine learning experience', 'SQL knowledge'],
              skills: ['Python', 'Machine Learning', 'SQL', 'Pandas'],
              experience: 'Senior',
              isNew: true,
            },
            {
              id: 4,
              title: 'DevOps Engineer',
              company: 'Cloud Systems',
              location: 'Austin, TX',
              type: 'Full-time',
              salary: '$100,000 - $130,000',
              posted: '2 weeks ago',
              description: 'Implement and maintain CI/CD pipelines and cloud infrastructure for our development teams.',
              requirements: ['AWS/GCP experience', 'Terraform knowledge', 'Docker/Kubernetes'],
              skills: ['AWS', 'Terraform', 'Docker', 'CI/CD'],
              experience: 'Mid-level',
              isNew: false,
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        toast.error('Failed to load jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.length > 0) {
      const matched = [];
      
      // Find matching titles
      jobs.forEach(job => {
        if (job.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          matched.push({ type: 'title', value: job.title, icon: <FaCode className="text-blue-500" /> });
        }
      });
      
      // Find matching companies
      jobs.forEach(job => {
        if (job.company.toLowerCase().includes(searchTerm.toLowerCase())) {
          matched.push({ type: 'company', value: job.company, icon: <FaBuilding className="text-green-500" /> });
        }
      });
      
      // Find matching skills
      const uniqueSkills = new Set();
      jobs.forEach(job => {
        job.skills.forEach(skill => {
          if (skill.toLowerCase().includes(searchTerm.toLowerCase())) {
            uniqueSkills.add(skill);
          }
        });
      });
      
      Array.from(uniqueSkills).forEach(skill => {
        matched.push({ type: 'skill', value: skill, icon: <span className="text-xs font-bold text-yellow-600">SK</span> });
      });

      setSearchSuggestions(matched.slice(0, 5));
      setShowSearchSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSearchSuggestions(false);
    }
  }, [searchTerm, jobs]);

  // Generate location suggestions
  useEffect(() => {
    if (locationFilter.length > 0) {
      const uniqueLocations = new Set();
      jobs.forEach(job => {
        if (job.location.toLowerCase().includes(locationFilter.toLowerCase())) {
          uniqueLocations.add(job.location);
        }
      });
      
      setLocationSuggestions(Array.from(uniqueLocations).slice(0, 5));
      setShowLocationSuggestions(true);
    } else {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    }
  }, [locationFilter, jobs]);

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      toast.info('Job removed from saved jobs');
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast.success('Job saved successfully');
    }
  };

  const toggleAlert = (jobId) => {
    toast.info('Job alerts updated');
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = jobTypeFilter === 'all' || job.type.toLowerCase() === jobTypeFilter.toLowerCase();
    const matchesExperience = experienceFilter === 'all' || job.experience.toLowerCase() === experienceFilter.toLowerCase();
    
    return matchesSearch && matchesLocation && matchesType && matchesExperience;
  });

  const handleSuggestionClick = (suggestion, isLocation = false) => {
    if (isLocation) {
      setLocationFilter(suggestion);
      setShowLocationSuggestions(false);
    } else {
      setSearchTerm(suggestion);
      setShowSearchSuggestions(false);
    }
  };

  const handleApply = (jobId) => {
    navigate(`/job-application/${jobId}`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setJobTypeFilter('all');
    setExperienceFilter('all');
    toast.success('Filters reset');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            <FaBriefcase className="inline mr-3 text-blue-600" />
            Job Board
          </h1>
          <p className="text-xl text-gray-600">
            Discover your next career opportunity from our curated listings
          </p>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Job Search with Suggestions */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.length > 0 && setShowSearchSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
              />
              
              {showSearchSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 border border-gray-200 max-h-60 overflow-auto">
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                      onMouseDown={() => handleSuggestionClick(suggestion.value)}
                    >
                      <div className="mr-3 flex-shrink-0">
                        {suggestion.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{suggestion.value}</p>
                        <p className="text-xs text-gray-500 capitalize">{suggestion.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Location Search with Suggestions */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Location"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                onFocus={() => locationFilter.length > 0 && setShowLocationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
              />
              
              {showLocationSuggestions && locationSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 border border-gray-200 max-h-60 overflow-auto">
                  {locationSuggestions.map((location, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                      onMouseDown={() => handleSuggestionClick(location, true)}
                    >
                      <FaMapMarkerAlt className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                      <p className="font-medium text-gray-900">{location}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center"
            >
              <FaFilter className="mr-2" />
              Filters
            </button>
          </div>

          {/* Additional Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                  value={jobTypeFilter}
                  onChange={(e) => setJobTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  <option value="entry-level">Entry-level</option>
                  <option value="mid-level">Mid-level</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Job Listings Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading jobs...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center">
                          <h2 className="text-xl font-bold text-gray-900 mr-2">{job.title}</h2>
                          {job.isNew && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{job.company} • {job.location}</p>
                      </div>
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => toggleSaveJob(job.id)}
                          className="text-gray-400 hover:text-yellow-500 transition-colors"
                          aria-label="Save job"
                        >
                          {savedJobs.includes(job.id) ? (
                            <FaStar className="h-5 w-5 text-yellow-400" />
                          ) : (
                            <FaRegStar className="h-5 w-5" />
                          )}
                        </button>
                        <button 
                          onClick={() => toggleAlert(job.id)}
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                          aria-label="Set alert"
                        >
                          {savedJobs.includes(job.id) ? (
                            <FaBell className="h-5 w-5 text-blue-500" />
                          ) : (
                            <FaRegBell className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-700">{job.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <FaBriefcase className="mr-2 flex-shrink-0" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaClock className="mr-2 flex-shrink-0" />
                        <span>{job.posted}</span>
                      </div>
                      <div className="flex items-center text-gray-600 font-medium">
                        <span>{job.salary}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-200">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Requirements:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {job.requirements.slice(0, 2).map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                          {job.requirements.length > 2 && (
                            <li>+{job.requirements.length - 2} more</li>
                          )}
                        </ul>
                      </div>
                      <button
                        onClick={() => handleApply(job.id)}
                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-center flex items-center justify-center transition-colors"
                      >
                        Apply Now <FaExternalLinkAlt className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                <FaSearch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoard;