import React, { useState } from 'react';
import { ArrowLeft, Volume2, BookOpen, Clock, Star, Search } from 'lucide-react';
import AITutorChat from './AITutorChat';

// ─── Inline Course Library (replaces missing CourseLibrary.jsx) ───────────────
const COURSES = [
  {
    id: 1,
    title: "Advanced React & Next.js Patterns",
    category: "Frontend",
    duration: "4h 30m",
    rating: 4.8,
    lessons: 12,
    color: "from-blue-500 to-indigo-600",
    description: "Master component composition, performance optimization, and modern React patterns.",
    content: {
      English: {
        title: "Advanced React & Next.js Patterns",
        body: "Component composition allows you to build complex UIs by combining smaller, atomic components. This reduces prop drilling and makes your code more maintainable for large-scale applications."
      },
      Hindi: {
        title: "उन्नत React और Next.js पैटर्न",
        body: "कंपोनेंट कंपोजिशन आपको छोटे कंपोनेंट्स को जोड़कर जटिल UI बनाने की अनुमति देता है। यह प्रॉप ड्रिलिंग को कम करता है।"
      },
      Kannada: {
        title: "ಸುಧಾರಿತ React ಮತ್ತು Next.js ಪ್ಯಾಟರ್ನ್‌ಗಳು",
        body: "ಘಟಕ ಸಂಯೋಜನೆಯು ಸಣ್ಣ ಘಟಕಗಳನ್ನು ಸಂಯೋಜಿಸುವ ಮೂಲಕ ಸಂಕೀರ್ಣ UI ಗಳನ್ನು ನಿರ್ಮಿಸಲು ನಿಮಗೆ ಅನುಮತಿಸುತ್ತದೆ।"
      },
      Tamil: {
        title: "மேம்பட்ட React மற்றும் Next.js வடிவங்கள்",
        body: "கூறு கலவை சிறிய கூறுகளை இணைப்பதன் மூலம் சிக்கலான UI-களை உருவாக்க உங்களை அனுமதிக்கிறது."
      },
      Telugu: {
        title: "అడ్వాన్స్డ్ React మరియు Next.js పద్ధతులు",
        body: "కాంపోనెంట్ కంపోజిషన్ చిన్న భాగాలను కలపడం ద్వారా సంక్లిష్టమైన UIలను రూపొందించడానికి మిమ్మల్ని అనుమతిస్తుంది."
      }
    }
  },
  {
    id: 2,
    title: "Python for Data Science",
    category: "Data Science",
    duration: "6h 15m",
    rating: 4.9,
    lessons: 18,
    color: "from-emerald-500 to-teal-600",
    description: "Learn NumPy, Pandas, Matplotlib and build real data pipelines.",
    content: {
      English: {
        title: "Python for Data Science",
        body: "NumPy and Pandas are the backbone of data science in Python. NumPy provides fast array operations while Pandas gives you powerful data manipulation with DataFrames — the two tools every data scientist must master."
      },
      Hindi: { title: "डेटा साइंस के लिए Python", body: "NumPy और Pandas Python में डेटा साइंस की रीढ़ हैं। NumPy तेज़ ऐरे ऑपरेशन देता है जबकि Pandas DataFrames के साथ शक्तिशाली डेटा मैनिपुलेशन देता है।" },
      Kannada: { title: "ಡೇಟಾ ಸೈನ್ಸ್‌ಗಾಗಿ Python", body: "NumPy ಮತ್ತು Pandas Python ನಲ್ಲಿ ಡೇಟಾ ಸೈನ್ಸ್‌ನ ಬೆನ್ನೆಲುಬು." },
      Tamil: { title: "தரவு அறிவியலுக்கான Python", body: "NumPy மற்றும் Pandas Python இல் தரவு அறிவியலின் முதுகெலும்பு." },
      Telugu: { title: "డేటా సైన్స్ కోసం Python", body: "NumPy మరియు Pandas పైథాన్‌లో డేటా సైన్స్ వెన్నెముక." }
    }
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    category: "AI/ML",
    duration: "8h 00m",
    rating: 4.7,
    lessons: 22,
    color: "from-violet-500 to-purple-600",
    description: "From linear regression to neural networks — build ML intuition from scratch.",
    content: {
      English: {
        title: "Machine Learning Fundamentals",
        body: "Supervised learning is the most common ML paradigm. You train a model on labelled data so it can make predictions on unseen examples. Linear regression, decision trees, and SVMs are classic supervised algorithms every ML engineer should know."
      },
      Hindi: { title: "मशीन लर्निंग की मूल बातें", body: "सुपरवाइज्ड लर्निंग सबसे सामान्य ML प्रतिमान है जहाँ मॉडल लेबल किए गए डेटा पर प्रशिक्षित होता है।" },
      Kannada: { title: "ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ಮೂಲಭೂತ ಅಂಶಗಳು", body: "ಸೂಪರ್‌ವೈಸ್ಡ್ ಲರ್ನಿಂಗ್ ಅತ್ಯಂತ ಸಾಮಾನ್ಯ ML ನಮೂನೆ." },
      Tamil: { title: "இயந்திர கற்றல் அடிப்படைகள்", body: "மேற்பார்வையிடப்பட்ட கற்றல் மிகவும் பொதுவான ML முன்னுதாரணம்." },
      Telugu: { title: "మెషిన్ లెర్నింగ్ ఫండమెంటల్స్", body: "సూపర్‌వైజ్డ్ లెర్నింగ్ అత్యంత సాధారణ ML నమూనా." }
    }
  },
  {
    id: 4,
    title: "Node.js & REST APIs",
    category: "Backend",
    duration: "5h 20m",
    rating: 4.6,
    lessons: 15,
    color: "from-orange-500 to-rose-500",
    description: "Design and build scalable REST APIs with Express, MongoDB, and JWT auth.",
    content: {
      English: {
        title: "Node.js & REST APIs",
        body: "REST APIs use HTTP methods — GET, POST, PUT, DELETE — to perform CRUD operations on resources. Express.js makes it easy to define routes, handle middleware, and connect to databases like MongoDB for building production-ready backends."
      },
      Hindi: { title: "Node.js और REST APIs", body: "REST APIs HTTP मेथड्स का उपयोग करके संसाधनों पर CRUD ऑपरेशन करती हैं।" },
      Kannada: { title: "Node.js ಮತ್ತು REST APIs", body: "REST APIs HTTP ವಿಧಾನಗಳನ್ನು ಬಳಸಿ CRUD ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತವೆ." },
      Tamil: { title: "Node.js மற்றும் REST APIs", body: "REST APIs HTTP முறைகளை பயன்படுத்தி CRUD செயல்பாடுகளை செய்கின்றன." },
      Telugu: { title: "Node.js మరియు REST APIs", body: "REST APIs HTTP పద్ధతులను ఉపయోగించి CRUD ఆపరేషన్లు చేస్తాయి." }
    }
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    category: "Design",
    duration: "3h 45m",
    rating: 4.8,
    lessons: 10,
    color: "from-pink-500 to-fuchsia-600",
    description: "Learn Figma, design systems, accessibility and user-centered design thinking.",
    content: {
      English: {
        title: "UI/UX Design Principles",
        body: "Good design is invisible. Users should be able to accomplish their goals without thinking about the interface. Visual hierarchy, consistent spacing, and accessible color contrast are the three pillars of effective UI design."
      },
      Hindi: { title: "UI/UX डिज़ाइन सिद्धांत", body: "अच्छा डिज़ाइन अदृश्य होता है। उपयोगकर्ताओं को इंटरफेस के बारे में सोचे बिना अपने लक्ष्य प्राप्त करने में सक्षम होना चाहिए।" },
      Kannada: { title: "UI/UX ಡಿಸೈನ್ ತತ್ವಗಳು", body: "ಉತ್ತಮ ವಿನ್ಯಾಸ ಅದೃಶ್ಯವಾಗಿರುತ್ತದೆ." },
      Tamil: { title: "UI/UX வடிவமைப்பு கொள்கைகள்", body: "நல்ல வடிவமைப்பு கண்ணுக்கு தெரியாதது." },
      Telugu: { title: "UI/UX డిజైన్ సూత్రాలు", body: "మంచి డిజైన్ కనిపించదు." }
    }
  },
  {
    id: 6,
    title: "Cloud & DevOps Basics",
    category: "DevOps",
    duration: "5h 00m",
    rating: 4.5,
    lessons: 14,
    color: "from-sky-500 to-cyan-600",
    description: "AWS, Docker, CI/CD pipelines and infrastructure as code fundamentals.",
    content: {
      English: {
        title: "Cloud & DevOps Basics",
        body: "Containers changed software deployment forever. Docker packages your app and its dependencies into a portable image that runs identically in development, staging, and production — eliminating the classic 'works on my machine' problem."
      },
      Hindi: { title: "क्लाउड और DevOps बेसिक्स", body: "कंटेनरों ने सॉफ्टवेयर डिप्लॉयमेंट को हमेशा के लिए बदल दिया।" },
      Kannada: { title: "ಕ್ಲೌಡ್ ಮತ್ತು DevOps ಮೂಲಗಳು", body: "ಕಂಟೇನರ್‌ಗಳು ಸಾಫ್ಟ್‌ವೇರ್ ನಿಯೋಜನೆಯನ್ನು ಶಾಶ್ವತವಾಗಿ ಬದಲಾಯಿಸಿದವು." },
      Tamil: { title: "கிளவுட் மற்றும் DevOps அடிப்படைகள்", body: "கண்டெய்னர்கள் மென்பொருள் பயன்பாட்டை என்றென்றும் மாற்றின." },
      Telugu: { title: "క్లౌడ్ మరియు DevOps బేసిక్స్", body: "కంటైనర్లు సాఫ్ట్‌వేర్ డిప్లాయ్‌మెంట్‌ను శాశ్వతంగా మార్చాయి." }
    }
  }
];

const CourseLibrary = ({ onSelectCourse }) => {
  const [search, setSearch] = useState('');
  const filtered = COURSES.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Learning Center</h1>
        <p className="text-slate-400 mt-2 font-medium">Pick a course and start learning with your AI tutor</p>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F96167]/30 text-slate-700 text-sm"
        />
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-bold">No courses found for "{search}"</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(course => (
          <div
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            <div className={`h-2 bg-gradient-to-r ${course.color}`} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r ${course.color} text-white`}>
                  {course.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={13} className="text-amber-400" fill="currentColor" />
                  <span className="text-xs font-bold text-slate-600">{course.rating}</span>
                </div>
              </div>
              <h3 className="font-black text-slate-800 text-lg leading-tight mb-2 group-hover:text-[#F96167] transition-colors">
                {course.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{course.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold">
                  <span className="flex items-center gap-1"><Clock size={13} />{course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen size={13} />{course.lessons} lessons</span>
                </div>
                <button className="bg-[#2F3C7E] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1a255e] transition-colors">
                  Start →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main LessonPlayer ────────────────────────────────────────────────────────
const LessonPlayer = () => {
  const [view, setView] = useState("library");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userLanguage, setUserLanguage] = useState("English");

  const languages = [
    { name: 'English', code: 'ENG' },
    { name: 'Hindi',   code: 'HIN' },
    { name: 'Kannada', code: 'KAN' },
    { name: 'Tamil',   code: 'TAM' },
    { name: 'Telugu',  code: 'TEL' }
  ];

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setView("lesson");
  };

  const currentContent = selectedCourse?.content?.[userLanguage]
    || selectedCourse?.content?.["English"]
    || { title: selectedCourse?.title, body: selectedCourse?.description };

  const handleListen = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentContent.body);
    const langCodes = {
      "English": "en-US", "Hindi": "hi-IN",
      "Kannada": "kn-IN", "Tamil": "ta-IN", "Telugu": "te-IN"
    };
    utterance.lang = langCodes[userLanguage] || "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10">
      {view === "library" ? (
        <CourseLibrary onSelectCourse={handleSelectCourse} />
      ) : (
        <div className="animate-in slide-in-from-right duration-500 max-w-[1600px] mx-auto">
          {/* Top bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div className="flex items-center gap-5">
              <button
                onClick={() => setView("library")}
                className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all"
              >
                <ArrowLeft size={22} className="text-slate-600" />
              </button>
              <div>
                <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">{currentContent.title}</h2>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                  {selectedCourse?.category} · {selectedCourse?.lessons} Lessons
                </p>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setUserLanguage(lang.name)}
                  className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase transition-all ${
                    userLanguage === lang.name
                      ? 'bg-[#F96167] text-white shadow-lg'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {lang.code}
                </button>
              ))}
            </div>
          </div>

          {/* Content + Chat */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="bg-white p-10 lg:p-16 rounded-[3.5rem] shadow-sm border border-slate-100 min-h-[400px] flex flex-col justify-between">
                <p className="text-2xl lg:text-3xl text-slate-800 leading-[1.6] font-medium">
                  {currentContent.body}
                </p>
                <div className="flex gap-4 mt-12">
                  <button
                    onClick={handleListen}
                    className="flex items-center gap-3 bg-indigo-50 text-indigo-600 px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-100 transition-all"
                  >
                    <Volume2 size={18} /> Listen
                  </button>
                  <button className="bg-[#F96167] text-white px-12 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-200 hover:scale-105 transition-all">
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white h-[600px] rounded-[3.5rem] shadow-xl border border-slate-100 overflow-hidden">
                <AITutorChat
                  language={userLanguage}
                  lessonTitle={selectedCourse?.title || ""}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonPlayer;
