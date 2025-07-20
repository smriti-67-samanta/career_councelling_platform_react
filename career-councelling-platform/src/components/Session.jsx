import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaClock, FaUserTie, FaMapMarkerAlt, FaStar, FaRegStar, FaTimes, FaVideo } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Session = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    careerGoals: '',
    concerns: ''
  });
  const [bookedSessions, setBookedSessions] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date()); // Track current time for active sessions

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Sample counselor data
  const counselors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Career Transition',
      experience: '10+ years',
      rating: 4.8,
      location: 'New York, USA',
      availableSlots: [
        { id: 1, date: getFutureDate(1), time: '09:00 AM - 10:00 AM', booked: false },
        { id: 2, date: getFutureDate(1), time: '02:00 PM - 03:00 PM', booked: false },
        { id: 3, date: getFutureDate(2), time: '11:00 AM - 12:00 PM', booked: false }
      ],
      bio: 'Expert in mid-career transitions and executive coaching'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialization: 'Tech Careers',
      experience: '8 years',
      rating: 4.9,
      location: 'San Francisco, USA',
      availableSlots: [
        { id: 4, date: getFutureDate(2), time: '10:00 AM - 11:00 AM', booked: false },
        { id: 5, date: getFutureDate(3), time: '03:00 PM - 04:00 PM', booked: false }
      ],
      bio: 'Specialized in tech industry career growth and interview preparation'
    },
    {
      id: 3,
      name: 'Priya Patel',
      specialization: 'Recent Graduates',
      experience: '6 years',
      rating: 4.7,
      location: 'London, UK',
      availableSlots: [
        { id: 6, date: getFutureDate(4), time: '01:00 PM - 02:00 PM', booked: false },
        { id: 7, date: getFutureDate(5), time: '09:00 AM - 10:00 AM', booked: false }
      ],
      bio: 'Helping graduates launch their careers successfully'
    },
    {
      id: 4,
      name: 'David Wilson',
      specialization: 'Leadership Development',
      experience: '12 years',
      rating: 4.9,
      location: 'Chicago, USA',
      availableSlots: [
        { id: 8, date: getFutureDate(3), time: '04:00 PM - 05:00 PM', booked: false },
        { id: 9, date: getFutureDate(4), time: '10:00 AM - 11:00 AM', booked: false }
      ],
      bio: 'Executive coach specializing in leadership and management skills'
    },
    {
      id: 5,
      name: 'Emma Rodriguez',
      specialization: 'Career Change',
      experience: '7 years',
      rating: 4.6,
      location: 'Miami, USA',
      availableSlots: [
        { id: 10, date: getFutureDate(5), time: '01:00 PM - 02:00 PM', booked: false },
        { id: 11, date: getFutureDate(6), time: '03:00 PM - 04:00 PM', booked: false }
      ],
      bio: 'Helping professionals navigate major career changes successfully'
    }
  ];

  // Helper function to get future dates
  function getFutureDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  // Helper function to parse time string to Date object
  function parseTime(dateStr, timeStr) {
    const [startTime, endTime] = timeStr.split(' - ');
    const [startHour, startMinute] = convertTimeTo24Hour(startTime).split(':').map(Number);
    const [endHour, endMinute] = convertTimeTo24Hour(endTime).split(':').map(Number);
    
    const startDate = new Date(dateStr);
    startDate.setHours(startHour, startMinute, 0, 0);
    
    const endDate = new Date(dateStr);
    endDate.setHours(endHour, endMinute, 0, 0);
    
    return { start: startDate, end: endDate };
  }

  // Helper function to convert AM/PM to 24-hour format
  function convertTimeTo24Hour(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    // Load booked sessions from localStorage
    const savedSessions = localStorage.getItem('bookedSessions');
    if (savedSessions) {
      setBookedSessions(JSON.parse(savedSessions));
    }
  }, [user, navigate]);

  useEffect(() => {
    // Filter out expired sessions (only after they end)
    const validSessions = bookedSessions.filter(session => {
      const { end } = parseTime(session.date, session.time);
      return currentTime <= end;
    });

    if (validSessions.length !== bookedSessions.length) {
      setBookedSessions(validSessions);
      localStorage.setItem('bookedSessions', JSON.stringify(validSessions));
    }
  }, [bookedSessions, currentTime]);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    console.log('Searching for:', searchTerm);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      const filtered = counselors.filter(counselor =>
        counselor.name.toLowerCase().includes(value.toLowerCase()) ||
        counselor.specialization.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (counselor) => {
    setSearchTerm(counselor.name);
    setSelectedCounselor(counselor);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedCounselor || !selectedSlot) {
      toast.error('Please select a counselor and time slot');
      return;
    }

    // Mark the slot as booked
    const updatedCounselors = counselors.map(counselor => {
      if (counselor.id === selectedCounselor.id) {
        const updatedSlots = counselor.availableSlots.map(slot => {
          if (slot.id === selectedSlot.id) {
            return { ...slot, booked: true };
          }
          return slot;
        });
        return { ...counselor, availableSlots: updatedSlots };
      }
      return counselor;
    });

    // Generate meeting link
    const meetingLink = `https://meet.example.com/${Math.random().toString(36).substring(7)}`;
    
    // Create new session
    const newSession = {
      id: Date.now(),
      counselorId: selectedCounselor.id,
      counselorName: selectedCounselor.name,
      specialization: selectedCounselor.specialization,
      date: selectedSlot.date,
      time: selectedSlot.time,
      meetingLink,
      ...bookingDetails
    };

    // Update booked sessions
    const updatedSessions = [...bookedSessions, newSession];
    setBookedSessions(updatedSessions);
    localStorage.setItem('bookedSessions', JSON.stringify(updatedSessions));

    // Show success message
    toast.success(
      <div>
        <h3 className="font-bold">Session Booked Successfully!</h3>
        <p className="mt-2">With: {selectedCounselor.name}</p>
        <p>Date: {selectedSlot.date}</p>
        <p>Time: {selectedSlot.time}</p>
        <p className="mt-2">
          Meeting Link: <a href={meetingLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{meetingLink}</a>
        </p>
        <p className="mt-2 text-sm">Details have been sent to your email</p>
      </div>,
      { autoClose: false }
    );

    // Reset form
    setSelectedCounselor(null);
    setSelectedSlot(null);
    setSearchTerm('');
    setBookingDetails({
      name: user?.displayName || '',
      email: user?.email || '',
      phone: '',
      careerGoals: '',
      concerns: ''
    });
  };

  const cancelSession = (sessionId) => {
    const sessionToCancel = bookedSessions.find(s => s.id === sessionId);
    if (!sessionToCancel) return;

    // Mark the slot as available again
    const updatedCounselors = counselors.map(counselor => {
      if (counselor.id === sessionToCancel.counselorId) {
        const updatedSlots = counselor.availableSlots.map(slot => {
          if (slot.date === sessionToCancel.date && slot.time === sessionToCancel.time) {
            return { ...slot, booked: false };
          }
          return slot;
        });
        return { ...counselor, availableSlots: updatedSlots };
      }
      return counselor;
    });

    // Remove the session
    const updatedSessions = bookedSessions.filter(s => s.id !== sessionId);
    setBookedSessions(updatedSessions);
    localStorage.setItem('bookedSessions', JSON.stringify(updatedSessions));

    toast.success('Session cancelled successfully');
  };

  const filteredCounselors = counselors.filter(counselor =>
    counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    counselor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.floor(rating) ? 
        <FaStar key={i} className="text-yellow-400 inline" /> : 
        <FaRegStar key={i} className="text-yellow-400 inline" />
      );
    }
    return stars;
  };

  const isSlotExpired = (date, time) => {
    const { end } = parseTime(date, time);
    return currentTime > end;
  };

  const isSessionActive = (date, time) => {
    const { start, end } = parseTime(date, time);
    return currentTime >= start && currentTime <= end;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Career Counseling Session</h1>
        
        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search counselors by name or specialization..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
                  {suggestions.map((counselor) => (
                    <div
                      key={counselor.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onMouseDown={() => selectSuggestion(counselor)}
                    >
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm mr-3">
                        {counselor.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{counselor.name}</div>
                        <div className="text-sm text-gray-500">{counselor.specialization}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="ml-3 inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Counselors List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Counselors</h2>
            
            {bookedSessions.length > 0 && (
              <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-3">Your Sessions</h3>
                {bookedSessions.map(session => {
                  const active = isSessionActive(session.date, session.time);
                  const { end } = parseTime(session.date, session.time);
                  const timeLeft = Math.max(0, Math.floor((end - currentTime) / 60000)); // Minutes left
                  
                  return (
                    <div key={session.id} className={`mb-3 p-3 border rounded-md ${active ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{session.counselorName}</h4>
                          <p className="text-sm text-gray-600">{session.specialization}</p>
                          <div className="mt-1 text-sm">
                            <FaCalendarAlt className="inline mr-2" />
                            {session.date} | <FaClock className="inline mr-2" />
                            {session.time}
                          </div>
                          {active && (
                            <div className="mt-1 flex items-center text-green-600 text-sm">
                              <FaVideo className="mr-1" />
                              <span>Session in progress ({timeLeft} min remaining)</span>
                            </div>
                          )}
                          <a 
                            href={session.meetingLink} 
                            className={`text-sm underline mt-1 inline-block ${active ? 'text-green-600' : 'text-blue-600'}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {active ? 'Join Meeting Now' : 'Meeting Link'}
                          </a>
                        </div>
                        <button
                          onClick={() => cancelSession(session.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Cancel session"
                          disabled={active}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {filteredCounselors.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-600">No counselors found matching your search.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCounselors.map((counselor) => (
                  <div 
                    key={counselor.id} 
                    className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all duration-200 ${selectedCounselor?.id === counselor.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
                    onClick={() => setSelectedCounselor(counselor)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                        {counselor.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">{counselor.name}</h3>
                        <div className="flex items-center mt-1">
                          {renderStars(counselor.rating)}
                          <span className="ml-2 text-gray-600">{counselor.rating}</span>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <FaUserTie className="mr-1" />
                          <span>{counselor.specialization}</span>
                          <span className="mx-2">•</span>
                          <FaMapMarkerAlt className="mr-1" />
                          <span>{counselor.location}</span>
                        </div>
                        <p className="mt-2 text-gray-600">{counselor.bio}</p>
                        
                        {selectedCounselor?.id === counselor.id && (
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              <FaCalendarAlt className="inline mr-2" />
                              Available Time Slots
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {counselor.availableSlots.map((slot) => {
                                const isExpired = isSlotExpired(slot.date, slot.time);
                                return (
                                  <div
                                    key={slot.id}
                                    className={`p-3 border rounded-md text-sm ${
                                      selectedSlot?.id === slot.id ? 'bg-blue-50 border-blue-500' : 
                                      slot.booked || isExpired ? 'opacity-50 cursor-not-allowed' : 
                                      'border-gray-200 hover:bg-gray-50 cursor-pointer'
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (!slot.booked && !isExpired) setSelectedSlot(slot);
                                    }}
                                  >
                                    <div className="font-medium">{slot.date}</div>
                                    <div className="flex items-center text-gray-600">
                                      <FaClock className="mr-1" />
                                      {slot.time}
                                    </div>
                                    {slot.booked && <span className="text-xs text-red-500">Booked</span>}
                                    {isExpired && !slot.booked && <span className="text-xs text-gray-500">Expired</span>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Session Details</h2>
              
              {selectedCounselor ? (
                <>
                  <div className="mb-6 p-4 bg-blue-50 rounded-md">
                    <h3 className="font-medium text-gray-900">Selected Counselor:</h3>
                    <p className="mt-1">{selectedCounselor.name}</p>
                    <p className="text-sm text-gray-600">{selectedCounselor.specialization}</p>
                    
                    {selectedSlot && (
                      <div className="mt-4">
                        <h3 className="font-medium text-gray-900">Selected Time:</h3>
                        <p className="mt-1">
                          <FaCalendarAlt className="inline mr-2" />
                          {selectedSlot.date}
                        </p>
                        <p>
                          <FaClock className="inline mr-2" />
                          {selectedSlot.time}
                        </p>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleBookingSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={bookingDetails.name}
                        onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={bookingDetails.email}
                        onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={bookingDetails.phone}
                        onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="careerGoals" className="block text-sm font-medium text-gray-700">
                        Career Goals
                      </label>
                      <textarea
                        id="careerGoals"
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={bookingDetails.careerGoals}
                        onChange={(e) => setBookingDetails({...bookingDetails, careerGoals: e.target.value})}
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="concerns" className="block text-sm font-medium text-gray-700">
                        Specific Concerns
                      </label>
                      <textarea
                        id="concerns"
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={bookingDetails.concerns}
                        onChange={(e) => setBookingDetails({...bookingDetails, concerns: e.target.value})}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                      disabled={!selectedSlot}
                    >
                      Confirm Booking
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">Please select a counselor to book a session</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;