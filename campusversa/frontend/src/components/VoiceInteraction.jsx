import React, { useState, useRef } from 'react';
import { Mic, Volume2, X, RefreshCcw } from 'lucide-react';

const VoiceInteraction = ({ onClose, language = 'English' }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  const languageMap = {
    English: 'en-US',
    Kannada: 'kn-IN',
    Hindi: 'hi-IN',
    Tamil: 'ta-IN',
    Telugu: 'te-IN',
  };

  // Initialize Speech Recognition
  React.useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = languageMap[language] || 'en-US';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript(prev => prev + transcript);
          } else {
            interimTranscript += transcript;
          }
        }
        if (interimTranscript) {
          setTranscript(prev => {
            const current = prev.replace(/\s*\(listening\.\.\.\).*$/, '');
            return current + ' (' + interimTranscript + ')';
          });
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, [language]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const generateResponse = (question) => {
    // Simulated AI responses (In production, this would call Claude API)
    const responses = {
      default: 'Photosynthesis is the process where plants convert sunlight into chemical energy. It happens in the chloroplasts of plant cells. Would you like to know more about this?',
      photosynthesis: 'Photosynthesis is the amazing process where plants use sunlight to make food. It happens in two stages: the light reactions and the dark reactions or Calvin cycle.',
      light: 'Light is essential for photosynthesis. Plants capture light energy using a pigment called chlorophyll, which gives them their green color.',
      energy: 'Plants create chemical energy through photosynthesis. This energy is stored in sugar molecules which the plant uses for growth and survival.',
    };

    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('photosynthesis')) return responses.photosynthesis;
    if (lowerQuestion.includes('light')) return responses.light;
    if (lowerQuestion.includes('energy')) return responses.energy;
    return responses.default;
  };

  const handleSubmit = async () => {
    if (!transcript.trim()) return;

    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const answer = generateResponse(transcript);
      setResponse(answer);
      setIsProcessing(false);
      
      // Auto-speak the response
      speakResponse(answer);
    }, 1000);
  };

  const speakResponse = (text) => {
    if (!synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageMap[language] || 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleReset = () => {
    setTranscript('');
    setResponse('');
    stopSpeaking();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-3xl font-bold">Voice Assistant</h2>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Instruction */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-blue-800">
            <p className="font-medium">Click the microphone button and ask your question about the lesson in {language}.</p>
          </div>

          {/* Microphone Button */}
          <div className="flex justify-center">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-8 rounded-full transition transform hover:scale-105 ${
                isListening
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              <Mic className="w-10 h-10" />
            </button>
          </div>

          {/* Status */}
          {isListening && (
            <div className="text-center">
              <div className="inline-block">
                <div className="flex space-x-1 justify-center">
                  <div className="w-2 h-8 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-8 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-8 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 font-medium">Listening...</p>
            </div>
          )}

          {/* Transcript Display */}
          {transcript && (
            <div className="bg-gray-50 border-l-4 border-purple-500 p-4 rounded">
              <p className="text-sm text-gray-600 font-medium mb-1">Your Question:</p>
              <p className="text-gray-800">{transcript.replace(/\s*\(.*\).*$/, '')}</p>
            </div>
          )}

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="flex items-center justify-center space-x-2 text-purple-600">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span className="text-sm font-medium">Processing your question...</span>
            </div>
          )}

          {/* Response Display */}
          {response && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-sm text-gray-600 font-medium mb-2 flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <span>AI Response:</span>
              </p>
              <p className="text-gray-800 leading-relaxed">{response}</p>
              {isSpeaking && (
                <p className="text-xs text-green-600 mt-2 font-medium">
                  🔊 Speaking...
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between gap-3 pt-4">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
              disabled={isListening || isProcessing}
            >
              <RefreshCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
            <div className="flex space-x-3">
              {response && isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                >
                  Stop Speaking
                </button>
              )}
              {response && !isSpeaking && (
                <button
                  onClick={() => speakResponse(response)}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Repeat</span>
                </button>
              )}
              {transcript && !response && (
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-50"
                >
                  Get Answer
                </button>
              )}
            </div>
          </div>

          {/* Language Note */}
          <p className="text-xs text-gray-500 text-center">
            Language: {language} | This feature works best in quiet environments
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceInteraction;
