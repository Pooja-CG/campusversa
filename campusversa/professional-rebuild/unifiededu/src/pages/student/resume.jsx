<<<<<<< HEAD
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';

// The 'jsPDF' and 'html2canvas' libraries will be loaded dynamically from a CDN.

// Initial Data for the resume.
const initialData = {
    fullName: "Your Name",
    title: "Your Title",
    location: "City, State",
    phone: "555-555-5555",
    email: "your.email@example.com",
    website: "yourportfolio.com",
    profiles: [
        { id: 1, network: 'LinkedIn', username: 'your-profile', url: 'https://linkedin.com/in/your-profile' }
    ],
    summary: "A brief professional summary about your skills, experience, and career goals. Tailor this to the job you are applying for.",
    experience: [
        { id: 1, company: 'Tech Solutions Inc.', jobTitle: 'Frontend Developer', startDate: 'Jan 2020', endDate: 'Present', location: 'San Francisco, CA', companyWebsite: 'techsolutions.com', description: 'Developed and maintained responsive web applications using React.\nCollaborated with UI/UX designers to implement modern user interfaces.' }
    ],
    education: [
        { id: 1, institution: 'University of Technology', degree: 'B.S. in Computer Science', startDate: 'Sep 2016', endDate: 'May 2020', location: 'Techville, USA' }
    ],
    projects: [
        { id: 1, name: 'Personal Portfolio Website', role: 'Developer', description: 'Designed and built a personal portfolio to showcase my projects and skills.' }
    ],
    skills: [
        { id: 1, category: 'Programming Languages', level: 'Expert', list: 'JavaScript, HTML, CSS' }
    ],
    certifications: [
        { id: 1, name: 'React - The Complete Guide', org: 'Udemy', year: '2020' }
    ],
    languages: [
        { id: 1, name: 'English', proficiency: 'Native' }
    ],
    references: "Available upon request"
};

// Generic Section Component for the resume preview
const Section = ({ title, children }) => (
    <section className="mb-4">
        <h2 className="text-sm font-bold uppercase pb-1 mb-2" style={{ color: '#262626', borderBottom: '2px solid #d4d4d4' }}>{title}</h2>
        <div style={{ color: '#404040' }}>{children}</div>
    </section>
);

// Main App Component
function App() {
    const [data, setData] = useState(initialData);
    const [isGenerating, setIsGenerating] = useState(false);
    const [pdfLibrariesLoaded, setPdfLibrariesLoaded] = useState(false);
    const [scale, setScale] = useState(1);
    
    const resumeRef = useRef();
    const resumeContainerRef = useRef();

    // Load jsPDF and html2canvas dynamically
    useEffect(() => {
        if (window.jspdf && window.html2canvas) {
            setPdfLibrariesLoaded(true);
            return;
        }

        const jspdfScript = document.createElement('script');
        jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        jspdfScript.async = true;

        const html2canvasScript = document.createElement('script');
        html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        html2canvasScript.async = true;

        const loadScripts = async () => {
            const jspdfPromise = new Promise(resolve => {
                jspdfScript.onload = resolve;
            });
            const html2canvasPromise = new Promise(resolve => {
                html2canvasScript.onload = resolve;
            });

            document.head.appendChild(jspdfScript);
            document.head.appendChild(html2canvasScript);

            await Promise.all([jspdfPromise, html2canvasPromise]);
            setPdfLibrariesLoaded(true);
        };

        loadScripts();
    }, []);

    // Hook to dynamically scale the resume preview to fit its container
    useLayoutEffect(() => {
        const calculateScale = () => {
            if (resumeContainerRef.current && resumeRef.current) {
                const containerWidth = resumeContainerRef.current.offsetWidth;
                const resumeWidth = resumeRef.current.offsetWidth;
                
                if (containerWidth < resumeWidth) {
                    setScale(containerWidth / resumeWidth);
                } else {
                    setScale(1);
                }
            }
        };

        calculateScale();
        window.addEventListener('resize', calculateScale);
        return () => window.removeEventListener('resize', calculateScale);
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleNestedChange = (section, index, e) => {
        const { name, value } = e.target;
        const updatedSection = [...data[section]];
        updatedSection[index] = { ...updatedSection[index], [name]: value };
        setData(prev => ({ ...prev, [section]: updatedSection }));
    };

    const addSectionItem = (section) => {
        const sectionTemplate = {
            profiles: { network: '', username: '', url: '' },
            experience: { company: '', jobTitle: '', startDate: '', endDate: '', location: '', companyWebsite: '', description: '' },
            education: { institution: '', degree: '', startDate: '', endDate: '', location: '' },
            projects: { name: '', role: '', description: '' },
            skills: { category: '', level: '', list: '' },
            certifications: { name: '', org: '', year: '' },
            languages: { name: '', proficiency: '' },
        };
        const newItem = { id: Date.now(), ...sectionTemplate[section]};
        setData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
    };

    const removeSectionItem = (section, index) => {
        const updatedSection = data[section].filter((_, i) => i !== index);
        setData(prev => ({ ...prev, [section]: updatedSection }));
    };

    const handlePdfGeneration = async () => {
        if (!pdfLibrariesLoaded) {
            alert('PDF generation libraries are still loading. Please wait a moment and try again.');
            return;
        }

        setIsGenerating(true);
        const resumeElement = resumeRef.current;
        const originalTransform = resumeElement.style.transform;
        
        // Ensure full-resolution capture by temporarily scaling to 1
        resumeElement.style.transform = 'scale(1)';

        try {
            const canvas = await window.html2canvas(resumeElement, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });
            
            const imgData = canvas.toDataURL('image/png');
            // A4 page size in mm: 210 x 297
            const pdf = new window.jspdf.jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            const filename = data.fullName ? `${data.fullName.replace(/\s+/g, '_')}_resume.pdf` : 'resume.pdf';
            pdf.save(filename);

        } catch (err) {
            console.error("Oops, something went wrong!", err);
            alert("An error occurred while generating the PDF. Please check the console for details.");
        } finally {
            // Restore original transform and set loading state to false
            resumeElement.style.transform = originalTransform;
            setIsGenerating(false);
        }
    };
    

    return (
        <div className="min-h-screen p-4 sm:p-8 font-sans" style={{ backgroundColor: '#f5f5f5' }}>
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold" style={{ color: '#262626' }}>React Resume Generator</h1>
                    <p className="text-lg mt-2" style={{ color: '#525252' }}>Fill in your details and download your resume as a PDF!</p>
                </header>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Form Section */}
                    <div className="bg-white p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-semibold mb-6 border-b pb-2" style={{ color: '#404040' }}>Your Information</h2>
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium mt-4" style={{ color: '#525252' }}>Personal Details</h3>
                            <input type="text" name="fullName" value={data.fullName} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded-md"/>
                            <input type="text" name="title" value={data.title} onChange={handleChange} placeholder="Title (e.g., Web Developer)" className="w-full p-2 border rounded-md"/>
                            <input type="text" name="location" value={data.location} onChange={handleChange} placeholder="City, State, Zip" className="w-full p-2 border rounded-md"/>
                            <input type="text" name="phone" value={data.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded-md"/>
                            <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded-md"/>
                            <input type="text" name="website" value={data.website} onChange={handleChange} placeholder="Website/Portfolio URL" className="w-full p-2 border rounded-md"/>
                            
                            <h3 className="text-xl font-medium mt-4" style={{ color: '#525252' }}>Profiles</h3>
                            {data.profiles.map((profile, index) => (
                                <div key={profile.id} className="p-3 border rounded-md space-y-2 relative">
                                    <input type="text" name="network" value={profile.network} onChange={(e) => handleNestedChange('profiles', index, e)} placeholder="Network (e.g., LinkedIn)" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="username" value={profile.username} onChange={(e) => handleNestedChange('profiles', index, e)} placeholder="Username" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="url" value={profile.url} onChange={(e) => handleNestedChange('profiles', index, e)} placeholder="URL" className="w-full p-2 border rounded-md"/>
                                    <button onClick={() => removeSectionItem('profiles', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">X</button>
                                </div>
                            ))}
                            <button onClick={() => addSectionItem('profiles')} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Add Profile</button>

                            <h3 className="text-xl font-medium mt-4" style={{ color: '#525252' }}>Summary</h3>
                            <textarea name="summary" value={data.summary} onChange={handleChange} placeholder="Professional Summary" className="w-full p-2 border rounded-md" rows="5"></textarea>

                            <h3 className="text-xl font-medium mt-4" style={{ color: '#525252' }}>Experience</h3>
                            {data.experience.map((exp, index) => (
                                <div key={exp.id} className="p-3 border rounded-md space-y-2 relative">
                                    <input type="text" name="company" value={exp.company} onChange={(e) => handleNestedChange('experience', index, e)} placeholder="Company" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleNestedChange('experience', index, e)} placeholder="Job Title" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="startDate" value={exp.startDate} onChange={(e) => handleNestedChange('experience', index, e)} placeholder="Start Date" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="endDate" value={exp.endDate} onChange={(e) => handleNestedChange('experience', index, e)} placeholder="End Date" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="location" value={exp.location} onChange={(e) => handleNestedChange('experience', index, e)} placeholder="Location" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="companyWebsite" value={exp.companyWebsite} onChange={(e) => handleNestedChange('experience', index, e)} placeholder="Company Website" className="w-full p-2 border rounded-md"/>
                                    <textarea name="description" value={exp.description} onChange={(e) => handleNestedChange('experience', index, e)} placeholder="Description (use new lines for bullet points)" className="w-full p-2 border rounded-md" rows="4"></textarea>
                                    <button onClick={() => removeSectionItem('experience', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">X</button>
                                </div>
                            ))}
                            <button onClick={() => addSectionItem('experience')} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Add Experience</button>

                             <h3 className="text-xl font-medium mt-4" style={{ color: '#525252' }}>Education</h3>
                            {data.education.map((edu, index) => (
                                <div key={edu.id} className="p-3 border rounded-md space-y-2 relative">
                                    <input type="text" name="institution" value={edu.institution} onChange={(e) => handleNestedChange('education', index, e)} placeholder="Institution" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="degree" value={edu.degree} onChange={(e) => handleNestedChange('education', index, e)} placeholder="Degree" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="startDate" value={edu.startDate} onChange={(e) => handleNestedChange('education', index, e)} placeholder="Start Date" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="endDate" value={edu.endDate} onChange={(e) => handleNestedChange('education', index, e)} placeholder="End Date" className="w-full p-2 border rounded-md"/>
                                     <input type="text" name="location" value={edu.location} onChange={(e) => handleNestedChange('education', index, e)} placeholder="Location" className="w-full p-2 border rounded-md"/>
                                    <button onClick={() => removeSectionItem('education', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">X</button>
                                </div>
                            ))}
                            <button onClick={() => addSectionItem('education')} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Add Education</button>

                            <h3 className="text-xl font-medium mt-4" style={{ color: '#525252' }}>Projects</h3>
                            {data.projects.map((proj, index) => (
                                <div key={proj.id} className="p-3 border rounded-md space-y-2 relative">
                                    <input type="text" name="name" value={proj.name} onChange={(e) => handleNestedChange('projects', index, e)} placeholder="Project Name" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="role" value={proj.role} onChange={(e) => handleNestedChange('projects', index, e)} placeholder="Your Role" className="w-full p-2 border rounded-md"/>
                                    <textarea name="description" value={proj.description} onChange={(e) => handleNestedChange('projects', index, e)} placeholder="Project Description" className="w-full p-2 border rounded-md" rows="3"></textarea>
                                    <button onClick={() => removeSectionItem('projects', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">X</button>
                                </div>
                            ))}
                            <button onClick={() => addSectionItem('projects')} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Add Project</button>
                             
                            <h3 className="text-xl font-medium mt-4" style={{ color: '#525252' }}>Skills</h3>
                            {data.skills.map((skill, index) => (
                                <div key={skill.id} className="p-3 border rounded-md space-y-2 relative">
                                    <input type="text" name="category" value={skill.category} onChange={(e) => handleNestedChange('skills', index, e)} placeholder="Category (e.g., Web Technologies)" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="level" value={skill.level} onChange={(e) => handleNestedChange('skills', index, e)} placeholder="Level (e.g., Advanced)" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="list" value={skill.list} onChange={(e) => handleNestedChange('skills', index, e)} placeholder="Comma-separated list" className="w-full p-2 border rounded-md"/>
                                    <button onClick={() => removeSectionItem('skills', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">X</button>
                                </div>
                            ))}
                            <button onClick={() => addSectionItem('skills')} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Add Skill Category</button>

                            <h3 className="text-xl font-medium mt-4" style={{ color: '#525252' }}>Certifications</h3>
                            {data.certifications.map((cert, index) => (
                                <div key={cert.id} className="p-3 border rounded-md space-y-2 relative">
                                    <input type="text" name="name" value={cert.name} onChange={(e) => handleNestedChange('certifications', index, e)} placeholder="Certification Name" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="org" value={cert.org} onChange={(e) => handleNestedChange('certifications', index, e)} placeholder="Issuing Organization" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="year" value={cert.year} onChange={(e) => handleNestedChange('certifications', index, e)} placeholder="Year" className="w-full p-2 border rounded-md"/>
                                    <button onClick={() => removeSectionItem('certifications', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">X</button>
                                </div>
                            ))}
                            <button onClick={() => addSectionItem('certifications')} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Add Certification</button>

                            <h3 className="text-xl font-medium mt-4" style={{ color: '#525252' }}>Languages</h3>
                            {data.languages.map((lang, index) => (
                                <div key={lang.id} className="p-3 border rounded-md space-y-2 relative">
                                    <input type="text" name="name" value={lang.name} onChange={(e) => handleNestedChange('languages', index, e)} placeholder="Language" className="w-full p-2 border rounded-md"/>
                                    <input type="text" name="proficiency" value={lang.proficiency} onChange={(e) => handleNestedChange('languages', index, e)} placeholder="Proficiency" className="w-full p-2 border rounded-md"/>
                                    <button onClick={() => removeSectionItem('languages', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">X</button>
                                </div>
                            ))}
                            <button onClick={() => addSectionItem('languages')} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Add Language</button>
                            
                            <h3 className="text-xl font-medium mt-4" style={{ color: '#525252' }}>References</h3>
                            <input type="text" name="references" value={data.references} onChange={handleChange} placeholder="References" className="w-full p-2 border rounded-md"/>
                        </div>
                    </div>

                    {/* Resume Preview Section */}
                    <div className="relative">
                       <div className="sticky top-8">
                            <div ref={resumeContainerRef} className="bg-white p-6 rounded-lg shadow-lg">
                               <div style={{
                                    height: resumeRef.current ? resumeRef.current.offsetHeight * scale : 'auto'
                               }}>
                                <div
                                    ref={resumeRef}
                                    style={{
                                        transform: `scale(${scale})`,
                                        transformOrigin: 'top left',
                                    }}
                                    className="bg-white p-8 w-[21cm] min-h-[29.7cm] text-sm"
                                >
                                    <header className="text-center mb-6">
                                        <h1 className="text-4xl font-bold" style={{ color: '#262626' }}>{data.fullName}</h1>
                                        <p className="text-lg mt-1" style={{ color: '#525252' }}>{data.title}</p>
                                        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs mt-3 flex-wrap" style={{ color: '#737373' }}>
                                            {data.location && <span>{data.location}</span>}
                                            {data.location && data.phone && <span style={{ color: '#d4d4d4' }}>|</span>}
                                            {data.phone && <span>{data.phone}</span>}
                                            {data.phone && data.email && <span style={{ color: '#d4d4d4' }}>|</span>}
                                            {data.email && <a href={`mailto:${data.email}`} style={{ color: '#2563eb' }} className="hover:underline">{data.email}</a>}
                                            {data.email && data.website && <span style={{ color: '#d4d4d4' }}>|</span>}
                                            {data.website && <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }} className="hover:underline">{data.website}</a>}
                                        </div>
                                    </header>

                                    <div className="space-y-4">
                                        {data.profiles.length > 0 && <Section title="Profiles">
                                            <div className="grid grid-cols-3 gap-4 text-xs">
                                                {data.profiles.map(p => (
                                                    <div key={p.id}>
                                                        <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }} className="font-semibold hover:underline">{p.network}</a>
                                                        <p style={{ color: '#737373' }}>{p.username}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </Section>}
                                        
                                        {data.summary && <Section title="Summary">
                                            <p className="text-xs leading-relaxed">{data.summary}</p>
                                        </Section>}

                                        {data.experience.length > 0 && <Section title="Experience">
                                            <div className="space-y-4">
                                                {data.experience.map(exp => (
                                                    <div key={exp.id} className="mb-3">
                                                        <div className="flex justify-between items-baseline">
                                                            <h3 className="font-semibold">{exp.company}</h3>
                                                            <div className="text-xs font-medium" style={{ color: '#737373' }}>{exp.startDate} to {exp.endDate}</div>
                                                        </div>
                                                        <div className="flex justify-between items-baseline">
                                                            <p className="text-sm font-medium">{exp.jobTitle}</p>
                                                            <p className="text-xs" style={{ color: '#737373' }}>{exp.location}</p>
                                                        </div>
                                                        <a href={`https://${exp.companyWebsite}`} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }} className="text-xs hover:underline">{exp.companyWebsite}</a>
                                                        <ul className="list-disc list-inside text-xs mt-1 space-y-1">
                                                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line}</li>)}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </Section>}
                                        {data.education.length > 0 && <Section title="Education">
                                            {data.education.map(edu => (
                                                <div key={edu.id} className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-semibold">{edu.institution}</h3>
                                                        <p className="text-xs">{edu.degree}</p>
                                                    </div>
                                                    <div className="text-right text-xs" style={{ color: '#737373' }}>
                                                        <p>{edu.startDate} to {edu.endDate}</p>
                                                        <p>{edu.location}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </Section>}
                                        {data.projects.length > 0 && <Section title="Projects">
                                            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                                {data.projects.map(p => (
                                                    <div key={p.id}>
                                                        <h3 className="font-semibold">{p.name}</h3>
                                                        <p className="text-xs font-medium">{p.role}</p>
                                                        <p className="text-xs mt-1">{p.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </Section>}
                                        {data.skills.length > 0 && <Section title="Skills">
                                            <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-xs">
                                                {data.skills.map(s => (
                                                    <div key={s.id}>
                                                        <h3 className="font-semibold">{s.category} <span className="font-normal" style={{ color: '#737373' }}>- {s.level}</span></h3>
                                                        <p>{s.list}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </Section>}
                                        {data.certifications.length > 0 && <Section title="Certifications">
                                             <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                                {data.certifications.map(c => (
                                                    <div key={c.id} className="flex justify-between">
                                                        <div>
                                                            <h3 className="font-semibold">{c.name}</h3>
                                                            <p className="text-xs">{c.org}</p>
                                                        </div>
                                                        <p className="text-xs font-semibold">{c.year}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </Section>}
                                        {data.languages.length > 0 && <Section title="Languages">
                                            <div className="grid grid-cols-2 gap-x-8">
                                                {data.languages.map(l => (
                                                    <div key={l.id}>
                                                        <h3 className="font-semibold">{l.name} <span className="font-normal text-xs" style={{ color: '#737373' }}>- {l.proficiency}</span></h3>
                                                    </div>
                                                ))}
                                            </div>
                                        </Section>}
                                        {data.references && <Section title="References">
                                            <p className="text-xs">{data.references}</p>
                                        </Section>}
                                    </div>
                                </div>
                               </div>
                            </div>
                         <div className="mt-6 flex justify-center gap-4">
                            <button 
                                onClick={handlePdfGeneration} 
                                disabled={!pdfLibrariesLoaded || isGenerating}
                                className="text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                                style={{ backgroundColor: (!pdfLibrariesLoaded || isGenerating) ? '#a3a3a3' : '#22c55e' }}
                            >
                                {!pdfLibrariesLoaded ? 'Loading Libs...' : isGenerating ? 'Generating...' : 'Download PDF'}
                            </button>
                        </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
=======
import React, { useState, useRef } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Plus, 
  Trash2, 
  Download, 
  Eye,
  Save,
  Edit3
} from 'lucide-react';

const UnifiedResumeBuilder = ({ theme }) => {
  // Refs
  const resumeRef = useRef();
  const primaryColor = theme?.primary || '#7D5AFE';
  
  // State for resume data
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    experience: [
      {
        id: 1,
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
        grade: ''
      }
    ],
    skills: [''],
    certifications: [
      {
        id: 1,
        name: '',
        issuer: '',
        date: ''
      }
    ],
    projects: [
      {
        id: 1,
        name: '',
        description: '',
        technologies: '',
        link: ''
      }
    ],
    achievements: ['']
  });

  // Handle input changes
  const handlePersonalInfoChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleSummaryChange = (value) => {
    setResumeData(prev => ({
      ...prev,
      summary: value
    }));
  };

  // Handle experience changes
  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // Handle education changes
  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          degree: '',
          institution: '',
          startDate: '',
          endDate: '',
          grade: ''
        }
      ]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Handle skills changes
  const handleSkillsChange = (index, value) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = value;
    setResumeData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index) => {
    const newSkills = [...resumeData.skills];
    newSkills.splice(index, 1);
    setResumeData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  // Handle certifications changes
  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: Date.now(),
          name: '',
          issuer: '',
          date: ''
        }
      ]
    }));
  };

  const updateCertification = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  // Handle projects changes
  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now(),
          name: '',
          description: '',
          technologies: '',
          link: ''
        }
      ]
    }));
  };

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  // Handle achievements changes
  const handleAchievementsChange = (index, value) => {
    const newAchievements = [...resumeData.achievements];
    newAchievements[index] = value;
    setResumeData(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  const addAchievement = () => {
    setResumeData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const removeAchievement = (index) => {
    const newAchievements = [...resumeData.achievements];
    newAchievements.splice(index, 1);
    setResumeData(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  // Format date range
  const formatDateRange = (start, end) => {
    if (!start && !end) return 'Jan 2020 - Present';
    
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;
    
    const startStr = startDate ? startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Unknown';
    const endStr = endDate ? endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present';
    
    return `${startStr} - ${endStr}`;
  };

  // Preview and save functions
  const handlePreview = () => {
    alert('Preview functionality would open here');
  };

  const handleSave = () => {
    alert('Resume saved successfully!');
  };

  const handleDownload = () => {
    window.print();
  };

  // Helper for input styles to use theme color on focus
  const inputStyle = {
    '--tw-ring-color': primaryColor,
    '--tw-border-opacity': 1,
  };

  const focusClass = "focus:ring-2 focus:border-transparent transition-shadow duration-200";

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 print:bg-white print:p-0">
      <style>{`
        @media print {
          @page { margin: 0; }
          body { 
            background: white; 
            -webkit-print-color-adjust: exact; 
          }
        }
        .focus\\:ring-theme:focus {
          --tw-ring-color: ${primaryColor};
          --tw-ring-opacity: 0.5;
          border-color: ${primaryColor};
        }
      `}</style>
      
      <div className="max-w-8xl mx-auto px-4 print:max-w-none print:px-0 print:mx-0 print:w-full">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm p-4 md:p-6 mb-8 print:hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">AI Resume Builder</h1>
              <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Create a professional resume with AI assistance</p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
              <button 
                onClick={handlePreview}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-white rounded-full hover:opacity-90 transition-colors text-sm font-medium"
                style={{ backgroundColor: primaryColor }}
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button 
                onClick={handleDownload}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-white rounded-full hover:opacity-90 transition-colors text-sm font-medium"
                style={{ backgroundColor: primaryColor }}
              >
                <Download className="w-4 h-4" />
                PDF
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 print:block">
          {/* Form Section - Left Side */}
          <div className="lg:w-1/2 space-y-6 md:space-y-8 print:hidden order-2 lg:order-1">
            {/* Personal Information */}
            <div className="bg-white rounded-3xl shadow-sm p-5 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full" style={{ backgroundColor: `${primaryColor}15` }}>
                  <User className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {Object.keys(resumeData.personalInfo).map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={resumeData.personalInfo[field]}
                      onChange={(e) => handlePersonalInfoChange(field, e.target.value)}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-2xl ${focusClass} focus:ring-theme`}
                      placeholder={field === 'fullName' ? 'John Doe' : ''}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-white rounded-3xl shadow-sm p-5 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full" style={{ backgroundColor: `${primaryColor}15` }}>
                  <Edit3 className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">Professional Summary</h2>
              </div>
              
              <textarea
                value={resumeData.summary}
                onChange={(e) => handleSummaryChange(e.target.value)}
                rows={4}
                className={`w-full px-4 py-2 border border-gray-300 rounded-2xl ${focusClass} focus:ring-theme`}
                placeholder="Write a brief summary about your professional background, key skills, and career goals..."
              />
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-3xl shadow-sm p-5 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full" style={{ backgroundColor: `${primaryColor}15` }}>
                    <Briefcase className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">Work Experience</h2>
                </div>
                <button 
                  onClick={addExperience}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full hover:opacity-80 transition-colors text-sm"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                >
                  <Plus className="w-4 h-4" />
                  Add Experience
                </button>
              </div>
              
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="mb-6 p-4 border border-gray-200 rounded-2xl last:mb-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-800">Experience #{index + 1}</h3>
                    {resumeData.experience.length > 1 && (
                      <button 
                        onClick={() => removeExperience(exp.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['jobTitle', 'company', 'startDate', 'endDate'].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                        <input
                          type={field.includes('Date') ? 'month' : 'text'}
                          value={exp[field]}
                          onChange={(e) => updateExperience(exp.id, field, e.target.value)}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-xl ${focusClass} focus:ring-theme`}
                        />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        rows={3}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-xl ${focusClass} focus:ring-theme`}
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="bg-white rounded-3xl shadow-sm p-5 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full" style={{ backgroundColor: `${primaryColor}15` }}>
                    <GraduationCap className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">Education</h2>
                </div>
                <button 
                  onClick={addEducation}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full hover:opacity-80 transition-colors text-sm"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                >
                  <Plus className="w-4 h-4" />
                  Add Education
                </button>
              </div>
              
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="mb-6 p-4 border border-gray-200 rounded-2xl last:mb-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-800">Education #{index + 1}</h3>
                    {resumeData.education.length > 1 && (
                      <button 
                        onClick={() => removeEducation(edu.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['degree', 'institution', 'startDate', 'endDate', 'grade'].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field}</label>
                        <input
                          type={field.includes('Date') ? 'month' : 'text'}
                          value={edu[field]}
                          onChange={(e) => updateEducation(edu.id, field, e.target.value)}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-xl ${focusClass} focus:ring-theme`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-3xl shadow-sm p-5 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full" style={{ backgroundColor: `${primaryColor}15` }}>
                    <Award className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">Skills</h2>
                </div>
                <button 
                  onClick={addSkill}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full hover:opacity-80 transition-colors text-sm"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                >
                  <Plus className="w-4 h-4" />
                  Add Skill
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1 border border-gray-200">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillsChange(index, e.target.value)}
                      className="bg-transparent border-none focus:ring-0 p-0 text-sm"
                      placeholder="Add a skill"
                    />
                    <button 
                      onClick={() => removeSkill(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects & Certifications (Simplified for brevity but using same theme patterns) */}
            {/* Projects */}
            <div className="bg-white rounded-3xl shadow-sm p-5 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full" style={{ backgroundColor: `${primaryColor}15` }}>
                    <Briefcase className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">Projects</h2>
                </div>
                <button 
                  onClick={addProject}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full hover:opacity-80 transition-colors text-sm"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </div>
              
              {resumeData.projects.map((project, index) => (
                <div key={project.id} className="mb-6 p-4 border border-gray-200 rounded-2xl last:mb-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-800">Project #{index + 1}</h3>
                    <button onClick={() => removeProject(project.id)} className="p-1 text-red-500 hover:bg-red-50 rounded-full"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-4">
                    {['name', 'description', 'technologies', 'link'].map(field => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field}</label>
                        {field === 'description' ? (
                          <textarea 
                            value={project[field]} 
                            onChange={(e) => updateProject(project.id, field, e.target.value)}
                            rows={3} 
                            className={`w-full px-3 py-2 border border-gray-300 rounded-xl ${focusClass} focus:ring-theme`} 
                          />
                        ) : (
                          <input 
                            type="text" 
                            value={project[field]} 
                            onChange={(e) => updateProject(project.id, field, e.target.value)}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-xl ${focusClass} focus:ring-theme`} 
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-3xl shadow-sm p-5 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full" style={{ backgroundColor: `${primaryColor}15` }}>
                    <Award className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">Achievements</h2>
                </div>
                <button 
                  onClick={addAchievement}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full hover:opacity-80 transition-colors text-sm"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                >
                  <Plus className="w-4 h-4" />
                  Add Achievement
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1 border border-gray-200">
                    <input type="text" value={achievement} onChange={(e) => handleAchievementsChange(index, e.target.value)} className="bg-transparent border-none focus:ring-0 p-0 text-sm w-full" placeholder="Add an achievement" />
                    <button onClick={() => removeAchievement(index)} className="ml-2 text-gray-500 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section - Right Side (Simplified Color Application) */}
          <div className="lg:w-1/2 print:w-full print:absolute print:top-0 print:left-0 print:m-0 order-1 lg:order-2">
            <div className="bg-white rounded-3xl shadow-sm p-5 md:p-6 sticky top-4 print:static print:p-0 print:shadow-none">
              <h2 className="text-xl font-bold text-gray-800 mb-6 print:hidden">Live Preview</h2>
              
              <div ref={resumeRef} className="bg-white border border-gray-300 rounded-2xl p-6 md:p-8 min-h-[500px] lg:min-h-[800px] print:border-none print:min-h-0 print:p-0 print:shadow-none">
                {/* Personal Info Preview */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
                  <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-3 text-gray-600 text-sm">
                    {/* Icons in Preview are kept neutral or can use theme color */}
                    {['email', 'phone', 'location'].map(field => resumeData.personalInfo[field] && (
                      <span key={field} className="flex items-center">
                        {field === 'email' && <Mail className="w-3 h-3 md:w-4 md:h-4 mr-1" />}
                        {field === 'phone' && <Phone className="w-3 h-3 md:w-4 md:h-4 mr-1" />}
                        {field === 'location' && <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />}
                        {resumeData.personalInfo[field]}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-2 text-gray-600 text-sm">
                    {resumeData.personalInfo.linkedin && <span>LinkedIn: {resumeData.personalInfo.linkedin}</span>}
                    {resumeData.personalInfo.github && <span>GitHub: {resumeData.personalInfo.github}</span>}
                  </div>
                </div>

                {/* Section Previews (Using theme color for border bottoms) */}
                {[
                  { title: 'Professional Summary', content: resumeData.summary, type: 'text' },
                  { title: 'Work Experience', content: resumeData.experience, type: 'list', fields: ['jobTitle', 'company', 'description'] },
                  { title: 'Education', content: resumeData.education, type: 'list', fields: ['degree', 'institution', 'grade'] },
                  { title: 'Skills', content: resumeData.skills, type: 'tags' },
                  { title: 'Projects', content: resumeData.projects, type: 'list', fields: ['name', 'description', 'technologies', 'link'] },
                  { title: 'Achievements', content: resumeData.achievements, type: 'tags' }
                ].map((section, idx) => (
                  <div key={idx} className="mb-6 md:mb-8">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 border-b-2 pb-1 mb-3" style={{ borderColor: `${primaryColor}40` }}>
                      {section.title}
                    </h2>
                    {/* Render content based on type - logic simplified for brevity */}
                    {section.type === 'text' && <p className="text-gray-700 text-sm md:text-base">{section.content}</p>}
                    {section.type === 'tags' && (
                      <div className="flex flex-wrap gap-2">
                        {section.content.map((item, i) => item && (
                          <span key={i} className="px-2 py-1 md:px-3 rounded-full text-xs md:text-sm" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                    {section.type === 'list' && section.content.map((item, i) => (
                      <div key={i} className="mb-4">
                        <div className="flex justify-between flex-wrap gap-1">
                          <h3 className="font-bold text-gray-800 text-sm md:text-base">{item[section.fields[0]]}</h3>
                          <span className="text-gray-600 text-xs md:text-sm">{formatDateRange(item.startDate, item.endDate)}</span>
                        </div>
                        {section.fields.slice(1).map(f => item[f] && (
                          <p key={f} className={`text-gray-600 text-sm md:text-base ${f === 'description' ? 'mt-1' : ''}`}>{item[f]}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedResumeBuilder;
>>>>>>> prof
