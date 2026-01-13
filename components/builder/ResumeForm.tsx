

import React, { useState, useMemo } from 'react';
import type { Resume, Experience, Education, Skill, Project, Certification, Publication, Volunteering } from '../../types';
import { improveResumeText, suggestJobTitle, improveExperienceItem } from '../../services/geminiService';


const SectionHeader: React.FC<{ title: string; isOpen: boolean; onClick: () => void }> = ({ title, isOpen, onClick }) => (
    <button onClick={onClick} className="w-full flex justify-between items-center p-4">
        <h3 className="font-semibold text-gray-700 dark:text-slate-300">{title}</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
            <path d="m6 9 6 6 6-6"/>
        </svg>
    </button>
);

const AddItemButton: React.FC<{ onClick: () => void; text: string }> = ({ onClick, text }) => (
    <button onClick={onClick} className="text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-black dark:hover:text-white mt-2">
        + {text}
    </button>
);

const FormInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }> = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="text-xs text-gray-500 dark:text-slate-400">{label}</label>
        <input type="text" value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-transparent border-b border-gray-300 dark:border-slate-700 py-1 focus:outline-none focus:border-black dark:focus:border-brand-yellow"/>
    </div>
);

const MonthYearPicker: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);

    const [selectedMonth, selectedYear] = useMemo(() => {
        if (!value || value === 'Present') return ['', ''];
        
        // Try parsing common date string formats first
        const date = new Date(value);
        if (!isNaN(date.getTime()) && value.includes(date.getUTCFullYear().toString())) { // Check if it's a valid date
            const year = date.getUTCFullYear().toString();
            const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
            return [month, year];
        }

        // Fallback for MM/YYYY
        const slashParts = value.split('/');
        if (slashParts.length === 2 && slashParts[1] && slashParts[1].length === 4) {
            const m = String(slashParts[0]).padStart(2, '0');
            const y = slashParts[1];
            if (!isNaN(parseInt(m)) && !isNaN(parseInt(y))) return [m, y];
        }
    
        // Fallback for MM-YYYY
        const dashParts = value.split('-');
        if (dashParts.length === 2 && dashParts[0].length <= 2 && dashParts[1] && dashParts[1].length === 4) {
            const m = String(dashParts[0]).padStart(2, '0');
            const y = dashParts[1];
            if (!isNaN(parseInt(m)) && !isNaN(parseInt(y))) return [m, y];
        }
        
        return ['', ''];
    }, [value]);
    
    const handleDatePartChange = (part: 'month' | 'year', newValue: string) => {
        let currentMonth = selectedMonth;
        let currentYear = selectedYear;

        if (part === 'month') {
            currentMonth = newValue;
        } else {
            currentYear = newValue;
        }

        if (currentMonth && currentYear) {
            onChange(`${currentMonth}/${currentYear}`);
        }
    };

    return (
        <div className="flex gap-2">
            <select
                value={selectedMonth}
                onChange={e => handleDatePartChange('month', e.target.value)}
                className="w-full bg-transparent border-b border-gray-300 dark:border-slate-700 py-1 focus:outline-none focus:border-black dark:focus:border-brand-yellow text-sm"
            >
                <option value="" disabled>Month</option>
                {months.map((month, index) => (
                    <option key={month} value={String(index + 1).padStart(2, '0')}>
                        {month}
                    </option>
                ))}
            </select>
            <select
                value={selectedYear}
                onChange={e => handleDatePartChange('year', e.target.value)}
                className="w-full bg-transparent border-b border-gray-300 dark:border-slate-700 py-1 focus:outline-none focus:border-black dark:focus:border-brand-yellow text-sm"
            >
                <option value="" disabled>Year</option>
                {years.map(year => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};


const DateInput: React.FC<{ label: string; value: string; onChange: (value: string) => void; allowPresent?: boolean }> = ({ label, value, onChange, allowPresent = false }) => {
    const isPresent = allowPresent && value === 'Present';

    const handlePresentToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked ? 'Present' : '');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-gray-500 dark:text-slate-400">{label}</label>
                {allowPresent && (
                    <label className="flex items-center text-xs text-gray-500 dark:text-slate-400 cursor-pointer">
                        <input type="checkbox" checked={isPresent} onChange={handlePresentToggle} className="h-3 w-3 mr-1 rounded border-gray-300 text-black focus:ring-black dark:bg-slate-700 dark:border-slate-600"/>
                        Present
                    </label>
                )}
            </div>
            {isPresent ? (
                <div className="w-full bg-gray-100 dark:bg-slate-800 border-b border-gray-300 dark:border-slate-700 py-1 text-center font-semibold text-sm text-gray-500 dark:text-slate-400 cursor-not-allowed">
                    Present
                </div>
            ) : (
                <MonthYearPicker value={value} onChange={onChange} />
            )}
        </div>
    );
};

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);

const DeleteButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} className="p-1 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 dark:hover:text-red-400 transition-colors">
        <DeleteIcon />
    </button>
);

const SparkleIcon = ({ className = "w-4 h-4" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M10.868 2.884c.321-.772 1.415-.772 1.736 0l.64 1.538a1 1 0 00.951.692h1.616c.815 0 1.148 1.025.53 1.518l-1.3 1.002a1 1 0 00-.364 1.118l.64 1.538c.321.772-.645 1.433-1.391 1.022l-1.3-.998a1 1 0 00-1.175 0l-1.3.998c-.746.411-1.712-.25-1.391-1.022l.64-1.538a1 1 0 00-.364-1.118l-1.3-1.002c-.618-.493-.285-1.518.53-1.518h1.616a1 1 0 00.951-.692l.64-1.538z" clipRule="evenodd" /></svg>;
const SpinnerIcon = ({ className = "w-4 h-4 animate-spin" }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;

const ExperienceItem: React.FC<{
    exp: Experience;
    isOpen: boolean;
    onClick: () => void;
    onChange: (field: keyof Experience, value: string) => void;
    onDelete: () => void;
}> = ({ exp, isOpen, onClick, onChange, onDelete }) => {
    const [isImproving, setIsImproving] = useState(false);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);

    const handleImproveWithAI = async () => {
        setIsImproving(true);
        const improvedData = await improveExperienceItem({
            jobTitle: exp.jobTitle,
            company: exp.company,
            description: exp.description,
        });
        onChange('jobTitle', improvedData.jobTitle);
        onChange('company', improvedData.company);
        onChange('description', improvedData.description);
        setIsImproving(false);
    };

    const handleSuggestTitle = async () => {
        setIsSuggesting(true);
        setTitleSuggestions([]);
        const suggestions = await suggestJobTitle({
            title: exp.jobTitle,
            company: exp.company,
            description: exp.description,
        });
        setTitleSuggestions(suggestions);
        setIsSuggesting(false);
    };

    const handleSuggestionClick = (suggestion: string) => {
        onChange('jobTitle', suggestion);
        setTitleSuggestions([]);
    };

    return (
        <div className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-md">
            <div className="flex justify-between items-center">
                <button className="flex-grow flex justify-between items-center text-left" onClick={onClick}>
                    <p className="font-semibold text-sm">{exp.jobTitle || 'Job Title'}<br/><span className="font-normal text-xs text-gray-500 dark:text-slate-400">{exp.company || 'Company'}</span></p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/></svg>
                </button>
                 <div className="ml-2 flex-shrink-0">
                    <DeleteButton onClick={onDelete} />
                </div>
            </div>
            {isOpen && (
                <div className="mt-4 space-y-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div className="relative">
                            <div className="flex justify-between items-center mb-1">
                                 <label className="text-xs text-gray-500 dark:text-slate-400">Job Title</label>
                                 <button onClick={handleSuggestTitle} disabled={isSuggesting} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50 flex items-center gap-1">
                                    {isSuggesting ? <SpinnerIcon /> : <SparkleIcon />}
                                    {isSuggesting ? 'Thinking...' : 'Suggest'}
                                </button>
                            </div>
                            <input type="text" value={exp.jobTitle} onChange={e => onChange('jobTitle', e.target.value)} className="w-full bg-transparent border-b border-gray-300 dark:border-slate-700 py-1 focus:outline-none focus:border-black dark:focus:border-brand-yellow"/>
                            {titleSuggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 z-10 bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-md shadow-lg mt-1">
                                    <ul className="max-h-48 overflow-y-auto">
                                        {titleSuggestions.map((suggestion, index) => (
                                            <li key={index}>
                                                <button 
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                    className="w-full text-left text-sm px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-600"
                                                >
                                                    {suggestion}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <FormInput label="Company" value={exp.company} onChange={e => onChange('company', e.target.value)} />
                    </div>
                    <FormInput label="Location" value={exp.location} onChange={e => onChange('location', e.target.value)} />
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DateInput label="Start Date" value={exp.startDate} onChange={value => onChange('startDate', value)} />
                        <DateInput label="End Date" value={exp.endDate} onChange={value => onChange('endDate', value)} allowPresent />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-xs text-gray-500 dark:text-slate-400">Description</label>
                            <button onClick={handleImproveWithAI} disabled={isImproving} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50 flex items-center gap-1">
                                {isImproving ? 'Improving...' : '✨ Improve with AI'}
                            </button>
                        </div>
                        <textarea
                            value={exp.description}
                            onChange={(e) => onChange('description', e.target.value)}
                            rows={6}
                            className="w-full text-sm bg-white dark:bg-slate-800 p-2 rounded-md border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-brand-yellow"
                            placeholder="- Led a project that..."
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

const EducationItem: React.FC<{
    edu: Education;
    isOpen: boolean;
    onClick: () => void;
    onChange: (field: keyof Education, value: string) => void;
    onDelete: () => void;
}> = ({ edu, isOpen, onClick, onChange, onDelete }) => {
    return (
        <div className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-md">
            <div className="flex justify-between items-center">
                <button className="flex-grow flex justify-between items-center text-left" onClick={onClick}>
                    <p className="font-semibold text-sm">{edu.institution || 'Institution'}<br/><span className="font-normal text-xs text-gray-500 dark:text-slate-400">{edu.degree || 'Degree'}</span></p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/></svg>
                </button>
                <div className="ml-2 flex-shrink-0">
                    <DeleteButton onClick={onDelete} />
                </div>
            </div>
            {isOpen && (
                <div className="mt-4 space-y-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormInput label="Institution" value={edu.institution} onChange={e => onChange('institution', e.target.value)} />
                        <FormInput label="Degree" value={edu.degree} onChange={e => onChange('degree', e.target.value)} />
                    </div>
                    <FormInput label="Field of Study" value={edu.fieldOfStudy} onChange={e => onChange('fieldOfStudy', e.target.value)} />
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DateInput label="Start Date" value={edu.startDate} onChange={value => onChange('startDate', value)} />
                        <DateInput label="End Date" value={edu.endDate} onChange={value => onChange('endDate', value)} />
                    </div>
                </div>
            )}
        </div>
    )
}

const SkillItem: React.FC<{
    skill: Skill;
    onChange: (value: string) => void;
    onDelete: () => void;
}> = ({ skill, onChange, onDelete }) => (
    <div className="flex items-center gap-2">
        <input 
            type="text" 
            value={skill.name} 
            onChange={e => onChange(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 dark:border-slate-700 py-1 focus:outline-none focus:border-black dark:focus:border-brand-yellow"
            placeholder="e.g. React"
        />
        <DeleteButton onClick={onDelete} />
    </div>
);

const ProjectItem: React.FC<{
    proj: Project;
    isOpen: boolean;
    onClick: () => void;
    onChange: (field: keyof Project, value: string) => void;
    onDelete: () => void;
}> = ({ proj, isOpen, onClick, onChange, onDelete }) => {
    return (
        <div className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-md">
            <div className="flex justify-between items-center">
                <button className="flex-grow flex justify-between items-center text-left" onClick={onClick}>
                    <p className="font-semibold text-sm">{proj.name || 'Project Name'}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/></svg>
                </button>
                 <div className="ml-2 flex-shrink-0">
                    <DeleteButton onClick={onDelete} />
                </div>
            </div>
            {isOpen && (
                <div className="mt-4 space-y-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <FormInput label="Project Name" value={proj.name} onChange={e => onChange('name', e.target.value)} />
                    <FormInput label="URL" value={proj.url || ''} onChange={e => onChange('url', e.target.value)} placeholder="https://github.com/user/project"/>
                    <div>
                         <label className="text-xs text-gray-500 dark:text-slate-400">Description</label>
                         <textarea 
                            value={proj.description}
                            onChange={(e) => onChange('description', e.target.value)}
                            rows={4}
                            className="w-full text-sm bg-white dark:bg-slate-800 mt-1 p-2 rounded-md border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-brand-yellow"
                            placeholder="Describe your project..."
                        />
                    </div>
                </div>
            )}
        </div>
    )
};

const VolunteeringItem: React.FC<{
    vol: Volunteering;
    isOpen: boolean;
    onClick: () => void;
    onChange: (field: keyof Volunteering, value: string) => void;
    onDelete: () => void;
}> = ({ vol, isOpen, onClick, onChange, onDelete }) => {
    return (
        <div className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-md">
            <div className="flex justify-between items-center">
                <button className="flex-grow flex justify-between items-center text-left" onClick={onClick}>
                    <p className="font-semibold text-sm">{vol.organization || 'Organization'}<br/><span className="font-normal text-xs text-gray-500 dark:text-slate-400">{vol.role || 'Role'}</span></p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/></svg>
                </button>
                <div className="ml-2 flex-shrink-0">
                    <DeleteButton onClick={onDelete} />
                </div>
            </div>
            {isOpen && (
                <div className="mt-4 space-y-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <FormInput label="Organization" value={vol.organization} onChange={e => onChange('organization', e.target.value)} />
                    <FormInput label="Role" value={vol.role} onChange={e => onChange('role', e.target.value)} />
                    <div>
                         <label className="text-xs text-gray-500 dark:text-slate-400">Description</label>
                         <textarea 
                            value={vol.description}
                            onChange={(e) => onChange('description', e.target.value)}
                            rows={4}
                            className="w-full text-sm bg-white dark:bg-slate-800 mt-1 p-2 rounded-md border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-brand-yellow"
                            placeholder="Describe your responsibilities and achievements..."
                        />
                    </div>
                </div>
            )}
        </div>
    )
};

const CertificationItem: React.FC<{
    cert: Certification;
    isOpen: boolean;
    onClick: () => void;
    onChange: (field: keyof Certification, value: string) => void;
    onDelete: () => void;
}> = ({ cert, isOpen, onClick, onChange, onDelete }) => {
    return (
        <div className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-md">
            <div className="flex justify-between items-center">
                <button className="flex-grow flex justify-between items-center text-left" onClick={onClick}>
                    <p className="font-semibold text-sm">{cert.name || 'Certification Name'}<br/><span className="font-normal text-xs text-gray-500 dark:text-slate-400">{cert.issuer || 'Issuer'}</span></p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/></svg>
                </button>
                 <div className="ml-2 flex-shrink-0">
                    <DeleteButton onClick={onDelete} />
                </div>
            </div>
            {isOpen && (
                <div className="mt-4 space-y-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <FormInput label="Certification Name" value={cert.name} onChange={e => onChange('name', e.target.value)} />
                    <FormInput label="Issuer" value={cert.issuer} onChange={e => onChange('issuer', e.target.value)} />
                    <DateInput label="Date" value={cert.date} onChange={value => onChange('date', value)} />
                </div>
            )}
        </div>
    )
};

const PublicationItem: React.FC<{
    pub: Publication;
    isOpen: boolean;
    onClick: () => void;
    onChange: (field: keyof Publication, value: string) => void;
    onDelete: () => void;
}> = ({ pub, isOpen, onClick, onChange, onDelete }) => {
    return (
        <div className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-md">
            <div className="flex justify-between items-center">
                <button className="flex-grow flex justify-between items-center text-left" onClick={onClick}>
                    <p className="font-semibold text-sm">{pub.title || 'Publication Title'}<br/><span className="font-normal text-xs text-gray-500 dark:text-slate-400">{pub.publisher || 'Publisher'}</span></p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/></svg>
                </button>
                 <div className="ml-2 flex-shrink-0">
                    <DeleteButton onClick={onDelete} />
                </div>
            </div>
            {isOpen && (
                <div className="mt-4 space-y-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <FormInput label="Title" value={pub.title} onChange={e => onChange('title', e.target.value)} />
                    <FormInput label="Publisher" value={pub.publisher} onChange={e => onChange('publisher', e.target.value)} />
                    <DateInput label="Date" value={pub.date} onChange={value => onChange('date', value)} />
                </div>
            )}
        </div>
    )
};


const ResumeForm: React.FC<{ resume: Resume; onFormChange: (resume: Resume) => void }> = ({ resume, onFormChange }) => {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({'contact-information': true, 'work-experience': true});
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
    const [isImprovingSummary, setIsImprovingSummary] = useState(false);

    const toggleSection = (id: string) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    }

    const toggleItem = (id: string) => {
        setOpenItems(prev => ({ ...prev, [id]: !prev[id]}));
    }

    const handleChange = <T,>(section: keyof Resume, value: T) => {
        onFormChange({ ...resume, [section]: value });
    };

    type ResumeArrayKeys = {
      [K in keyof Resume]: Resume[K] extends any[] ? K : never;
    }[keyof Resume];

    type ResumeArrayElement<K extends ResumeArrayKeys> = Resume[K] extends (infer E)[] ? E : never;
    
    const handleNestedChange = <K extends ResumeArrayKeys>(
        section: K, 
        index: number, 
        field: keyof ResumeArrayElement<K>, 
        value: string
    ) => {
        const sectionData = resume[section] as any[];
        const updatedSection = [...sectionData];
        updatedSection[index] = { ...updatedSection[index], [field]: value };
        handleChange(section, updatedSection);
    };
    
    const handleDeleteItem = (section: keyof Resume, id: string) => {
        const sectionData = resume[section] as { id: string }[];
        if (!Array.isArray(sectionData)) return;
        const updatedSection = sectionData.filter(item => item.id !== id);
        handleChange(section, updatedSection);
    };

    const handleAddItem = (section: 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'volunteering' | 'publications') => {
        const id = `${section.slice(0,3)}-${Date.now()}`;
        let newItem: any;

        switch (section) {
            case 'experience':
                newItem = { id, jobTitle: 'New Job', company: 'Company Name', location: '', startDate: '', endDate: '', description: '- Your achievement' };
                break;
            case 'education':
                newItem = { id, institution: 'University Name', degree: '', fieldOfStudy: '', startDate: '', endDate: '' };
                break;
            case 'skills':
                newItem = { id, name: 'New Skill' };
                break;
            case 'projects':
                newItem = { id, name: 'New Project', description: '', url: '' };
                break;
            case 'certifications':
                newItem = { id, name: 'New Certification', issuer: '', date: '' };
                break;
            case 'volunteering':
                newItem = { id, organization: 'Organization Name', role: '', description: '' };
                break;
            case 'publications':
                newItem = { id, title: 'Publication Title', publisher: '', date: '' };
                break;
            default:
                newItem = { id };
                break;
        }
        
        handleChange(section, [...(resume[section] as any[]), newItem]);
        
        const sectionsToAutoOpen = ['experience', 'education', 'certifications', 'publications', 'projects', 'volunteering'];
        if(sectionsToAutoOpen.includes(section)) {
            setOpenItems(prev => ({...prev, [id]: true}));
        }
    };

    const handleImproveSummary = async () => {
        if (!resume.personalInfo.summary) return;
        setIsImprovingSummary(true);
        const improved = await improveResumeText(resume.personalInfo.summary, 'professional summary');
        handleChange('personalInfo', { ...resume.personalInfo, summary: improved });
        setIsImprovingSummary(false);
    };

    const renderSection = (id: string, title: string, content: React.ReactNode) => (
        <div className="border-b border-gray-200 dark:border-slate-800">
            <SectionHeader title={title} isOpen={!!openSections[id]} onClick={() => toggleSection(id)} />
            {openSections[id] && <div className="p-4 pt-0">{content}</div>}
        </div>
    );

    return (
        <div className="divide-y divide-gray-200 dark:divide-slate-800">
            {renderSection('contact-information', 'Contact Information', (
                <div className="space-y-4">
                    <FormInput label="Full Name" value={resume.personalInfo.name} onChange={e => handleChange('personalInfo', {...resume.personalInfo, name: e.target.value})} />
                    <FormInput label="Email" value={resume.personalInfo.email} onChange={e => handleChange('personalInfo', {...resume.personalInfo, email: e.target.value})} />
                    <FormInput label="Phone" value={resume.personalInfo.phone} onChange={e => handleChange('personalInfo', {...resume.personalInfo, phone: e.target.value})} />
                    <FormInput label="Location" value={resume.personalInfo.location} onChange={e => handleChange('personalInfo', {...resume.personalInfo, location: e.target.value})} />
                    <FormInput label="Website / Portfolio" placeholder="https://your-portfolio.com" value={resume.personalInfo.website} onChange={e => handleChange('personalInfo', {...resume.personalInfo, website: e.target.value})} />
                    <FormInput label="LinkedIn" placeholder="linkedin.com/in/username" value={resume.personalInfo.linkedin || ''} onChange={e => handleChange('personalInfo', {...resume.personalInfo, linkedin: e.target.value})} />
                    <FormInput label="Twitter (X)" placeholder="twitter.com/username" value={resume.personalInfo.twitter || ''} onChange={e => handleChange('personalInfo', {...resume.personalInfo, twitter: e.target.value})} />
                </div>
            ))}

            {renderSection('target-title', 'Target Title', (
                 <FormInput label="e.g. Senior Software Engineer" value={resume.personalInfo.targetTitle || ''} onChange={e => handleChange('personalInfo', {...resume.personalInfo, targetTitle: e.target.value})} />
            ))}
            
            {renderSection('professional-summary', 'Professional Summary', (
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-xs text-gray-500 dark:text-slate-400">Summary</label>
                        <button onClick={handleImproveSummary} disabled={isImprovingSummary || !resume.personalInfo.summary} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50 flex items-center gap-1">
                            {isImprovingSummary ? 'Improving...' : '✨ Improve with AI'}
                        </button>
                    </div>
                    <textarea 
                        value={resume.personalInfo.summary} 
                        onChange={e => handleChange('personalInfo', {...resume.personalInfo, summary: e.target.value})}
                        rows={5}
                        className="w-full text-sm bg-gray-50 dark:bg-slate-800 p-2 rounded-md border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-brand-yellow"
                    />
                </div>
            ))}

            {renderSection('work-experience', 'Work Experience', (
                <div className="space-y-4">
                    {resume.experience.map((exp, index) => (
                       <ExperienceItem 
                            key={exp.id} 
                            exp={exp}
                            isOpen={!!openItems[exp.id]}
                            onClick={() => toggleItem(exp.id)}
                            onChange={(field, value) => handleNestedChange('experience', index, field, value)}
                            onDelete={() => handleDeleteItem('experience', exp.id)}
                       />
                    ))}
                    <AddItemButton onClick={() => handleAddItem('experience')} text="Add Experience" />
                </div>
            ))}

            {renderSection('education', 'Education', (
                 <div className="space-y-4">
                    {resume.education.map((edu, index) => (
                       <EducationItem
                            key={edu.id} 
                            edu={edu}
                            isOpen={!!openItems[edu.id]}
                            onClick={() => toggleItem(edu.id)}
                            onChange={(field, value) => handleNestedChange('education', index, field, value)}
                            onDelete={() => handleDeleteItem('education', edu.id)}
                       />
                    ))}
                    <AddItemButton onClick={() => handleAddItem('education')} text="Add Education" />
                </div>
            ))}
            {renderSection('skills-interests', 'Skills & Interests', (
                <div className="space-y-4">
                    {resume.skills.map((skill, index) => (
                        <SkillItem
                            key={skill.id}
                            skill={skill}
                            onChange={(value) => handleNestedChange('skills', index, 'name', value)}
                            onDelete={() => handleDeleteItem('skills', skill.id)}
                        />
                    ))}
                    <AddItemButton onClick={() => handleAddItem('skills')} text="Add Skill" />
                </div>
            ))}
            {renderSection('certifications', 'Certifications', (
                <div className="space-y-4">
                    {resume.certifications.map((cert, index) => (
                       <CertificationItem
                            key={cert.id} 
                            cert={cert}
                            isOpen={!!openItems[cert.id]}
                            onClick={() => toggleItem(cert.id)}
                            onChange={(field, value) => handleNestedChange('certifications', index, field, value)}
                            onDelete={() => handleDeleteItem('certifications', cert.id)}
                       />
                    ))}
                    <AddItemButton onClick={() => handleAddItem('certifications')} text="Add Certification" />
                </div>
            ))}
            {renderSection('projects', 'Projects', (
                 <div className="space-y-4">
                    {resume.projects.map((proj, index) => (
                       <ProjectItem
                            key={proj.id} 
                            proj={proj}
                            isOpen={!!openItems[proj.id]}
                            onClick={() => toggleItem(proj.id)}
                            onChange={(field, value) => handleNestedChange('projects', index, field, value)}
                            onDelete={() => handleDeleteItem('projects', proj.id)}
                       />
                    ))}
                    <AddItemButton onClick={() => handleAddItem('projects')} text="Add Project" />
                </div>
            ))}
             {renderSection('volunteering-leadership', 'Volunteering & Leadership', (
                 <div className="space-y-4">
                    {resume.volunteering.map((vol, index) => (
                       <VolunteeringItem
                            key={vol.id} 
                            vol={vol}
                            isOpen={!!openItems[vol.id]}
                            onClick={() => toggleItem(vol.id)}
                            onChange={(field, value) => handleNestedChange('volunteering', index, field, value)}
                            onDelete={() => handleDeleteItem('volunteering', vol.id)}
                       />
                    ))}
                    <AddItemButton onClick={() => handleAddItem('volunteering')} text="Add Volunteering" />
                </div>
            ))}
            {renderSection('publications', 'Publications', (
                <div className="space-y-4">
                    {resume.publications.map((pub, index) => (
                       <PublicationItem
                            key={pub.id} 
                            pub={pub}
                            isOpen={!!openItems[pub.id]}
                            onClick={() => toggleItem(pub.id)}
                            onChange={(field, value) => handleNestedChange('publications', index, field, value)}
                            onDelete={() => handleDeleteItem('publications', pub.id)}
                       />
                    ))}
                    <AddItemButton onClick={() => handleAddItem('publications')} text="Add Publication" />
                </div>
            ))}
        </div>
    );
};

export default ResumeForm;