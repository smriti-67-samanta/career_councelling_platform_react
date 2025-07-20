import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaBookOpen, 
  FaFilePdf, 
  FaDownload, 
  FaArrowRight,
  FaStar,
  FaRegStar,
  FaBookmark,
  FaShareAlt,
  FaClock,
  FaBriefcase,
  FaUserTie,
  FaLaptopCode,
  FaChartLine
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState('resources');
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  // Resource data
  const resources = [
    {
      id: 1,
      title: 'Comprehensive Career Planning Guide 2023',
      type: 'pdf',
      category: 'planning',
      description: 'Step-by-step guide to mapping your career path with industry insights',
      downloadUrl: '/pdfs/career-planning-guide.pdf',
      previewText: 'This 35-page guide covers self-assessment, goal setting, and creating a 5-year career roadmap...',
      pages: 35,
      rating: 4.8,
      downloads: 1243,
      updated: '2023-06-15',
      tags: ['self-assessment', 'goal-setting', 'roadmap']
    },
    {
      id: 2,
      title: 'Resume Writing Masterclass: From Good to Outstanding',
      type: 'article',
      category: 'job-search',
      description: 'Transform your resume with expert-approved techniques',
      url: '/articles/resume-writing-tips',
      content: 'Learn how to highlight achievements, optimize for ATS systems, and craft compelling summaries...',
      readTime: '8 min',
      rating: 4.6,
      views: 2876,
      author: 'Sarah Johnson, Career Coach',
      tags: ['resume', 'ATS', 'achievements']
    },
    {
      id: 3,
      title: 'The Complete Behavioral Interview Handbook',
      type: 'pdf',
      category: 'interview',
      description: '300+ questions with sample answers and scoring rubrics',
      downloadUrl: '/pdfs/interview-handbook.pdf',
      previewText: 'Includes STAR method examples, competency frameworks, and industry-specific questions...',
      pages: 62,
      rating: 4.9,
      downloads: 3567,
      updated: '2023-08-22',
      tags: ['STAR method', 'competency', 'questions']
    },
    {
      id: 4,
      title: 'Strategic Networking for Career Advancement',
      type: 'video',
      category: 'networking',
      description: 'Evidence-based approaches to building valuable connections',
      url: '/videos/networking-strategies',
      duration: '22 min',
      rating: 4.5,
      views: 1542,
      author: 'Michael Chen, LinkedIn Top Voice',
      tags: ['connections', 'linkedin', 'relationships']
    },
    {
      id: 5,
      title: 'Salary Negotiation Playbook (Industry-Specific)',
      type: 'pdf',
      category: 'career-growth',
      description: 'Sector-specific compensation benchmarks and scripts',
      downloadUrl: '/pdfs/salary-negotiation.pdf',
      previewText: 'Includes tech, healthcare, finance, and creative industry benchmarks with word-for-word scripts...',
      pages: 28,
      rating: 4.7,
      downloads: 2109,
      updated: '2023-07-10',
      tags: ['compensation', 'scripts', 'benchmarks']
    },
    {
      id: 6,
      title: 'Career Transition Roadmap: Switching Industries Successfully',
      type: 'template',
      category: 'planning',
      description: 'Proven framework for mid-career changes',
      downloadUrl: '/templates/career-change-template.docx',
      previewText: 'Assessment tools, transferable skills matrix, and timeline planning for smooth transitions...',
      rating: 4.8,
      downloads: 3210,
      updated: '2023-05-18',
      tags: ['transition', 'skills matrix', 'timeline']
    },
    {
      id: 7,
      title: 'Tech Industry Trends 2023 Report',
      type: 'pdf',
      category: 'trends',
      description: 'Comprehensive analysis of emerging technologies and job market',
      downloadUrl: '/pdfs/tech-trends-2023.pdf',
      previewText: 'Covers AI, blockchain, cloud computing, and their impact on tech careers...',
      pages: 45,
      rating: 4.7,
      downloads: 1890,
      updated: '2023-09-05',
      tags: ['AI', 'blockchain', 'cloud computing']
    },
    {
      id: 8,
      title: 'Effective Remote Work Strategies',
      type: 'article',
      category: 'career-growth',
      description: 'Maximizing productivity and visibility in remote settings',
      url: '/articles/remote-work-strategies',
      content: 'Learn how to communicate effectively, maintain work-life balance, and advance your career remotely...',
      readTime: '10 min',
      rating: 4.4,
      views: 2150,
      author: 'Emma Rodriguez, Remote Work Expert',
      tags: ['remote', 'productivity', 'communication']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources', icon: <FaBookOpen /> },
    { id: 'planning', name: 'Career Planning', icon: <FaChartLine /> },
    { id: 'job-search', name: 'Job Search', icon: <FaSearch /> },
    { id: 'interview', name: 'Interview Prep', icon: <FaUserTie /> },
    { id: 'networking', name: 'Networking', icon: <FaShareAlt /> },
    { id: 'career-growth', name: 'Career Growth', icon: <FaArrowRight /> },
    { id: 'trends', name: 'Industry Trends', icon: <FaLaptopCode /> }
  ];

  useEffect(() => {
    if (activeTab === 'jobs' && jobs.length === 0) {
      fetchJobs();
    }
  }, [activeTab]);

  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      setTimeout(() => {
        setJobs([
          {
            id: 1,
            title: 'Frontend Developer',
            company: 'TechCorp',
            location: 'Remote',
            type: 'Full-time',
            posted: '2 days ago',
            description: 'We are looking for an experienced React developer to join our team...',
            skills: ['React', 'JavaScript', 'CSS'],
            salary: '$90,000 - $120,000'
          },
          {
            id: 2,
            title: 'UX Designer',
            company: 'DesignHub',
            location: 'New York, NY',
            type: 'Contract',
            posted: '1 week ago',
            description: 'Join our design team to create beautiful user experiences...',
            skills: ['Figma', 'UI/UX', 'Prototyping'],
            salary: '$70 - $90/hr'
          },
          {
            id: 3,
            title: 'Data Scientist',
            company: 'DataWorks',
            location: 'San Francisco, CA',
            type: 'Full-time',
            posted: '3 days ago',
            description: 'Work with large datasets to derive business insights...',
            skills: ['Python', 'Machine Learning', 'SQL'],
            salary: '$110,000 - $140,000'
          }
        ]);
        setLoadingJobs(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to load jobs');
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      const matched = resources.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 5);
      setSuggestions(matched);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const downloadSmritiPdf = () => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = '/smriti.pdf';
    link.download = 'smriti.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show toast notification
    toast.success(
      <div>
        <p className="font-semibold">Download started: smriti.pdf</p>
        <p className="text-sm">Your file is being downloaded</p>
      </div>
    );
  };

  const handleDownload = () => {
    downloadSmritiPdf();
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline opacity-70" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 inline" />);
      }
    }
    return stars;
  };

  const renderResourceIcon = (type) => {
    switch(type) {
      case 'pdf':
        return <FaFilePdf className="h-6 w-6 text-red-600" />;
      case 'video':
        return <svg className="h-6 w-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
        </svg>;
      case 'template':
        return <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
        </svg>;
      default:
        return <FaBookOpen className="h-6 w-6 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <FaBriefcase className="inline mr-3 text-blue-600" />
            Career Development Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive resource for career growth, job search strategies, and professional development
          </p>
        </div>

        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-4 px-6 font-medium text-lg ${activeTab === 'resources' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
          <button
            className={`py-4 px-6 font-medium text-lg ${activeTab === 'jobs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('jobs')}
          >
            Job Board
          </button>
        </div>

        {activeTab === 'resources' ? (
          <>
            <div className="mb-10 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for guides, articles, videos, templates..."
                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                  
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 mt-2 w-full bg-white shadow-xl rounded-lg py-2 border border-gray-200">
                      {suggestions.map(suggestion => (
                        <div
                          key={suggestion.id}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-start border-b border-gray-100 last:border-0"
                          onMouseDown={() => {
                            setSearchTerm(suggestion.title);
                            setShowSuggestions(false);
                          }}
                        >
                          {renderResourceIcon(suggestion.type)}
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{suggestion.title}</p>
                            <p className="text-sm text-gray-500 truncate">{suggestion.description}</p>
                            <div className="flex flex-wrap mt-1">
                              {suggestion.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-xs bg-gray-100 rounded-full px-2 py-1 mr-1 mb-1">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex-shrink-0 w-full md:w-auto">
                  <select
                    className="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredResources.length > 0 ? (
                filteredResources.map(resource => (
                  <div key={resource.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${
                            resource.type === 'pdf' ? 'bg-red-100' : 
                            resource.type === 'video' ? 'bg-purple-100' : 
                            resource.type === 'template' ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                            {renderResourceIcon(resource.type)}
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            {resource.type === 'pdf' ? 'Guide' : 
                             resource.type === 'video' ? 'Video' : 
                             resource.type === 'template' ? 'Template' : 'Article'}
                          </span>
                        </div>
                        <button className="text-gray-400 hover:text-blue-500">
                          <FaBookmark />
                        </button>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{resource.title}</h3>
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 rounded-full px-3 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-5">
                        {resource.type === 'pdf' ? (
                          <>
                            <span className="mr-3">{resource.pages} pages</span>
                            <span className="mr-3">•</span>
                            <span>Updated {resource.updated}</span>
                          </>
                        ) : resource.type === 'video' ? (
                          <>
                            <FaClock className="mr-1" />
                            <span className="mr-3">{resource.duration}</span>
                          </>
                        ) : resource.type === 'article' ? (
                          <>
                            <FaClock className="mr-1" />
                            <span className="mr-3">{resource.readTime} read</span>
                            <span className="mr-3">•</span>
                            <span>By {resource.author}</span>
                          </>
                        ) : (
                          <span>Template • Updated {resource.updated}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          {renderStars(resource.rating)}
                          <span className="ml-2 text-sm text-gray-600">
                            ({resource.type === 'pdf' || resource.type === 'template' ? 
                              resource.downloads.toLocaleString() : 
                              resource.views.toLocaleString()})
                          </span>
                        </div>
                        <button className="text-gray-400 hover:text-blue-500">
                          <FaShareAlt />
                        </button>
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      {resource.type === 'pdf' || resource.type === 'template' ? (
                        <button
                          onClick={handleDownload}
                          className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white ${
                            resource.type === 'pdf' ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' :
                            'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            resource.type === 'pdf' ? 'focus:ring-red-500' : 'focus:ring-green-500'
                          }`}
                        >
                          <FaDownload className="mr-3" />
                          {resource.type === 'pdf' ? 'Download Guide' : 'Download Template'}
                        </button>
                      ) : (
                        <button
                          onClick={handleDownload}
                          className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white ${
                            resource.type === 'video' ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800' :
                            'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            resource.type === 'video' ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                          } w-full`}
                        >
                          {resource.type === 'video' ? 'Watch Video' : 'Read Article'} <FaArrowRight className="ml-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="max-w-md mx-auto">
                    <FaSearch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <FaStar className="text-yellow-400 mr-3" />
                Editor's Picks
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {resources
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3)
                    .map(resource => (
                      <div key={resource.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:border-blue-300 transition-all">
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <FaStar className="mr-1" /> Top Rated
                            </span>
                            <span className="text-xs font-medium text-gray-500">
                              {resource.type === 'pdf' || resource.type === 'template' ? 
                                `${resource.downloads.toLocaleString()} downloads` : 
                                `${resource.views.toLocaleString()} views`}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-gray-900 mb-3">{resource.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              {renderStars(resource.rating)}
                            </div>
                            {resource.type === 'pdf' || resource.type === 'template' ? (
                              <button
                                onClick={handleDownload}
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                              >
                                <FaDownload className="mr-2" /> 
                                {resource.type === 'pdf' ? 'Get Guide' : 'Get Template'}
                              </button>
                            ) : (
                              <button
                                onClick={handleDownload}
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                              >
                                {resource.type === 'video' ? 'Watch Now' : 'Read Now'} <FaArrowRight className="ml-2" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.filter(c => c.id !== 'all').map(category => (
                  <div 
                    key={category.id}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer text-center"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {category.icon}
                    </div>
                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {resources.filter(r => r.category === category.id).length} resources
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Opportunities</h2>
              <p className="text-gray-600">Browse the latest job openings in your field</p>
            </div>

            {loadingJobs ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map(job => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <p className="text-gray-600">{job.company} • {job.location}</p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-2 md:mt-0">
                        {job.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map(skill => (
                        <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-gray-500 text-sm mb-2 sm:mb-0">
                        <span>Posted {job.posted}</span>
                        {job.salary && (
                          <span className="ml-3">• Estimated salary: {job.salary}</span>
                        )}
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;