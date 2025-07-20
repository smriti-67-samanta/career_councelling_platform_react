import React, { useState, useEffect, useRef } from 'react';
import { 
  FaLightbulb, 
  FaRoute, 
  FaGraduationCap, 
  FaMoneyBillWave,
  FaChartBar,
  FaUserTie,
  FaTools,
  FaStar,
  FaArrowRight,
  FaCommentAlt,
  FaPaperPlane,
  FaTimes,
  FaRobot,
  FaCalendarAlt,
  FaHandsHelping
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CareerSuggestion = ({ userProfile }) => {
  const navigate = useNavigate();
  // State for AI recommendations
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPath, setSelectedPath] = useState(null);
  const [showCounselingOption, setShowCounselingOption] = useState(false);
  
  // AI Chat states
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Generate career recommendations
  const generateRecommendations = (profile) => {
    setLoading(true);
    
    setTimeout(() => {
      const skills = profile.skills || [];
      const interests = profile.interests || [];
      const experience = profile.experienceLevel || 'entry';
      
      let recommendedPaths = [];
      
      // Tech career paths
      if (skills.includes('programming') || interests.includes('technology')) {
        recommendedPaths.push({
          id: 'tech',
          title: 'Technology Career Path',
          description: 'Based on your technical skills and interests',
          paths: [
            {
              role: 'Frontend Developer',
              steps: ['Learn HTML/CSS', 'Master JavaScript', 'Learn React/Angular', 'Build portfolio projects', 'Apply for junior positions'],
              salaryRange: '$70,000 - $120,000',
              growth: '22% (Much faster than average)',
              resources: ['react-guide', 'javascript-course', 'portfolio-tips']
            },
            {
              role: 'Data Scientist',
              steps: ['Learn Python', 'Study statistics', 'Learn machine learning', 'Work on data projects', 'Get certified'],
              salaryRange: '$90,000 - $150,000',
              growth: '31% (Much faster than average)',
              resources: ['python-for-ds', 'ml-foundations', 'data-visualization']
            }
          ]
        });
      }
      
      // Business career paths
      if (skills.includes('communication') || interests.includes('business')) {
        recommendedPaths.push({
          id: 'business',
          title: 'Business Career Path',
          description: 'Leveraging your communication and organizational skills',
          paths: [
            {
              role: 'Marketing Manager',
              steps: ['Study marketing principles', 'Learn digital marketing', 'Gain analytics skills', 'Complete internships', 'Build campaign portfolio'],
              salaryRange: '$60,000 - $110,000',
              growth: '10% (Average)',
              resources: ['marketing-101', 'digital-marketing', 'analytics-tools']
            }
          ]
        });
      }
      
      // Default recommendations if no strong matches
      if (recommendedPaths.length === 0) {
        recommendedPaths.push({
          id: 'general',
          title: 'General Professional Path',
          description: 'Building foundational career skills',
          paths: [
            {
              role: 'Project Coordinator',
              steps: ['Develop organization skills', 'Learn office software', 'Improve communication', 'Get entry-level experience', 'Pursue certifications'],
              salaryRange: '$45,000 - $75,000',
              growth: '8% (Average)',
              resources: ['office-skills', 'communication-guide']
            }
          ]
        });
      }
      
      setRecommendations(recommendedPaths);
      setLoading(false);
      
      if (recommendedPaths.length > 0) {
        setSelectedPath(recommendedPaths[0]);
      }
      
      // Add welcome message from AI
      setMessages([{
        id: 1,
        text: "Hello! I've analyzed your profile and generated personalized career recommendations. Let me know if you'd like more details about any path!",
        sender: 'ai'
      }]);
    }, 1500);
  };

  // Initialize with user profile
  useEffect(() => {
    if (userProfile) {
      generateRecommendations(userProfile);
    }
  }, [userProfile]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle booking counseling session
  const handleBookCounseling = () => {
    navigate('/session');
    toast.info('Redirecting to career counseling booking');
  };

  // Handle user feedback on recommendations
  const handleFeedback = (satisfied) => {
    if (satisfied) {
      toast.success('Great! Explore the recommended paths below');
    } else {
      setShowCounselingOption(true);
      toast.info('Consider booking a session with our career counselor');
    }
  };

  // Simple bar chart component
  const GrowthBarChart = ({ data }) => {
    // ... (keep your existing GrowthBarChart implementation)
  };

  // Handle sending messages to AI
  const handleSendMessage = (e) => {
    // ... (keep your existing handleSendMessage implementation)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* AI Chat Bot - keep your existing chat implementation */}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <FaLightbulb className="text-yellow-400 mr-3" />
            Your Personalized Career Plan
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            We've analyzed your profile to suggest the best career paths for you
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-4 text-gray-600">Analyzing your profile...</span>
          </div>
        ) : (
          <>
            {/* Feedback Section */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Are these recommendations helpful?
              </h2>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => handleFeedback(true)}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                >
                  <FaThumbsUp className="mr-2" /> Yes, they're helpful
                </button>
                <button 
                  onClick={() => handleFeedback(false)}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
                >
                  <FaThumbsDown className="mr-2" /> I need more guidance
                </button>
              </div>
              
              {showCounselingOption && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-center">
                    <FaHandsHelping className="text-blue-500 mr-2" />
                    Need personalized help?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our career counselors can provide one-on-one guidance tailored to your specific situation.
                  </p>
                  <button
                    onClick={handleBookCounseling}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                  >
                    <FaCalendarAlt className="mr-2" />
                    Book a Counseling Session
                  </button>
                </div>
              )}
            </div>

            {/* Rest of your component (recommendations, visualization, etc.) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ... (keep your existing recommendation panels) */}
            </div>
            
            {/* Counseling CTA at bottom */}
            <div className="mt-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <FaHandsHelping className="text-indigo-600 mr-3" />
                Still unsure about your career path?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our certified career counselors can help you clarify your goals and create a personalized action plan.
              </p>
              <button
                onClick={handleBookCounseling}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center mx-auto"
              >
                <FaCalendarAlt className="mr-2" />
                Schedule a Free Consultation
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CareerSuggestion;