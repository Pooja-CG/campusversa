import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Award, Phone, Building, ChevronsRight, BookOpen, ShieldCheck, GraduationCap, Landmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Blink Hook ────────────────────────────────────────────────────────────────
const useBlink = (active) => {
    const [isBlinking, setIsBlinking] = useState(false);
    useEffect(() => {
        if (!active) return;
        let t;
        const blink = () => {
            setIsBlinking(true);
            setTimeout(() => {
                setIsBlinking(false);
                t = setTimeout(blink, Math.random() * 5000 + 2000);
            }, 150);
        };
        t = setTimeout(blink, Math.random() * 3000 + 1000);
        return () => clearTimeout(t);
    }, [active]);
    return isBlinking;
};

// ─── Characters ────────────────────────────────────────────────────────────────
const CuriousExplorer = ({ focusedField, mousePosition, index, interactionPhase }) => {
    const isPwd = focusedField === 'password' || focusedField === 'confirmPassword';
    const isBlinking = useBlink(!isPwd);
    const getTransform = () => {
        if (isPwd) return { eye: 'translateX(-10px)', head: 'rotate(-8deg)' };
        if (interactionPhase === 'glancing') {
            const t = { 0: { eye: 'translateX(10px)', head: 'rotate(8deg)' }, 1: { eye: 'translateX(10px)', head: 'rotate(8deg)' }, 2: { eye: 'translateX(0px)', head: 'rotate(0deg)' }, 3: { eye: 'translateX(-10px)', head: 'rotate(-8deg)' }, 4: { eye: 'translateX(-10px)', head: 'rotate(-8deg)' } };
            return t[index] || { eye: 'translateX(0px)', head: 'rotate(0deg)' };
        }
        if (interactionPhase === 'watchingInput') return { eye: 'translateX(15px)', head: 'rotate(10deg)' };
        const lx = ((mousePosition.x / window.innerWidth) - 0.5) * 25;
        return { eye: `translateX(${lx}px)`, head: `rotate(${((mousePosition.x / window.innerWidth) - 0.5) * 15}deg)` };
    };
    const tr = getTransform();
    const mouthPath = isPwd ? "M95 130 L 105 130" : "M95 125 Q 100 135, 105 125";
    const lidTr = isBlinking ? 'scaleY(0.1)' : 'scaleY(1)';
    return (
        <g transform="translate(0, 10)">
            <ellipse cx="100" cy="185" rx="55" ry="8" fill="#000" opacity="0.15" />
            <path d="M 60 185 C 40 100, 160 100, 140 185 Z" fill="#FBBF24" stroke="#92400E" strokeWidth="4" />
            <g style={{ transition: 'transform 0.25s ease', transform: tr.head, transformOrigin: '50% 100%' }}>
                <path d="M 70 140 C 50 80, 150 80, 130 140 Z" fill="#FCD34D" stroke="#92400E" strokeWidth="4" />
                <g style={{ transition: 'transform 0.25s ease', transform: tr.eye }}>
                    <circle cx="85" cy="110" r="18" fill="white" stroke="#92400E" strokeWidth="2.5" />
                    <circle cx="115" cy="110" r="18" fill="white" stroke="#92400E" strokeWidth="2.5" />
                    <g style={{ transform: lidTr, transformOrigin: 'center', transition: 'transform 0.1s ease-in-out' }}>
                        <circle cx="88" cy="112" r="8" fill="#92400E" />
                        <circle cx="118" cy="112" r="8" fill="#92400E" />
                    </g>
                    {isPwd && <><path d="M 70 95 L 95 98" stroke="#92400E" strokeWidth="4" strokeLinecap="round" /><path d="M 130 95 L 105 98" stroke="#92400E" strokeWidth="4" strokeLinecap="round" /></>}
                </g>
                <path d={mouthPath} stroke="#92400E" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
            <path d="M50 50 L 55 30 L 60 50 Z" fill="#FCD34D" stroke="#92400E" strokeWidth="3" transform="translate(45, 20) rotate(15)" />
        </g>
    );
};

const ShySprout = ({ focusedField, mousePosition, index, interactionPhase }) => {
    const isPwd = focusedField === 'password' || focusedField === 'confirmPassword';
    const isBlinking = useBlink(!isPwd);
    const getEyeTr = () => {
        if (isPwd) return 'translateX(-12px)';
        if (interactionPhase === 'glancing') { const t = { 0: 'translateX(12px)', 1: 'translateX(12px)', 2: 'translateX(0px)', 3: 'translateX(-12px)', 4: 'translateX(-12px)' }; return t[index] || 'translateX(0px)'; }
        if (interactionPhase === 'watchingInput') return 'translateX(15px)';
        return `translateX(${((mousePosition.x / window.innerWidth) - 0.5) * 25}px)`;
    };
    const mouthPath = isPwd ? "M 100 155 C 105 150, 110 150, 115 155" : "M 100 150 C 105 155, 110 155, 115 150";
    const lidTr = isBlinking ? 'scaleY(0.1)' : 'scaleY(1)';
    return (
        <g>
            <ellipse cx="100" cy="180" rx="60" ry="10" fill="#000" opacity="0.1" />
            <path d="M 50 180 C 50 100, 150 100, 150 180 Z" fill="#A7F3D0" stroke="#047857" strokeWidth="4" />
            <g style={{ transition: 'transform 0.3s ease-in-out', transform: !!focusedField ? 'rotate(15deg)' : 'rotate(0deg)', transformOrigin: 'bottom center' }}>
                <path d="M 90 60 C 70 40, 110 20, 110 60 C 120 30, 130 50, 110 60 Z" fill="#34D399" stroke="#047857" strokeWidth="4" />
            </g>
            <g style={{ transition: 'transform 0.25s ease', transform: getEyeTr() }}>
                <g style={{ transform: lidTr, transformOrigin: 'center', transition: 'transform 0.1s ease-in-out' }}>
                    <circle cx="90" cy="130" r="10" fill="#047857" />
                    <circle cx="120" cy="130" r="10" fill="#047857" />
                </g>
            </g>
            {isPwd && <path d="M 80 120 L 100 125 M 130 120 L 110 125" stroke="#047857" strokeWidth="3" fill="none" strokeLinecap="round" />}
            <path d={mouthPath} stroke="#047857" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
    );
};

const CosmicCreature = ({ focusedField, mousePosition, index, interactionPhase }) => {
    const isPwd = focusedField === 'password' || focusedField === 'confirmPassword';
    const isBlinking = useBlink(!isPwd);
    const getEyeTr = () => {
        if (isPwd) return 'translateX(-10px)';
        if (interactionPhase === 'glancing') { const t = { 0: 'translateX(10px)', 1: 'translateX(10px)', 2: 'translateX(0px)', 3: 'translateX(-10px)', 4: 'translateX(-10px)' }; return t[index] || 'translateX(0px)'; }
        if (interactionPhase === 'watchingInput') return 'translateX(15px)';
        return `translateX(${((mousePosition.x / window.innerWidth) - 0.5) * 20}px)`;
    };
    const lidTr = isBlinking ? 'scaleY(0.1)' : 'scaleY(1)';
    return (
        <g style={{ transition: 'transform 0.3s ease', transform: !!focusedField ? 'scale(1.02, 0.98)' : 'scale(1)', transformOrigin: 'bottom center' }}>
            <ellipse cx="100" cy="180" rx="70" ry="10" fill="#000" opacity="0.2" />
            <path d="M 50 180 C 20 100, 180 100, 150 180 Z" fill="#4C1D95" stroke="#2E1065" strokeWidth="4" />
            <circle cx="70" cy="150" r="4" fill="#FDE047" /><circle cx="130" cy="140" r="6" fill="#FDE047" /><circle cx="100" cy="110" r="3" fill="#FDE047" />
            <g style={{ transition: 'transform 0.25s ease', transform: getEyeTr() }}>
                <circle cx="80" cy="125" r="22" fill="#F5F3FF" stroke="#2E1065" strokeWidth="2" /><circle cx="120" cy="125" r="22" fill="#F5F3FF" stroke="#2E1065" strokeWidth="2" />
                <g style={{ transform: lidTr, transformOrigin: 'center', transition: 'transform 0.1s ease-in-out' }}>
                    <circle cx="80" cy="125" r="12" fill="#2E1065" /><circle cx="120" cy="125" r="12" fill="#2E1065" />
                </g>
            </g>
            <g style={{ transition: 'opacity 0.3s ease', opacity: isPwd ? 1 : 0 }}>
                <line x1="65" y1="105" x2="95" y2="100" stroke="#F5F3FF" strokeWidth="4" strokeLinecap="round" />
                <line x1="105" y1="100" x2="135" y2="105" stroke="#F5F3FF" strokeWidth="4" strokeLinecap="round" />
            </g>
        </g>
    );
};

const WobblyPudding = ({ focusedField, mousePosition, index, interactionPhase }) => {
    const isPwd = focusedField === 'password' || focusedField === 'confirmPassword';
    const isBlinking = useBlink(!isPwd);
    const getTransforms = () => {
        if (isPwd) return { body: 'translateX(0) rotate(0deg)', eye: 'translateX(-10px)' };
        if (interactionPhase === 'glancing') { const t = { 0: { body: 'translateX(5px) rotate(3deg)', eye: 'translateX(10px)' }, 1: { body: 'translateX(5px) rotate(3deg)', eye: 'translateX(10px)' }, 2: { body: 'translateX(0) rotate(0deg)', eye: 'translateX(0px)' }, 3: { body: 'translateX(-5px) rotate(-3deg)', eye: 'translateX(-10px)' }, 4: { body: 'translateX(-5px) rotate(-3deg)', eye: 'translateX(-10px)' } }; return t[index] || { body: 'translateX(0) rotate(0deg)', eye: 'translateX(0px)' }; }
        if (interactionPhase === 'watchingInput') return { body: 'translateX(5px) rotate(3deg)', eye: 'translateX(15px)' };
        const lx = ((mousePosition.x / window.innerWidth) - 0.5) * 20;
        return { body: `translateX(0) rotate(${((mousePosition.x / window.innerWidth) - 0.5) * 8}deg)`, eye: `translateX(${lx}px)` };
    };
    const tr = getTransforms();
    const mouthPath = isPwd ? "M 95 155 Q 100 145, 105 155" : "M 95 150 Q 100 155, 105 150";
    const lidTr = isBlinking ? 'scaleY(0.1)' : 'scaleY(1)';
    return (
        <g style={{ transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', transform: tr.body, transformOrigin: 'bottom center' }}>
            <ellipse cx="100" cy="180" rx="70" ry="10" fill="#000" opacity="0.1" />
            <path d="M 50 180 C 50 100, 150 100, 150 180 Z" fill="#F9A8D4" stroke="#9D174D" strokeWidth="4" />
            <g style={{ transition: 'transform 0.25s ease', transform: tr.eye }}>
                <g style={{ transform: lidTr, transformOrigin: 'center', transition: 'transform 0.1s ease-in-out' }}>
                    <circle cx="80" cy="125" r="10" fill="#9D174D" /><circle cx="120" cy="125" r="10" fill="#9D174D" />
                </g>
                {isPwd && <path d="M 70 110 L 90 115 M 130 110 L 110 115" stroke="#9D174D" strokeWidth="3" fill="none" strokeLinecap="round" />}
            </g>
            <path d={mouthPath} stroke="#9D174D" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
    );
};

const SparkleBot = ({ focusedField, mousePosition, index, interactionPhase }) => {
    const isPwd = focusedField === 'password' || focusedField === 'confirmPassword';
    const isBlinking = useBlink(!isPwd);
    const getTransforms = () => {
        if (isPwd) return { eye: 'translateX(-10px)', head: 'rotate(0deg)' };
        if (interactionPhase === 'glancing') { const t = { 0: { eye: 'translateX(10px)', head: 'rotate(10deg)' }, 1: { eye: 'translateX(10px)', head: 'rotate(10deg)' }, 2: { eye: 'translateX(0px)', head: 'rotate(0deg)' }, 3: { eye: 'translateX(-10px)', head: 'rotate(-10deg)' }, 4: { eye: 'translateX(-10px)', head: 'rotate(-10deg)' } }; return t[index] || { eye: 'translateX(0px)', head: 'rotate(0deg)' }; }
        if (interactionPhase === 'watchingInput') return { eye: 'translateX(15px)', head: 'rotate(10deg)' };
        const lx = ((mousePosition.x / window.innerWidth) - 0.5) * 20;
        return { eye: `translateX(${lx}px)`, head: `rotate(${((mousePosition.x / window.innerWidth) - 0.5) * 15}deg)` };
    };
    const tr = getTransforms();
    const lidTr = isBlinking ? 'scaleY(0.1)' : 'scaleY(1)';
    return (
        <g>
            <ellipse cx="100" cy="180" rx="65" ry="10" fill="#000" opacity="0.15" />
            <path d="M 60 180 A 40 80 0 0 1 140 180 Z" fill="#E0E7FF" stroke="#4338CA" strokeWidth="4" />
            <g style={{ transition: 'transform 0.25s ease', transform: tr.head, transformOrigin: '50% 90%' }}>
                <rect x="70" y="70" width="60" height="60" rx="15" fill="#C7D2FE" stroke="#4338CA" strokeWidth="4" />
                <g style={{ transition: 'transform 0.25s ease', transform: tr.eye }}>
                    <g style={{ transform: lidTr, transformOrigin: 'center', transition: 'transform 0.1s ease-in-out' }}>
                        <rect x="80" y="95" width="10" height="20" rx="3" fill="#4338CA" /><rect x="110" y="95" width="10" height="20" rx="3" fill="#4338CA" />
                    </g>
                    {isPwd && <><path d="M 75 90 L 95 85" stroke="#4338CA" strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M 125 90 L 105 85" stroke="#4338CA" strokeWidth="4" fill="none" strokeLinecap="round" /></>}
                </g>
            </g>
        </g>
    );
};

const characters = [CuriousExplorer, ShySprout, CosmicCreature, WobblyPudding, SparkleBot];

// ─── Input Field ───────────────────────────────────────────────────────────────
const InputField = ({ id, type, placeholder, icon, value, onChange, onFocus, onBlur }) => (
    <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            {React.cloneElement(icon, { className: 'text-gray-400', size: 18 })}
        </div>
        <input
            id={id} name={id} type={type} placeholder={placeholder} value={value}
            onChange={onChange} onFocus={() => onFocus(id)} onBlur={onBlur}
            className="w-full pl-11 pr-4 py-3 text-white bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 focus:border-cyan-500/50 transition placeholder:text-gray-500 text-sm"
            required
        />
    </div>
);

// ─── User Type Config ──────────────────────────────────────────────────────────
const USER_TYPES = {
    student: {
        label: "Student",
        icon: GraduationCap,
        color: "from-cyan-500 to-blue-500",
        accent: "cyan",
        redirectLogin: "/dashboard",
        redirectSignup: "/dashboard",
        signupTitle: "Create Student Account",
        signupFields: [
            { id: 'name', type: 'text', placeholder: 'Full Name', iconKey: 'user' },
            { id: 'usn', type: 'text', placeholder: 'USN (University Seat Number)', iconKey: 'idCard' },
            { id: 'email', type: 'email', placeholder: 'Student Email', iconKey: 'mail' },
            { id: 'mobile', type: 'tel', placeholder: 'Mobile Number', iconKey: 'phone' },
            { id: 'password', type: 'password', placeholder: 'Create Password', iconKey: 'lock' },
        ],
        contextMessages: {
            name: "Nice to meet you! What's your name?",
            usn: "Enter your University Seat Number.",
            email: "Your student email address.",
            mobile: "Mobile number for notifications.",
            password: "Create a strong password. I'll look away!",
        }
    },
    teacher: {
        label: "Teacher",
        icon: BookOpen,
        color: "from-violet-500 to-purple-600",
        accent: "violet",
        redirectLogin: "/teacher-dashboard",
        redirectSignup: "/teacher-dashboard",
        signupTitle: "Create Teacher Account",
        signupFields: [
            { id: 'name', type: 'text', placeholder: 'Full Name', iconKey: 'user' },
            { id: 'employeeId', type: 'text', placeholder: 'Employee / Faculty ID', iconKey: 'idCard' },
            { id: 'email', type: 'email', placeholder: 'Faculty Email', iconKey: 'mail' },
            { id: 'department', type: 'text', placeholder: 'Department', iconKey: 'building' },
            { id: 'password', type: 'password', placeholder: 'Create Password', iconKey: 'lock' },
        ],
        contextMessages: {
            name: "Welcome, educator! What's your name?",
            employeeId: "Enter your faculty or employee ID.",
            email: "Your official faculty email.",
            department: "Which department are you in?",
            password: "Set a strong password — I'll close my eyes!",
        }
    },
    institute: {
        label: "Institute",
        icon: Landmark,
        color: "from-emerald-500 to-teal-500",
        accent: "emerald",
        redirectLogin: "/institute/dashboard",
        redirectSignup: "/institute/dashboard",
        signupTitle: "Register Your Institute",
        signupFields: [
            { id: 'name', type: 'text', placeholder: 'Institute Name', iconKey: 'building' },
            { id: 'aisheCode', type: 'text', placeholder: 'AISHE Code', iconKey: 'idCard' },
            { id: 'email', type: 'email', placeholder: 'Official Email', iconKey: 'mail' },
            { id: 'phone', type: 'tel', placeholder: 'Contact Phone', iconKey: 'phone' },
            { id: 'password', type: 'password', placeholder: 'Create Password', iconKey: 'lock' },
        ],
        contextMessages: {
            name: "What's the name of your institute?",
            aisheCode: "Enter the AISHE registration code.",
            email: "Your institute's official email.",
            phone: "Primary contact number.",
            password: "Set a strong password for your account.",
        }
    },
    admin: {
        label: "Admin",
        icon: ShieldCheck,
        color: "from-rose-500 to-orange-500",
        accent: "rose",
        redirectLogin: "/admin-dashboard",   // ✅ FIXED
        redirectSignup: "/admin-dashboard",  // ✅ FIXED
        signupTitle: "Admin Registration",
        signupFields: [
            { id: 'name', type: 'text', placeholder: 'Full Name', iconKey: 'user' },
            { id: 'adminCode', type: 'text', placeholder: 'Admin Authorization Code', iconKey: 'idCard' },
            { id: 'email', type: 'email', placeholder: 'Admin Email', iconKey: 'mail' },
            { id: 'password', type: 'password', placeholder: 'Create Password', iconKey: 'lock' },
        ],
        contextMessages: {
            name: "Admin registration. What's your name?",
            adminCode: "Enter your authorization code.",
            email: "Your admin email address.",
            password: "Set a highly secure password.",
        }
    }
};

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Auth() {
    const [authMode, setAuthMode] = useState('login');
    const [userType, setUserType] = useState('student');
    const [focusedField, setFocusedField] = useState(null);
    const [interactionPhase, setInteractionPhase] = useState('idle');
    const [characterLineup, setCharacterLineup] = useState([]);
    const [guidanceMessage, setGuidanceMessage] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [formData, setFormData] = useState({
        name: '', usn: '', email: '', mobile: '', password: '',
        employeeId: '', department: '', aisheCode: '', phone: '',
        adminCode: '', confirmPassword: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const config = USER_TYPES[userType];

    useEffect(() => {
        const shuffled = [...characters].sort(() => 0.5 - Math.random());
        setCharacterLineup(shuffled.slice(0, 5));
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        if (focusedField) {
            setInteractionPhase('glancing');
            const t = setTimeout(() => setInteractionPhase('watchingInput'), 800);
            return () => clearTimeout(t);
        } else {
            setInteractionPhase('idle');
        }
    }, [focusedField]);

    useEffect(() => {
        if (!focusedField) {
            setGuidanceMessage(
                authMode === 'login'
                    ? `Welcome back, ${config.label}! Let's sign you in.`
                    : `Let's set up your ${config.label} account!`
            );
            return;
        }
        const msgs = config.contextMessages;
        setGuidanceMessage(msgs[focusedField] || "Just a few more details...");
    }, [focusedField, authMode, userType]);

    const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleFocus = (id) => setFocusedField(id);
    const handleBlur = () => setFocusedField(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 600));
        // Save role so Sidebar can read it
        localStorage.setItem('role', userType);
        const path = authMode === 'login' ? config.redirectLogin : config.redirectSignup;
        navigate(path);
    };

    const icons = {
        user: <User size={18} />, mail: <Mail size={18} />, lock: <Lock size={18} />,
        idCard: <Award size={18} />, phone: <Phone size={18} />, building: <Building size={18} />,
    };
    const commonProps = { onChange: handleInputChange, onFocus: handleFocus, onBlur: handleBlur };

    const accentColors = {
        cyan: 'text-cyan-400 border-cyan-400',
        violet: 'text-violet-400 border-violet-400',
        emerald: 'text-emerald-400 border-emerald-400',
        rose: 'text-rose-400 border-rose-400',
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#03030a] via-[#080818] to-[#0f0f2a] flex items-center justify-center p-4 font-sans text-white">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_1fr] bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">

                {/* ── Left: Characters Panel ── */}
                <div className="hidden lg:flex flex-col items-center justify-end p-8 text-center relative overflow-hidden min-h-[600px]">
                    <div className={`absolute inset-0 bg-gradient-to-b ${config.color} opacity-5 pointer-events-none`} />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-10 bg-white pointer-events-none" />

                    <div className="absolute top-8 left-0 right-0 px-8 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${config.color}`}>
                                {React.createElement(config.icon, { size: 20, className: 'text-white' })}
                            </div>
                            <span className="font-bold text-lg tracking-tight">CampusVersa</span>
                        </div>
                        <p className="text-sm text-gray-400 max-w-xs mx-auto">Your academic journey, managed in one place.</p>
                    </div>

                    <div
                        className="absolute z-30 w-56 transition-all duration-300 pointer-events-none"
                        style={{
                            top: '38%', left: '50%',
                            opacity: guidanceMessage ? 1 : 0,
                            transform: `translate(-50%, ${guidanceMessage ? '0' : '8px'})`,
                        }}
                    >
                        <div className="bg-gray-900 border border-white/15 rounded-xl py-2.5 px-4 shadow-xl relative">
                            <p className="text-sm font-medium text-gray-100">{guidanceMessage}</p>
                            <div className="absolute left-1/2 -bottom-2 w-4 h-4 bg-gray-900 border-r border-b border-white/15 transform -translate-x-1/2 rotate-45" />
                        </div>
                    </div>

                    <div className="flex items-end justify-center w-full -space-x-24 mt-28 pb-4">
                        {characterLineup.map((CharComponent, i) => {
                            let sz = "w-40 h-40";
                            let style = {};
                            if (i === 2) { sz = "w-52 h-52"; style = { transform: 'translateY(-2rem) scale(1.1)', zIndex: 20 }; }
                            else if (i === 1 || i === 3) { sz = "w-44 h-44"; style = { zIndex: 10 }; }
                            return (
                                <div key={i} className={`relative ${sz}`} style={style}>
                                    <svg viewBox="0 0 200 200" className="w-full h-full">
                                        <CharComponent focusedField={focusedField} mousePosition={mousePosition} index={i} interactionPhase={interactionPhase} />
                                    </svg>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Right: Form Panel ── */}
                <div className="p-8 md:p-10 border-l border-white/5 overflow-y-auto max-h-screen">

                    <div className="flex bg-white/5 rounded-xl p-1 border border-white/10 mb-6">
                        {['login', 'signup'].map(m => (
                            <button key={m} onClick={() => setAuthMode(m)}
                                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${authMode === m ? `bg-gradient-to-r ${config.color} text-white shadow-md` : 'text-gray-400 hover:text-gray-200'}`}>
                                {m}
                            </button>
                        ))}
                    </div>

                    <div className="mb-6">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-medium">I am a</p>
                        <div className="grid grid-cols-4 gap-2">
                            {Object.entries(USER_TYPES).map(([key, cfg]) => {
                                const Icon = cfg.icon;
                                const isActive = userType === key;
                                return (
                                    <button key={key} onClick={() => setUserType(key)}
                                        className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-semibold transition-all duration-200 ${isActive
                                            ? `bg-gradient-to-b ${cfg.color} border-transparent text-white shadow-lg`
                                            : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200 bg-white/[0.02]'
                                            }`}>
                                        <Icon size={18} />
                                        {cfg.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-5 tracking-tight">
                            {authMode === 'login' ? `${config.label} Login` : config.signupTitle}
                        </h2>

                        {authMode === 'login' ? (
                            <>
                                <InputField id="email" type="email" placeholder="Email Address" icon={icons.mail} value={formData.email} {...commonProps} />
                                <InputField id="password" type="password" placeholder="Password" icon={icons.lock} value={formData.password} {...commonProps} />
                                <div className="flex justify-end mb-4">
                                    <button type="button" className={`text-xs font-medium ${accentColors[config.accent].split(' ')[0]} hover:underline`}>
                                        Forgot password?
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {config.signupFields.map(f => (
                                    <InputField key={f.id} id={f.id} type={f.type} placeholder={f.placeholder} icon={icons[f.iconKey]} value={formData[f.id] || ''} {...commonProps} />
                                ))}
                            </>
                        )}

                        <button type="submit" disabled={isSubmitting}
                            className={`w-full bg-gradient-to-r ${config.color} text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 hover:shadow-lg transition-all duration-300 mt-2 flex items-center justify-center gap-2 text-sm disabled:opacity-60`}>
                            {isSubmitting ? (
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                            ) : (
                                <>{authMode === 'login' ? `Sign in as ${config.label}` : 'Create Account'} <ChevronsRight size={18} /></>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        {authMode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
                        <button onClick={() => setAuthMode(authMode === 'signup' ? 'login' : 'signup')}
                            className={`font-semibold ${accentColors[config.accent].split(' ')[0]} hover:underline`}>
                            {authMode === 'signup' ? 'Login' : 'Sign Up'}
                        </button>
                    </p>

                    <p className="mt-4 text-center text-xs text-gray-600">
                        Redirects to <span className="font-mono text-gray-500">{authMode === 'login' ? config.redirectLogin : config.redirectSignup}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
