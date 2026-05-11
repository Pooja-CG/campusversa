import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Home, BookOpen, BarChart, Briefcase, GraduationCap, LogOut, Languages, LayoutDashboard, Target, Bell, X } from "lucide-react";

// Pages
import AuthPage from './pages/auth';
import Dashboard from './pages/student/dashboard';
import Landing from './pages/landing';
import Dashboard2 from './pages/institute/instdashboard';
import Resume from './pages/student/resume';
import ProjectColab from './pages/student/projectcolab';
import MockInterview from './pages/student/mockinterview';
import Problemsolve from './pages/student/problemsolve';
import LessonPlayer from './pages/student/LessonPlayer';
import ProgressScreen from './pages/student/ProgressScreen';
import PeerHub from "./pages/student/PeerHub";
import TeacherDashboard from './pages/teacher/teacherdashboard';
import AdminPanel from './pages/admin/admindashboard'; // ← NEW

/* ===============================================================
   ROLE DETECTION
   Source of truth = pathname. /teacher-dashboard → teacher.
   /admin-dashboard → admin.
   Fallback = localStorage (set by Auth on login).
================================================================ */
const getRoleFromPath = (pathname) => {
  if (pathname.startsWith('/teacher-dashboard')) return 'teacher';
  if (pathname.startsWith('/admin-dashboard'))   return 'admin';
  return localStorage.getItem('role') || 'student';
};

/* ===============================================================
   NAV CONFIGS
================================================================ */
const studentNavItems = [
  { path: "/dashboard",       label: "Student Home",    icon: Home },
  { path: "/learning-center", label: "Learning Center", icon: BookOpen },
  { path: "/progress",        label: "My Progress",     icon: BarChart },
  { path: "/projecttools",    label: "Project Tools",   icon: Briefcase },
];

const teacherNavItems = [
  { path: "/teacher-dashboard", label: "Teacher Panel",   icon: LayoutDashboard },
  { path: "/learning-center",   label: "Learning Center", icon: BookOpen },
  { path: "/progress",          label: "Analytics",       icon: Target },
  { path: "/projecttools",      label: "Project Tools",   icon: Briefcase },
];

/* ===============================================================
   BROADCAST TOAST
   Teacher writes to localStorage key "broadcastMessage".
   Students see a toast; dismissed by writing to "broadcastSeen".
   Works same-tab (polling) + cross-tab (storage event).
================================================================ */
const BroadcastToast = () => {
  const [msg, setMsg]         = useState('');
  const [visible, setVisible] = useState(false);
  const location              = useLocation();
  const role                  = getRoleFromPath(location.pathname);
  const isTeacher             = role === 'teacher';
  const isAdmin               = role === 'admin';

  useEffect(() => {
    if (isTeacher || isAdmin) return; // teachers & admins don't receive broadcasts

    const check = () => {
      const stored = localStorage.getItem('broadcastMessage');
      const seen   = localStorage.getItem('broadcastSeen');
      if (stored && stored !== seen) {
        setMsg(stored);
        setVisible(true);
      }
    };

    check();
    window.addEventListener('storage', check); // cross-tab updates
    const iv = setInterval(check, 500);        // same-tab polling
    return () => {
      window.removeEventListener('storage', check);
      clearInterval(iv);
    };
  }, [isTeacher, isAdmin]);

  const dismiss = () => {
    localStorage.setItem('broadcastSeen', msg);
    setVisible(false);
  };

  if (!visible || !msg) return null;

  return (
    <div className="fixed top-6 right-6 z-[100] max-w-sm w-full">
      <div className="bg-[#2F3C7E] text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
           style={{ animation: 'slideIn 0.3s ease' }}>
        <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }`}</style>
        {/* Header stripe */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#F96167]">
          <div className="flex items-center gap-2">
            <Bell size={15} />
            <span className="text-sm font-black uppercase tracking-wide">Teacher Broadcast</span>
          </div>
          <button onClick={dismiss} className="hover:opacity-70 transition-opacity">
            <X size={15} />
          </button>
        </div>
        {/* Message */}
        <div className="px-5 py-4">
          <p className="text-sm font-medium leading-relaxed">{msg}</p>
        </div>
        <div className="px-5 pb-4">
          <button
            onClick={dismiss}
            className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded-xl transition-all"
          >
            Got it ✓
          </button>
        </div>
      </div>
    </div>
  );
};

/* ===============================================================
   SIDEBAR — role computed from current pathname, never stale
================================================================ */
const Sidebar = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const isTeacher = getRoleFromPath(location.pathname) === 'teacher';
  const navItems  = isTeacher ? teacherNavItems : studentNavItems;

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/auth');
  };

  return (
    <div className="w-72 bg-[#2F3C7E] text-white flex flex-col sticky top-0 h-screen shadow-xl">

      {/* Logo */}
      <div className="p-8 flex items-center gap-3">
        <div className="bg-[#F96167] p-2 rounded-lg">
          <GraduationCap size={28} className="text-white" />
        </div>
        <span className="text-2xl font-black">EduSense AI</span>
      </div>

      {/* Role badge */}
      <div className="px-6 mb-4">
        <span className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg inline-block ${
          isTeacher
            ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
            : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
        }`}>
          {isTeacher ? "👨‍🏫 Teacher" : "🎓 Student"}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon     = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                isActive
                  ? "bg-[#F96167] text-white shadow-md"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={22} />
              <span className="font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-white/60 hover:text-white rounded-xl hover:bg-white/10 transition-all"
        >
          <LogOut size={20} />
          <span className="font-bold">Logout</span>
        </button>
      </div>
    </div>
  );
};

/* ===============================================================
   SHARED LAYOUT
================================================================ */
const SharedLayout = () => {
  const location  = useLocation();
  const isTeacher = getRoleFromPath(location.pathname) === 'teacher';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {/* Topbar */}
        <div className="bg-white border-b px-10 py-4 flex justify-between items-center sticky top-0 z-10">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            {isTeacher ? "Teacher Command Center" : "Student Portal"}
          </p>
          <div className="flex items-center gap-4 text-[#2F3C7E] font-bold">
            <Languages size={20} className="text-[#F96167]" />
            <span className="text-sm">Language: Auto-Detect</span>
          </div>
        </div>

        {/* Broadcast toast — only visible to students */}
        <BroadcastToast />

        <div className="p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

/* ===============================================================
   APP
================================================================ */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"                    element={<Landing />} />
        <Route path="/auth"                element={<AuthPage />} />
        <Route path="/institute/dashboard" element={<Dashboard2 />} />

        {/* ADMIN — standalone, uses its own layout & auth */}
        <Route path="/admin-dashboard"     element={<AdminPanel />} />

        <Route element={<SharedLayout />}>
          {/* TEACHER */}
          <Route path="/teacher-dashboard"  element={<TeacherDashboard />} />

          {/* STUDENT */}
          <Route path="/dashboard"          element={<Dashboard />} />
          <Route path="/learning-center"    element={<LessonPlayer />} />
          <Route path="/progress"           element={<ProgressScreen />} />
          <Route path="/resume"             element={<Resume />} />
          <Route path="/projecttools"       element={<ProjectColab />} />
          <Route path="/mockinterview"      element={<MockInterview />} />
          <Route path="/problemsolve"       element={<Problemsolve />} />
          <Route path="/community"          element={<PeerHub />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
