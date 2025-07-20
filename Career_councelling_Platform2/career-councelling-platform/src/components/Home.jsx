import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FaSearch, 
  FaUserTie, 
  FaChartLine, 
  FaLightbulb, 
  FaHandshake, 
  FaBookOpen,
  FaRobot,
  FaThumbsUp,
  FaThumbsDown,
  FaCalendarAlt
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showAiModal, setShowAiModal] = useState(false);
  const [userInput, setUserInput] = useState({
    skills: '',
    interests: '',
    experience: ''
  });
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateAiSuggestions = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const skills = userInput.skills.split(',').filter(s => s.trim() !== '');
      const interests = userInput.interests.split(',').filter(i => i.trim() !== '');
      
      // Simple AI logic - in a real app, this would call an actual AI API
      let suggestions = [];
      
      if (skills.some(s => ['programming', 'coding', 'developer'].includes(s.toLowerCase())) || 
          interests.some(i => ['technology', 'computers', 'ai'].includes(i.toLowerCase()))) {
        suggestions.push({
          role: 'Software Developer',
          description: 'Design and build computer programs and applications',
          path: 'Learn programming → Build projects → Apply for internships → Get full-time position',
          salary: '$70,000 - $120,000'
        });
      }
      
      if (skills.some(s => ['communication', 'writing', 'presentation'].includes(s.toLowerCase())) || 
          interests.some(i => ['business', 'marketing', 'sales'].includes(i.toLowerCase()))) {
        suggestions.push({
          role: 'Marketing Specialist',
          description: 'Develop strategies to promote products and services',
          path: 'Study marketing → Gain digital skills → Complete internships → Build portfolio',
          salary: '$50,000 - $90,000'
        });
      }
      
      if (suggestions.length === 0) {
        suggestions.push({
          role: 'General Professional',
          description: 'Build foundational career skills',
          path: 'Develop core skills → Gain work experience → Identify specialization → Advance career',
          salary: '$40,000 - $70,000'
        });
      }
      
      setAiResponse({
        suggestions,
        message: "Based on your profile, here are some potential career paths to consider:"
      });
      setLoading(false);
    }, 2000);
  };

  const handleFeedback = (satisfied) => {
    if (satisfied) {
      toast.success('Great! Explore the recommended paths below');
    } else {
      toast.info('Consider booking a session with our career counselor');
      navigate('/session');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Elevate Your Career Journey
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Strategic career guidance tailored to your aspirations and potential
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={() => setShowAiModal(true)}
              className="px-8 py-3.5 text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
            >
              <FaRobot className="mr-2" />
              Get Career Suggestions
            </button>
            <button
              onClick={() => navigate('/careerassessment')}
              className="px-8 py-3.5 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
            >
              <FaChartLine className="mr-2" />
              Begin Assessment
            </button>
          </div>
        </div>
      </div>

      {/* AI Suggestion Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FaRobot className="text-blue-600 mr-2" />
              AI Career Assistant
            </h2>
            
            {!aiResponse ? (
              <div>
                <p className="text-gray-600 mb-6">
                  Tell us about yourself to get personalized career recommendations:
                </p>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      name="skills"
                      value={userInput.skills}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. programming, communication, design"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Interests (comma separated)
                    </label>
                    <input
                      type="text"
                      name="interests"
                      value={userInput.interests}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. technology, business, healthcare"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Experience Level
                    </label>
                    <select
                      name="experience"
                      value={userInput.experience}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Career</option>
                      <option value="senior">Senior Professional</option>
                      <option value="career-change">Career Changer</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowAiModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={generateAiSuggestions}
                    disabled={loading || !userInput.skills || !userInput.interests || !userInput.experience}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                  >
                    {loading ? 'Analyzing...' : 'Get Suggestions'}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-6">{aiResponse.message}</p>
                
                <div className="space-y-4 mb-6">
                  {aiResponse.suggestions.map((suggestion, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-bold text-gray-900">{suggestion.role}</h3>
                      <p className="text-gray-600 mb-2">{suggestion.description}</p>
                      <div className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">Typical Path:</span> {suggestion.path}
                      </div>
                      <div className="text-sm text-blue-600">
                        <span className="font-medium">Salary Range:</span> {suggestion.salary}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-600 mb-3">Are these suggestions helpful?</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleFeedback(true)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
                    >
                      <FaThumbsUp className="mr-2" /> Yes
                    </button>
                    <button
                      onClick={() => handleFeedback(false)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
                    >
                      <FaThumbsDown className="mr-2" /> No, I need help
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setShowAiModal(false);
                    setAiResponse(null);
                  }}
                  className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Value Proposition */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Career Transformation Partner
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine industry expertise with personalized coaching to help you navigate every stage of your professional development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-4 rounded-lg mr-6">
                <FaSearch className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Discovery</h3>
                <p className="text-gray-600">
                  Uncover career paths aligned with your skills, values, and market opportunities through our comprehensive assessment tools.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-4 rounded-lg mr-6">
                <FaUserTie className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Branding</h3>
                <p className="text-gray-600">
                  Craft compelling resumes, LinkedIn profiles, and personal pitches that showcase your unique value proposition.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-4 rounded-lg mr-6">
                <FaChartLine className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Roadmapping</h3>
                <p className="text-gray-600">
                  Develop a strategic 3-5 year plan with milestones to systematically achieve your professional goals.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-4 rounded-lg mr-6">
                <FaLightbulb className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Skill Gap Analysis</h3>
                <p className="text-gray-600">
                  Identify and bridge competency gaps with targeted learning recommendations and development plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Our 4-Step Career Success Framework
          </h2>
          
          <div className="relative">
            {/* Timeline */}
            <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-blue-200 transform -translate-x-1/2"></div>
            
            {/* Steps */}
            <div className="space-y-16 md:space-y-0">
              {/* Step 1 */}
              <div className="relative md:flex items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0">
                  <div className="bg-white p-8 rounded-xl shadow-md h-full">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-bold mr-4">
                        1
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Assessment</h3>
                    </div>
                    <p className="text-gray-600">
                      Comprehensive evaluation of your skills, personality, and career values through validated psychometric tools.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex md:w-1/2 md:pl-16 justify-center">
                  <div className="bg-blue-100 p-6 rounded-full">
                    <FaBookOpen className="h-10 w-10 text-blue-700" />
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative md:flex items-center">
                <div className="hidden md:flex md:w-1/2 md:pr-16 justify-center order-1">
                  <div className="bg-blue-100 p-6 rounded-full">
                    <FaHandshake className="h-10 w-10 text-blue-700" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-16 mb-8 md:mb-0">
                  <div className="bg-white p-8 rounded-xl shadow-md h-full">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-bold mr-4">
                        2
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Strategy Session</h3>
                    </div>
                    <p className="text-gray-600">
                      90-minute deep dive with a career specialist to analyze results and identify optimal career pathways.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative md:flex items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0">
                  <div className="bg-white p-8 rounded-xl shadow-md h-full">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-bold mr-4">
                        3
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Action Plan</h3>
                    </div>
                    <p className="text-gray-600">
                      Customized roadmap with specific milestones, skill development targets, and networking strategies.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex md:w-1/2 md:pl-16 justify-center">
                  <div className="bg-blue-100 p-6 rounded-full">
                    <FaChartLine className="h-10 w-10 text-blue-700" />
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative md:flex items-center">
                <div className="hidden md:flex md:w-1/2 md:pr-16 justify-center order-1">
                  <div className="bg-blue-100 p-6 rounded-full">
                    <FaUserTie className="h-10 w-10 text-blue-700" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-16">
                  <div className="bg-white p-8 rounded-xl shadow-md h-full">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-bold mr-4">
                        4
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Implementation Support</h3>
                    </div>
                    <p className="text-gray-600">
                      Ongoing coaching and resources to execute your plan, with progress tracking and adjustment sessions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Need more personalized guidance?</h2>
          <p className="text-xl mb-8 opacity-90">
            Connect with one of our career specialists for tailored advice
          </p>
          <button
            onClick={() => navigate('/session')}
            className="px-10 py-4 bg-white text-blue-800 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center mx-auto"
          >
            <FaCalendarAlt className="mr-2" />
            Book a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}