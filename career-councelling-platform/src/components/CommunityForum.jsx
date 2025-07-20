import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaTimes, 
  FaBell, 
  FaPaperclip, 
  FaFilePdf, 
  FaTrash,
  FaRegComment,
  FaThumbsUp,
  FaCommentAlt,
  FaUserShield,
  FaEllipsisV,
  FaRegSmile,
  FaPaperPlane,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const CommunityForum = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState('all');
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [pdfFileName, setPdfFileName] = useState('');
  const [expandedThread, setExpandedThread] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const chatContainerRef = useRef(null);

  const { category } = useParams();

  // Mock data initialization
  useEffect(() => {
    const fetchThreads = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockThreads = [
          {
            id: 1,
            title: 'How to transition from marketing to product management?',
            content: 'I have 5 years of experience in marketing but want to move into product management. What skills should I focus on developing? I\'ve already taken some online courses but would love to hear from people who have made this transition successfully. What were the biggest challenges you faced? How did you position your existing experience when applying for PM roles?',
            category: 'career-path',
            replyCount: 12,
            upvotes: 24,
            author: { 
              name: 'Sarah J.', 
              title: 'Marketing Specialist',
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
              id: 'user1'
            },
            date: '2 days ago',
            hasPdf: true,
            pdfName: 'PM_Transition_Guide.pdf',
            pdfUrl: 'smriti.pdf',
            comments: [
              {
                id: 101,
                author: 'Alex M.',
                content: 'I made this transition 2 years ago. The key was developing technical knowledge and understanding product lifecycle.',
                date: '1 day ago',
                authorId: 'user2'
              }
            ]
          },
          {
            id: 2,
            title: 'Best practices for technical interviews at FAANG companies',
            content: 'I have an upcoming interview at Google for a software engineering position. What are some key areas to focus on in my preparation? I\'ve been practicing LeetCode problems but want to make sure I\'m not missing anything important. How important is system design for an entry-level position?',
            category: 'interview-prep',
            replyCount: 8,
            upvotes: 15,
            author: { 
              name: 'Raj P.', 
              title: 'CS Graduate',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              id: 'user3'
            },
            date: '1 week ago',
            hasPdf: false,
            comments: []
          }
        ];
        setThreads(mockThreads);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
      setIsLoading(false);
    };

    fetchThreads();
    if (category) setActiveCategory(category);

    // Initialize mock online users
    setOnlineUsers([
      { id: 'admin1', name: 'Career Advisor', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', role: 'admin', status: 'online' },
      { id: 'user1', name: 'Sarah J.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', status: 'online' },
      { id: 'user2', name: 'Alex M.', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', status: 'online' },
      { id: 'user3', name: 'Raj P.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'away' },
    ]);

    // Initialize mock chat messages if admin is selected
    if (activeChat === 'admin1') {
      setChatMessages([
        { id: 1, sender: 'admin1', text: 'Hello! How can I help you with your career questions today?', timestamp: new Date(Date.now() - 3600000) },
        { id: 2, sender: 'currentUser', text: 'Hi! I need advice about transitioning to a new career field.', timestamp: new Date(Date.now() - 1800000) },
        { id: 3, sender: 'admin1', text: 'I\'d be happy to help. What field are you currently in and what are you looking to transition to?', timestamp: new Date(Date.now() - 1200000) },
      ]);
    }
  }, [category, activeChat]);

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Handle PDF upload
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      setPdfFile(file);
      setPdfFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (e) => setPdfPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const removePdf = () => {
    setPdfFile(null);
    setPdfPreview(null);
    setPdfFileName('');
  };

  // Handle PDF download
  const handlePdfDownload = (pdfUrl) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'smriti.pdf'; // Set the download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle new thread submission
  const handleNewThreadSubmit = async (e) => {
    e.preventDefault();
    try {
      const newThread = {
        id: threads.length + 1,
        title: newThreadTitle,
        content: newThreadContent,
        category: activeCategory,
        replyCount: 0,
        upvotes: 0,
        author: { 
          name: 'You', 
          title: 'Member',
          avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
          id: 'currentUser'
        },
        date: 'Just now',
        hasPdf: !!pdfFile,
        pdfName: pdfFileName,
        pdfUrl: 'smriti.pdf',
        comments: []
      };

      setThreads([newThread, ...threads]);
      resetForm();
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  const resetForm = () => {
    setShowNewThreadModal(false);
    setNewThreadTitle('');
    setNewThreadContent('');
    setPdfFile(null);
    setPdfPreview(null);
    setPdfFileName('');
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement actual search functionality
    console.log('Searching for:', searchQuery);
  };

  // Toggle thread expansion
  const toggleThreadExpansion = (threadId) => {
    setExpandedThread(expandedThread === threadId ? null : threadId);
  };

  // Handle sending a new chat message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: chatMessages.length + 1,
      sender: 'currentUser',
      text: newMessage,
      timestamp: new Date()
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage('');

    // Simulate admin response after 1-3 seconds
    if (activeChat === 'admin1') {
      const responses = [
        "I understand your concern. Let me look into that.",
        "That's a great question! Here's what I recommend...",
        "Many people face similar challenges. Have you considered...",
        "I'd be happy to help with that. Can you share more details?",
        "Based on my experience, I suggest...",
        "Let me check our resources for the best answer to your question.",
        "That's an interesting perspective. Here's another way to look at it...",
        "Have you tried reaching out to professionals in that field?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setTimeout(() => {
        const adminMessage = {
          id: chatMessages.length + 2,
          sender: activeChat,
          text: randomResponse,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, adminMessage]);
      }, 1000 + Math.random() * 2000);
    } else {
      // Simulate user response if chatting with another user
      setTimeout(() => {
        const userMessage = {
          id: chatMessages.length + 2,
          sender: activeChat,
          text: "Thanks for your message! I'll get back to you soon.",
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, userMessage]);
      }, 1500 + Math.random() * 2500);
    }
  };

  // Start a new chat with a user
  const startNewChat = (userId) => {
    setActiveChat(userId);
    setShowChat(true);
    // Initialize empty chat if not admin
    if (userId !== 'admin1') {
      setChatMessages([
        {
          id: 1,
          sender: userId,
          text: `Hi there! I'm ${onlineUsers.find(u => u.id === userId)?.name}. How can I help you?`,
          timestamp: new Date()
        }
      ]);
    }
  };

  // Category color mapping
  const getCategoryColor = (categoryId) => {
    const colors = {
      'all': 'bg-gray-100 text-gray-800',
      'career-path': 'bg-blue-100 text-blue-800',
      'job-search': 'bg-green-100 text-green-800',
      'resume-help': 'bg-purple-100 text-purple-800',
      'interview-prep': 'bg-yellow-100 text-yellow-800',
      'workplace': 'bg-red-100 text-red-800',
      'development': 'bg-indigo-100 text-indigo-800',
      'transition': 'bg-pink-100 text-pink-800'
    };
    return colors[categoryId] || colors['all'];
  };

  // Forum categories
  const forumCategories = [
    { id: 'all', name: 'All Discussions' },
    { id: 'career-path', name: 'Career Path' },
    { id: 'job-search', name: 'Job Search' },
    { id: 'resume-help', name: 'Resume Help' },
    { id: 'interview-prep', name: 'Interview Prep' },
    { id: 'workplace', name: 'Workplace' },
    { id: 'development', name: 'Development' },
    { id: 'transition', name: 'Transition' },
  ];

  // Format time for chat messages
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Community Forum</h1>
        <p className="text-lg text-gray-600">Connect with professionals, get advice, and share your experiences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className={`lg:w-64 flex-shrink-0 transition-all duration-300 ${sidebarCollapsed ? 'lg:w-20' : ''}`}>
          <div className="bg-white rounded-lg shadow p-6 sticky top-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-medium text-gray-900 ${sidebarCollapsed ? 'hidden' : 'block'}`}>Categories</h3>
              <button 
                onClick={toggleSidebar}
                className="text-gray-500 hover:text-gray-700 lg:hidden"
              >
                {sidebarCollapsed ? <FaChevronDown /> : <FaChevronUp />}
              </button>
            </div>
            <ul className="space-y-2">
              {forumCategories.map((cat) => (
                <li key={cat.id}>
                  <div // Changed from Link to div
                    className={`block px-4 py-2 rounded-md ${
                      activeCategory === cat.id 
                        ? 'bg-indigo-50 text-indigo-700 font-medium' 
                        : 'text-gray-700'
                    } ${sidebarCollapsed ? 'text-center' : ''}`}
                    title={sidebarCollapsed ? cat.name : ''}
                  >
                    {sidebarCollapsed ? (
                      <span className="text-xs">{cat.name.split(' ').map(word => word[0]).join('')}</span>
                    ) : (
                      cat.name
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className={`mt-8 pt-6 border-t border-gray-200 ${sidebarCollapsed ? 'hidden' : 'block'}`}>
              <h4 className="text-md font-medium text-gray-900 mb-3">Upcoming AMAs</h4>
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-sm text-gray-800">
                  <strong className="font-medium">July 25:</strong> Tech Hiring Manager Q&A
                </p>
                <button className="mt-2 w-full flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none">
                  <FaBell className="mr-1.5" /> Remind Me
                </button>
              </div>
            </div>

            <div className={`mt-8 pt-6 border-t border-gray-200 ${sidebarCollapsed ? 'hidden' : 'block'}`}>
              <h4 className="text-md font-medium text-gray-900 mb-3">Online Members ({onlineUsers.length})</h4>
              <ul className="space-y-2">
                {onlineUsers.map(user => (
                  <li key={user.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div 
                      className="flex items-center"
                      onClick={() => startNewChat(user.id)}
                    >
                      <div className="relative">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <span className={`absolute bottom-0 right-1 block h-2 w-2 rounded-full ring-2 ring-white ${
                          user.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                        }`}></span>
                      </div>
                      <span className="text-sm">
                        {user.name}
                        {user.role === 'admin' && (
                          <span className="ml-1 text-blue-500">
                            <FaUserShield className="inline" />
                          </span>
                        )}
                      </span>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => startNewChat(user.id)}
                    >
                      <FaCommentAlt className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and New Thread */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1 max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search forum..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </form>
            <div className="flex gap-2">
              <button
                onClick={() => setShowChat(!showChat)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FaCommentAlt className="mr-2" />
                {showChat ? 'Hide Chat' : 'Live Chat'}
              </button>
              <button
                onClick={() => setShowNewThreadModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start New Thread
              </button>
            </div>
          </div>

          {/* Featured Thread Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-full mr-4">
                <FaThumbsUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Featured Discussion</h3>
                <p className="text-sm opacity-90">"Career transitions in the tech industry" - Join this popular conversation with over 50 comments</p>
              </div>
            </div>
          </div>

          {/* Thread List */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {threads.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <p className="text-gray-600 mb-4">No threads found in this category.</p>
                  <button
                    onClick={() => setShowNewThreadModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Be the first to start a discussion
                  </button>
                </div>
              ) : (
                threads.map((thread) => (
                  <div key={thread.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(thread.category)}`}>
                          {forumCategories.find(c => c.id === thread.category)?.name}
                        </span>
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center text-sm text-gray-500">
                            <FaRegComment className="mr-1" /> {thread.replyCount}
                          </span>
                          <span className="flex items-center text-sm text-gray-500">
                            <FaThumbsUp className="mr-1" /> {thread.upvotes}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-start">
                        <img 
                          src={thread.author.avatar} 
                          alt={thread.author.name}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <div className="flex-1">
                          <h3 
                            className="text-lg font-medium text-gray-900 cursor-pointer hover:text-indigo-600"
                            onClick={() => toggleThreadExpansion(thread.id)}
                          >
                            {thread.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Posted by {thread.author.name} ({thread.author.title}) • {thread.date}
                          </p>
                        </div>
                      </div>

                      <div className={`mt-3 ${expandedThread === thread.id ? 'block' : 'line-clamp-3'}`}>
                        <p className="text-gray-600">{thread.content}</p>
                      </div>

                      {expandedThread === thread.id && (
                        <button 
                          onClick={() => toggleThreadExpansion(thread.id)}
                          className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          Show less
                        </button>
                      )}
                      {expandedThread !== thread.id && (
                        <button 
                          onClick={() => toggleThreadExpansion(thread.id)}
                          className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          Read more
                        </button>
                      )}

                      {/* PDF Attachment */}
                      {thread.hasPdf && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                          <div className="flex items-center">
                            <FaFilePdf className="h-6 w-6 text-red-500 mr-3" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {thread.pdfName}
                              </p>
                              <p className="text-xs text-gray-500">PDF Document</p>
                            </div>
                            <button 
                              onClick={() => handlePdfDownload(thread.pdfUrl)}
                              className="ml-3 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Comments preview */}
                      {expandedThread === thread.id && thread.comments.length > 0 && (
                        <div className="mt-4 border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Comments</h4>
                          {thread.comments.map(comment => (
                            <div key={comment.id} className="flex mb-3 last:mb-0">
                              <div className="flex-shrink-0 mr-3">
                                <img 
                                  src={`https://randomuser.me/api/portraits/${comment.authorId?.startsWith('user') ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`}
                                  alt={comment.author}
                                  className="h-8 w-8 rounded-full"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                                  <button 
                                    className="text-gray-400 hover:text-indigo-600"
                                    onClick={() => startNewChat(comment.authorId)}
                                  >
                                    <FaCommentAlt className="h-4 w-4" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600">{comment.content}</p>
                                <p className="text-xs text-gray-500 mt-1">{comment.date}</p>
                              </div>
                            </div>
                          ))}
                          <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-800">
                            View all {thread.replyCount} comments
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Chat Box */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col">
          <div className="bg-indigo-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              {activeChat && (
                <>
                  <img 
                    src={onlineUsers.find(u => u.id === activeChat)?.avatar} 
                    alt="User" 
                    className="h-8 w-8 rounded-full mr-2"
                  />
                  <span>
                    {onlineUsers.find(u => u.id === activeChat)?.name}
                    {onlineUsers.find(u => u.id === activeChat)?.role === 'admin' && (
                      <span className="ml-1 text-blue-200">
                        <FaUserShield className="inline" />
                      </span>
                    )}
                  </span>
                </>
              )}
            </div>
            <button 
              onClick={() => setShowChat(false)}
              className="text-white hover:text-indigo-200"
            >
              <IoMdClose className="h-5 w-5" />
            </button>
          </div>
          
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto max-h-96"
          >
            {activeChat ? (
              chatMessages.length > 0 ? (
                chatMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex mb-4 ${message.sender === 'currentUser' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'currentUser' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'currentUser' ? 'text-indigo-200' : 'text-gray-500'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <FaCommentAlt className="h-10 w-10 mb-2" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FaCommentAlt className="h-10 w-10 mb-2" />
                <p>Select a user to start chatting</p>
              </div>
            )}
          </div>
          
          {activeChat && (
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3">
              <div className="flex items-center">
                <button type="button" className="p-2 text-gray-500 hover:text-indigo-600">
                  <FaRegSmile className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border-0 focus:ring-0 focus:outline-none"
                />
                <button 
                  type="submit" 
                  className="p-2 text-indigo-600 hover:text-indigo-800 disabled:text-gray-400"
                  disabled={!newMessage.trim()}
                >
                  <FaPaperPlane className="h-5 w-5" />
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* New Thread Modal */}
      {showNewThreadModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-medium text-gray-900">Start New Discussion</h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
                <form onSubmit={handleNewThreadSubmit} className="mt-4">
                  <div className="mb-4">
                    <label htmlFor="thread-title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      id="thread-title"
                      value={newThreadTitle}
                      onChange={(e) => setNewThreadTitle(e.target.value)}
                      placeholder="What's your question or topic?"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="thread-category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="thread-category"
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {forumCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="thread-content" className="block text-sm font-medium text-gray-700 mb-1">
                      Details
                    </label>
                    <textarea
                      id="thread-content"
                      value={newThreadContent}
                      onChange={(e) => setNewThreadContent(e.target.value)}
                      placeholder="Provide details about your question or discussion topic..."
                      rows={6}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  {/* PDF Upload Section */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Attach PDF (Optional)
                    </label>
                    {!pdfFile ? (
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600 justify-center">
                            <label
                              htmlFor="pdf-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                            >
                              <span>Upload a PDF</span>
                              <input
                                id="pdf-upload"
                                name="pdf-upload"
                                type="file"
                                accept="application/pdf"
                                className="sr-only"
                                onChange={handlePdfUpload}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PDF up to 5MB</p>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1 border border-gray-300 rounded-md p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <FaFilePdf className="h-8 w-8 text-red-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                              {pdfFileName}
                            </p>
                            <p className="text-xs text-gray-500">PDF Document</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removePdf}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Post Discussion
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityForum;