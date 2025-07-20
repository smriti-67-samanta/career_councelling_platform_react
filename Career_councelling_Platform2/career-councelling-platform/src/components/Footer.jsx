import { FaLinkedin, FaTwitter, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-6 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-2 flex items-center">
              <span className="bg-indigo-600 p-1 rounded-full mr-2">
                <FaGraduationCap className="h-4 w-4" />
              </span>
              CareerConnect
            </h3>
            <p className="text-gray-300 mb-2 text-xs">
              Empowering individuals to discover their career path through expert counseling, 
              personalized guidance, and professional development resources.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaLinkedin className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaTwitter className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaFacebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-md font-semibold mb-2 border-b border-indigo-500 pb-1">Quick Links</h3>
            <ul className="space-y-1">
             
              <li>
                <Link 
                  to="/successstories" 
                  className="text-gray-300 hover:text-indigo-400 transition-colors text-xs"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link 
                  to="/feedback" 
                  className="text-gray-300 hover:text-indigo-400 transition-colors text-xs"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-md font-semibold mb-2 border-b border-indigo-500 pb-1">Contact Us</h3>
            <ul className="space-y-1">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-indigo-400 mt-0.5 mr-1 flex-shrink-0 h-3 w-3" />
                <span className="text-gray-300 text-xs">123 Career Street, Suite 456<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-indigo-400 mr-1 h-3 w-3" />
                <a href="mailto:info@careerconnect.com" className="text-gray-300 hover:text-indigo-400 transition-colors text-xs">
                  info@careerconnect.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-indigo-400 mr-1 h-3 w-3" />
                <a href="tel:+11234567890" className="text-gray-300 hover:text-indigo-400 transition-colors text-xs">
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-700 rounded p-2 mb-4">
          <div className="md:flex justify-between items-center">
            <div className="mb-2 md:mb-0">
              <h3 className="text-sm font-semibold mb-0.5">Subscribe to our Newsletter</h3>
              <p className="text-gray-300 text-xs">Get career tips and updates directly to your inbox</p>
            </div>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-2 py-0.5 rounded-l focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full text-gray-800 text-xs"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-0.5 rounded-r transition-colors text-xs">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} CareerConnect. All rights reserved.
          </p>
          <div className="flex space-x-3">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-indigo-400 transition-colors text-xs">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-indigo-400 transition-colors text-xs">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-gray-400 hover:text-indigo-400 transition-colors text-xs">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;