import React from 'react';

const BackToHomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);

interface InfoPageLayoutProps {
    title: string;
    onBackToHome: () => void;
    children: React.ReactNode;
}

const InfoPageLayout: React.FC<InfoPageLayoutProps> = ({ title, onBackToHome, children }) => {
    return (
        <div className="bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto">
                    <button 
                        onClick={onBackToHome}
                        className="flex items-center text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-black dark:hover:text-white mb-8 transition-colors group"
                    >
                        <BackToHomeIcon />
                        Back to Home
                    </button>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 border-b dark:border-slate-800 pb-6">{title}</h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 prose-p:dark:text-slate-300 prose-headings:dark:text-white prose-strong:dark:text-white">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoPageLayout;
