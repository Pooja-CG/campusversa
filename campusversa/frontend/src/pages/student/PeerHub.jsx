import React from 'react';
import { 
  Users, MessageSquare, Share2, 
  Trophy, Globe, Zap, Heart, Search 
} from 'lucide-react';

const topLearners = [
  { name: "Alvin", rank: 1, score: 2840, avatar: "PC", status: "Buildathon Winner" },
  { name: "Rahul M.", rank: 2, score: 2650, avatar: "RM", status: "Active" },
  { name: "Sneha K.", rank: 3, score: 2420, avatar: "SK", status: "Pro Learner" },
];

const PeerHub = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 space-y-8 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Peer Hub</h1>
          <p className="text-slate-500 font-medium mt-1 italic">Learn together, grow faster.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search study groups..." 
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm w-full md:w-64 shadow-sm focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-black text-slate-800 text-xl px-2">Project Updates</h2>
          
          {/* Featured Project Post - JanDrishtiAI */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <Globe size={100} />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">PC</div>
              <div>
                <h4 className="font-bold text-slate-800">Alvin</h4>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Project Lead • JanDrishtiAI</p>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6 font-medium">
              Excited to share that we've optimized the transparency module for <strong>JanDrishtiAI</strong>! 
              Working on bridging the visibility gap for rural governance. If anyone is into 
              <strong> AI for Social Good</strong>, let's connect!
            </p>
            <div className="flex items-center gap-6 text-slate-400 text-sm font-bold">
              <button className="flex items-center gap-2 hover:text-rose-500 transition-colors"><Heart size={18}/> 42</button>
              <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors"><MessageSquare size={18}/> 12</button>
              <button className="flex items-center gap-2 hover:text-emerald-500 transition-colors"><Share2 size={18}/> Share</button>
            </div>
          </div>

          {/* Discussion Card */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 text-emerald-600">
                <div className="p-2 bg-emerald-50 rounded-xl"><Users size={20}/></div>
                <h3 className="font-black">Active Study Groups</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Data Science Labs', 'React Developers', 'Cisco Networking Acad'].map((group, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-200 hover:bg-white transition-all cursor-pointer group">
                  <h4 className="font-bold text-slate-700 group-hover:text-indigo-600">{group}</h4>
                  <p className="text-xs text-slate-400 mt-1">24 Members • 3 Active Now</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Leaderboard */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[3.5rem] shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-rose-500" />
            <h3 className="font-black text-slate-800 text-xl mb-8 flex items-center gap-2">
              <Trophy size={22} className="text-amber-500" /> Hall of Fame
            </h3>
            
            <div className="space-y-6">
              {topLearners.map((learner, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-2xl transition-all ${i === 0 ? 'bg-indigo-50 ring-1 ring-indigo-100' : 'hover:bg-slate-50'}`}>
                  <div className="flex items-center gap-4">
                    <span className={`font-black text-sm ${i === 0 ? 'text-indigo-600' : 'text-slate-300'}`}>0{learner.rank}</span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-sm ${i === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {learner.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">{learner.name}</h4>
                      <p className={`text-[10px] font-black uppercase tracking-tighter ${i === 0 ? 'text-indigo-500' : 'text-slate-400'}`}>
                        {learner.status}
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-slate-700 text-xs">{learner.score}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-lg hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2">
              <Zap size={18} className="text-amber-400" /> My Rank: 1st
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerHub;