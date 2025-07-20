import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { 
  FaHome,
  FaCalendarAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaGraduationCap,
  FaBars,
  FaBook,
  FaBriefcase,
  FaLightbulb,
  FaUsers,
  FaChartBar
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
    setMobileMenuOpen(false);
  };

  // Custom class for active links
  const activeClass = "bg-indigo-50 text-indigo-700 border-indigo-500";
  const inactiveClass = "text-gray-700 hover:bg-gray-50";

  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center md:hidden">
              <FaGraduationCap className="h-7 w-7 text-indigo-600 mr-2" />
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/home" 
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors border-b-2 border-transparent`
              }
            >
              <FaHome className="h-4 w-4 mr-2 text-indigo-600" />
              Home
            </NavLink>
            
            <NavLink 
              to="/session" 
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors border-b-2 border-transparent`
              }
            >
              <FaCalendarAlt className="h-4 w-4 mr-2 text-indigo-600" />
              Sessions
            </NavLink>
            
            <NavLink 
              to="/careerassessment" 
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors border-b-2 border-transparent`
              }
            >
              <FaChartBar className="h-4 w-4 mr-2 text-indigo-600" />
               Assessment
            </NavLink>
            
           
            
            <NavLink 
              to="/communityforum" 
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors border-b-2 border-transparent`
              }
            >
              <FaUsers className="h-4 w-4 mr-2 text-indigo-600" />
              Community Forum
            </NavLink>
            
            <NavLink 
              to="/resources" 
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors border-b-2 border-transparent`
              }
            >
              <FaBook className="h-4 w-4 mr-2 text-indigo-600" />
              Resources
            </NavLink>
            
            <NavLink 
              to="/jobboard" 
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors border-b-2 border-transparent`
              }
            >
              <FaBriefcase className="h-4 w-4 mr-2 text-indigo-600" />
              Job Board
            </NavLink>
            
            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors border-b-2 border-transparent`
              }
            >
              <FaUserCircle className="h-4 w-4 mr-2 text-indigo-600" />
              Profile
            </NavLink>
            
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
            >
              <FaSignOutAlt className="h-4 w-4 mr-2 text-indigo-600" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <NavLink 
              to="/home" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} block px-3 py-2 rounded-md text-base font-medium flex items-center`
              }
            >
              <FaHome className="h-4 w-4 mr-2 text-indigo-600" />
              Home
            </NavLink>
            
            <NavLink 
              to="/session" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} block px-3 py-2 rounded-md text-base font-medium flex items-center`
              }
            >
              <FaCalendarAlt className="h-4 w-4 mr-2 text-indigo-600" />
              Sessions
            </NavLink>
            
            <NavLink 
              to="/careerassessment" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} block px-3 py-2 rounded-md text-base font-medium flex items-center`
              }
            >
              <FaChartBar className="h-4 w-4 mr-2 text-indigo-600" />
               Assessment
            </NavLink>
            
          
            
            <NavLink 
              to="/communityforum" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} block px-3 py-2 rounded-md text-base font-medium flex items-center`
              }
            >
              <FaUsers className="h-4 w-4 mr-2 text-indigo-600" />
              Community Forum
            </NavLink>
            
            <NavLink 
              to="/resources" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} block px-3 py-2 rounded-md text-base font-medium flex items-center`
              }
            >
              <FaBook className="h-4 w-4 mr-2 text-indigo-600" />
              Resources
            </NavLink>
            
            <NavLink 
              to="/jobboard" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} block px-3 py-2 rounded-md text-base font-medium flex items-center`
              }
            >
              <FaBriefcase className="h-4 w-4 mr-2 text-indigo-600" />
              Job Board
            </NavLink>
            
            <NavLink 
              to="/profile" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `${isActive ? activeClass : inactiveClass} block px-3 py-2 rounded-md text-base font-medium flex items-center`
              }
            >
              <FaUserCircle className="h-4 w-4 mr-2 text-indigo-600" />
              Profile
            </NavLink>
            
            <button
              onClick={handleLogout}
              className="w-full text-left text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <FaSignOutAlt className="h-4 w-4 mr-2 text-indigo-600" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;