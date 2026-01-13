import React, { useState } from 'react';

const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 dark:border-slate-700 py-6">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{q}</h3>
                <span className={`${isOpen ? 'rotate-180' : ''}`}><ChevronDownIcon /></span>
            </button>
            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <p className="pt-4 text-gray-600 dark:text-slate-400">{a}</p>
                </div>
            </div>
        </div>
    );
};

export const FaqSection: React.FC = () => {
    const faqs = [
        { q: 'Why use our AI Resume Builder?', a: 'Our AI Resume Builder helps you create professional, ATS-friendly resumes in minutes. It provides smart suggestions, beautiful templates, and tools to optimize your resume for any job application, increasing your chances of getting hired.' },
        { q: 'What additional features does our AI Resume Builder include?', a: 'Beyond resume building, we offer a LinkedIn profile optimizer, cover letter generator, job application tracker, and a Chrome extension to streamline your job search process all in one place.' },
        { q: 'Can I edit my resume directly from my browser?', a: 'Absolutely! Our platform is fully web-based, allowing you to create, edit, and download your resume from any browser without needing to install any software.' },
        { q: 'Should I build a fresh resume for each job application?', a: 'Yes, tailoring your resume for each specific job is crucial. Our AI tools make it easy to quickly customize your resume with relevant keywords and skills from the job description, significantly improving your chances of passing ATS scans.' },
        { q: 'Are your resumes ATS friendly?', a: 'Yes! All our templates are designed and tested to be fully compliant with modern Applicant Tracking Systems (ATS). We focus on clean formatting and standard sections to ensure your resume gets seen by recruiters.' },
    ];
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 dark:bg-slate-900">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                     <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Have More <span className="bg-brand-yellow text-black px-2 rounded-md">Questions?</span></h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-slate-400">Here are some of the frequently asked questions from our customers.</p>
                </div>
                <div>
                    {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
                </div>
            </div>
        </section>
    );
};
