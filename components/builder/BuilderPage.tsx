import React, { useState, useCallback, useMemo, useEffect, useRef, useLayoutEffect } from 'react';
import ReactMarkdown from "react-markdown";
import type { Resume, DesignSettings, TemplateName, HeaderAlignment, DateAlignment, LocationAlignment, SkillsLayout, PaperSize } from '../../types';
import ResumeForm from './ResumeForm';
import LivePreview from './LivePreview';
import { getAtsSuggestions, generateCoverLetter, applyAtsSuggestions } from '../../services/geminiService';
import { TEMPLATES } from '../../constants';


// --- SVG Icons --- //
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const ExportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const HelpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>;
const ContentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4"/><path d="M4 8h16"/><path d="m18 16 2 2-2 2"/><path d="m22 16-2 2 2 2"/></svg>;
const DesignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18"/><path d="M2 2 7.586 7.586"/><path d="m11 13 2.5 2.5"/></svg>;
const AnalyzeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9Z"/><path d="M12 8v4l2 2"/></svg>;
const CoverLetterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
const SparkleIcon = ({ className = "w-4 h-4" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M10.868 2.884c.321-.772 1.415-.772 1.736 0l.64 1.538a1 1 0 00.951.692h1.616c.815 0 1.148 1.025.53 1.518l-1.3 1.002a1 1 0 00-.364 1.118l.64 1.538c.321.772-.645 1.433-1.391 1.022l-1.3-.998a1 1 0 00-1.175 0l-1.3.998c-.746.411-1.712-.25-1.391-1.022l.64-1.538a1 1 0 00-.364-1.118l-1.3-1.002c-.618-.493-.285-1.518.53-1.518h1.616a1 1 0 00.951-.692l.64-1.538z" clipRule="evenodd" /></svg>;
const SpinnerIcon = ({ className = "w-4 h-4 animate-spin" }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);

type BuilderTab = 'content' | 'designer' | 'analyzer' | 'cover';
type MobileView = 'editor' | 'preview';

const fonts = [
    { name: 'Inter', value: "'Inter', sans-serif" },
    { name: 'Times New Roman', value: "'Times New Roman', serif" },
    { name: 'Arial', value: "'Arial', sans-serif" },
    { name: 'Georgia', value: "'Georgia', serif" },
    { name: 'Helvetica', value: "'Helvetica', sans-serif" },
    { name: 'monospace', value: "monospace" },
];

const colors = ['#000000', '#1d4ed8', '#7c3aed', '#db2777', '#16a34a', '#f97316', '#0891b2'];
const dateFormats = ['MM/YYYY', 'Month YYYY', 'MM-YYYY'];
const paperSizes: PaperSize[] = ['Letter', 'A4'];

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-200 dark:border-slate-800">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-3 px-6 text-left">
                <h3 className="font-semibold text-gray-800 dark:text-slate-200">{title}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isOpen && <div className="p-6 pt-2">{children}</div>}
        </div>
    );
};

const SliderControl: React.FC<{label: string, value: number, unit: string, min: number, max: number, step: number, onChange: (value: number) => void}> = ({label, value, unit, min, max, step, onChange}) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">{label}</label>
            <span className="text-sm text-gray-500 dark:text-slate-400">{value}{unit}</span>
        </div>
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
    </div>
);

const AlignmentControl: React.FC<{label: string, value: string, onChange: (value: any) => void, options: {value: string, label: string, icon: React.ReactNode}[]}> = ({label, value, onChange, options}) => (
    <div>
        <label className="text-sm font-medium mb-2 block">{label}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {options.map(opt => (
                <button key={opt.value} onClick={() => onChange(opt.value)} className={`border-2 rounded-md p-2 text-center group transition-colors ${value === opt.value ? 'border-black dark:border-brand-yellow' : 'border-gray-300 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-500'}`}>
                    {opt.icon}
                    <span className="text-xs font-medium mt-1 block">{opt.label}</span>
                </button>
            ))}
        </div>
    </div>
);

const DesignerPanel: React.FC<{
    design: DesignSettings;
    onDesignChange: (newDesign: DesignSettings) => void;
    currentTemplate: TemplateName;
    onTemplateChange: (template: TemplateName) => void;
}> = ({ design, onDesignChange, currentTemplate, onTemplateChange }) => {
    
    const handleUpdate = (field: keyof DesignSettings, value: any) => {
        onDesignChange({ ...design, [field]: value });
    };

    return (
        <div className="text-gray-900 dark:text-slate-200">
             <CollapsibleSection title="Template" defaultOpen>
                <div className="grid grid-cols-2 gap-3">
                    {TEMPLATES.map(template => (
                        <button 
                            key={template.id} 
                            onClick={() => onTemplateChange(template.id)}
                            className={`border-2 rounded-lg p-2 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 ${currentTemplate === template.id ? 'border-brand-yellow' : 'border-gray-200 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-500'}`}
                        >
                            <div className="h-20 bg-gray-100 dark:bg-slate-900 rounded-md mb-2 flex items-center justify-center p-1">
                                <span className="text-xs font-semibold text-gray-500">{template.name}</span>
                            </div>
                            <p className="text-xs font-semibold">{template.name}</p>
                        </button>
                    ))}
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Typography" defaultOpen>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Font Family</label>
                        <select value={design.fontFamily} onChange={(e) => handleUpdate('fontFamily', e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md p-2 mt-1 text-sm">
                            {fonts.map(font => <option key={font.name} value={font.value}>{font.name}</option>)}
                        </select>
                    </div>
                    <SliderControl label="Font Size" value={parseFloat(design.fontSize)} unit="pt" min={8} max={14} step={0.5} onChange={v => handleUpdate('fontSize', `${v}pt`)} />
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Layout">
                <div className="space-y-6">
                    <SliderControl label="Line Height" value={parseFloat(design.lineHeight)} unit="" min={1.2} max={2.0} step={0.1} onChange={v => handleUpdate('lineHeight', v.toFixed(1))} />
                    <AlignmentControl label="Header Alignment" value={design.headerAlignment} onChange={v => handleUpdate('headerAlignment', v)} options={[
                        {value: 'left', label: 'Left', icon: <div className="h-8 w-16 mx-auto bg-gray-200 dark:bg-slate-700 flex items-center justify-start p-1"><div className="h-1 w-6 bg-gray-500 rounded-full"></div></div>},
                        {value: 'center', label: 'Center', icon: <div className="h-8 w-16 mx-auto bg-gray-200 dark:bg-slate-700 flex items-center justify-center p-1"><div className="h-1 w-6 bg-gray-500 rounded-full"></div></div>},
                        {value: 'right', label: 'Right', icon: <div className="h-8 w-16 mx-auto bg-gray-200 dark:bg-slate-700 flex items-center justify-end p-1"><div className="h-1 w-6 bg-gray-500 rounded-full"></div></div>},
                    ]}/>
                    <AlignmentControl label="Skills Layout" value={design.skillsLayout} onChange={v => handleUpdate('skillsLayout', v)} options={[
                        {value: 'comma', label: 'Comma', icon: <div className="h-8 w-16 mx-auto bg-gray-200 dark:bg-slate-700 flex items-center p-1 space-x-1"><div className="h-1 w-4 bg-gray-500 rounded-full"></div><div className="h-1 w-4 bg-gray-500 rounded-full"></div><div className="h-1 w-4 bg-gray-500 rounded-full"></div></div>},
                        {value: 'list', label: 'List', icon: <div className="h-8 w-16 mx-auto bg-gray-200 dark:bg-slate-700 flex flex-col justify-center p-1 space-y-1"><div className="h-1 w-full bg-gray-500 rounded-full"></div><div className="h-1 w-full bg-gray-500 rounded-full"></div></div>},
                        {value: 'columns', label: 'Columns', icon: <div className="h-8 w-16 mx-auto bg-gray-200 dark:bg-slate-700 flex justify-center p-1 space-x-1"><div className="h-full w-1/3 bg-gray-500 rounded"></div><div className="h-full w-1/3 bg-gray-500 rounded"></div></div>},
                    ]}/>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Colors">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Accent Color</label>
                        <div className="flex gap-2 flex-wrap">
                            {colors.map(color => (
                                <button key={color} onClick={() => handleUpdate('accentColor', color)} className={`w-8 h-8 rounded-full border-2 transition-all ${design.accentColor === color ? 'border-black dark:border-brand-yellow scale-110' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: color }} />
                            ))}
                        </div>
                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Page Setup">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Paper Size</label>
                        <select value={design.paperSize} onChange={(e) => handleUpdate('paperSize', e.target.value as PaperSize)} className="w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md p-2 mt-1 text-sm">
                            {paperSizes.map(size => <option key={size} value={size}>{size}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Date Format</label>
                        <select value={design.dateFormat} onChange={(e) => handleUpdate('dateFormat', e.target.value)} className="w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md p-2 mt-1 text-sm">
                            {dateFormats.map(format => <option key={format} value={format}>{format}</option>)}
                        </select>
                    </div>
                    <SliderControl label="Left & Right Margins" value={design.leftRightMargin} unit=" in" min={0.2} max={1} step={0.05} onChange={v => handleUpdate('leftRightMargin', v)} />
                    <SliderControl label="Top & Bottom Margins" value={design.topBottomMargin} unit=" in" min={0.2} max={1} step={0.05} onChange={v => handleUpdate('topBottomMargin', v)} />
                </div>
            </CollapsibleSection>
        </div>
    );
};

const convertResumeToTextForAnalysis = (res: Resume) => {
    let text = `Name: ${res.personalInfo.name}\n`;
    if (res.personalInfo.targetTitle) text += `Target Title: ${res.personalInfo.targetTitle}\n`;
    if (res.personalInfo.summary) text += `Summary: ${res.personalInfo.summary}\n`;
    
    if (res.experience.length > 0) {
        text += "\n--- Experience ---\n";
        res.experience.forEach(exp => {
            text += `${exp.jobTitle} at ${exp.company}\n${exp.startDate} - ${exp.endDate}\n${exp.description}\n\n`;
        });
    }

    if (res.education.length > 0) {
        text += "\n--- Education ---\n";
        res.education.forEach(edu => {
            text += `${edu.degree} in ${edu.fieldOfStudy} at ${edu.institution}\n${edu.startDate} - ${edu.endDate}\n\n`;
        });
    }

    if (res.skills.length > 0) {
        text += "\n--- Skills ---\n";
        text += res.skills.map(s => s.name).join(', ') + '\n';
    }

    if (res.projects.length > 0) {
        text += "\n--- Projects ---\n";
        res.projects.forEach(proj => {
            text += `${proj.name}\n${proj.description}\n\n`;
        });
    }
    return text;
};

const AnalyzerPanel: React.FC<{ resume: Resume; onUpdateResume: (resume: Resume) => void }> = ({ resume, onUpdateResume }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<string | null>(null);
    const [isApplying, setIsApplying] = useState(false);
    const [applyError, setApplyError] = useState<string | null>(null);

    const handleAnalyze = useCallback(async () => {
        setIsLoading(true);
        setSuggestions(null);
        setApplyError(null);
        const resumeText = convertResumeToTextForAnalysis(resume);
        const result = await getAtsSuggestions(resumeText);
        setSuggestions(result);
        setIsLoading(false);
    }, [resume]);
    
    const handleApply = useCallback(async () => {
        if (!suggestions) return;
        setIsApplying(true);
        setApplyError(null);
        try {
            const result = await applyAtsSuggestions(resume, suggestions);
            if ('error' in result) {
                throw new Error(result.error);
            }
            onUpdateResume(result as Resume);
            setSuggestions('Suggestions applied successfully! You can re-analyze for more feedback.'); // Provide feedback
        } catch (err: any) {
            setApplyError(err.message || "An unexpected error occurred while applying suggestions.");
        } finally {
            setIsApplying(false);
        }
    }, [resume, suggestions, onUpdateResume]);
    
    const handleDiscard = () => {
        setSuggestions(null);
        setApplyError(null);
    };

    return (
        <div className="p-6">
            <h3 className="font-bold text-lg mb-2">Resume Analyzer</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Get AI-powered feedback to improve your resume's chances against Applicant Tracking Systems (ATS).</p>
            <button onClick={handleAnalyze} disabled={isLoading} className="w-full bg-black dark:bg-brand-yellow text-white dark:text-black font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50">
                {isLoading ? 'Analyzing...' : 'Analyze My Resume'}
            </button>
            
            {suggestions && (
                <div className="mt-6 border-t dark:border-slate-700 pt-6">
                    <h4 className="font-bold text-md mb-2">Suggestions for Improvement</h4>
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-ul:list-disc prose-ul:pl-5 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-md">
                        <ReactMarkdown>{suggestions}</ReactMarkdown>
                    </div>
                     <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button onClick={handleDiscard} className="w-full sm:w-1/2 bg-gray-200 dark:bg-slate-700 text-black dark:text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">
                            Discard
                        </button>
                        <button 
                            onClick={handleApply} 
                            disabled={isApplying} 
                            className="w-full sm:w-1/2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-indigo-700 transition-colors"
                        >
                            {isApplying ? <SpinnerIcon/> : <SparkleIcon/>}
                            {isApplying ? 'Applying...' : 'Apply Suggestions'}
                        </button>
                    </div>
                </div>
            )}
            {applyError && (
                 <div className="mt-4 text-sm text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/20 p-3 rounded-lg">
                    <p><strong>Error:</strong> {applyError}</p>
                </div>
            )}
        </div>
    );
}

const CoverLetterPanel: React.FC<{ resume: Resume }> = ({ resume }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [jobDescription, setJobDescription] = useState('');
    const [generatedLetter, setGeneratedLetter] = useState('');

    const handleGenerate = useCallback(async () => {
        if (!jobDescription.trim()) return;
        setIsLoading(true);
        setGeneratedLetter('');
        const resumeText = convertResumeToTextForAnalysis(resume);
        const result = await generateCoverLetter(resumeText, jobDescription);
        setGeneratedLetter(result);
        setIsLoading(false);
    }, [resume, jobDescription]);

    return (
        <div className="p-6 space-y-4">
            <h3 className="font-bold text-lg">AI Cover Letter Generator</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400">
                Paste a job description below, and our AI will write a tailored cover letter based on your resume.
            </p>
            <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-slate-300">Job Description</label>
                <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={8}
                    className="mt-1 w-full text-sm bg-white dark:bg-slate-800 p-2 rounded-md border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-brand-yellow"
                    placeholder="Paste the full job description here..."
                />
            </div>
            <button 
                onClick={handleGenerate} 
                disabled={isLoading || !jobDescription.trim()} 
                className="w-full bg-black dark:bg-brand-yellow text-white dark:text-black font-bold py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
            >
                {isLoading ? 'Generating...' : 'Generate Cover Letter'}
            </button>
            {generatedLetter && (
                 <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-slate-300">Your Cover Letter</label>
                    <textarea
                        value={generatedLetter}
                        onChange={(e) => setGeneratedLetter(e.target.value)}
                        rows={15}
                        className="mt-1 w-full text-sm bg-white dark:bg-slate-700 p-2 rounded-md border border-gray-200 dark:border-slate-600 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-brand-yellow"
                        placeholder="Your generated cover letter will appear here..."
                    />
                </div>
            )}
        </div>
    );
};

interface BuilderPageProps {
    resume: Resume;
    onSave: (resume: Resume) => void;
    onBack: () => void;
}

const BuilderPage: React.FC<BuilderPageProps> = ({ resume, onSave, onBack }) => {
    const [currentResume, setCurrentResume] = useState<Resume>(resume);
    const [debouncedResume, setDebouncedResume] = useState<Resume>(resume);
    const [activeTab, setActiveTab] = useState<BuilderTab>('designer');
    const [mobileView, setMobileView] = useState<MobileView>('editor');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Debounce the resume state for the preview to improve performance
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedResume(currentResume);
        }, 300); // 300ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [currentResume]);

    // This effect ensures the builder's state updates when a new resume is passed in.
    useEffect(() => {
        setCurrentResume(resume);
        setDebouncedResume(resume);
    }, [resume]);

    const handleFormChange = (updatedResume: Resume) => {
        setCurrentResume(updatedResume);
    };

    const handleExportPdf = () => {
        const resumeNode = document.getElementById('resume-preview');
        if (!resumeNode) return;

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const printDoc = iframe.contentWindow.document;
        printDoc.open();
        
        printDoc.write('<!DOCTYPE html><html><head><title>&nbsp;</title>');
        
        const headNodes = document.head.querySelectorAll('link, style, script[src*="tailwindcss"]');
        headNodes.forEach(node => {
            printDoc.write(node.outerHTML);
        });

        printDoc.write(`
            <style>
                @media print {
                    @page {
                        size: ${currentResume.design.paperSize};
                        margin: ${currentResume.design.topBottomMargin}in ${currentResume.design.leftRightMargin}in;
                        
                        /* --- FIX: Force empty margin boxes to remove browser headers/footers --- */
                        @top-left { content: '' }
                        @top-center { content: '' }
                        @top-right { content: '' }
                        @bottom-left { content: '' }
                        @bottom-center { content: '' }
                        @bottom-right { content: '' }
                    }
                    body {
                        margin: 0;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    #resume-preview {
                        box-shadow: none !important;
                        margin: 0 !important;
                        border: none !important;
                        transform: none !important;
                        /* --- FIX: Ensure height is not fixed, preventing extra blank pages --- */
                        height: auto !important;
                        min-height: unset !important;
                    }
                    .resume-template-body {
                        padding: 0 !important;
                    }
                    .page-break-inside-avoid {
                        page-break-inside: avoid;
                    }
                }
            </style>
        `);
        
        printDoc.write('</head><body>');
        printDoc.write(resumeNode.outerHTML);
        printDoc.write('</body></html>');
        printDoc.close();

        setTimeout(() => {
            try {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
            } catch (e) {
                console.error("PDF export failed:", e);
            } finally {
                setTimeout(() => document.body.removeChild(iframe), 1000);
            }
        }, 500);
    };
    
    const builderTabs = [
        { id: 'content', name: 'Content Editor', icon: ContentIcon, notification: null },
        { id: 'designer', name: 'Designer', icon: DesignIcon, notification: null },
        { id: 'analyzer', name: 'Analyzer', icon: AnalyzeIcon, notification: null },
        { id: 'cover', name: 'Cover Letter', icon: CoverLetterIcon, notification: null },
    ];
    
    const renderActivePanel = () => {
        switch (activeTab) {
            case 'content':
                return <ResumeForm resume={currentResume} onFormChange={handleFormChange} />;
            case 'designer':
                return <DesignerPanel 
                    design={currentResume.design} 
                    onDesignChange={(newDesign) => setCurrentResume(prev => ({ ...prev, design: newDesign }))} 
                    currentTemplate={currentResume.template}
                    onTemplateChange={(newTemplate) => setCurrentResume(prev => ({ ...prev, template: newTemplate }))}
                />;
            case 'analyzer':
                return <AnalyzerPanel resume={currentResume} onUpdateResume={setCurrentResume} />;
            case 'cover':
                return <CoverLetterPanel resume={currentResume} />;
            default:
                return <div className="p-6 text-center text-gray-500">This feature is coming soon!</div>;
        }
    };

    return (
        <div className="flex-grow flex flex-col min-h-0">
            {/* Header */}
            <header className="no-print flex-shrink-0 flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-slate-800">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <button onClick={onBack} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800">
                        <BackIcon />
                    </button>
                    <input 
                        type="text" 
                        value={currentResume.title} 
                        onChange={e => setCurrentResume(prev => ({...prev, title: e.target.value}))}
                        className="font-semibold text-lg bg-transparent focus:outline-none focus:ring-0 border-none p-0 w-full truncate"
                    />
                </div>
                <div className="flex items-center gap-2">
                    {/* Desktop Buttons */}
                    <div className="hidden lg:flex items-center gap-2">
                        <button onClick={() => onSave(currentResume)} className="font-semibold border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">Save & Exit</button>
                        <button onClick={handleExportPdf} className="flex items-center gap-2 font-semibold bg-brand-yellow text-black px-4 py-2 rounded-lg hover:brightness-95 transition-colors text-sm">
                            <ExportIcon />
                            <span>Export PDF</span>
                        </button>
                    </div>
                    {/* Mobile Menu */}
                    <div className="lg:hidden relative">
                         <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800">
                            <MenuIcon />
                        </button>
                        {isMobileMenuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg border dark:border-slate-700 z-10">
                                <button onClick={() => { onSave(currentResume); setMobileMenuOpen(false); }} className="w-full text-left font-semibold px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700">Save & Exit</button>
                                <button onClick={() => { handleExportPdf(); setMobileMenuOpen(false); }} className="w-full text-left flex items-center gap-2 font-semibold px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700">
                                    <ExportIcon />
                                    <span>Export PDF</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile View Toggle */}
            <div className="no-print lg:hidden p-2 flex gap-2 bg-gray-100 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
                <button onClick={() => setMobileView('editor')} className={`w-1/2 py-2 text-sm font-semibold rounded-md ${mobileView === 'editor' ? 'bg-white dark:bg-slate-800 shadow' : 'text-gray-500'}`}>Editor</button>
                <button onClick={() => setMobileView('preview')} className={`w-1/2 py-2 text-sm font-semibold rounded-md ${mobileView === 'preview' ? 'bg-white dark:bg-slate-800 shadow' : 'text-gray-500'}`}>Preview</button>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex lg:flex-row flex-col min-h-0">
                {/* Left Panel (Editor) */}
                <aside className={`no-print w-full lg:w-[45%] xl:w-2/5 flex flex-col border-r border-gray-200 dark:border-slate-800 min-h-0 ${mobileView === 'editor' ? 'flex' : 'hidden'} lg:flex`}>
                    <div className="flex-shrink-0 border-b border-gray-200 dark:border-slate-800">
                        <div className="overflow-x-auto scrollbar-hide">
                            <nav className="flex items-center justify-start sm:justify-around">
                                {builderTabs.map((tab) => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id as BuilderTab)} className={`flex-shrink-0 flex items-center gap-2 px-3 py-3 text-sm font-semibold relative transition-colors ${activeTab === tab.id ? 'text-black dark:text-brand-yellow border-b-2 border-black dark:border-brand-yellow' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}>
                                        <tab.icon />
                                        <span className="hidden sm:inline">{tab.name}</span>
                                        {tab.notification && (
                                            <span className={`absolute top-1 right-0 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${tab.notification === '!' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-600'}`}>
                                                {tab.notification}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                    <div className="flex-grow overflow-y-auto bg-gray-50 dark:bg-slate-800">
                       {renderActivePanel()}
                    </div>
                </aside>

                {/* Right Panel (Preview) */}
                <section className={`print-container flex-grow w-full lg:w-[55%] xl:w-3/5 bg-gray-100 dark:bg-slate-800 p-2 sm:p-4 lg:p-8 min-h-0 ${mobileView === 'preview' ? 'flex' : 'hidden'} lg:flex`}>
                    <LivePreview 
                        resume={debouncedResume}
                    />
                </section>
            </div>
        </div>
    );
};

export default BuilderPage;