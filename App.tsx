
import React, { useState, useEffect, useRef } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { ThemeProvider } from './hooks/useTheme';
import Navbar from './components/shared/Navbar';
import LandingPage from './components/landing/LandingPage';
import DashboardPage from './components/dashboard/DashboardPage';
import BuilderPage from './components/builder/BuilderPage';
import type { Resume, View, BlogPost, TemplateName } from './types';
import { mockResumes, BLOG_POSTS, TEMPLATES } from './constants';
import { parseResumeFromText, parseResumeFromFile, testConnectionAndListModels } from './services/geminiService';

import FeaturesPage from './components/pages/FeaturesPage';
import FaqPage from './components/pages/FaqPage';
import AboutUsPage from './components/pages/AboutUsPage';
import BlogPage from './components/pages/BlogPage';
import BlogPostPage from './components/pages/BlogPostPage';
import ContactPage from './components/pages/ContactPage';
import PrivacyPolicyPage from './components/pages/PrivacyPolicyPage';
import TermsOfServicePage from './components/pages/TermsOfServicePage';


// --- SVG Icons for Modal --- //
const FileIcon = ({ className = "w-5 h-5" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6.414A2 2 0 0017.414 5L13 1.586A2 2 0 0011.586 1H6a2 2 0 00-2 2zm6 10a1 1 0 10-2 0v1a1 1 0 102 0v-1zm-3 0a1 1 0 10-2 0v1a1 1 0 102 0v-1zm6-3a1 1 0 10-2 0v3a1 1 0 102 0v-3zm-3 0a1 1 0 10-2 0v3a1 1 0 102 0v-3z" clipRule="evenodd" /></svg>);
const TextIcon = ({ className = "w-5 h-5" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zM2 15.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>);
const ErrorIcon = ({ className = "w-5 h-5" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>);
const SpinnerIcon = ({ className = "w-5 h-5 animate-spin" }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>);
const UploadIcon = ({ className = "w-8 h-8" }) => (<svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" /></svg>);

const ImportResumeModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onImport: (resumeData: any) => void;
}> = ({ isOpen, onClose, onImport }) => {
    const [activeTab, setActiveTab] = useState<'file' | 'text'>('file');
    const [pastedText, setPastedText] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // --- File Upload Handlers --- //
    const handleFileChange = (file: File | null) => {
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError("File is too large. Maximum size is 5MB.");
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
            setError(null);
        }
    };

    const handleFileSelectEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(e.target.files ? e.target.files[0] : null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('border-brand-yellow', 'dark:border-brand-yellow');
        handleFileChange(e.dataTransfer.files ? e.dataTransfer.files[0] : null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add('border-brand-yellow', 'dark:border-brand-yellow');
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('border-brand-yellow', 'dark:border-brand-yellow');
    };

    const handleSubmitFile = async () => {
        if (!selectedFile) {
            setError("Please select a file first.");
            return;
        }
        setIsLoading(true);
        setError(null);

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async () => {
            try {
                const base64Data = (reader.result as string).split(',')[1];
                const fileData = {
                    mimeType: selectedFile.type,
                    data: base64Data,
                };
                const parsedData = await parseResumeFromFile(fileData);
                if (parsedData.error) {
                    throw new Error(parsedData.error);
                }
                onImport(parsedData);
            } catch (err: any) {
                setError(err.message || "An unexpected error occurred while parsing.");
                setIsLoading(false);
            }
        };
        reader.onerror = () => {
            setError("Failed to read the selected file.");
            setIsLoading(false);
        };
    };

    // --- Text Paste Handler --- //
    const handleSubmitText = async (text: string) => {
        if (!text.trim()) {
            setError("Please provide some text to parse.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const parsedData = await parseResumeFromText(text);
            if (parsedData.error) {
                throw new Error(parsedData.error);
            }
            onImport(parsedData);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setActiveTab('file');
            setPastedText('');
            setSelectedFile(null);
            setIsLoading(false);
            setError(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const tabs = [
        { id: 'file', label: 'Resume File', icon: <FileIcon /> },
        { id: 'text', label: 'Paste Text', icon: <TextIcon /> }
    ];


    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }} onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all relative" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold">Import Your Resume</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Quickly populate your resume by importing from an existing document.</p>
                </div>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                    <CloseIcon />
                </button>

                <div className="p-6">
                    <div className="flex bg-gray-100 dark:bg-slate-900/50 rounded-lg p-1 mb-6">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`w-1/2 py-2 px-3 text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${activeTab === tab.id ? 'bg-white shadow dark:bg-slate-700 text-black dark:text-white' : 'text-gray-500 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>
                                {tab.icon}
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {activeTab === 'file' && (
                        <div>
                            <p className="text-sm text-gray-600 dark:text-slate-300 mb-3 text-center">Upload your resume and our AI will parse it for you.</p>
                            <div
                                className="flex items-center justify-center w-full mt-2"
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-slate-800/50 hover:bg-gray-100 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-700/50 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500 dark:text-gray-400">
                                        <UploadIcon className="w-8 h-8 mb-4" />
                                        <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs">PDF, DOC, DOCX (MAX. 5MB)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileSelectEvent} accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                                </label>
                            </div>
                            {selectedFile && <p className="text-center text-sm mt-3 text-gray-600 dark:text-slate-300">Selected: <strong>{selectedFile.name}</strong></p>}
                            <button onClick={handleSubmitFile} disabled={isLoading || !selectedFile} className="mt-4 w-full bg-brand-yellow text-black font-bold py-3 px-6 rounded-lg hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                {isLoading && <SpinnerIcon />}
                                {isLoading ? 'Parsing Resume...' : 'Parse Resume & Continue'}
                            </button>
                        </div>
                    )}

                    {activeTab === 'text' && (
                        <div>
                            <p className="text-sm text-gray-600 dark:text-slate-300 mb-3">Paste your resume content below. Our AI will automatically parse and structure it for you.</p>
                            <textarea
                                value={pastedText}
                                onChange={(e) => setPastedText(e.target.value)}
                                rows={10}
                                placeholder="Paste your resume content here..."
                                className="w-full p-3 border border-gray-300 dark:border-slate-600 bg-transparent rounded-lg focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition"
                            />
                            <button onClick={() => handleSubmitText(pastedText)} disabled={isLoading || !pastedText} className="mt-4 w-full bg-brand-yellow text-black font-bold py-3 px-6 rounded-lg hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                {isLoading && <SpinnerIcon />}
                                {isLoading ? 'Parsing Resume...' : 'Parse Resume & Continue'}
                            </button>
                        </div>
                    )}
                    {error && (
                        <div className="mt-4 flex items-center gap-3 text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 p-3 rounded-lg">
                            <ErrorIcon className="w-6 h-6 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


const AppContent: React.FC = () => {
    // Check if auth hook is available, if not, bypass auth logic
    const auth = useAuth();
    const userHook = useUser();

    const isSignedIn = auth?.isSignedIn;
    const isLoaded = auth?.isLoaded;
    const user = userHook?.user;

    const [view, setView] = useState<View>('landing');
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
    const [isImportModalOpen, setImportModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [appIsInitialized, setAppIsInitialized] = useState(false);
    const hasLoadedData = useRef(false);

    // Fail-safe: Hide loading screen after 3 seconds no matter what
    useEffect(() => {
        // Run debug check
        testConnectionAndListModels();

        const timer = setTimeout(() => {
            setAppIsInitialized(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isLoaded && !hasLoadedData.current) {
            if (isSignedIn && user) {
                try {
                    const storageKey = `resumes_${user.id}`;
                    const savedResumes = localStorage.getItem(storageKey);
                    setResumes(savedResumes ? JSON.parse(savedResumes) : mockResumes);
                } catch (error) {
                    console.error("Failed to load resumes from localStorage:", error);
                    setResumes(mockResumes);
                }
            } else {
                setResumes([]);
            }
            hasLoadedData.current = true;
            setAppIsInitialized(true);
        } else if (isLoaded === false) { // Handle cases where Clerk is not available
            setResumes([]);
            hasLoadedData.current = true;
            setAppIsInitialized(true);
        }
    }, [isLoaded, isSignedIn, user]);

    useEffect(() => {
        if (appIsInitialized) {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    if (loadingScreen) loadingScreen.style.display = 'none';
                }, 500);
            }
        }
    }, [appIsInitialized]);

    useEffect(() => {
        if (hasLoadedData.current && isSignedIn && user) {
            const storageKey = `resumes_${user.id}`;
            localStorage.setItem(storageKey, JSON.stringify(resumes));
        }
    }, [resumes, isSignedIn, user]);


    const handleCreateFromTemplate = (templateId: TemplateName) => {
        const now = Date.now();
        const templateInfo = TEMPLATES.find(t => t.id === templateId);
        const newResume: Resume = {
            id: `res-${now}`,
            title: templateInfo ? `${templateInfo.name} Resume` : 'Untitled Resume',
            template: templateId,
            lastEdited: new Date().toISOString(),
            personalInfo: { name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', location: 'City, State', website: 'your-portfolio.com', summary: 'A brief professional summary about your skills and goals.', targetTitle: 'Target Job Title' },
            experience: [],
            education: [],
            skills: [],
            projects: [],
            certifications: [],
            volunteering: [],
            publications: [],
            design: {
                fontFamily: "'Inter', sans-serif",
                fontSize: '10pt',
                accentColor: '#000000',
                lineHeight: '1.4',
                dateFormat: 'MM/YYYY',
                headerAlignment: 'left',
                dateAlignment: 'right',
                locationAlignment: 'right',
                skillsLayout: 'columns',
                paperSize: 'Letter',
                leftRightMargin: 0.6,
                topBottomMargin: 0.6,
            }
        };
        setResumes(prev => [newResume, ...prev]);
        setSelectedResumeId(newResume.id);
        setView('builder');
    };

    useEffect(() => {
        if (appIsInitialized && isSignedIn && user) {
            const handleAuthChange = async () => {
                const templateToCreate = user.unsafeMetadata?.initiate_create_flow_with_template as TemplateName | undefined;
                const simpleCreateFlow = user.unsafeMetadata?.initiate_create_flow === true;

                if (templateToCreate) {
                    await user.update({ unsafeMetadata: { initiate_create_flow_with_template: undefined } });
                    handleCreateFromTemplate(templateToCreate);
                } else if (simpleCreateFlow) {
                    await user.update({ unsafeMetadata: { initiate_create_flow: undefined } });
                    handleCreateNew();
                }
            };
            handleAuthChange();
        }
    }, [appIsInitialized, isSignedIn, user]);

    useEffect(() => {
        if (appIsInitialized) {
            if (isSignedIn && view === 'landing') {
                setView('dashboard');
            }
            if (!isSignedIn) {
                const publicPages: View[] = ['landing', 'features', 'faq', 'about', 'blog', 'contact', 'privacy', 'terms', 'blogPost'];
                if (!publicPages.includes(view)) {
                    setView('landing');
                }
            }
        }
    }, [isSignedIn, appIsInitialized, view]);

    const handleCreateNew = () => {
        setImportModalOpen(true);
    };

    const handleImportedResume = (parsedData: any) => {
        const now = Date.now();
        const newResume: Resume = {
            id: `res-${now}`,
            title: parsedData.personalInfo?.name ? `${parsedData.personalInfo.name}'s Resume` : 'Untitled Resume',
            template: 'professionalV2',
            lastEdited: new Date().toISOString(),
            personalInfo: parsedData.personalInfo || { name: '', email: '', phone: '', location: '', website: '', summary: '', targetTitle: '' },
            experience: (parsedData.experience || []).map((exp: any, i: number) => ({ ...exp, id: `exp-${now}-${i}` })),
            education: (parsedData.education || []).map((edu: any, i: number) => ({ ...edu, id: `edu-${now}-${i}` })),
            skills: (parsedData.skills || []).map((skill: any, i: number) => ({ ...skill, id: `skill-${now}-${i}` })),
            projects: (parsedData.projects || []).map((proj: any, i: number) => ({ ...proj, id: `proj-${now}-${i}` })),
            certifications: (parsedData.certifications || []).map((cert: any, i: number) => ({ ...cert, id: `cert-${now}-${i}` })),
            volunteering: (parsedData.volunteering || []).map((vol: any, i: number) => ({ ...vol, id: `vol-${now}-${i}` })),
            publications: (parsedData.publications || []).map((pub: any, i: number) => ({ ...pub, id: `pub-${now}-${i}` })),
            design: {
                fontFamily: "'Inter', sans-serif",
                fontSize: '10pt',
                accentColor: '#000000',
                lineHeight: '1.4',
                dateFormat: 'MM/YYYY',
                headerAlignment: 'left',
                dateAlignment: 'right',
                locationAlignment: 'right',
                skillsLayout: 'columns',
                paperSize: 'Letter',
                leftRightMargin: 0.6,
                topBottomMargin: 0.6,
            }
        };
        setResumes(prev => [newResume, ...prev]);
        setSelectedResumeId(newResume.id);
        setImportModalOpen(false);
        setView('builder');
    };

    const handleCreateBlank = () => {
        const now = Date.now();
        const newResume: Resume = {
            id: `res-${now}`,
            title: 'Untitled Resume',
            template: 'professionalV2',
            lastEdited: new Date().toISOString(),
            personalInfo: { name: 'John Doe', email: 'john.doe@example.com', phone: '', location: '', website: '', summary: '', targetTitle: '' },
            experience: [],
            education: [],
            skills: [],
            projects: [],
            certifications: [],
            volunteering: [],
            publications: [],
            design: {
                fontFamily: "'Inter', sans-serif",
                fontSize: '10pt',
                accentColor: '#000000',
                lineHeight: '1.4',
                dateFormat: 'MM/YYYY',
                headerAlignment: 'left',
                dateAlignment: 'right',
                locationAlignment: 'right',
                skillsLayout: 'columns',
                paperSize: 'Letter',
                leftRightMargin: 0.6,
                topBottomMargin: 0.6,
            }
        };
        setResumes(prev => [newResume, ...prev]);
        setSelectedResumeId(newResume.id);
        setView('builder');
    };

    const handleEdit = (id: string) => {
        setSelectedResumeId(id);
        setView('builder');
    };

    const handleDelete = (id: string) => {
        setResumes(prev => prev.filter(r => r.id !== id));
    };

    const handleSave = (updatedResume: Resume) => {
        setResumes(prev => prev.map(r => r.id === updatedResume.id ? { ...updatedResume, lastEdited: new Date().toISOString() } : r));
        setView('dashboard');
    };

    const handleBackToDashboard = () => {
        setSelectedResumeId(null);
        setView('dashboard');
    }

    const handleHomeClick = () => {
        if (isSignedIn) {
            handleBackToDashboard();
        } else {
            setView('landing');
        }
    };

    const handleNavigateToLanding = () => {
        setView('landing');
    };

    const handleViewPost = (post: BlogPost) => {
        setSelectedPost(post);
        setView('blogPost');
    };

    const selectedResume = resumes.find(r => r.id === selectedResumeId);

    const renderContent = () => {
        if (!appIsInitialized) {
            return null;
        }

        switch (view) {
            case 'landing': return <LandingPage onNavigate={setView} onCreateNew={handleCreateNew} onCreateFromTemplate={handleCreateFromTemplate} />;
            case 'dashboard': return <DashboardPage resumes={resumes} onCreateNew={handleCreateNew} onEdit={handleEdit} onDelete={handleDelete} onCreateBlank={handleCreateBlank} />;
            case 'builder': return selectedResume && <BuilderPage resume={selectedResume} onSave={handleSave} onBack={handleBackToDashboard} />;
            case 'features': return <FeaturesPage onBackToHome={handleNavigateToLanding} />;
            case 'faq': return <FaqPage onBackToHome={handleNavigateToLanding} />;
            case 'about': return <AboutUsPage onBackToHome={handleNavigateToLanding} />;
            case 'blog': return <BlogPage onBackToHome={handleNavigateToLanding} onViewPost={handleViewPost} />;
            case 'blogPost': return selectedPost && <BlogPostPage post={selectedPost} onBackToBlog={() => setView('blog')} />;
            case 'contact': return <ContactPage onBackToHome={handleNavigateToLanding} />;
            case 'privacy': return <PrivacyPolicyPage onBackToHome={handleNavigateToLanding} />;
            case 'terms': return <TermsOfServicePage onBackToHome={handleNavigateToLanding} />;
            default: return <LandingPage onNavigate={setView} onCreateNew={handleCreateNew} onCreateFromTemplate={handleCreateFromTemplate} />;
        }
    }

    const showNavbar = !['builder'].includes(view);


    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800 font-sans antialiased dark:bg-slate-900 dark:text-slate-200">
            {showNavbar && (
                <div className="no-print">
                    <Navbar onHomeClick={handleHomeClick} view={view} onNavigate={setView} />
                </div>
            )}
            <main className="flex-grow flex flex-col min-h-0">
                {renderContent()}
            </main>
            <ImportResumeModal isOpen={isImportModalOpen} onClose={() => setImportModalOpen(false)} onImport={handleImportedResume} />
        </div>
    );
}


const App = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

export default App;