import React, { useState, useEffect, useCallback } from 'react';
import {
  Home, User, GraduationCap, Calendar, Bell, Search, Settings, Grid, School,TrendingUp, BookOpen, Package, Send, Zap, Activity, Mail, Phone, MapPin, Edit3, Save, X, ClipboardCheck, Camera, Link, Code, Clock, Plus, Users, UploadCloud, BarChart3, ListChecks, Bot, CheckCircle2
} from 'lucide-react';
// Assuming Recharts is available in the environment for professional charting
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// --- Data & Helpers (FACULTY CONTEXT) ---

// Custom color palette (Keeping the student colors but using Green as the main Faculty accent)
const primaryColor = '#66BB6A'; // Faculty Primary (Green)
const secondaryColor = '#7D5AFE'; // Secondary (Purple)
const accentColor = '#4DD0E1'; 

// Dark sidebar color
const darkSidebarBg = '#374232'; 

// Event Label Colors (Reused)
const eventLabels = {
    CLASS: { color: 'bg-green-500', text: 'text-green-500' },
    MEETING: { color: 'bg-red-500', text: 'text-red-500' },
    ADMIN: { color: 'bg-blue-500', text: 'text-blue-500' },
    DEADLINE: { color: 'bg-yellow-500', text: 'text-yellow-500' },
};

// Faculty Profile Data
const facultyProfileData = {
    firstName: 'Rohan',
    lastName: 'Gupta',
    facultyId: 'FG0042',
    designation: 'Professor, Machine Learning',
    dob: '15/07/1980',
    joinDate: '10/06/2012',
    email: 'rohan.gupta@college.edu',
    phone: '998-776-5544',
    address: 'Faculty Quarters, Pune, MH',
    avatarUrl: 'https://placehold.co/120x120/66BB6A/ffffff?text=RG',
    bannerColor: primaryColor, // Use faculty primary color
    department: 'Computer Science',
    researchAreas: ['AI Ethics', 'Reinforcement Learning']
};

// Modified Sidebar Menu (FACULTY POV)
const facultyNavItems = [
  { name: 'Dashboard', icon: Home, link: '#dashboard' },
  { name: 'Monitor Students', icon: Users, link: '#monitor-students' }, // New
  { name: 'Assignments', icon: Code, link: '#assignments' }, // New
  { name: 'Attendance', icon: ListChecks, link: '#attendance' }, // New
  { name: 'Events', icon: Calendar, link: '#events' }, 
  { name: 'Materials', icon: BookOpen, link: '#materials' }, // Renamed
  { name: 'Notifications', icon: Bell, link: '#notification' },
  { name: 'Faculty Profile', icon: Settings, link: '#settings' }, // Renamed/Adapted
];

// Dummy data for stat cards (Faculty POV)
const facultyStats = [
  { title: 'Total Students Managed', value: '185', change: 'Across 3 Courses', icon: Users, bgColor: 'bg-red-500/10 text-red-500' },
  { title: 'Avg Class GPA (ML)', value: '4.2', change: '+0.1 from last sem', icon: TrendingUp, bgColor: 'bg-green-500/10 text-green-500' },
  { title: 'Assignments to Grade', value: '18', change: '2 pending deadlines', icon: Code, bgColor: 'bg-yellow-500/10 text-yellow-500' },
  { title: 'Classes Today', value: '2/3', change: 'Next class at 2:00 PM', icon: Clock, bgColor: 'bg-purple-500/10 text-purple-500' },
];

// Data for Recharts Class Performance Graph
const classPerformanceData = [
    { name: 'W1', 'CS601: ML': 75, 'CS402: OS': 60 },
    { name: 'W2', 'CS601: ML': 78, 'CS402: OS': 65 },
    { name: 'W3', 'CS601: ML': 82, 'CS402: OS': 70 },
    { name: 'W4', 'CS601: ML': 85, 'CS402: OS': 73 },
    { name: 'W5', 'CS601: ML': 84, 'CS402: OS': 76 },
    { name: 'W6', 'CS601: ML': 87, 'CS402: OS': 78 },
    { name: 'W7', 'CS601: ML': 90, 'CS402: OS': 81 },
];

// Dummy data for recent grading activity
const recentGrading = [
    { student: 'Ananya Sharma', assignment: 'ML Project 1', score: '92/100', time: '5 mins ago', status: 'Completed', color: 'text-green-500' },
    { student: 'Vivek Menon', assignment: 'OS Midterm', score: 'Needs Review', time: '1 hour ago', status: 'Pending', color: 'text-yellow-500' },
    { student: 'Priya Singh', assignment: 'ML Quiz 2', score: '88/100', time: '1 day ago', status: 'Completed', color: 'text-green-500' },
    { student: 'Karan Mehra', assignment: 'OS Lab 3', score: '65/100', time: '2 days ago', status: 'Completed', color: 'text-red-500' },
];

// Student Roster Dummy Data for Monitor Students Page
const studentRoster = [
    { id: 1, name: 'Ananya Sharma', program: 'CS', gpa: 4.8, attendance: 95, pending: 1, avatar: 'https://placehold.co/40x40/7D5AFE/ffffff?text=AS' },
    { id: 2, name: 'Vivek Menon', program: 'CS', gpa: 3.5, attendance: 88, pending: 3, avatar: 'https://placehold.co/40x40/4DD0E1/ffffff?text=VM' },
    { id: 3, name: 'Priya Singh', program: 'IT', gpa: 4.5, attendance: 98, pending: 0, avatar: 'https://placehold.co/40x40/FF8A65/ffffff?text=PS' },
    { id: 4, name: 'Karan Mehra', program: 'CS', gpa: 3.9, attendance: 92, pending: 2, avatar: 'https://placehold.co/40x40/BA68C8/ffffff?text=KM' },
    { id: 5, name: 'Deepa Iyer', program: 'IT', gpa: 4.1, attendance: 90, pending: 1, avatar: 'https://placehold.co/40x40/66BB6A/ffffff?text=DI' },
];

// Assignment Data
const assignmentsData = [
    { id: 1, course: 'CS601: ML', title: 'Project 2: Neural Networks', deadline: 'Oct 30, 2025', submitted: 40, total: 45, graded: 10, type: 'Project' },
    { id: 2, course: 'CS402: OS', title: 'Midterm Report', deadline: 'Oct 15, 2025', submitted: 42, total: 45, graded: 42, type: 'Exam' },
    { id: 3, course: 'CS601: ML', title: 'Quiz 3: Backprop', deadline: 'Oct 10, 2025', submitted: 45, total: 45, graded: 45, type: 'Quiz' },
];

// Attendance data for the attendance page
const attendanceRecords = {
    'CS601: ML (Sec A)': { total: 45, present: 43, absent: 2, date: '2025-10-07' },
    'CS402: OS (Sec B)': { total: 40, present: 35, absent: 5, date: '2025-10-07' },
};

// Initial Notification Data (System and Faculty-Added)
const initialNotifications = [
    { id: 101, title: 'New Submissions for ML Project 2', message: '5 students submitted their projects overnight.', time: '2 mins ago', unread: true, type: 'assignment' },
    { id: 102, title: 'Department Meeting', message: 'Reminder: Friday meeting at 10 AM in Conference Room B.', time: '1 hour ago', unread: true, type: 'system' },
    { id: 103, title: 'Resource Uploaded', message: 'Your "Materials" upload for CS402 is now live.', time: '1 day ago', unread: false, type: 'resource' },
];


// --- Utility Components (Reused/Adapted) ---

const ChevronDown = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

// FixedDetail component adapted for faculty profile
const FixedDetail = ({ label, value, icon: Icon }) => (
    <div className="flex flex-col space-y-2 p-4 bg-green-50 rounded-xl shadow-sm">
        <label className="text-xs text-green-600 uppercase font-semibold flex items-center space-x-2">
            <Icon className="w-4 h-4" style={{ color: primaryColor }}/>
            <span>{label}</span>
        </label>
        <p className="text-base font-medium text-gray-800">{value}</p>
    </div>
);

// --- MODAL Component for Editing (Reused) ---
const EditModal = ({ title, value, onSave, onClose, type, fieldName }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleSave = () => {
        onSave(fieldName, inputValue);
        onClose();
    };

    const inputElement = (type) => {
        switch (type) {
            case 'color':
                return (
                    <input
                        type="color"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full h-10 cursor-pointer"
                    />
                );
            case 'url':
                return (
                    <input
                        type="url"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter image URL"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {inputElement(type)}
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 border rounded-xl hover:bg-gray-100">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 text-white rounded-xl" style={{ background: primaryColor }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Site Layout Components (Adapted for Faculty) ---

const Sidebar = ({ activeItem, setActiveItem }) => (
  <div className="w-64 p-6 flex flex-col justify-between shadow-xl rounded-2xl m-3 sticky top-3 h-[calc(100vh-1.5rem)]" style={{ backgroundColor: darkSidebarBg }}>
    <div>
      {/* Logo Area */}
      <div className="flex items-center space-x-3 mb-10 p-2">
        <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white">
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyUYcIKz03Y7_p6D1phD5BqSo1C5NjcM13fuI9_TpUGPl7CZ4LJvZ-7cqVwL1fr4px_ww&usqp=CAU"
    alt="BIT Logo"
    className="w-full h-full object-contain"
  />
</div>

        <h1 className="text-xl font-extrabold text-white">BIT</h1>
      </div>

      {/* Main Menu */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase text-gray-400 pl-3 pt-4 pb-2">Faculty Menu</p>
        {facultyNavItems.map((item) => (
          <a
            key={item.name}
            href={item.link}
            onClick={() => setActiveItem(item.name)}
            className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
              activeItem === item.name
                ? 'bg-[#536153] text-white font-semibold shadow-inner' // Active state: dark background, white text
                : 'text-gray-300 hover:bg-[#4a584a] hover:text-white' // Normal state: light gray text, hover background
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeItem === item.name ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
            <span>{item.name}</span>
          </a>
        ))}
      </div>
    </div>

    {/* Bottom Illustration/User Card */}
    <div className="flex flex-col items-center pt-8">
      <div className="w-full h-32 bg-[#4a584a] rounded-xl mb-4 flex items-center justify-center">
        <p className="text-sm text-gray-300 font-medium">Illustration Placeholder</p>
      </div>

      <p className="text-xs text-gray-400 mb-4">© 2025 All Rights Reserved</p>

      {/* Profile Card Mockup (Faculty) */}
      <div className="flex items-center space-x-3 w-full p-2 bg-[#4a584a] rounded-xl">
        <img
          src={facultyProfileData.avatarUrl}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">{facultyProfileData.firstName}. {facultyProfileData.lastName}</p>
          <p className="text-xs text-gray-300">Professor</p>
        </div>
        <Settings className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
      </div>
    </div>
  </div>
);

const Header = ({ currentSem, unreadCount, openNotificationModal }) => (
  <div className="flex justify-between items-center p-6 bg-white shadow-sm rounded-xl m-6 mt-3 mb-4">
    {/* Left: Search Bar & Current Sem/Year */}
    <div className="flex items-center space-x-6 w-1/3">
      <div className="flex items-center space-x-2 flex-1">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search students, assignments, or courses..."
          className="flex-1 outline-none text-gray-700 bg-transparent placeholder-gray-400"
        />
      </div>
      <div className="text-sm font-semibold text-green-600 whitespace-nowrap">
        {currentSem}
      </div>
    </div>

    {/* Right: Icons and Profile (Faculty) */}
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-4">
        <button className="relative p-1" onClick={openNotificationModal}>
            <Bell className="w-5 h-5 text-gray-500 hover:text-green-600 cursor-pointer" />
            {unreadCount > 0 && (
                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500 text-white text-xs font-bold transform translate-x-1 -translate-y-1">
                </span>
            )}
        </button>
        <Grid className="w-5 h-5 text-gray-500 hover:text-green-600 cursor-pointer" />
      </div>

      <div className="h-6 w-px bg-gray-200" />

      <div className="flex items-center space-x-2">
        <img
          src={facultyProfileData.avatarUrl}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-green-300"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">Dr. {facultyProfileData.lastName}</p>
          <p className="text-xs text-gray-500">Faculty</p>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>
    </div>
  </div>
);

const StatCard = ({ title, value, change, icon: Icon, bgColor }) => (
  <div className="bg-white p-5 rounded-xl shadow-md flex items-start space-x-4 flex-1 transition duration-300 hover:shadow-lg">
    <div className={`p-3 rounded-xl ${bgColor}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="2xl font-bold text-gray-800">{value}</h2>
      <p className="text-xs mt-1 font-medium text-gray-500">{change}</p>
    </div>
  </div>
);

// Class Performance Chart (Recharts Component)
const ClassPerformanceChart = ({ title, legendItems, primaryColor, secondaryColor, data }) => {
    
    // Custom tooltip content to display data neatly
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="p-3 bg-white/90 border border-gray-200 rounded-lg shadow-xl text-xs backdrop-blur-sm">
            <p className="font-bold text-gray-800 mb-1">{label} (Avg Score)</p>
            {payload.map((p, i) => (
                <p key={i} style={{ color: p.color }} className="font-medium">
                    {p.name}: {p.value}%
                </p>
            ))}
          </div>
        );
      }
      return null;
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <select className="text-xs text-gray-500 border rounded-md px-2 py-1">
                    <option>Fall 2025</option>
                    <option>Spring 2025</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={primaryColor} stopOpacity={0.5}/>
                            <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.5}/>
                            <stop offset="95%" stopColor={secondaryColor} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#a0aec0" tickLine={false} axisLine={false} />
                    <YAxis stroke="#a0aec0" domain={[0, 100]} tickFormatter={(value) => `${value}%`} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    
                    <Area 
                        type="monotone" 
                        dataKey={legendItems[0]} 
                        stroke={primaryColor} 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorPrimary)" 
                        dot={{ r: 4, fill: primaryColor, strokeWidth: 2 }}
                        activeDot={{ r: 6 }}
                    />
                    
                    <Area 
                        type="monotone" 
                        dataKey={legendItems[1]} 
                        stroke={secondaryColor} 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorSecondary)" 
                        dot={{ r: 4, fill: secondaryColor, strokeWidth: 2 }}
                        activeDot={{ r: 6 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};


// --- EDUSENSE TEACHER DASHBOARD COMPONENTS ---

const AIInterventionCard = ({ onApply, applied }) => (
    <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 h-full flex flex-col relative overflow-hidden shadow-sm">
        <div className="absolute -right-4 -top-4 bg-purple-200 rounded-full w-24 h-24 opacity-50 blur-xl"></div>
        <div className="flex items-center space-x-2 mb-4 relative z-10">
            <Bot className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-bold text-purple-900">EduSense AI Insights</h3>
        </div>
        
        {applied ? (
            <div className="flex flex-col items-center justify-center flex-1 space-y-3 relative z-10 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
                <p className="text-green-800 font-bold text-center text-lg">Interventions Sent!</p>
                <p className="text-sm text-green-600 text-center">Struggling students have automatically received simplified learning materials.</p>
            </div>
        ) : (
            <>
                <div className="space-y-4 relative z-10">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                        <p className="text-sm font-semibold text-gray-800">Vivek Menon</p>
                        <p className="text-xs text-gray-600 mt-1">Struggling with "Photosynthesis". He failed the checkpoint quiz 3 times.</p>
                        <div className="mt-2 text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded inline-block">
                            Suggestion: Assign 5-min simplified video recap
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                        <p className="text-sm font-semibold text-gray-800">Karan Mehra</p>
                        <p className="text-xs text-gray-600 mt-1">Declining scores in "Cellular Respiration".</p>
                        <div className="mt-2 text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded inline-block">
                            Suggestion: Check in during next class
                        </div>
                    </div>
                </div>
                <button onClick={onApply} className="mt-auto w-full py-3 bg-purple-600 text-white rounded-lg text-sm font-bold shadow hover:bg-purple-700 transition relative z-10 hover:-translate-y-0.5">
                    Apply All Interventions
                </button>
            </>
        )}
    </div>
);

const EduSenseClassPerformanceChart = ({ primaryColor, secondaryColor }) => {
    const data = [
        { name: 'Photosynthesis', avgScore: 82, passing: 90 },
        { name: 'Respiration', avgScore: 65, passing: 70 },
        { name: 'Genetics', avgScore: 88, passing: 95 },
        { name: 'Ecology', avgScore: 78, passing: 85 },
    ];
    return (
        <div className="bg-white p-6 rounded-xl shadow-md h-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Class-wide Performance by Topic</h3>
            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#a0aec0" tickLine={false} axisLine={false} />
                    <YAxis stroke="#a0aec0" domain={[0, 100]} tickFormatter={(value) => `${value}%`} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Legend />
                    <Bar dataKey="avgScore" name="Average Quiz Score" fill={primaryColor} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="passing" name="Pass Rate" fill={secondaryColor} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const EduSenseTeacherDashboard = ({ roster, primaryColor, secondaryColor }) => {
    const [interventionsApplied, setInterventionsApplied] = useState(false);

    // Add AI tracking info to roster
    const enhancedRoster = roster.map((student, i) => {
        let perf = '🟢 On Track';
        let color = 'bg-green-100 text-green-800';
        let topic = 'Photosynthesis';
        let trend = '+5%';
        if (i === 1) { 
            perf = interventionsApplied ? '🔵 Intervention Sent' : '🔴 Struggling'; 
            color = interventionsApplied ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'; 
            topic = 'Photosynthesis'; 
            trend = '-15%'; 
        }
        if (i === 3) { perf = '🟡 Average'; color = 'bg-yellow-100 text-yellow-800'; topic = 'Cellular Resp.'; trend = '-2%'; }
        
        return { ...student, performance: perf, badgeColor: color, topic, trend, lastActive: '2 hrs ago' };
    });

    const handleExportCSV = () => {
        const headers = ['Student Name', 'Current Topic', 'Last Active', 'Score Trend', 'AI Assessment'];
        const csvContent = enhancedRoster.map(s => 
            `"${s.name}","${s.topic}","${s.lastActive}","${s.trend}","${s.performance}"`
        );
        csvContent.unshift(headers.join(','));
        const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "EduSense_Class_Report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6 pt-0 space-y-6 animate-fadeIn">
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
            `}</style>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Active Students" value="42" change="All tracked by AI" icon={Users} bgColor="bg-blue-500/10 text-blue-500" />
                <StatCard title="Struggling Students" value={interventionsApplied ? "0" : "5"} change={interventionsApplied ? "All assisted" : "Requires intervention"} icon={Activity} bgColor={interventionsApplied ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"} />
                <StatCard title="Avg Class Score" value="78%" change="+3% this week" icon={TrendingUp} bgColor="bg-green-500/10 text-green-500" />
                <StatCard title="AI Interventions Sent" value={interventionsApplied ? "17" : "12"} change="In the last 7 days" icon={Bot} bgColor="bg-purple-500/10 text-purple-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <EduSenseClassPerformanceChart primaryColor={primaryColor} secondaryColor={secondaryColor} />
                </div>
                <div className="lg:col-span-1">
                    <AIInterventionCard applied={interventionsApplied} onApply={() => setInterventionsApplied(true)} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">AI Tracked Class Roster</h3>
                    <button onClick={handleExportCSV} className="text-sm font-medium text-green-600 hover:text-green-800 flex items-center hover:bg-green-50 px-3 py-2 rounded-lg transition"><ListChecks className="w-4 h-4 mr-1"/> Export Log</button>
                </div>
                <div className="min-w-full">
                    <div className="grid grid-cols-12 gap-4 py-3 px-4 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 rounded-t-xl">
                        <div className="col-span-3">Student Name</div>
                        <div className="col-span-2">Current Topic</div>
                        <div className="col-span-2">Last Active</div>
                        <div className="col-span-2 text-center">Score Trend</div>
                        <div className="col-span-3 text-right">AI Assessment</div>
                    </div>
                    
                    {enhancedRoster.map((student) => (
                        <div key={student.id} className="grid grid-cols-12 gap-4 items-center py-4 px-4 border-b hover:bg-gray-50 transition duration-150">
                            <div className="col-span-3 flex items-center space-x-3">
                                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full border border-gray-200" />
                                <span className="font-bold text-gray-800">{student.name}</span>
                            </div>
                            <div className="col-span-2 text-sm font-medium text-gray-700">{student.topic}</div>
                            <div className="col-span-2 text-sm text-gray-500">{student.lastActive}</div>
                            <div className={`col-span-2 text-center text-sm font-bold ${student.trend.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{student.trend}</div>
                            <div className="col-span-3 text-right">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${student.badgeColor}`}>
                                    {student.performance}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- FACULTY PROFILE PAGE ---

const FacultyProfile = ({ primaryColor }) => {
    const [profile, setProfile] = useState(facultyProfileData);
    const [isEditingContact, setIsEditingContact] = useState(false);
    const [editContactData, setEditContactData] = useState(facultyProfileData);
    const [modal, setModal] = useState(null); 

    const handleContactEdit = (field, value) => {
        setEditContactData(prev => ({ ...prev, [field]: value }));
    };

    const handleContactSave = () => {
        setProfile(editContactData);
        setIsEditingContact(false);
    };

    const handleModalSave = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const EditableField = ({ label, value, icon: Icon, fieldName, isEditing }) => (
        <div className="flex flex-col space-y-2 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
            <label className="text-xs text-green-600 uppercase font-semibold flex items-center space-x-2">
                <Icon className="w-4 h-4" style={{ color: primaryColor }}/>
                <span>{label}</span>
            </label>
            {isEditing ? (
                <input
                    type="text"
                    value={editContactData[fieldName]}
                    onChange={(e) => handleContactEdit(fieldName, e.target.value)}
                    className="text-base font-medium text-gray-800 border-b border-gray-300 focus:outline-none focus:border-green-500 transition duration-150"
                />
            ) : (
                <p className="text-base font-medium text-gray-800">{value}</p>
            )}
        </div>
    );

    const ProfileCardHeader = () => (
        <div 
            className="p-8 pb-16 relative rounded-t-2xl group cursor-pointer" 
            style={{ background: `linear-gradient(135deg, ${profile.bannerColor} 0%, ${profile.bannerColor}E0 100%)` }}
            onClick={() => setModal({ type: 'color', fieldName: 'bannerColor', value: profile.bannerColor, title: 'Edit Banner Color' })}
        >
            <div className="flex items-center space-x-3 absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                <Camera className="w-4 h-4" />
                <span className="text-sm font-medium">Edit Banner</span>
            </div>
            
            <div className="flex items-start space-x-6">
                
                <div 
                    className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg group/avatar mt-2"
                    onClick={(e) => {
                        e.stopPropagation(); 
                        setModal({ type: 'url', fieldName: 'avatarUrl', value: profile.avatarUrl, title: 'Edit Avatar URL' });
                    }}
                >
                    <img
                        src={profile.avatarUrl}
                        alt="Faculty Profile"
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = facultyProfileData.avatarUrl }}
                    />
                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition duration-300">
                        <Camera className="w-6 h-6 text-white" />
                    </div>
                </div>

                <div className="mt-4 space-y-2">
                    <h1 className="text-4xl font-extrabold text-white">
                        Dr. {profile.firstName} {profile.lastName}
                    </h1>
                    <p className="text-lg font-medium text-white opacity-90">
                        {profile.designation} | ID: {profile.facultyId}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6 pt-0 space-y-6 max-w-5xl mx-auto">
            {modal && (
                <EditModal
                    title={modal.title}
                    value={modal.value}
                    onSave={handleModalSave}
                    onClose={() => setModal(null)}
                    type={modal.type}
                    fieldName={modal.fieldName}
                />
            )}

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
                <ProfileCardHeader />

                <div className="bg-white p-6 pt-16 -mt-12 rounded-t-2xl">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Academic Record</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FixedDetail label="Date Joined" value={profile.joinDate} icon={Clock} />
                        <FixedDetail label="Department" value={profile.department} icon={GraduationCap} />
                        <FixedDetail label="Research Areas" value={profile.researchAreas.join(', ')} icon={BookOpen} />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex justify-between items-center mb-6 border-b pb-2">
                    <h3 className="text-xl font-semibold text-gray-800">Personal Contact Information</h3>
                    <button 
                        onClick={() => {
                            if (isEditingContact) { setEditContactData(profile); }
                            setIsEditingContact(!isEditingContact);
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-xl flex items-center space-x-2 transition duration-200 ${
                            isEditingContact 
                                ? 'bg-red-500 hover:bg-red-600 text-white' 
                                : 'text-green-600 border border-green-600 hover:bg-green-50'
                        }`}
                    >
                        {isEditingContact ? (
                            <>
                                <X className="w-4 h-4" />
                                <span>Cancel</span>
                            </>
                        ) : (
                            <>
                                <Edit3 className="w-4 h-4" />
                                <span>Edit Details</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <EditableField label="Email Address" value={profile.email} icon={Mail} fieldName="email" isEditing={isEditingContact} />
                    <EditableField label="Phone Number" value={profile.phone} icon={Phone} fieldName="phone" isEditing={isEditingContact} />
                    <EditableField label="Residential Address" value={profile.address} icon={MapPin} fieldName="address" isEditing={isEditingContact} />
                </div>

                {isEditingContact && (
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleContactSave}
                            className="px-6 py-3 text-white font-semibold rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition duration-200"
                            style={{ background: primaryColor }}
                        >
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- MONITOR STUDENTS PAGE ---
const MonitorStudentsPage = ({ roster, primaryColor }) => (
    <div className="p-6 pt-0 space-y-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">
            <div className="min-w-full">
                <div className="grid grid-cols-7 gap-4 py-3 px-4 border-b border-gray-200 text-sm font-semibold text-gray-600 bg-gray-50 rounded-t-xl">
                    <div className="col-span-2">Student Name</div>
                    <div>Program</div>
                    <div>Current GPA</div>
                    <div>Attendance (%)</div>
                    <div>Pending Tasks</div>
                    <div className="text-right">Action</div>
                </div>
                
                {roster.map((student) => (
                    <div key={student.id} className="grid grid-cols-7 gap-4 items-center py-4 px-4 border-b hover:bg-green-50 transition duration-150">
                        <div className="col-span-2 flex items-center space-x-3">
                            <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
                            <span className="font-medium text-gray-800">{student.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">{student.program}</div>
                        <div className={`text-sm font-bold ${student.gpa >= 4.0 ? 'text-green-600' : student.gpa >= 3.0 ? 'text-yellow-600' : 'text-red-600'}`}>{student.gpa}</div>
                        <div className="text-sm text-gray-600">{student.attendance}%</div>
                        <div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${student.pending > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {student.pending} Task{student.pending !== 1 && 's'}
                            </span>
                        </div>
                        <div className="text-right">
                            <button className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: primaryColor }}>
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="p-6 bg-green-50 rounded-xl border-2 border-dashed" style={{ borderColor: primaryColor }}>
            <h3 className="text-xl font-bold text-green-800 flex items-center space-x-2">
                <BarChart3 className="w-6 h-6" />
                <span>Bulk Student Data Export</span>
            </h3>
            <p className="text-gray-600 mt-2">Export comprehensive academic and activity data for all your students in CSV format.</p>
            <button className="mt-4 px-4 py-2 text-sm font-semibold rounded-xl text-white" style={{ backgroundColor: primaryColor }}>
                Export Data
            </button>
        </div>
    </div>
);

// --- ASSIGNMENTS PAGE ---

const AssignmentsPage = ({ assignments, primaryColor }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Modal for creating a new assignment
    const NewAssignmentModal = () => (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Create New Assignment</h3>
                <form className="space-y-4">
                    <input type="text" placeholder="Course Code (e.g., CS601)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500" required />
                    <input type="text" placeholder="Assignment Title" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500" required />
                    <input type="date" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500" required />
                    <textarea placeholder="Description" rows="3" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 border rounded-xl hover:bg-gray-100">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-white rounded-xl font-semibold" style={{ background: primaryColor }}>
                            <UploadCloud className="w-4 h-4 inline-block mr-1" />
                            Publish Assignment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <div className="p-6 pt-0 space-y-6">
            {isModalOpen && <NewAssignmentModal />}
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-xl text-white shadow-lg" 
                    style={{ background: primaryColor }}
                >
                    <Plus className="w-4 h-4" />
                    <span>New Assignment</span>
                </button>
            </div>
            
            {/* Assignments List */}
            <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4">
                {assignments.map((assignment) => {
                    const submissionPercentage = (assignment.submitted / assignment.total) * 100;
                    const gradingPercentage = (assignment.graded / assignment.submitted) * 100;

                    return (
                        <div key={assignment.id} className="p-5 border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-200">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: secondaryColor }}>
                                        {assignment.course}
                                    </span>
                                    <h2 className="text-xl font-bold text-gray-800 mt-2">{assignment.title}</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Deadline:</p>
                                    <p className="font-semibold text-red-500">{assignment.deadline}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6 text-center border-t border-b py-3 my-3">
                                <div>
                                    <p className="text-sm text-gray-500">Submissions</p>
                                    <p className="text-2xl font-bold text-gray-800">{assignment.submitted} / {assignment.total}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Graded</p>
                                    <p className="text-2xl font-bold text-green-600">{assignment.graded}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Pending Grade</p>
                                    <p className="text-2xl font-bold text-yellow-600">{assignment.submitted - assignment.graded}</p>
                                </div>
                            </div>
                            
                            {/* Progress Bars */}
                            <div className="space-y-3 pt-3">
                                <p className="text-sm text-gray-600">Submission Progress: {submissionPercentage.toFixed(0)}%</p>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="h-2 rounded-full" style={{ width: `${submissionPercentage}%`, backgroundColor: secondaryColor }}></div>
                                </div>

                                <p className="text-sm text-gray-600">Grading Progress: {gradingPercentage.toFixed(0)}%</p>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="h-2 rounded-full" style={{ width: `${gradingPercentage}%`, backgroundColor: primaryColor }}></div>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end space-x-3">
                                <button className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-300 hover:bg-gray-100">
                                    View Submissions
                                </button>
                                <button className="px-4 py-2 text-sm font-medium rounded-xl text-white" style={{ backgroundColor: primaryColor }}>
                                    Start Grading ({assignment.submitted - assignment.graded})
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- ATTENDANCE PAGE ---

const AttendancePage = ({ records, roster, primaryColor }) => {
    const [selectedCourse, setSelectedCourse] = useState(Object.keys(records)[0]);
    const [selectedDate, setSelectedDate] = useState(records[selectedCourse]?.date || new Date().toISOString().split('T')[0]);
    const [studentAttendance, setStudentAttendance] = useState(
        roster.map(student => ({ ...student, status: 'Present' }))
    );

    const toggleAttendance = (id) => {
        setStudentAttendance(studentAttendance.map(student => 
            student.id === id 
                ? { ...student, status: student.status === 'Present' ? 'Absent' : 'Present' }
                : student
        ));
    };

    const courseOptions = Object.keys(records);

    return (
        <div className="p-6 pt-0 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Record Today's Attendance</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
                        <select 
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            {courseOptions.map(course => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div className="flex items-end">
                        <button className="w-full p-3 text-white font-semibold rounded-xl" style={{ backgroundColor: primaryColor }}>
                            Load Roster
                        </button>
                    </div>
                </div>

                {/* Attendance Roster Table */}
                <div className="mt-8">
                    <div className="grid grid-cols-4 gap-4 py-2 px-4 border-b border-gray-200 text-sm font-semibold text-gray-600 bg-gray-50 rounded-t-xl">
                        <div className="col-span-2">Student Name</div>
                        <div>Status</div>
                        <div className="text-right">Action</div>
                    </div>
                    
                    {studentAttendance.map((student) => (
                        <div key={student.id} className="grid grid-cols-4 gap-4 items-center py-3 px-4 border-b hover:bg-gray-50 transition duration-100">
                            <div className="col-span-2 flex items-center space-x-3">
                                <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full" />
                                <span className="font-medium text-gray-800">{student.name}</span>
                            </div>
                            <div>
                                <span className={`text-sm font-semibold ${student.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>
                                    {student.status}
                                </span>
                            </div>
                            <div className="text-right">
                                <button 
                                    onClick={() => toggleAttendance(student.id)}
                                    className={`text-xs font-medium px-3 py-1 rounded-full transition duration-150 ${
                                        student.status === 'Present' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-green-100 text-green-800 hover:bg-green-200'
                                    }`}
                                >
                                    Mark {student.status === 'Present' ? 'Absent' : 'Present'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-6">
                    <button className="px-6 py-3 text-white font-semibold rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition duration-200" style={{ background: primaryColor }}>
                        <Save className="w-4 h-4" />
                        <span>Save Attendance Record</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MATERIALS PAGE (RENAMED FROM LEARNING) ---

const MaterialsPage = ({ primaryColor }) => {
    // Dummy Data for Materials
    const courseMaterials = [
        { id: 1, course: 'CS601: ML', title: 'Lecture Slides - Week 4', type: 'PDF', size: '15MB', link: '#ml-slides' },
        { id: 2, course: 'CS601: ML', title: 'Python Notebook: Data Preprocessing', type: 'Notebook', size: '2MB', link: '#ml-notebook' },
        { id: 3, course: 'CS402: OS', title: 'Video Lecture: Threads', type: 'Video', size: '30 mins', link: '#os-video' },
        { id: 4, course: 'CS402: OS', title: 'Previous Year Exam Paper', type: 'PDF', size: '1MB', link: '#os-exam' },
    ];

    return (
        <div className="p-6 pt-0 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Upload New Resource</h2>
                <div className="flex items-center justify-center p-8 border-2 border-dashed border-green-300 rounded-xl bg-green-50">
                    <div className="text-center space-y-3">
                        <UploadCloud className="w-10 h-10 text-green-600 mx-auto" />
                        <p className="text-lg font-medium text-gray-700">Drag & Drop files here, or click to browse</p>
                        <button className="px-6 py-2 text-sm font-semibold rounded-xl text-white" style={{ backgroundColor: primaryColor }}>
                            Browse Files
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Uploaded Resources</h2>
                <div className="space-y-4">
                    {courseMaterials.map((material) => (
                        <div key={material.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition duration-150">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 rounded-full bg-green-100">
                                    <BookOpen className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{material.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{material.course} | {material.type} ({material.size})</p>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <a href={material.link} className="text-sm font-medium text-green-600 hover:text-green-800">
                                    <Link className="w-4 h-4" />
                                </a>
                                <button className="text-sm font-medium text-red-600 hover:text-red-800">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Other Page Components (Notifications & Events - Reused/Simplified) ---

const NotificationModal = ({ notifications, onClose, primaryColor, markAllAsRead }) => {
    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-2xl font-bold text-gray-800">Notifications ({unreadCount} Unread)</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex justify-end mb-4">
                    <button 
                        onClick={markAllAsRead} 
                        className="text-sm font-medium text-green-600 hover:text-green-800 flex items-center space-x-1"
                        disabled={unreadCount === 0}
                    >
                        <ClipboardCheck className="w-4 h-4" />
                        <span>Mark all as read</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {notifications.length === 0 ? (
                        <div className="text-center p-12 text-gray-500">
                            <Bell className="w-10 h-10 mx-auto mb-4" />
                            <p className="font-medium">You're all caught up! No new notifications.</p>
                        </div>
                    ) : (
                        notifications.map((n) => (
                            <div
                                key={n.id}
                                className={`p-4 rounded-xl flex items-start space-x-4 border transition duration-150 ${
                                    n.unread ? 'bg-green-50 border-green-200 shadow-sm' : 'bg-white border-gray-100'
                                } hover:shadow-md cursor-pointer`}
                            >
                                <div className={`p-2 rounded-full ${n.unread ? 'bg-green-600' : 'bg-gray-300'}`}>
                                    {n.type === 'assignment' && <Code className="w-5 h-5 text-white" />}
                                    {n.type === 'system' && <Zap className="w-5 h-5 text-white" />}
                                    {n.type === 'resource' && <BookOpen className="w-5 h-5 text-white" />}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`text-base font-semibold ${n.unread ? 'text-gray-800' : 'text-gray-600'}`}>
                                        {n.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-0.5">{n.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                                </div>
                                {n.unread && (
                                    <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0 mt-1" title="Unread"></div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const NotificationPopup = ({ notification, onClose }) => {
    // Custom class for slide-in animation
    const animationClass = 'animate-slideInFromLeft';
    
    useEffect(() => {
        const timer = setTimeout(onClose, 5000); // Auto-hide after 5 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div 
            className={`fixed top-4 left-4 z-50 transition-all duration-500 ${animationClass}`}
        >
            <style jsx="true">{`
                @keyframes slideInFromLeft {
                    0% { transform: translateX(-100%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                .animate-slideInFromLeft {
                    animation: slideInFromLeft 0.5s ease-out forwards;
                }
            `}</style>
            <div className="bg-white p-4 rounded-xl shadow-xl border-l-4 w-80 flex items-center space-x-3 cursor-pointer" style={{ borderColor: primaryColor }} onClick={onClose}>
                <Bell className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                    <h4 className="text-sm font-semibold text-gray-800 truncate">{notification.title}</h4>
                    <p className="text-xs text-gray-600 truncate">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{notification.time}</p>
                </div>
                <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 flex-shrink-0">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

const EventsPage = ({ primaryColor }) => {
    // Simplified Events page for faculty
    const facultyEvents = [
        { title: 'Department Seminar: AI Ethics', date: 'Oct 15, 2025', location: 'Zoom', tag: 'Academic', color: 'bg-blue-500/10 text-blue-500' },
        { title: 'Faculty Grading Day', date: 'Oct 20, 2025', location: 'Office', tag: 'Admin', color: 'bg-yellow-500/10 text-yellow-500' },
        { title: 'Student Advisor Meeting', date: 'Oct 25, 2025', location: 'Cafe', tag: 'Meeting', color: 'bg-red-500/10 text-red-500' },
    ];

    return (
        <div className="p-6 pt-0 space-y-6">
            <p className="text-lg text-gray-600">Manage your college and departmental events, deadlines, and meetings.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facultyEvents.map((event, index) => (
                    <div key={index} className={`p-6 rounded-xl shadow-lg border-t-4 bg-white transition duration-300 hover:shadow-2xl`} 
                        style={{ borderColor: primaryColor }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${event.color}`}>{event.tag}</span>
                            <Calendar className="w-5 h-5 text-gray-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h2>
                        <div className="space-y-2 border-t pt-4 border-dashed border-gray-200">
                            <div className="flex items-center text-sm text-gray-700 space-x-2">
                                <Clock className="w-4 h-4 text-green-500" />
                                <span className="font-medium">{event.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-700 space-x-2">
                                <MapPin className="w-4 h-4 text-green-500" />
                                <span className="font-medium">{event.location}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-green-50 rounded-xl border-2 border-dashed" style={{ borderColor: primaryColor }}>
                <h3 className="text-xl font-bold text-green-800 flex items-center space-x-2">
                    <Plus className="w-6 h-6" />
                    <span>Create a New Event/Deadline</span>
                </h3>
                <p className="text-gray-600 mt-2">Add a new class deadline or schedule a student advising meeting.</p>
                <button className="mt-4 px-4 py-2 text-sm font-semibold rounded-xl text-white" style={{ backgroundColor: primaryColor }}>
                    Open Calendar
                </button>
            </div>
        </div>
    );
};


// --- Main App Component (Routing Logic Added) ---

const App = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [liveNotification, setLiveNotification] = useState(null);
  
  const facultyFullName = `Dr. ${facultyProfileData.firstName} ${facultyProfileData.lastName}`;

  const unreadCount = notifications.filter(n => n.unread).length;

  const pushNewNotification = useCallback((newNotif) => {
    setNotifications(prev => [newNotif, ...prev]);
    setLiveNotification(newNotif);
  }, []);

  const openNotificationModal = () => {
      setIsNotificationModalOpen(true);
      setActiveItem('Notifications'); 
  };
  
  const closeNotificationModal = () => {
      setIsNotificationModalOpen(false);
      if (activeItem === 'Notifications') {
          setActiveItem('Dashboard'); 
      }
  };

  const markAllAsRead = () => {
      setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  // Simulate a notification arrival shortly after load
  useEffect(() => {
    const timer = setTimeout(() => {
        pushNewNotification({ 
            id: Date.now(), 
            title: 'Action Required: Midterm Grades', 
            message: 'OS Midterm grades must be finalized by the end of the day.', 
            time: 'Just now', 
            unread: true, 
            type: 'system' 
        });
    }, 2000);
    return () => clearTimeout(timer);
  }, [pushNewNotification]);


  const renderContent = () => {
    switch (activeItem) {
        case 'Faculty Profile':
            return <FacultyProfile primaryColor={primaryColor} />;
        case 'Monitor Students':
            return <MonitorStudentsPage roster={studentRoster} primaryColor={primaryColor} />;
        case 'Assignments':
            return <AssignmentsPage assignments={assignmentsData} primaryColor={primaryColor} />;
        case 'Attendance':
            return <AttendancePage records={attendanceRecords} roster={studentRoster} primaryColor={primaryColor} />;
        case 'Events':
            return <EventsPage primaryColor={primaryColor} />;
        case 'Materials': 
            return <MaterialsPage primaryColor={primaryColor} />;
        case 'Notifications':
            if (!isNotificationModalOpen) {
                setIsNotificationModalOpen(true);
            }
            return <div className="p-6 pt-0 text-gray-500">
                <p className="text-xl">Notifications Window</p>
                <p className="mt-2">The full list of notifications is shown in the popup window. Close the popup to return.</p>
            </div>;
        case 'Dashboard':
        default:
            return (
                <EduSenseTeacherDashboard 
                    roster={studentRoster}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                />
            );
    }
  };

  const getPageTitle = () => {
    if (activeItem === 'Faculty Profile') return 'My Faculty Profile';
    if (activeItem === 'Monitor Students') return 'Student Monitoring Dashboard';
    if (activeItem === 'Assignments') return 'Assignment Submissions & Grading';
    if (activeItem === 'Attendance') return 'Class Attendance Recorder';
    if (activeItem === 'Events') return 'Events & Meeting Calendar';
    if (activeItem === 'Materials') return 'Course Materials Management';
    if (activeItem === 'Notifications') return 'Notifications Center';
    return 'Faculty Overview Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <style>{`
        /* Custom font import for better aesthetic */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 overflow-hidden pt-3 pr-3">
          {/* Header - Pass unread count and modal handler */}
          <Header 
            currentSem={facultyProfileData.currentSem} 
            unreadCount={unreadCount} 
            openNotificationModal={openNotificationModal}
          />

          {/* Dashboard Title and Actions */}
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">{getPageTitle()}</h1>
            <div className="flex space-x-3">
              <button 
                onClick={() => setActiveItem('Faculty Profile')}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-xl text-white shadow-lg" 
                style={{ background: primaryColor }}
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>
            </div>
          </div>

          {/* Live Notification Popup */}
          {liveNotification && (
              <NotificationPopup 
                  notification={liveNotification} 
                  onClose={() => setLiveNotification(null)}
              />
          )}

          {/* Dynamic Content */}
          {renderContent()}

          {/* Notification Modal (Always on top when open) */}
          {isNotificationModalOpen && (
              <NotificationModal 
                  notifications={notifications} 
                  onClose={closeNotificationModal}
                  primaryColor={primaryColor}
                  markAllAsRead={markAllAsRead}
              />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
