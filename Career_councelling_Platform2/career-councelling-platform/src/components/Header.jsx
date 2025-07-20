import { Link } from 'react-router-dom';
import { FaGraduationCap, FaSearch, FaUserTie, FaChartLine, FaEnvelope } from 'react-icons/fa';
import { MdOutlineConnectWithoutContact } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-xs md:text-sm font-medium">
              <FaUserTie className="mr-1.5" /> Expert Career Counselors
            </span>
            <span className="flex items-center text-xs md:text-sm font-medium">
              <FaChartLine className="mr-1.5" /> 95% Success Rate
            </span>
            {user?.email && (
              <span className="flex items-center text-xs md:text-sm font-medium">
                <FaEnvelope className="mr-1.5" /> {user.email}
              </span>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-xs md:text-sm font-medium">
              {formatDate(currentDateTime)} | {formatTime(currentDateTime)}
            </span>
            <span className="text-indigo-300">|</span>
            <Link to="/contact" className="text-xs md:text-sm font-medium hover:text-indigo-200 transition-colors">
              Contact Us
            </Link>
            <span className="text-indigo-300">|</span>
            <Link to="/faq" className="text-xs md:text-sm font-medium hover:text-indigo-200 transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header - Rest remains the same */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Branding */}
          <div className="flex items-center">
            <FaGraduationCap className="h-9 w-9 text-indigo-600 mr-3" />
            <div>
              <Link to="/" className="text-xl md:text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">
                CareerPath<span className="text-indigo-600">Pro</span>
              </Link>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5">Find Your Perfect Career Journey</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-[400px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search career paths, counselors..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm"
            />
          </div>

          {/* User Profile/CTA */}
          <div className="flex-shrink-0">
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-600 transition-all font-medium flex items-center text-sm shadow-sm"
            >
              <MdOutlineConnectWithoutContact className="mr-2 h-4 w-4" />
              My Dashboard
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;