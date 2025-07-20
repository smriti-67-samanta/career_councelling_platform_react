// src/components/Profile.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '/src/features/auth/authSlice';
import { FaUserGraduate, FaBriefcase, FaStar, FaLightbulb, FaUserCircle, FaLinkedin, FaGithub, FaFilePdf } from 'react-icons/fa';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, set, onValue } from 'firebase/database';
import { db, storage } from '/src/features/auth/firebase';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    location: '',
    education: '',
    skills: '',
    experience: '',
    interests: '',
    careerGoals: '',
    linkedin: '',
    github: '',
    resumeUrl: '',
    profilePictureUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (user?.uid) {
      const userRef = dbRef(db, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setFormData(prev => ({
            ...prev,
            ...data,
            email: user.email || data.email
          }));
          if (data.profilePictureUrl) {
            setPreviewImage(data.profilePictureUrl);
          }
        }
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload profile picture if selected
      if (profilePicture) {
        const profilePicRef = ref(storage, `profilePictures/${user.uid}/${profilePicture.name}`);
        await uploadBytes(profilePicRef, profilePicture);
        const downloadURL = await getDownloadURL(profilePicRef);
        formData.profilePictureUrl = downloadURL;
      }

      // Upload resume if selected
      if (resumeFile) {
        const resumeRef = ref(storage, `resumes/${user.uid}/${resumeFile.name}`);
        await uploadBytes(resumeRef, resumeFile);
        const downloadURL = await getDownloadURL(resumeRef);
        formData.resumeUrl = downloadURL;
      }

      // Save to Firebase
      await set(dbRef(db, `users/${user.uid}`), formData);
      
      // Update Redux store
      dispatch(updateUserProfile(formData));
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                  />
                ) : (
                  <FaUserCircle className="text-gray-400 text-8xl" />
                )}
                <label 
                  htmlFor="profilePicture"
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  <input 
                    type="file" 
                    id="profilePicture" 
                    onChange={handleProfilePictureChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-700">Upload Resume</label>
                <div className="flex items-center">
                  <label className="flex-1 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-l-lg cursor-pointer">
                    <span className="text-sm">{resumeFile ? resumeFile.name : 'Choose file'}</span>
                    <input 
                      type="file" 
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                  {formData.resumeUrl && (
                    <a 
                      href={formData.resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 flex items-center"
                    >
                      <FaFilePdf className="mr-2" /> View
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                  disabled
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaLinkedin className="text-blue-700 mr-2 text-xl" />
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn URL"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center">
                  <FaGithub className="text-gray-800 mr-2 text-xl" />
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="GitHub URL"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaUserGraduate className="text-indigo-600 mr-3 text-xl" />
            <h2 className="text-xl font-semibold">Education</h2>
          </div>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="List your degrees, certifications, and educational background..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows="6"
          />
        </div>

        {/* Skills Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaStar className="text-indigo-600 mr-3 text-xl" />
            <h2 className="text-xl font-semibold">Skills</h2>
          </div>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="List your technical and soft skills..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows="5"
          />
        </div>

        {/* Work Experience */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaBriefcase className="text-indigo-600 mr-3 text-xl" />
            <h2 className="text-xl font-semibold">Work Experience</h2>
          </div>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Detail your work history, positions held, and key achievements..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows="8"
          />
        </div>

        {/* Career Interests */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaLightbulb className="text-indigo-600 mr-3 text-xl" />
            <h2 className="text-xl font-semibold">Career Interests & Goals</h2>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Career Interests</label>
            <textarea
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="Describe your career interests, preferred industries, and job types..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Long-term Career Goals</label>
            <textarea
              name="careerGoals"
              value={formData.careerGoals}
              onChange={handleChange}
              placeholder="Describe your long-term career aspirations..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;