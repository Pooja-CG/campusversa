import React, { useState } from 'react';
import { Search, Code2, BrainCircuit, Network, BookOpen, ChevronRight, Filter } from 'lucide-react';

const CourseLibrary = ({ onSelectCourse }) => {
  const [filter, setFilter] = useState('ALL');

  const courses = [
    { id: 1, title: "Advanced React & Next.js Patterns", category: "DEVELOPMENT", progress: 85, color: "bg-[#F96167]", bgLight: "bg-rose-50", icon: <Code2 className="text-[#F96167]" size={32} /> },
    { id: 2, title: "Data Science: Linear Regression", category: "DATA SCIENCE", progress: 40, color: "bg-indigo-500", bgLight: "bg-indigo-50", icon: <BrainCircuit className="text-indigo-600" size={32} /> },
    { id: 3, title: "Cisco Networking: IPv6 Infrastructure", category: "NETWORKING", progress: 25, color: "bg-emerald-500", bgLight: "bg-emerald-50", icon: <Network className="text-emerald-600" size={32} /> },
    { id: 4, title: "JanDrishtiAI: Socio-Technical Case Study", category: "CASE STUDY", progress: 100, color: "bg-amber-500", bgLight: "bg-amber-50", icon: <BookOpen className="text-amber-600" size={32} /> }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black text-[#1e293b] tracking-tight mb-2">Learning Center</h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Tailored for CSE Data Science Track</p>
        </div>
        
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search modules (e.g. Cisco, React)..."
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-[2rem] shadow-sm outline-none focus:ring-2 focus:ring-slate-200 text-sm font-medium"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
        {['ALL', 'DEVELOPMENT', 'DATA SCIENCE', 'NETWORKING', 'CASE STUDY'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest transition-all ${
              filter === cat 
              ? 'bg-[#1e293b] text-white' 
              : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {courses.filter(c => filter === 'ALL' || c.category === filter).map((course) => (
          <div 
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
          >
            {/* Top Visual Half */}
            <div className={`h-44 ${course.bgLight} relative flex items-center justify-center`}>
              <div className="absolute top-5 right-6">
                <span className="px-3 py-1 bg-white rounded-full text-[9px] font-black text-slate-500 border border-slate-100">
                  {course.category}
                </span>
              </div>
              <div className="transition-transform group-hover:scale-110 duration-300">
                {course.icon}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-100">
                <div className={`h-full ${course.color}`} style={{ width: `${course.progress}%` }} />
              </div>
            </div>

            {/* Content Bottom Half */}
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-[17px] font-black text-[#1e293b] leading-snug mb-8 group-hover:text-indigo-600 transition-colors">
                {course.title}
              </h3>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {course.progress}% Complete
                </span>
                <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseLibrary;