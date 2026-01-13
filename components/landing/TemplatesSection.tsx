
import React, { useState, useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import { useAuth, SignUpButton } from '@clerk/clerk-react';
import { TEMPLATES, mockResumes } from '../../constants';
import type { Resume, TemplateName, TemplateStyle, TemplateLayout } from '../../types';

import ProfessionalV2Template from '../templates/ProfessionalV2Template';
import TechTemplate from '../templates/TechTemplate';
import AcademicTemplate from '../templates/AcademicTemplate';
import CompactTemplate from '../templates/CompactTemplate';
import ModernProfessionalTemplate from '../templates/ModernProfessionalTemplate';
import ExecutiveV2Template from '../templates/ExecutiveV2Template';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';
import CrispTemplate from '../templates/CrispTemplate';
import TealTemplate from '../templates/TealTemplate';
import AtsClassicTemplate from '../templates/AtsClassicTemplate';
import AtsModernTemplate from '../templates/AtsModernTemplate';
import BoldTemplate from '../templates/BoldTemplate';
import CorporateTemplate from '../templates/CorporateTemplate';
import ElegantTemplate from '../templates/ElegantTemplate';

// Icons
const AtsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);
const CustomizeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
);
const ProfessionalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);


const FullTemplatePreview: React.FC<{ templateId: TemplateName }> = ({ templateId }) => {
    const resumeForPreview: Resume = { ...mockResumes[0], template: templateId };

    switch (templateId) {
        case 'atsClassic': return <AtsClassicTemplate resume={resumeForPreview} />;
        case 'atsModern': return <AtsModernTemplate resume={resumeForPreview} />;
        case 'bold': return <BoldTemplate resume={resumeForPreview} />;
        case 'corporate': return <CorporateTemplate resume={resumeForPreview} />;
        case 'elegant': return <ElegantTemplate resume={resumeForPreview} />;
        case 'executive': return <ExecutiveTemplate resume={resumeForPreview} />;
        case 'professionalV2': return <ProfessionalV2Template resume={resumeForPreview} />;
        case 'tech': return <TechTemplate resume={resumeForPreview} />;
        case 'academic': return <AcademicTemplate resume={resumeForPreview} />;
        case 'compact': return <CompactTemplate resume={resumeForPreview} />;
        case 'modernProfessional': return <ModernProfessionalTemplate resume={resumeForPreview} />;
        case 'executiveV2': return <ExecutiveV2Template resume={resumeForPreview} />;
        case 'crisp': return <CrispTemplate resume={resumeForPreview} />;
        case 'teal': return <TealTemplate resume={resumeForPreview} />;
        default: return <ProfessionalV2Template resume={resumeForPreview} />;
    }
};

const TemplateCardPreview: React.FC<{ templateId: TemplateName }> = ({ templateId }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.1);

    useLayoutEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const containerHeight = containerRef.current.offsetHeight;
                const contentWidth = 8.5 * 96;
                const contentHeight = 11 * 96;

                if (contentWidth > 0 && containerWidth > 0 && contentHeight > 0 && containerHeight > 0) {
                    const scaleX = containerWidth / contentWidth;
                    const scaleY = containerHeight / contentHeight;
                    setScale(Math.min(scaleX, scaleY));
                }
            }
        };

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        updateScale();

        return () => {
            if (containerRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full aspect-[8.5/11] bg-white border-2 border-gray-200 dark:border-slate-700 dark:bg-white rounded-xl pointer-events-none shadow-lg overflow-hidden">
            <div
                className="absolute top-1/2 left-1/2 bg-white"
                style={{
                    width: '8.5in',
                    height: '11in',
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    transformOrigin: 'center center',
                }}
            >
                <FullTemplatePreview templateId={templateId} />
            </div>
        </div>
    );
};

interface TemplatePreviewModalProps {
    templateId: TemplateName;
    onClose: () => void;
    onCreateFromTemplate: (templateId: TemplateName) => void;
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({ templateId, onClose, onCreateFromTemplate }) => {
    const { isSignedIn } = useAuth();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    const templateName = TEMPLATES.find(t => t.id === templateId)?.name || 'Resume';

    const handleUseTemplate = () => {
        if (onCreateFromTemplate) {
            onCreateFromTemplate(templateId);
        }
    };

    const previewWrapperRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useLayoutEffect(() => {
        const updateScale = () => {
            if (previewWrapperRef.current) {
                const wrapperWidth = previewWrapperRef.current.offsetWidth;
                const wrapperHeight = previewWrapperRef.current.offsetHeight;
                const contentWidth = 8.5 * 96; // 816px
                const contentHeight = 11 * 96; // 1056px

                if (contentWidth > 0 && wrapperWidth > 0 && contentHeight > 0 && wrapperHeight > 0) {
                    const scaleX = wrapperWidth / contentWidth;
                    const scaleY = wrapperHeight / contentHeight;
                    setScale(Math.min(scaleX, scaleY));
                }
            }
        };

        const observer = new ResizeObserver(updateScale);
        if (previewWrapperRef.current) observer.observe(previewWrapperRef.current);
        updateScale();

        return () => {
            if (previewWrapperRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(previewWrapperRef.current);
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }} onClick={onClose}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] transform transition-all flex flex-col" onClick={(e) => e.stopPropagation()}>
                <header className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-center sm:text-left">{templateName} Template</h2>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button onClick={onClose} className="w-1/2 sm:w-auto text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">Close</button>
                        <div className="w-1/2 sm:w-auto">
                            {isSignedIn ? (
                                <button onClick={handleUseTemplate} className="w-full font-bold bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 dark:bg-brand-yellow dark:text-black dark:hover:brightness-95 transition-colors">Use This Template</button>
                            ) : (
                                <SignUpButton mode="modal" unsafeMetadata={{ initiate_create_flow_with_template: templateId }}>
                                    <button className="w-full font-bold bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 dark:bg-brand-yellow dark:text-black dark:hover:brightness-95 transition-colors">Use This Template</button>
                                </SignUpButton>
                            )}
                        </div>
                    </div>
                </header>
                <div ref={previewWrapperRef} className="relative flex-grow p-4 md:p-8 overflow-hidden bg-gray-100 dark:bg-slate-950">
                    <div
                        className="shadow-2xl bg-white absolute top-1/2 left-1/2"
                        style={{
                            width: '8.5in',
                            height: '11in',
                            transform: `translate(-50%, -50%) scale(${scale})`,
                            transformOrigin: 'center center',
                        }}
                    >
                        <FullTemplatePreview templateId={templateId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface TemplatesSectionProps {
    onCreateFromTemplate: (templateId: TemplateName) => void;
    // FIX: Added isEmbedded prop to resolve type error in components/pages/TemplatesPage.tsx
    isEmbedded?: boolean;
}

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({ onCreateFromTemplate, isEmbedded }) => {
    type FilterType = 'All' | TemplateStyle | TemplateLayout;
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateName | null>(null);

    const features = [
        {
            icon: <AtsIcon />,
            title: "ATS-Optimized",
            description: "Our templates are meticulously designed to pass through modern Applicant Tracking Systems, ensuring your resume reaches a human recruiter."
        },
        {
            icon: <CustomizeIcon />,
            title: "Fully Customizable",
            description: "Take control of your resume's look and feel. Easily change colors, fonts, layouts, and sections to match your personal brand and the job you want."
        },
        {
            icon: <ProfessionalIcon />,
            title: "Professionally Designed",
            description: "Choose from a library of templates created by professional resume writers and designers, giving you a competitive edge in your job search."
        }
    ];

    const filters: FilterType[] = ['All', 'Modern', 'Traditional', 'Creative', '1 Column', '2 Column'];

    const filteredTemplates = useMemo(() => {
        if (activeFilter === 'All') return TEMPLATES;
        return TEMPLATES.filter(t => t.style === activeFilter || t.layout === activeFilter);
    }, [activeFilter]);


    return (
        <section className={`py-20 bg-gray-50 dark:bg-slate-900 overflow-hidden ${isEmbedded ? 'py-0' : ''}`}>
            <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
                {!isEmbedded && (
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                        ATS-Friendly Templates That Get Results
                    </h2>
                )}
                <p className="mt-4 text-lg text-gray-600 dark:text-slate-400 max-w-3xl mx-auto">
                    Every resume template is free, professionally designed, and fully customizable to help you stand out.
                </p>
                {!isEmbedded && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-lg border border-transparent hover:border-brand-yellow/50 hover:-translate-y-1 transition-all">
                                <div className="text-black dark:text-brand-yellow mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-slate-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-center flex-wrap gap-2 my-12 px-4 sm:px-6 lg:px-8">
                {filters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeFilter === filter
                                ? 'bg-black text-white dark:bg-brand-yellow dark:text-black'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="relative">
                <div className="flex gap-8 overflow-x-auto scrollbar-hide py-8 pl-4 pr-16 sm:pl-6 sm:pr-24 lg:pl-8 lg:pr-32 snap-x snap-mandatory">
                    {filteredTemplates.map((template, index) => (
                        <div
                            key={template.id}
                            className="flex-shrink-0 w-72 sm:w-80 snap-center opacity-0 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="group cursor-pointer" onClick={() => setSelectedTemplate(template.id)}>
                                <div className="relative rounded-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-[1.03]">
                                    <TemplateCardPreview templateId={template.id} />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-brand-yellow text-black font-bold py-3 px-6 rounded-lg">View Template</div>
                                    </div>
                                </div>
                                <h3 className="mt-4 font-semibold text-gray-800 dark:text-gray-200 text-center">{template.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-gray-50 dark:from-slate-900 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-gray-50 dark:from-slate-900 to-transparent pointer-events-none"></div>
            </div>

            {selectedTemplate && <TemplatePreviewModal templateId={selectedTemplate} onClose={() => setSelectedTemplate(null)} onCreateFromTemplate={onCreateFromTemplate} />}
        </section>
    );
};