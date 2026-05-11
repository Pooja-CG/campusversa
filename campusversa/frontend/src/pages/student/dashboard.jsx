import React, { useState } from 'react';
import { 
  TrendingUp, Clock, Code, Target, Bell, Search, 
  ChevronRight, Briefcase, Calendar, MoreHorizontal,
  ArrowUpRight, Award, Zap, Users, Globe, MessageSquare
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const academicData = [
  { name: 'Sem 1', gpa: 8.2 }, 
  { name: 'Sem 2', gpa: 8.4 },
  { name: 'Sem 3', gpa: 8.6 }, 
  { name: 'Sem 4', gpa: 8.89 },
];

const activeProjects = [
  { name: 'JanDrishtiAI', progress: 85, tag: 'GovTech', color: '#6366f1' },
  { name: 'Imagineeee Healthcare', progress: 60, tag: 'HealthTech', color: '#10b981' }
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-8 animate-in fade-in duration-700">
      {/* Upper Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back, Alvin!</h1>
          <p className="text-slate-500 font-medium mt-1">
            Current GPA: <span className="text-indigo-600 font-bold">9.0</span> | 
            Achievement: <span className="text-rose-500 font-bold ml-1">Buildathon Winner</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search builds or lessons..." 
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm w-full md:w-72 shadow-sm outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-50 relative transition-all active:scale-95">
            <Bell size={22} />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-200">
              PC
            </div>
          </div>
        </div>
      </header>

      {/* Primary Stats Grid + Peer Hub Trigger */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[
          { label: 'GPA', val: '8.89', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50', desc: 'Top 5% of Batch' },
          { label: 'Streak', val: '5 Days', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50', desc: 'Consistent Learner' },
          { label: 'Projects', val: '4 Active', icon: Code, color: 'text-emerald-600', bg: 'bg-emerald-50', desc: '2 in Production' },
          { label: 'Badges', val: '12', icon: Award, color: 'text-rose-600', bg: 'bg-rose-50', desc: 'SIH Winner' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} w-fit mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">{stat.label}</p>
            <h4 className="text-2xl font-black text-slate-800 my-1">{stat.val}</h4>
          </div>
        ))}
        
        {/* PEER HUB NAV CARD */}
        <div 
          onClick={() => navigate('/community')}
          className="bg-[#2d3a8c] p-6 rounded-[2.5rem] shadow-xl shadow-indigo-100 text-white cursor-pointer hover:scale-[1.02] transition-all group relative overflow-hidden"
        >
          <div className="relative z-10">
            <Users size={24} className="mb-4 text-indigo-300" />
            <h3 className="font-black text-lg">Peer Hub</h3>
            <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mt-1">Connect & Collaborate</p>
          </div>
          <Globe size={120} className="absolute -right-10 -bottom-10 text-white/5 group-hover:rotate-12 transition-transform duration-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Visualization */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h3 className="font-black text-slate-800 text-xl">Academic Performance</h3>
              <p className="text-slate-400 text-sm font-medium">Semester-wise GPA Growth Path</p>
            </div>
            <div className="flex bg-slate-50 p-1 rounded-xl">
              <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg shadow-sm text-xs font-bold">GPA</button>
              <button className="px-4 py-2 text-slate-400 text-xs font-bold hover:text-slate-600 transition-all">Credits</button>
            </div>
          </div>
          
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={academicData}>
                <defs>
                  <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} domain={[0, 10]} />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '12px'}} />
                <Area type="monotone" dataKey="gpa" stroke="#6366f1" fill="url(#colorGpa)" strokeWidth={4} animationDuration={2000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peer Activity Sidebar Integration */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-slate-800 text-lg">Peer Activity</h3>
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><MessageSquare size={16} /></div>
            </div>
            
            <div className="space-y-5">
              {[
                { user: "Rahul M.", activity: "Commented on JanDrishtiAI", time: "2m ago" },
                { user: "Sneha K.", activity: "Shared a new Data Science doc", time: "1h ago" },
                { user: "Arjun P.", activity: "Started 'IPv6 Headers' lesson", time: "3h ago" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 pb-4 border-b border-slate-50 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500">
                    {item.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">{item.user}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => navigate('/community')}
              className="w-full mt-6 py-3 bg-slate-50 text-slate-500 rounded-xl font-bold text-xs hover:bg-indigo-50 hover:text-indigo-600 transition-all"
            >
              Enter Peer Hub
            </button>
          </div>

          {/* Project Tracker */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex-1">
            <h3 className="font-black text-slate-800 text-xl mb-8">Current Build</h3>
            {activeProjects.slice(0, 1).map((project, i) => (
              <div key={i}>
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">{project.tag}</span>
                    <h4 className="font-bold text-slate-700">{project.name}</h4>
                  </div>
                  <span className="text-xs font-black text-slate-900 bg-slate-50 px-2 py-1 rounded-lg">{project.progress}%</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${project.progress}%`, backgroundColor: project.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;