import React, { useState, useRef, useEffect } from "react";
import { Mic, Send, Bot, Volume2, VolumeX, Paperclip, X } from "lucide-react";

const AITutorChat = ({ language = "English", lessonTitle = "Advanced React Patterns" }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm your EduSense AI Tutor. Ask me anything about "${lessonTitle}" 🎓`
    }
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // 🎤 Speech to Text
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser not supported");
    const recognition = new SpeechRecognition();
    recognition.lang = language === "Hindi" ? "hi-IN" : "en-IN";
    recognition.start();
    setListening(true);
    recognition.onresult = (e) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
  };

  // 🔊 Text to Speech
  const speak = (text) => {
    if (!isVoiceEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = {
      "English": "en-IN", "Hindi": "hi-IN",
      "Kannada": "kn-IN", "Tamil": "ta-IN", "Telugu": "te-IN"
    };
    utterance.lang = langMap[language] || "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  // 🖼️ Handle Image Selection
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file && file.type && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
    e.target.value = null;
  };

  // 🤖 Send Message — calls Anthropic API
  const sendMessage = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMsg = { role: "user", content: input, image: selectedImage };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const userContent = [];
      if (selectedImage) {
        userContent.push({
          type: "image",
          source: {
            type: "base64",
            media_type: "image/jpeg",
            data: selectedImage.split(",")[1]
          }
        });
      }
      userContent.push({
        type: "text",
        text: input || "What's in this image? Explain it in the context of my lesson."
      });

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are EduSense AI Tutor, a helpful and friendly educational assistant. The student is currently studying: "${lessonTitle}". Respond in ${language}. Keep answers concise, clear, and encouraging. Use simple examples when explaining concepts.`,
          messages: [
            ...messages
              .filter(m => m.role === "user" || m.role === "assistant")
              .map(m => ({
                role: m.role,
                content: m.content
              })),
            { role: "user", content: userContent }
          ]
        })
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again.";

      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      speak(reply);

      // Update teacher logs
      const logs = JSON.parse(localStorage.getItem('studentLogs') || '[]');
      logs.push({
        topic: lessonTitle,
        question: input,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('studentLogs', JSON.stringify(logs));

    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "⚠️ I'm having trouble connecting. Please check your internet and try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden shadow-2xl border border-slate-200 rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="bg-rose-100 p-2 rounded-xl">
            <Bot size={22} className="text-[#F96167]" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">EduSense AI Tutor</h3>
            <p className="text-[10px] text-green-500 font-bold uppercase italic tracking-wider">Vision Enabled</p>
          </div>
        </div>
        <button
          onClick={() => {
            const nextState = !isVoiceEnabled;
            setIsVoiceEnabled(nextState);
            if (nextState) speak("Voice active");
            else window.speechSynthesis.cancel();
          }}
          className={`p-2 rounded-full transition-all ${isVoiceEnabled ? "bg-green-500 text-white" : "bg-slate-100 text-slate-400"}`}
        >
          {isVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fd]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm ${
              msg.role === "user"
                ? "bg-[#F96167] text-white rounded-tr-none"
                : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
            }`}>
              {msg.image && (
                <img src={msg.image} alt="upload" className="w-full max-w-[250px] rounded-lg mb-2 border border-slate-200" />
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-3 bg-white w-16 rounded-2xl shadow-sm animate-pulse flex gap-1 justify-center">
              <div className="w-1.5 h-1.5 bg-[#F96167] rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-[#F96167] rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-[#F96167] rounded-full"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        {selectedImage && (
          <div className="mb-3 relative inline-block">
            <img src={selectedImage} className="w-20 h-20 object-cover rounded-xl border-2 border-[#F96167]" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="p-2.5 text-slate-400 hover:text-[#F96167]"
          >
            <Paperclip size={20} />
          </button>

          <button
            onClick={startListening}
            className={`p-2.5 rounded-xl ${listening ? "bg-red-500 text-white animate-pulse" : "text-slate-400"}`}
          >
            <Mic size={20} />
          </button>

          <input
            type="text"
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 text-slate-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask or upload an image..."
          />

          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-[#2F3C7E] text-white p-2.5 rounded-xl hover:bg-[#1a255e] disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutorChat;
