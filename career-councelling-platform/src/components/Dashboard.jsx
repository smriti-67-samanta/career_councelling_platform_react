// src/components/Dashboard.jsx
import { FaCalendarAlt, FaBook, FaChartLine, FaUserTie, FaBell, FaTasks } from 'react-icons/fa';
import { MdOutlineFeedback, MdOutlineForum } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([
    { id: 1, title: 'Career Assessment', date: '2023-06-15', time: '10:00 AM', counselor: 'Dr. Sarah Johnson' },
    { id: 2, title: 'Resume Review', date: '2023-06-18', time: '2:30 PM', counselor: 'Prof. Michael Chen' }
  ]);

  const [recommendations, setRecommendations] = useState([
    { id: 1, title: 'Take Personality Test', completed: false },
    { id: 2, title: 'Complete Skills Assessment', completed: true },
    { id: 3, title: 'Explore Marketing Careers', completed: false }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New career resources available', read: false },
    { id: 2, message: 'Your session with Dr. Johnson is tomorrow', read: true }
  ]);

  const [progress, setProgress] = useState(65);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back! Here's what's happening with your career journey.</p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Progress Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Career Progress</h2>
                <span className="text-sm font-medium text-indigo-600">{progress}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-indigo-600 h-4 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-lg font-semibold">8</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">In Progress</p>
                  <p className="text-lg font-semibold">3</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Remaining</p>
                  <p className="text-lg font-semibold">5</p>
                </div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Upcoming Sessions</h2>
                <Link to="/sessions" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingSessions.map(session => (
                  <div key={session.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                        <FaCalendarAlt className="text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{session.title}</h3>
                        <p className="text-sm text-gray-500">{session.date} at {session.time}</p>
                        <p className="text-sm text-gray-500">With {session.counselor}</p>
                      </div>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  to="/schedule" 
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-indigo-100 p-3 rounded-full mb-2">
                    <FaCalendarAlt className="text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Schedule Session</span>
                </Link>
                <Link 
                  to="/resources" 
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-indigo-100 p-3 rounded-full mb-2">
                    <FaBook className="text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Resources</span>
                </Link>
                <Link 
                  to="/progress" 
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-indigo-100 p-3 rounded-full mb-2">
                    <FaChartLine className="text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Progress</span>
                </Link>
                <Link 
                  to="/counselors" 
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-indigo-100 p-3 rounded-full mb-2">
                    <FaUserTie className="text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Counselors</span>
                </Link>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommendations</h2>
              <div className="space-y-3">
                {recommendations.map(item => (
                  <div key={item.id} className="flex items-start">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => {}}
                      className="mt-1 mr-3 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <span className={`flex-1 text-sm ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                  Mark All Read
                </button>
              </div>
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg ${notification.read ? 'bg-white' : 'bg-indigo-50'}`}
                  >
                    <div className="flex items-start">
                      <FaBell className={`mt-0.5 mr-3 ${notification.read ? 'text-gray-400' : 'text-indigo-600'}`} />
                      <span className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
                        {notification.message}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Feedback */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Feedback</h2>
              <Link to="/feedback" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                View All
              </Link>
            </div>
            <div className="flex items-start">
              <MdOutlineFeedback className="text-indigo-600 text-2xl mr-4 mt-1" />
              <div>
                <p className="text-gray-800">"Your career assessment results show strong potential in marketing fields."</p>
                <p className="text-sm text-gray-500 mt-2">- Dr. Sarah Johnson, June 10</p>
              </div>
            </div>
          </div>

          {/* Community Forum */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Community Forum</h2>
              <Link to="/forum" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                View All
              </Link>
            </div>
            <div className="flex items-start">
              <MdOutlineForum className="text-indigo-600 text-2xl mr-4 mt-1" />
              <div>
                <p className="text-gray-800">New discussion: "Career transitions in the digital age"</p>
                <p className="text-sm text-gray-500 mt-2">12 comments | Last updated today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;