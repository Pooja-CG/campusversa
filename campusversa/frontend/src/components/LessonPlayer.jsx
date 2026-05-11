import React, { useState } from 'react';
import { ChevronRight, Mic, MessageSquare, WifiOff, RefreshCcw } from 'lucide-react';
import { getContent, getQuiz } from '../../utils/translationHelper';

const LessonPlayer = ({ lessonKey = 'photosynthesis', language = 'English', onClose }) => {
  const [currentSection, setCurrentSection] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const content = getContent(lessonKey, currentSection, language);
  const quiz = getQuiz(lessonKey, currentSection);

  // Monitor connection status
  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correct) {
        correct++;
      }
    });
    const score = (correct / quiz.length) * 100;
    setQuizScore(score);
  };

  const handleContinue = () => {
    if (quizScore !== null) {
      if (quizScore >= 80) {
        // Advance to next section
        setCurrentSection(prev => prev + 1);
        setShowQuiz(false);
        setQuizAnswers({});
        setQuizScore(null);
      } else if (quizScore < 50) {
        // Show simplified explanation
        alert('You need to review this section. Here is a simplified explanation:\n\n' + content);
        // Reset quiz to retry
        setQuizAnswers({});
        setQuizScore(null);
      } else {
        // Average - can retry or continue
        setCurrentSection(prev => prev + 1);
        setShowQuiz(false);
        setQuizAnswers({});
        setQuizScore(null);
      }
    } else {
      setShowQuiz(true);
      calculateScore();
    }
  };

  const getStatusColor = () => {
    if (quizScore === null) return '';
    if (quizScore >= 80) return 'bg-green-50 border-green-300';
    if (quizScore < 50) return 'bg-red-50 border-red-300';
    return 'bg-yellow-50 border-yellow-300';
  };

  const getStatusMessage = () => {
    if (quizScore === null) return '';
    if (quizScore >= 80) return '🟢 Excellent! Ready to advance to the next section.';
    if (quizScore < 50) return '🔴 Keep practicing! Let\'s review this section.';
    return '🟡 Good progress! You can continue or review.';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto m-4">
        {/* Offline Banner */}
        {isOffline && (
          <div className="bg-yellow-100 border-b-2 border-yellow-400 p-3 flex items-center space-x-2">
            <WifiOff className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-800 font-medium">You're in offline mode. Some features may be limited.</span>
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2 capitalize">{lessonKey.replace('_', ' ')}</h2>
              <p className="text-purple-100">Section {currentSection} of 3 | Language: {language}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition"
            >
              ✕
            </button>
          </div>
          <div className="mt-4 bg-white/30 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-300"
              style={{ width: `${(currentSection / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {!showQuiz ? (
            <>
              {/* Lesson Content */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Content</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg text-gray-700 text-lg leading-relaxed">
                  {content}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <button 
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                    title="Ask a question using voice"
                  >
                    <Mic className="w-5 h-5" />
                    <span>Ask Question</span>
                  </button>
                  <button 
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                    title="Chat with AI tutor"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>AI Tutor</span>
                  </button>
                </div>
                <button 
                  onClick={handleContinue}
                  className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                >
                  <span>Take Quiz</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Quiz */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Assessment</h3>
                <div className="space-y-6">
                  {quiz.map((q, idx) => (
                    <div key={q.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <p className="font-semibold text-gray-800 mb-4">
                        {idx + 1}. {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((option, optIdx) => (
                          <label 
                            key={optIdx}
                            className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-white transition"
                            style={{
                              borderColor: quizAnswers[q.id] === optIdx ? '#7D5AFE' : '#E5E7EB',
                              backgroundColor: quizAnswers[q.id] === optIdx ? '#F3E8FF' : '#F9FAFB'
                            }}
                          >
                            <input 
                              type="radio"
                              name={`question-${q.id}`}
                              value={optIdx}
                              checked={quizAnswers[q.id] === optIdx}
                              onChange={() => handleAnswerSelect(q.id, optIdx)}
                              className="w-4 h-4"
                            />
                            <span className="ml-3 text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Score Display */}
              {quizScore !== null && (
                <div className={`mb-6 p-6 rounded-lg border-2 ${getStatusColor()}`}>
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    Your Score: {quizScore.toFixed(0)}%
                  </p>
                  <p className="text-lg text-gray-700">{getStatusMessage()}</p>
                </div>
              )}

              {/* Quiz Actions */}
              <div className="flex justify-between">
                <button 
                  onClick={() => {
                    setShowQuiz(false);
                    setQuizScore(null);
                  }}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
                >
                  <RefreshCcw className="w-5 h-5" />
                  <span>Back to Content</span>
                </button>
                <button 
                  onClick={handleContinue}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                  disabled={Object.keys(quizAnswers).length !== quiz.length}
                >
                  {quizScore === null ? 'Submit Quiz' : 'Continue'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
