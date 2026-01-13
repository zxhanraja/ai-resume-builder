import React, { useState } from 'react';
import { SignUpButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { FaqSection } from './FaqSection';
import { TemplatesSection } from './TemplatesSection';
import type { View, TemplateName } from '../../types';


// --- SVG Icons --- //
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;

const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;


// --- Custom Illustrations for Features --- //

const CreateResumeIllustration = () => (
    <div className="p-6 bg-gray-100 dark:bg-slate-800/50 rounded-2xl shadow-xl border-2 border-black/5 dark:border-slate-700/50 transform group-hover:scale-105 transition-transform duration-500">
        <div className="space-y-3">
            <div className="p-4 bg-white dark:bg-slate-700 rounded-lg flex justify-between items-center shadow-sm transform transition-transform duration-300 group-hover:-translate-x-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-slate-600 rounded flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
                    <span className="font-semibold text-sm">Start From Scratch</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </div>
            <div className="p-4 bg-white dark:bg-slate-700 rounded-lg flex justify-between items-center shadow-sm transform transition-transform duration-300 group-hover:translate-x-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-slate-600 rounded flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg></div>
                    <span className="font-semibold text-sm">Upload Resume</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </div>
        </div>
    </div>
);

const CustomizeAIIllustration = () => (
    <div className="p-6 bg-gray-100 dark:bg-slate-800/50 rounded-2xl shadow-xl border-2 border-black/5 dark:border-slate-700/50 transform group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm relative">
            <h4 className="font-bold text-sm mb-2">Intern at Acme <span className="text-gray-400 dark:text-slate-500 font-normal">(Before)</span></h4>
            <div className="space-y-1.5">
                <div className="h-2 w-5/6 bg-gray-200 dark:bg-slate-600 rounded"></div>
                <div className="h-2 w-4/6 bg-gray-200 dark:bg-slate-600 rounded"></div>
            </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125">
             <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-black shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm mt-4 border-2 border-black dark:border-brand-yellow">
            <h4 className="font-bold text-sm mb-2">Data Analyst Intern at Acme Corp <span className="text-gray-500 dark:text-slate-300 font-normal">(Updated)</span></h4>
            <div className="space-y-1.5">
                <div className="h-2 w-full bg-gray-200 dark:bg-slate-600 rounded"></div>
                <div className="h-2 w-full bg-gray-200 dark:bg-slate-600 rounded"></div>
                <div className="h-2 w-5/6 bg-gray-200 dark:bg-slate-600 rounded"></div>
            </div>
        </div>
    </div>
);

const OptimizeIllustration = () => (
     <div className="p-6 bg-gray-100 dark:bg-slate-800/50 rounded-2xl shadow-xl border-2 border-black/5 dark:border-slate-700/50 transform group-hover:scale-105 transition-transform duration-500 relative flex items-center justify-between gap-4">
        {/* Left Card: Job Description */}
        <div className="w-1/2 p-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
            <h4 className="font-bold text-xs mb-2">Job Description</h4>
            <div className="space-y-1.5">
                <div className="h-1.5 w-1/2 bg-gray-200 dark:bg-slate-600 rounded"></div>
                <div className="h-1.5 w-full bg-brand-yellow/50 dark:bg-brand-yellow/30 rounded"></div>
                <div className="h-1.5 w-full bg-gray-200 dark:bg-slate-600 rounded"></div>
                <div className="h-1.5 w-3/4 bg-brand-yellow/50 dark:bg-brand-yellow/30 rounded"></div>
            </div>
        </div>

        <div className="w-8 h-8 bg-brand-yellow rounded-full flex-shrink-0 flex items-center justify-center text-black z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </div>

        {/* Right Card: Tailored Resume */}
        <div className="w-1/2 p-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm border-2 border-black dark:border-brand-yellow">
            <h4 className="font-bold text-xs mb-2">Tailored Resume</h4>
            <div className="space-y-1.5">
                <div className="h-1.5 w-1/2 bg-gray-200 dark:bg-slate-600 rounded"></div>
                <div className="h-1.5 w-full bg-black/50 dark:bg-brand-yellow/70 rounded"></div>
                <div className="h-1.5 w-full bg-gray-200 dark:bg-slate-600 rounded"></div>
                <div className="h-1.5 w-3/4 bg-black/50 dark:bg-brand-yellow/70 rounded"></div>
            </div>
        </div>
    </div>
);


// --- Page Sections --- //

const FloatingCard: React.FC<{className?: string, animationDelay?: string}> = ({className, animationDelay}) => (
    <div 
        className={`absolute bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg animate-float ${className}`}
        style={{ animationDelay: animationDelay || '0s', animationDuration: `${6 + Math.random() * 4}s` }}
    >
        <div className="p-2 space-y-1">
            <div className="h-1 w-8 bg-gray-300 dark:bg-slate-600 rounded-full"></div>
            <div className="h-1 w-12 bg-gray-300 dark:bg-slate-600 rounded-full"></div>
            <div className="h-1 w-10 bg-gray-300 dark:bg-slate-600 rounded-full"></div>
        </div>
    </div>
)


const Hero: React.FC<{ onCreateNew: () => void }> = ({ onCreateNew }) => (
    <section className="relative text-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50 dark:opacity-30">
            <FloatingCard className="hidden md:block top-[10%] left-[5%] w-24 h-16" />
            <FloatingCard className="hidden md:block top-[20%] right-[8%] w-32 h-20" animationDelay="2s" />
            <FloatingCard className="hidden md:block bottom-[15%] left-[15%]" animationDelay="1s" />
            <FloatingCard className="hidden md:block bottom-[25%] right-[20%] w-28 h-20" animationDelay="3s" />
            <FloatingCard className="hidden md:block top-[60%] left-[30%]" animationDelay="2.5s" />
            <FloatingCard className="hidden md:block top-[50%] right-[10%] w-20 h-16" animationDelay="1.5s" />
        </div>
        <div className="relative max-w-4xl mx-auto z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white animate-fade-in-up">
                Build your resume with the power of <span className="bg-brand-yellow text-gray-900 px-2 rounded-md">AI</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Create a job-winning resume in minutes. Our AI-powered builder helps you craft the perfect resume to land your dream job.
            </p>
            <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                 <SignedIn>
                     <button onClick={onCreateNew} className="bg-black dark:bg-brand-yellow dark:text-black text-white font-bold py-4 px-8 rounded-lg hover:bg-gray-800 dark:hover:brightness-95 transition-transform hover:scale-105 transform duration-300 flex items-center justify-center gap-2 mx-auto">
                        Create My Resume for Free
                        <ArrowRightIcon />
                    </button>
                </SignedIn>
                <SignedOut>
                    <SignUpButton mode="modal" unsafeMetadata={{ initiate_create_flow: true }}>
                        <button className="bg-black dark:bg-brand-yellow dark:text-black text-white font-bold py-4 px-8 rounded-lg hover:bg-gray-800 dark:hover:brightness-95 transition-transform hover:scale-105 transform duration-300 flex items-center justify-center gap-2 mx-auto">
                            Create My Resume for Free
                            <ArrowRightIcon />
                        </button>
                    </SignUpButton>
                </SignedOut>
            </div>
             <div className="mt-8 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User 1" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User 2" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="User 3" />
                </div>
                <p className="ml-3 text-sm font-medium text-gray-600 dark:text-slate-400">Trusted by 1,000,000+ professionals worldwide</p>
            </div>
        </div>
    </section>
);

const Logos: React.FC = () => {
    const logos = ["Adobe", "Google", "Meta", "Netflix", "Amazon", "Airbnb", "Spotify", "Tesla", "Bloomberg", "Microsoft", "Apple", "Salesforce"];
    const duplicatedLogos = [...logos, ...logos];

    return (
        <section className="py-12 bg-white dark:bg-slate-900">
            <div className="container mx-auto text-center">
                <p className="text-sm font-semibold text-gray-500 dark:text-slate-400 mb-6">Trusted by job seekers who've landed at top companies</p>
                <div
                    className="relative w-full overflow-hidden"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
                    }}
                >
                    <div className="flex w-max animate-infinite-scroll">
                        {duplicatedLogos.map((logo, index) => (
                            <div key={index} className="flex-shrink-0 px-4">
                                <div className="bg-brand-yellow text-black font-semibold px-4 py-2 rounded-full">
                                    {logo}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeatureSection: React.FC<{
    title: React.ReactNode;
    description: string;
    ctaText: string;
    illustration: React.ReactNode;
    reverse?: boolean;
    onCreateNew: () => void;
}> = ({ title, description, ctaText, illustration, reverse, onCreateNew }) => (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-24 group ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{title}</h2>
            <p className="text-gray-600 dark:text-slate-400 mb-6">{description}</p>
            <div>
                 <SignedIn>
                    <button onClick={onCreateNew} className="font-semibold text-black dark:text-brand-yellow border-2 border-black dark:border-brand-yellow py-3 px-6 rounded-lg hover:bg-black hover:text-white dark:hover:bg-brand-yellow dark:hover:text-black transition-colors">
                        {ctaText}
                    </button>
                </SignedIn>
                <SignedOut>
                    <SignUpButton mode="modal" unsafeMetadata={{ initiate_create_flow: true }}>
                        <button className="font-semibold text-black dark:text-brand-yellow border-2 border-black dark:border-brand-yellow py-3 px-6 rounded-lg hover:bg-black hover:text-white dark:hover:bg-brand-yellow dark:hover:text-black transition-colors">
                            {ctaText}
                        </button>
                    </SignUpButton>
                </SignedOut>
            </div>
        </div>
        <div className="md:w-1/2">
            {illustration}
        </div>
    </div>
);


const HowItWorks: React.FC<{ onCreateNew: () => void }> = ({ onCreateNew }) => (
    <section className="py-20 px-4 sm:px-6 lg:px-8 dark:bg-slate-900">
        <div className="container mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">How It Works</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">Quickly upload, customize, and download your resume tailored to any job description in no time.</p>
            </div>
            <div className="space-y-16 md:space-y-20">
                <FeatureSection
                    title={<>Easily <span className="bg-brand-yellow text-black px-2 rounded">create or import</span> your resume</>}
                    description="Start your resume from scratch with our templates, upload an existing one, or import your LinkedIn profile."
                    ctaText="CREATE MY RESUME"
                    illustration={<CreateResumeIllustration />}
                    onCreateNew={onCreateNew}
                />
                 <FeatureSection
                    title={<>Quickly <span className="bg-brand-yellow text-black px-2 rounded">customize</span> your resume with AI</>}
                    description="Simply input your experience, and let our AI generate impactful bullet points that showcase your skill and experience."
                    ctaText="CUSTOMIZE MY RESUME"
                    illustration={<CustomizeAIIllustration />}
                    reverse
                    onCreateNew={onCreateNew}
                />
                <FeatureSection
                    title={<>Improve your resume instantly in <span className="bg-brand-yellow text-black px-2 rounded">one click</span></>}
                    description="Effortlessly optimize your resume for any job listing with just one click for instant results."
                    ctaText="OPTIMIZE MY RESUME"
                    illustration={<OptimizeIllustration />}
                    onCreateNew={onCreateNew}
                />
            </div>
        </div>
    </section>
);

const Testimonials: React.FC = () => {
    const reviews = [
        { name: 'Andrii Z', role: 'Full Stack Engineer', text: 'Honestly, this app has been incredibly helpful for my job search. Even though I\'d hadn\'t anticipated job hunting in 2024, this app/website has made the process so much easier!', rating: 5, imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { name: 'David Gartner', role: 'Financial Analyst', text: 'Careerflow gave me confidence in my CV and Cover Letter with its skill match checker and generator, enabling multiple submissions to numerous companies', rating: 5, imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { name: 'Ntow Emmanuel Akyea', role: 'Copywriter', text: 'The Careerflow extension kept me organized with job applications, improved my resume and LinkedIn, and aligned my applications to job requirements, broadening my interview opportunities.', rating: 5, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { name: 'Sarah Chen', role: 'UX Designer', text: 'The AI suggestions are a game changer. It helped me rephrase my experience in a much more impactful way. Highly recommended!', rating: 5, imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    ];
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Hear From Our <span className="bg-brand-yellow text-black px-2 rounded-md">Community</span></h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-slate-400">Trusted and loved by over 600k users worldwide.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.slice(0,3).map((review, index) => (
                         <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg text-left">
                             <div className="flex mb-4">{[...Array(review.rating)].map((_, i) => <StarIcon key={i} />)}</div>
                            <p className="text-gray-600 dark:text-slate-300 mb-6">"{review.text}"</p>
                            <div className="flex items-center">
                                <img className="w-12 h-12 rounded-full object-cover flex-shrink-0" src={review.imageUrl} alt={review.name} />
                                <div className="ml-4">
                                    <p className="font-bold text-gray-900 dark:text-white">{review.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const TwitterIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>;

const CtaSection: React.FC<{ onCreateNew: () => void }> = ({ onCreateNew }) => (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-yellow">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Ready to Land Your Dream Job?</h2>
            <p className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto">
                Stop guessing and start building a resume that gets results. Our AI-powered builder is fast, easy, and effective.
            </p>
            <div className="mt-8">
                 <SignedIn>
                    <button onClick={onCreateNew} className="bg-black text-white font-bold py-4 px-8 rounded-lg hover:bg-gray-800 transition-transform hover:scale-105 transform duration-300 flex items-center justify-center gap-2 mx-auto">
                        Create My Resume for Free
                        <ArrowRightIcon />
                    </button>
                </SignedIn>
                <SignedOut>
                    <SignUpButton mode="modal" unsafeMetadata={{ initiate_create_flow: true }}>
                        <button className="bg-black text-white font-bold py-4 px-8 rounded-lg hover:bg-gray-800 transition-transform hover:scale-105 transform duration-300 flex items-center justify-center gap-2 mx-auto">
                            Create My Resume for Free
                            <ArrowRightIcon />
                        </button>
                    </SignUpButton>
                </SignedOut>
            </div>
        </div>
    </section>
);

const Footer: React.FC<{ onNavigate: (view: View) => void }> = ({ onNavigate }) => {
    const handleNav = (e: React.MouseEvent, view: View) => {
        e.preventDefault();
        onNavigate(view);
    };

    return (
        <footer className="bg-gray-900 text-slate-300 dark:bg-slate-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-brand-yellow text-black font-bold text-xl rounded-lg">
                                RB
                            </div>
                            <span className="font-bold text-xl text-white">AI Resume Builder</span>
                        </div>
                        <p className="mt-4 text-sm text-slate-400">Build and optimize your professional resume with the power of AI.</p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="hover:text-white"><TwitterIcon /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white tracking-wider uppercase">Product</h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li><a href="#" onClick={(e) => handleNav(e, 'landing')} className="hover:text-white">Home</a></li>
                            <li><a href="#" onClick={(e) => handleNav(e, 'features')} className="hover:text-white">Features</a></li>
                            <li><a href="#" onClick={(e) => handleNav(e, 'faq')} className="hover:text-white">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li><a href="#" onClick={(e) => handleNav(e, 'about')} className="hover:text-white">About Us</a></li>
                            <li><a href="#" onClick={(e) => handleNav(e, 'blog')} className="hover:text-white">Blog</a></li>
                            <li><a href="#" onClick={(e) => handleNav(e, 'contact')} className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li><a href="#" onClick={(e) => handleNav(e, 'privacy')} className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" onClick={(e) => handleNav(e, 'terms')} className="hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-slate-700 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

interface LandingPageProps {
    onNavigate: (view: View) => void;
    onCreateNew: () => void;
    onCreateFromTemplate: (templateId: TemplateName) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onCreateNew, onCreateFromTemplate }) => {
    return (
        <>
            <Hero onCreateNew={onCreateNew} />
            <Logos />
            <HowItWorks onCreateNew={onCreateNew} />
            <TemplatesSection onCreateFromTemplate={onCreateFromTemplate} />
            <Testimonials />
            <FaqSection />
            <CtaSection onCreateNew={onCreateNew} />
            <Footer onNavigate={onNavigate} />
        </>
    );
};

export default LandingPage;