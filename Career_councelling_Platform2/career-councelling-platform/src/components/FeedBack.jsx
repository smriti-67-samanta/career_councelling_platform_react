import { useState } from 'react';
import { FaStar, FaRegStar, FaPaperPlane, FaSmile, FaFrown, FaMeh } from 'react-icons/fa';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, feedbackType, comments });
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setRating(0);
      setFeedbackType('');
      setComments('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Share Your Feedback</h1>
          <p className="text-lg text-gray-600">
            We value your opinion! Help us improve CareerConnect by sharing your experience.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
            <p className="text-center font-medium">
              Thank you for your feedback! We appreciate your time and input.
            </p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              {/* Rating Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  How would you rate your overall experience?
                </h2>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className="text-3xl focus:outline-none"
                      aria-label={`Rate ${star} star`}
                    >
                      {star <= rating ? (
                        <FaStar className="text-yellow-400" />
                      ) : (
                        <FaRegStar className="text-gray-300 hover:text-yellow-400" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Feedback Type */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  What type of feedback would you like to share?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setFeedbackType('positive')}
                    className={`flex flex-col items-center p-4 rounded-lg border ${
                      feedbackType === 'positive'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <FaSmile
                      className={`text-3xl mb-2 ${
                        feedbackType === 'positive' ? 'text-green-500' : 'text-gray-400'
                      }`}
                    />
                    <span className="font-medium">Positive</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackType('neutral')}
                    className={`flex flex-col items-center p-4 rounded-lg border ${
                      feedbackType === 'neutral'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <FaMeh
                      className={`text-3xl mb-2 ${
                        feedbackType === 'neutral' ? 'text-blue-500' : 'text-gray-400'
                      }`}
                    />
                    <span className="font-medium">Neutral</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackType('negative')}
                    className={`flex flex-col items-center p-4 rounded-lg border ${
                      feedbackType === 'negative'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <FaFrown
                      className={`text-3xl mb-2 ${
                        feedbackType === 'negative' ? 'text-red-500' : 'text-gray-400'
                      }`}
                    />
                    <span className="font-medium">Negative</span>
                  </button>
                </div>
              </div>

              {/* Comments */}
              <div className="mb-8">
                <label htmlFor="comments" className="block text-xl font-semibold text-gray-800 mb-4">
                  Your detailed feedback
                </label>
                <textarea
                  id="comments"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="What did you like or what could be improved?"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={rating === 0}
                  className={`flex items-center px-6 py-3 rounded-md shadow-sm text-white font-medium ${
                    rating === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  <FaPaperPlane className="mr-2" />
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Additional Support */}
        <div className="mt-12 bg-indigo-50 rounded-lg p-6 border border-indigo-100">
          <h2 className="text-xl font-semibold text-indigo-800 mb-3">Need immediate help?</h2>
          <p className="text-gray-700 mb-4">
            If you need urgent assistance or have a critical issue, please contact our support team.
          </p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;