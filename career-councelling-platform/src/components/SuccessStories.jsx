import { useState } from 'react';
import { FaQuoteLeft, FaSearch, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { FiBriefcase, FiDollarSign, FiAward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SuccessStories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 3;
  const navigate = useNavigate();

  // Sample success stories data
  const successStories = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Data Scientist",
      company: "TechAnalytics Inc.",
      image: "https://randomuser.me/api/portraits/women/43.jpg",
      quote: "CareerConnect helped me transition from marketing to data science in just 12 months. The personalized roadmap was invaluable!",
      stats: {
        salaryIncrease: "85%",
        time: "1 year",
        skills: ["Python", "Machine Learning", "Data Visualization"]
      },
      tags: ["career-change", "tech", "data-science"],
      fullStory: `Sarah was working in marketing for 5 years when she decided she wanted to transition into tech. Through CareerConnect's personalized learning path, she gained skills in Python, machine learning, and data visualization. Within a year, she landed her dream job as a Senior Data Scientist with an 85% salary increase. "The mentorship program was crucial - having an experienced data scientist review my projects gave me the confidence to apply for senior positions," Sarah says.`
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "UX Design Lead",
      company: "Digital Innovations LLC",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "The portfolio review sessions gave me the confidence to apply for senior positions I wouldn't have considered before.",
      stats: {
        salaryIncrease: "60%",
        time: "8 months",
        skills: ["Figma", "User Research", "Prototyping"]
      },
      tags: ["promotion", "design", "portfolio"],
      fullStory: `Michael was stuck in a junior UX designer role despite having 4 years of experience. CareerConnect's portfolio review service helped him showcase his skills effectively. "The expert feedback transformed how I presented my work," Michael explains. After participating in 3 mock interviews with industry leaders through CareerConnect, he secured a Lead UX Designer position with a 60% raise in just 8 months.`
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Financial Analyst",
      company: "Global Finance Corp",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "Mock interviews with industry professionals helped me land my dream job on Wall Street.",
      stats: {
        salaryIncrease: "110%",
        time: "6 months",
        skills: ["Financial Modeling", "Excel", "Data Analysis"]
      },
      tags: ["finance", "interview-prep", "career-growth"],
      fullStory: `Priya was working at a small regional bank when she set her sights on Wall Street. CareerConnect matched her with a mentor who had 15 years of experience at top investment banks. "The mock interviews were brutal but exactly what I needed," Priya recalls. After 6 months of intensive preparation, she more than doubled her salary at a major financial institution. Her mentor still checks in with her quarterly.`
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Product Manager",
      company: "InnovateTech",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      quote: "The career assessment revealed strengths I didn't know I had, leading me to product management.",
      stats: {
        salaryIncrease: "75%",
        time: "1.5 years",
        skills: ["Agile", "Product Strategy", "Stakeholder Management"]
      },
      tags: ["career-change", "tech", "management"],
      fullStory: `David spent a decade as a software engineer before taking CareerConnect's aptitude tests. The results showed exceptional skills in communication and strategic thinking - perfect for product management. "I would have never considered this path on my own," David admits. After completing the Product Management Certification program and doing a transitional project, he moved into his current role with a 75% salary increase.`
    },
    {
      id: 5,
      name: "Emily Rodriguez",
      role: "Clinical Research Coordinator",
      company: "BioHealth Solutions",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      quote: "CareerConnect's resume service helped me translate my academic experience into industry-ready qualifications.",
      stats: {
        salaryIncrease: "90%",
        time: "9 months",
        skills: ["Clinical Trials", "Regulatory Compliance", "Data Collection"]
      },
      tags: ["healthcare", "resume", "career-start"],
      fullStory: `Fresh out of her PhD program, Emily struggled to find industry positions. "Academic CVs are completely different," she explains. CareerConnect's resume rewriting service and interview coaching helped her land a Clinical Research Coordinator role in just 3 months. "The salary negotiation workshop alone was worth it - I got 20% more than the initial offer," Emily says. She's since been promoted twice.`
    }
  ];

  // Filter stories based on search term
  const filteredStories = successStories.filter(story => 
    story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.tags.some(tag => tag.includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = filteredStories.slice(indexOfFirstStory, indexOfLastStory);
  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReadFullStory = (storyId) => {
    navigate(`/successstories/${storyId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real career transformations from professionals who used CareerConnect
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, role, or keyword"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              All Stories
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Career Change
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Promotions
            </button>
          </div>
        </div>

        {/* Success Stories Grid */}
        {currentStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentStories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={story.image} 
                      alt={story.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900">{story.name}</h3>
                      <p className="text-indigo-600">{story.role}</p>
                      <p className="text-sm text-gray-500">{story.company}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4 relative">
                    <FaQuoteLeft className="text-gray-200 text-2xl absolute -top-2 -left-1" />
                    <p className="text-gray-700 italic pl-6">{story.quote}</p>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2">
                        <div className="flex items-center justify-center text-indigo-600 mb-1">
                          <FiDollarSign className="mr-1" />
                        </div>
                        <p className="text-xs font-medium text-gray-500">Salary Increase</p>
                        <p className="font-bold">{story.stats.salaryIncrease}</p>
                      </div>
                      <div className="p-2">
                        <div className="flex items-center justify-center text-indigo-600 mb-1">
                          <FiBriefcase className="mr-1" />
                        </div>
                        <p className="text-xs font-medium text-gray-500">Timeframe</p>
                        <p className="font-bold">{story.stats.time}</p>
                      </div>
                      <div className="p-2">
                        <div className="flex items-center justify-center text-indigo-600 mb-1">
                          <FiAward className="mr-1" />
                        </div>
                        <p className="text-xs font-medium text-gray-500">Key Skills</p>
                        <p className="font-bold">{story.stats.skills.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleReadFullStory(story.id)}
                    className="mt-4 w-full py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors flex items-center justify-center"
                  >
                    Read Full Story <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No success stories found matching your search.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredStories.length > storiesPerPage && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50'}`}
            >
              <FaArrowLeft />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`w-10 h-10 rounded-full ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50'}`}
            >
              <FaArrowRight />
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to write your success story?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who transformed their careers with CareerConnect
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-white text-indigo-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
            <button className="px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
              Speak to a Career Advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;