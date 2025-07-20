import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLinkedin, FaTwitter, FaQuoteLeft } from 'react-icons/fa';
import { FiDollarSign, FiBriefcase, FiAward } from 'react-icons/fi';

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
      fullStory: `Sarah was working in marketing for 5 years when she decided she wanted to transition into tech. "I enjoyed analyzing campaign metrics, but I wanted to work more deeply with data," she explains. Through CareerConnect's assessment, she discovered data science was the perfect fit.\n\nCareerConnect created a personalized 12-month learning path that included:\n\n• Python programming fundamentals\n• Machine learning with real-world datasets\n• Data visualization best practices\n• Portfolio project guidance\n\n"The mentorship program was crucial," Sarah says. "Having an experienced data scientist review my projects gave me the confidence to apply for senior positions."\n\nAfter completing the program, Sarah landed her dream job at TechAnalytics Inc. with an 85% salary increase. She now leads a team analyzing consumer behavior patterns.`
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
      fullStory: `Michael had been a junior UX designer for 4 years, struggling to advance despite his experience. "I was doing lead-level work but didn't know how to showcase it," he admits.\n\nCareerConnect's services transformed his career:\n\n1. Portfolio Makeover: Experts helped reorganize his work to highlight leadership and problem-solving\n2. Skill Gap Analysis: Identified missing competencies in user research methodology\n3. Mock Interviews: Practiced with 3 different design directors\n\n"The most valuable part was seeing how senior designers talked about their work," Michael says. "It changed how I presented my contributions."\n\nWithin 8 months, Michael secured a UX Design Lead position at Digital Innovations LLC with a 60% salary increase. He now mentors junior designers through the same CareerConnect program that helped him.`
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
      fullStory: `Priya was stuck in a dead-end position at a small regional bank when she discovered CareerConnect's Wall Street Prep program. "I had the technical skills but didn't know how to break in," she explains.\n\nHer 6-month transformation included:\n\n• Advanced financial modeling certification\n• Technical interview bootcamp\n• Mock interviews with 8 current Wall Street analysts\n• Salary negotiation coaching\n\n"The mock interviews were brutal but exactly what I needed," Priya recalls. "By my real interviews, I could answer any technical question confidently."\n\nThe results? Priya more than doubled her salary (110% increase) at Global Finance Corp. "My mentor still checks in quarterly, and I've since referred three colleagues to CareerConnect," she says.`
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
      fullStory: `After a decade as a software engineer, David felt unfulfilled. "I enjoyed solving technical challenges but wanted more strategic impact," he says. CareerConnect's comprehensive assessment revealed his aptitude for product management.\n\nHis transition plan included:\n\n• Product Management Certification (12 weeks)\n• Leadership training program\n• Transitional project (built a new feature for a startup)\n• Networking with 15+ PMs\n\n"I would have never considered this path on my own," David admits. The assessment showed exceptional skills in communication and strategic thinking - perfect for product management.\n\nAfter 18 months, David moved into his current Product Manager role at InnovateTech with a 75% salary increase. "I use my engineering background daily while focusing on bigger-picture problems," he says.`
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
      fullStory: `Fresh out of her PhD program in biochemistry, Emily struggled to transition to industry. "Academic CVs list every publication but don't highlight transferable skills," she explains.\n\nCareerConnect's services made the difference:\n\n• Resume Rewriting: Translated academic achievements into industry competencies\n• Interview Coaching: Taught STAR method for behavioral questions\n• Salary Negotiation Workshop: Secured 20% higher offer\n• 3-Month Internship Placement\n\n"I went from no callbacks to three offers in just 3 months," Emily says. She accepted a Clinical Research Coordinator position at BioHealth Solutions with a 90% higher salary than her academic stipend.\n\nEmily has since been promoted twice and now helps review resumes for CareerConnect's academic transition program.`
    }
  ];
  
  const story = successStories.find(s => s.id === parseInt(id));
  
  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h1>
          <button 
            onClick={() => navigate('/successstories')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Success Stories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Stories
        </button>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Hero Section */}
          <div className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <img 
                src={story.image} 
                alt={story.name} 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{story.name}</h1>
                <h2 className="text-xl text-indigo-600 mt-1">{story.role}</h2>
                <p className="text-lg text-gray-600 mt-2">{story.company}</p>
                <div className="flex mt-4 space-x-4">
                  <a href="#" className="text-gray-500 hover:text-indigo-600">
                    <FaLinkedin size={20} />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-indigo-600">
                    <FaTwitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-8">
            <div className="mb-8">
              <div className="relative">
                <FaQuoteLeft className="text-indigo-200 text-4xl absolute -top-4 -left-2" />
                <blockquote className="text-2xl italic text-gray-700 pl-10 py-2">
                  "{story.quote}"
                </blockquote>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {story.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm">
                  {tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
            
            {/* Full Story */}
            <div className="prose max-w-none mb-12">
              {story.fullStory.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4 text-gray-700">{paragraph}</p>
              ))}
            </div>
            
            {/* Stats */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Career Transformation Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="flex justify-center text-indigo-600 mb-3">
                    <FiDollarSign size={24} />
                  </div>
                  <h4 className="font-medium text-gray-500 mb-1">Salary Increase</h4>
                  <p className="text-3xl font-bold text-indigo-600">{story.stats.salaryIncrease}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="flex justify-center text-indigo-600 mb-3">
                    <FiBriefcase size={24} />
                  </div>
                  <h4 className="font-medium text-gray-500 mb-1">Time to Achievement</h4>
                  <p className="text-3xl font-bold text-indigo-600">{story.stats.time}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="flex justify-center text-indigo-600 mb-3">
                    <FiAward size={24} />
                  </div>
                  <h4 className="font-medium text-gray-500 mb-1">Key Skills Gained</h4>
                  <ul className="space-y-1">
                    {story.stats.skills.map(skill => (
                      <li key={skill} className="text-indigo-600 font-medium">{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-center mb-6">Inspired by {story.name}'s Story?</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors">
                  Start Your Journey
                </button>
                <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition-colors">
                  Find a Similar Mentor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;