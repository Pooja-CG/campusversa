import React, { useState } from "react";
import {
  AlertCircle,
  Activity,
  Brain,
  Target,
  ArrowUpRight,
  Eye,
  LogOut,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const teacherStudentData = [
  { id: 1, name: "Arjun Kumar", performance: 45, status: "struggling" },
  { id: 2, name: "Priya Singh", performance: 88, status: "ontrack" },
  { id: 3, name: "Rahul M.", performance: 62, status: "average" },
];

const classPerformanceData = [
  { name: "Mon", score: 40 },
  { name: "Tue", score: 45 },
  { name: "Wed", score: 55 },
  { name: "Thu", score: 50 },
  { name: "Fri", score: 72 },
];

const TeacherDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeView, setActiveView] = useState("overview");

  // NEW STATES
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [notification, setNotification] = useState("");

  // KPI DATA
  const kpis = [
    {
      label: "Class Mastery",
      value: "72%",
      icon: <Brain size={20} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "+12%",
    },
    {
      label: "Avg. Engagement",
      value: "88%",
      icon: <Activity size={20} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "+24%",
    },
    {
      label: "Intervention Needed",
      value: "3",
      icon: <AlertCircle size={20} />,
      color: "text-rose-600",
      bg: "bg-rose-50",
      trend: "High Priority",
    },
  ];

  // STATUS COLORS
  const getStatusColor = (status) => {
    if (status === "struggling") {
      return "bg-rose-100 text-rose-600";
    }

    if (status === "ontrack") {
      return "bg-emerald-100 text-emerald-600";
    }

    return "bg-slate-100 text-slate-600";
  };

  // BROADCAST FUNCTION
  const handleBroadcast = () => {
    if (!broadcastMessage.trim()) {
      alert("Please enter a message");
      return;
    }

    // Use "broadcastMessage" key + clear "broadcastSeen" so students see the new message
    localStorage.setItem("broadcastMessage", broadcastMessage);
    localStorage.removeItem("broadcastSeen");
    window.dispatchEvent(new Event("storage")); // wake up same-tab listeners

    setNotification("📣 Broadcast sent to all students!");
    setBroadcastMessage("");
    setTimeout(() => setNotification(""), 3000);
  };

  // PUSH HINT FUNCTION
  const handlePushHint = () => {
    const hint = "📌 Teacher Hint: Review the Logic Gates module — focus on NAND and NOR gate truth tables.";
    localStorage.setItem("broadcastMessage", hint);
    localStorage.removeItem("broadcastSeen");
    window.dispatchEvent(new Event("storage"));

    setNotification("💡 Hint pushed to all students!");
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-4 lg:p-8 font-sans text-slate-900">
      
      {/* SUCCESS POPUP */}
      {notification && (
        <div className="fixed top-6 right-6 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 font-bold animate-pulse">
          {notification}
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-[#2F3C7E] tracking-tight">
            Teacher Command Center
          </h1>

          <p className="text-sm text-slate-500 font-medium mt-1">
            Project: EduSense AI • Team: Codex Creators
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
              Live Sync Active
            </span>
          </div>

          <button className="bg-white p-2 rounded-xl border border-slate-100 text-slate-400 hover:text-rose-500 transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="flex gap-2 mb-8 bg-slate-200/50 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveView("overview")}
          className={`px-5 py-3 rounded-xl text-sm font-black transition-all ${
            activeView === "overview"
              ? "bg-white text-[#2F3C7E] shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Class Overview
        </button>

        <button
          onClick={() => setActiveView("performance")}
          className={`px-5 py-3 rounded-xl text-sm font-black transition-all ${
            activeView === "performance"
              ? "bg-white text-[#2F3C7E] shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Analytics & Trends
        </button>
      </div>

      {/* OVERVIEW */}
      {activeView === "overview" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {kpis.map((kpi, index) => (
                <div
                  key={index}
                  className="bg-white p-7 rounded-[32px] shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-md transition-all"
                >
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                    {kpi.label}
                  </p>

                  <div className="flex items-baseline gap-2">
                    <h2 className="text-2xl lg:text-3xl font-black text-slate-800">
                      {kpi.value}
                    </h2>

                    <span className={`text-sm font-bold ${kpi.color}`}>
                      {kpi.trend}
                    </span>
                  </div>

                  <div
                    className={`absolute top-6 right-6 ${kpi.bg} ${kpi.color} p-4 rounded-2xl`}
                  >
                    {kpi.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* STUDENT TABLE */}
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                  Student Performance Log
                </h3>
              </div>

              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-xs font-black uppercase tracking-widest text-slate-400">
                  <tr>
                    <th className="px-10 py-5">Student</th>
                    <th className="px-10 py-5 text-center">Status</th>
                    <th className="px-10 py-5 text-center">Mastery</th>
                    <th className="px-10 py-5 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {teacherStudentData.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50 transition-all"
                    >
                      <td className="px-10 py-6 text-base font-bold text-slate-700">
                        {student.name}
                      </td>

                      <td className="px-10 py-6 text-center">
                        <span
                          className={`text-xs font-black px-3 py-1 rounded-lg uppercase ${getStatusColor(
                            student.status
                          )}`}
                        >
                          {student.status}
                        </span>
                      </td>

                      <td className="px-10 py-6">
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden max-w-[80px]">
                            <div
                              className="bg-[#2F3C7E] h-full"
                              style={{
                                width: `${student.performance}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-bold">
                            {student.performance}%
                          </span>
                        </div>
                      </td>

                      <td className="px-10 py-6 text-right">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="bg-slate-800 text-white p-2 rounded-xl hover:bg-[#F96167] transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-8">

            {/* AI CARD */}
            <div className="bg-[#2F3C7E] p-10 rounded-[40px] text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/10 p-3 rounded-2xl">
                  <ArrowUpRight size={24} className="text-[#F96167]" />
                </div>

                <h4 className="text-xl font-black">
                  AI Strategy Nudge
                </h4>
              </div>

              <p className="text-base opacity-90 mb-8">
                60% of students struggle with the current logic gate module.
                Push a hint?
              </p>

              <button
                onClick={handlePushHint}
                className="w-full bg-[#F96167] py-4 rounded-2xl font-bold text-sm hover:scale-[1.02] transition-all"
              >
                Push Remedial Hint
              </button>
            </div>

            {/* BROADCAST */}
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
              <h4 className="font-black text-slate-800 text-xl mb-6">
                Broadcast
              </h4>

              <textarea
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full bg-slate-50 rounded-[24px] p-5 text-sm mb-4 outline-none border-none focus:ring-2 focus:ring-[#F96167]"
                rows={4}
                placeholder="Send a manual tip..."
              />

              <button
                onClick={handleBroadcast}
                className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#F96167] transition-all hover:scale-[1.02]"
              >
                Broadcast Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ANALYTICS */
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-3xl font-black text-slate-800">
              Learning Momentum
            </h3>

            <Target className="text-slate-200" size={40} />
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={classPerformanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#F96167"
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="95%"
                      stopColor="#F96167"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis hide domain={[0, 100]} />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#F96167"
                  strokeWidth={4}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* STUDENT MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[48px] shadow-2xl max-w-xl w-full overflow-hidden">
            
            <div className="bg-[#2F3C7E] p-10 text-white flex justify-between items-center">
              <h2 className="text-2xl lg:text-3xl font-black">
                {selectedStudent.name}
              </h2>

              <button
                onClick={() => setSelectedStudent(null)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                
                <div className="bg-slate-50 p-6 rounded-[32px] border">
                  <p className="text-xs font-black text-slate-400 uppercase">
                    Mastery
                  </p>

                  <p className="text-3xl font-black text-[#2F3C7E]">
                    {selectedStudent.performance}%
                  </p>
                </div>

                <div
                  className={`${getStatusColor(
                    selectedStudent.status
                  )} p-6 rounded-[32px]`}
                >
                  <p className="text-xs font-black opacity-60 uppercase">
                    Status
                  </p>

                  <p className="text-2xl font-black uppercase">
                    {selectedStudent.status}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="w-full bg-[#2F3C7E] text-white py-5 rounded-2xl font-black shadow-xl hover:bg-[#F96167] transition-all"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;