import React from "react";
import { Flame, CheckCircle, Clock, Trophy, Target, ChevronRight } from "lucide-react";

const subjects = [
  { name: "Math", progress: 70, color: "bg-indigo-500" },
  { name: "Science", progress: 45, color: "bg-rose-500" },
  { name: "English", progress: 85, color: "bg-emerald-500" },
  { name: "Social", progress: 30, color: "bg-amber-500" },
];

const completedTopics = ["Photosynthesis", "Algebra Basics", "Parts of Speech"];
const pendingTopics = ["Electricity", "Geometry", "History - Freedom Movement"];

const ProgressScreen = () => {
  const streak = 5; 
  const userCGPA = 8.89; // Your actual academic standing

  const getMessage = () => {
    const avg = subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length;
    if (avg >= 80) return "Top-tier performance! Just like your SIH victory. 🌟";
    if (avg >= 50) return "Strong momentum! Keep pushing that CGPA higher. 👍";
    return "Time to focus, Pooja! You've got this. 💪";
  };

  return (
    <div className="max-w-[480px] mx-auto bg-[#f8fafc] min-h-screen p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* Header & Stats Card */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Your Progress</h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Academic Year 2026</p>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
            <Flame size={16} className="text-orange-500 fill-orange-500" />
            <span className="font-black text-orange-600 text-sm">{streak} Day Streak</span>
          </div>
        </div>

        {/* CGPA Mini-Card */}
        <div className="bg-indigo-50 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm text-indigo-600">
              <Trophy size={20} />
            </div>
            <span className="font-bold text-slate-700">Current CGPA</span>
          </div>
          <span className="text-xl font-black text-indigo-700">{userCGPA}</span>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="space-y-4">
        <h2 className="font-black text-slate-800 text-lg flex items-center gap-2 px-2">
          <Target size={18} className="text-rose-500" /> Subjects
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {subjects.map((sub, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-default">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-slate-700">{sub.name}</span>
                <span className="text-xs font-black text-slate-400">{sub.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`${sub.color} h-full rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${sub.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Lists */}
      <div className="grid grid-cols-1 gap-6">
        {/* Completed */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <h2 className="font-black text-slate-800 mb-4 flex items-center justify-between">
            Mastered <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg uppercase tracking-tighter">{completedTopics.length} Topics</span>
          </h2>
          <div className="space-y-3">
            {completedTopics.map((topic, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-600 font-medium group">
                <div className="p-1 bg-emerald-50 rounded-lg text-emerald-500">
                  <CheckCircle size={16} />
                </div>
                <span className="text-sm">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <h2 className="font-black text-slate-800 mb-4 flex items-center justify-between">
            Up Next <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg uppercase tracking-tighter">{pendingTopics.length} Topics</span>
          </h2>
          <div className="space-y-3">
            {pendingTopics.map((topic, i) => (
              <div key={i} className="flex items-center justify-between text-slate-500 font-medium group cursor-pointer hover:text-indigo-600">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-slate-50 rounded-lg text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500">
                    <Clock size={16} />
                  </div>
                  <span className="text-sm">{topic}</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized Motivation Footer */}
      <div className="bg-[#2F3C7E] text-white p-8 rounded-[2.5rem] text-center shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-lg font-bold leading-tight">{getMessage()}</p>
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10" />
      </div>
    </div>
  );
};

export default ProgressScreen;