import React, { useState, useEffect } from 'react';
import { 
  FaChartBar, FaLightbulb, FaUserTie, FaCheckCircle, FaArrowRight,
  FaTrophy, FaCalendarAlt, FaFire, FaChartLine, FaTimes, FaAward
} from 'react-icons/fa';
import { RiMentalHealthLine } from 'react-icons/ri';
import { BsGraphUp, BsBookmarkCheck, BsClock } from 'react-icons/bs';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const CareerAssessment = () => {
  // Main assessment state
  const [activeTab, setActiveTab] = useState('skills');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [savedResults, setSavedResults] = useState([]);
  const [performanceHistory, setPerformanceHistory] = useState([]);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);

  // Daily quiz state
  const [dailyQuiz, setDailyQuiz] = useState(null);
  const [quizTimeLeft, setQuizTimeLeft] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizResults, setQuizResults] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // Initialize with sample data
  useEffect(() => {
    // Load sample performance history
    setPerformanceHistory([
      { date: '2023-06-01', score: 65, category: 'skills' },
      { date: '2023-06-08', score: 72, category: 'skills' },
      { date: '2023-06-15', score: 78, category: 'skills' },
      { date: '2023-06-22', score: 85, category: 'skills' },
      { date: '2023-06-29', score: 82, category: 'skills' },
    ]);

    // Set up daily quiz
    setupDailyQuiz();
  }, []);

  // Timer for daily quiz
  useEffect(() => {
    if (quizTimeLeft > 0 && !showQuiz) {
      const timer = setTimeout(() => setQuizTimeLeft(quizTimeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [quizTimeLeft, showQuiz]);

  const setupDailyQuiz = () => {
    const now = new Date();
    const quizEndTime = new Date(now);
    quizEndTime.setHours(23, 59, 59, 999);
    
    setQuizTimeLeft(Math.floor((quizEndTime - now) / 1000));
    
    setDailyQuiz({
      id: 1,
      title: "Daily Career Challenge",
      prize: "50 XP Points",
      questions: [
        {
          id: 1,
          text: "Which skill is most important for a project manager?",
          options: ["Coding", "Time Management", "Graphic Design", "Accounting"],
          correct: "Time Management"
        },
        {
          id: 2,
          text: "What's the average growth rate for data science jobs?",
          options: ["5%", "15%", "31%", "45%"],
          correct: "31%"
        },
        {
          id: 3,
          text: "Which certification is most valuable for IT professionals?",
          options: ["PMP", "AWS Certified", "Google Analytics", "Six Sigma"],
          correct: "AWS Certified"
        }
      ]
    });
  };

  // Start daily quiz
  const startDailyQuiz = () => {
    setShowQuiz(true);
    setCurrentQuizQuestion(0);
    setQuizAnswers({});
    setQuizResults(null);
  };

  // Handle quiz answer
  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    if (currentQuizQuestion < dailyQuiz.questions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      calculateQuizResults();
    }
  };

  // Calculate quiz results
  const calculateQuizResults = () => {
    const correctAnswers = dailyQuiz.questions.filter(
      question => quizAnswers[question.id] === question.correct
    ).length;
    
    const score = Math.round((correctAnswers / dailyQuiz.questions.length) * 100);
    
    setQuizResults({
      score: score,
      correctAnswers: correctAnswers,
      totalQuestions: dailyQuiz.questions.length,
      prizeEarned: score >= 70 ? dailyQuiz.prize : "Try again tomorrow!"
    });
  };

  // Close quiz
  const closeQuiz = () => {
    setShowQuiz(false);
    setQuizResults(null);
  };

  // Assessment data
  const assessments = {
    skills: {
      title: "Skills Assessment",
      icon: <BsGraphUp className="text-blue-500" />,
      description: "Evaluate your technical and soft skills to identify your strengths",
      questions: [
        {
          id: 1,
          text: "How would you rate your problem-solving abilities?",
          options: ["Beginner", "Intermediate", "Advanced", "Expert"]
        },
        {
          id: 2,
          text: "How comfortable are you with public speaking?",
          options: ["Very uncomfortable", "Somewhat uncomfortable", "Comfortable", "Very comfortable"]
        },
        {
          id: 3,
          text: "Rate your proficiency with data analysis",
          options: ["No experience", "Basic understanding", "Proficient", "Advanced"]
        }
      ]
    },
    interests: {
      title: "Interests Assessment",
      icon: <FaLightbulb className="text-yellow-500" />,
      description: "Discover careers that align with your passions and interests",
      questions: [
        {
          id: 1,
          text: "Which activities energize you the most?",
          options: ["Creative projects", "Helping others", "Analyzing data", "Building things"]
        },
        {
          id: 2,
          text: "What type of work environment do you prefer?",
          options: ["Structured and predictable", "Fast-paced and dynamic", "Independent and flexible", "Collaborative team-based"]
        }
      ]
    },
    personality: {
      title: "Personality Assessment",
      icon: <RiMentalHealthLine className="text-purple-500" />,
      description: "Understand how your personality traits influence career satisfaction",
      questions: [
        {
          id: 1,
          text: "How do you typically make decisions?",
          options: ["Logic and objective analysis", "Personal values and ethics", "Practical considerations", "How it affects others"]
        },
        {
          id: 2,
          text: "How do you prefer to work?",
          options: ["Following clear instructions", "Creating new approaches", "Collaborating with others", "Working independently"]
        }
      ]
    }
  };

  // Career matches based on assessment results
  const careerMatches = [
    {
      id: 1,
      title: "Data Scientist",
      matchScore: 92,
      description: "Analyze complex data to uncover insights and drive decision-making",
      skills: ["Statistics", "Programming", "Data Visualization"],
      salaryRange: "$95,000 - $165,000",
      growth: "Much faster than average (31%)",
      demand: "High",
      education: "Bachelor's or Master's"
    },
    {
      id: 2,
      title: "UX Designer",
      matchScore: 87,
      description: "Create meaningful user experiences for digital products",
      skills: ["User Research", "Wireframing", "Prototyping"],
      salaryRange: "$75,000 - $135,000",
      growth: "Faster than average (22%)",
      demand: "High",
      education: "Bachelor's preferred"
    },
    {
      id: 3,
      title: "Project Manager",
      matchScore: 78,
      description: "Lead teams to deliver projects on time and within budget",
      skills: ["Leadership", "Organization", "Communication"],
      salaryRange: "$70,000 - $150,000",
      growth: "Average (7%)",
      demand: "Medium",
      education: "Bachelor's degree"
    }
  ];

  // Handle answer selection
  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    if (currentQuestion < assessments[activeTab].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
    
    const newProgress = ((currentQuestion + 1) / assessments[activeTab].questions.length) * 100;
    setProgress(newProgress);
  };

  // Calculate assessment results
  const calculateResults = () => {
    // Simulate calculating a score based on answers
    const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
    
    const resultData = {
      score: score,
      strengths: ["Analytical Thinking", "Problem Solving", "Attention to Detail"],
      suggestedIndustries: ["Technology", "Finance", "Healthcare"],
      improvementAreas: ["Public Speaking", "Time Management"],
      insights: [
        "Your technical skills are above average for most tech roles",
        "Consider developing more leadership abilities for management tracks",
        "Your communication style suits collaborative environments"
      ]
    };
    
    setResults(resultData);
    setCurrentQuestion(0);
    setProgress(0);
    
    // Add to performance history
    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      score: score,
      category: activeTab
    };
    setPerformanceHistory([...performanceHistory, newEntry]);
  };

  // Save assessment results
  const saveResults = () => {
    const newResult = {
      id: Date.now(),
      assessmentType: activeTab,
      date: new Date().toLocaleDateString(),
      score: results.score,
      results: results
    };
    setSavedResults([...savedResults, newResult]);
    setResults(null);
  };

  // Reset current assessment
  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setProgress(0);
    setResults(null);
  };

  // Performance chart data
  const performanceChartData = {
    labels: performanceHistory.map(item => item.date),
    datasets: [
      {
        label: 'Assessment Scores',
        data: performanceHistory.map(item => item.score),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  // Skills distribution data
  const skillsChartData = {
    labels: ['Technical', 'Creative', 'Leadership', 'Communication', 'Analytical'],
    datasets: [
      {
        label: 'Your Skills',
        data: [85, 60, 70, 75, 90],
        backgroundColor: [
          'rgba(79, 70, 229, 0.7)',
          'rgba(234, 179, 8, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(244, 63, 94, 0.7)',
          'rgba(59, 130, 246, 0.7)'
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(244, 63, 94, 1)',
          'rgba(59, 130, 246, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Format time for daily quiz
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with performance overview */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Assessment Center</h1>
          <p className="text-lg text-gray-600">
            Discover and improve your career potential with personalized assessments
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div 
            className="flex items-center bg-indigo-50 px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors"
            onClick={() => setShowPerformanceModal(true)}
          >
            <FaChartLine className="text-indigo-600 mr-2" />
            <span className="font-medium text-indigo-700">View Performance</span>
          </div>
          
          {dailyQuiz && !showQuiz && (
            <div 
              className="bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-lg flex items-center cursor-pointer hover:bg-yellow-100"
              onClick={startDailyQuiz}
            >
              <FaTrophy className="text-yellow-500 mr-2" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Daily Quiz</p>
                <p className="text-xs text-yellow-600 flex items-center">
                  <BsClock className="mr-1" /> {formatTime(quizTimeLeft)} left
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Daily Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FaTrophy className="text-yellow-500 mr-2" /> {dailyQuiz.title}
                </h2>
                <button 
                  onClick={closeQuiz}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              
              {!quizResults ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-medium text-gray-500">
                      Question {currentQuizQuestion + 1} of {dailyQuiz.questions.length}
                    </span>
                    <div className="text-sm font-medium text-gray-500">
                      Prize: {dailyQuiz.prize}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      {dailyQuiz.questions[currentQuizQuestion].text}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {dailyQuiz.questions[currentQuizQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(dailyQuiz.questions[currentQuizQuestion].id, option)}
                          className={`p-4 border rounded-lg text-left transition-colors ${
                            quizAnswers[dailyQuiz.questions[currentQuizQuestion].id] === option 
                              ? 'border-indigo-500 bg-indigo-50' 
                              : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <FaAward className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Quiz Completed!
                  </h2>
                  <div className="text-3xl font-bold text-indigo-600 mb-4">
                    Score: {quizResults.score}%
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    You answered {quizResults.correctAnswers} out of {quizResults.totalQuestions} correctly
                  </p>
                  
                  {quizResults.score >= 70 ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <p className="text-yellow-800 font-medium">
                        Congratulations! You earned {quizResults.prizeEarned}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <p className="text-blue-800">
                        {quizResults.prizeEarned} Keep practicing to improve!
                      </p>
                    </div>
                  )}
                  
                  <button
                    onClick={closeQuiz}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Continue to Assessments
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Assessment Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.keys(assessments).map((tab) => (
          <div 
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              resetAssessment();
            }}
            className={`p-6 rounded-xl cursor-pointer transition-all ${activeTab === tab ? 'bg-indigo-50 border-2 border-indigo-200 shadow-sm' : 'bg-white border border-gray-200 hover:border-indigo-300'}`}
          >
            <div className="flex items-center mb-3">
              <div className="text-2xl mr-3">
                {assessments[tab].icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{assessments[tab].title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{assessments[tab].description}</p>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {assessments[tab].questions.length} questions
              </div>
              {activeTab === tab && (
                <div className="flex items-center text-indigo-600 font-medium">
                  <span>Start Now</span>
                  <FaArrowRight className="ml-2" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Assessment Content */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        {!results ? (
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {assessments[activeTab].title}
              </h2>
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestion + 1} of {assessments[activeTab].questions.length}
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Current Question */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                {assessments[activeTab].questions[currentQuestion].text}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assessments[activeTab].questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(assessments[activeTab].questions[currentQuestion].id, option)}
                    className="p-4 border border-gray-300 rounded-lg text-left hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
                disabled={currentQuestion === 0}
                className={`px-4 py-2 rounded-md ${currentQuestion === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50'}`}
              >
                Previous
              </button>
              <div className="text-sm text-gray-500">
                {Object.keys(answers).length} of {assessments[activeTab].questions.length} answered
              </div>
            </div>
          </div>
        ) : (
          /* Results Display */
          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <FaCheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Assessment Complete!
              </h2>
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                Your Score: {results.score}/100
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {results.score >= 85 ? "Excellent! You're well prepared for this career area." : 
                 results.score >= 70 ? "Good job! You have solid foundations to build on." : 
                 "Keep working! You have potential but need more development."}
              </p>
            </div>
            
            {/* Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Your Progress Over Time</h3>
                <Line 
                  data={performanceChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100
                      }
                    }
                  }}
                />
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Skills Distribution</h3>
                <Bar 
                  data={skillsChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100
                      }
                    }
                  }}
                />
              </div>
            </div>
            
            {/* Career Matches */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <BsBookmarkCheck className="mr-2 text-indigo-500" /> Your Top Career Matches
              </h3>
              <div className="space-y-4">
                {careerMatches.map((career) => (
                  <div key={career.id} className="border border-gray-200 rounded-lg p-5 hover:border-indigo-300 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <h4 className="text-lg font-bold text-gray-800">{career.title}</h4>
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                            {career.demand} Demand
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{career.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {career.skills.map((skill, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          <p><span className="font-medium">Education:</span> {career.education}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="flex items-center mb-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-green-500 h-2.5 rounded-full" 
                              style={{ width: `${career.matchScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{career.matchScore}% match</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p><span className="font-medium">Salary:</span> {career.salaryRange}</p>
                          <p><span className="font-medium">Growth:</span> {career.growth}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={resetAssessment}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Retake Assessment
              </button>
              <button
                onClick={saveResults}
                className="px-6 py-3 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Save Results
              </button>
              <button
                onClick={() => setActiveTab(activeTab === 'skills' ? 'interests' : activeTab === 'interests' ? 'personality' : 'skills')}
                className="px-6 py-3 border border-transparent rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Take Next Assessment
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Saved Results Section */}
      {savedResults.length > 0 && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Your Assessment History</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {savedResults.map((result) => (
              <div key={result.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="text-lg font-medium text-gray-800 mr-3">
                        {assessments[result.assessmentType].title}
                      </h3>
                      <span className="text-sm px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        Score: {result.score}/100
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      Completed on {result.date}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.results.strengths.slice(0, 3).map((strength, index) => (
                        <span key={index} className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex space-x-2">
                    <button className="px-3 py-1 text-sm border border-indigo-200 text-indigo-600 rounded hover:bg-indigo-50">
                      View Details
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-200 text-gray-600 rounded hover:bg-gray-50">
                      Compare
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Modal */}
      {showPerformanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Performance Dashboard</h2>
                <button 
                  onClick={() => setShowPerformanceModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Assessment History</h3>
                  <Line 
                    data={performanceChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100
                        }
                      }
                    }}
                  />
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Skills Radar</h3>
                  <Bar 
                    data={skillsChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100
                        }
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-indigo-800 mb-3">Weekly Progress</h3>
                <div className="flex justify-between">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">3</div>
                    <div className="text-sm text-indigo-800">Assessments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">+12%</div>
                    <div className="text-sm text-indigo-800">Score Improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">5</div>
                    <div className="text-sm text-indigo-800">New Skills</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">2</div>
                    <div className="text-sm text-indigo-800">Career Matches</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setShowPerformanceModal(false)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Close Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerAssessment;