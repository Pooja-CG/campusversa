import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, X, MessageSquare } from 'lucide-react';

const AITutorChat = ({ language = 'English', onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m your AI Tutor. Ask me any questions about your lessons. I\'m here to help!', sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const generateAIResponse = (userMessage) => {
    // Simulated AI responses (In production, this would call Claude API)
    const responses = [
      {
        keywords: ['photosynthesis', 'light', 'chlorophyll'],
        response: 'Great question! Photosynthesis is the process where plants convert sunlight into chemical energy. The light is captured by chlorophyll in the chloroplasts. Would you like to know more about the light-dependent or light-independent reactions?'
      },
      {
        keywords: ['quiz', 'answer', 'question'],
        response: 'Let me help you understand this better. Could you tell me which specific question you\'re stuck on? I can explain it step by step.'
      },
      {
        keywords: ['difficult', 'hard', 'understand', 'confusing'],
        response: 'Don\'t worry! Learning takes time. Let me break this down into simpler parts. What specific concept would you like me to explain?'
      },
      {
        keywords: ['next', 'continue', 'advance'],
        response: 'Great! You\'re making progress. Let\'s move to the next section. Are you ready for a new challenge?'
      },
      {
        keywords: ['hello', 'hi', 'hey'],
        response: 'Hi there! How can I help you with your studies today?'
      }
    ];

    const userLower = userMessage.toLowerCase();
    const matchedResponse = responses.find(r => 
      r.keywords.some(keyword => userLower.includes(keyword))
    );

    return matchedResponse?.response || 'That\'s an interesting question! Can you tell me more about what you\'d like to learn? I\'m here to help explain any concept!';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: generateAIResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition z-40 flex items-center space-x-2"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="text-sm font-medium">AI Tutor</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl w-96 max-h-[600px] flex flex-col z-50 border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">AI Tutor</h3>
          <p className="text-xs text-purple-100">Always here to help (${language})</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="hover:bg-white/20 p-2 rounded-full transition"
            title="Minimize"
          >
            _
          </button>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-full transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-purple-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-purple-100' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl space-y-2">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <button
            onClick={handleMicClick}
            className={`p-2 rounded-lg transition ${
              isListening
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500">💡 Tip: Click the mic to ask using voice!</p>
      </div>
    </div>
  );
};

export default AITutorChat;
