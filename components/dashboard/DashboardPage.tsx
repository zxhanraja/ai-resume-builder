
import React from 'react';
import type { Resume } from '../../types';
import ResumeCard from './ResumeCard';


interface DashboardPageProps {
    resumes: Resume[];
    onCreateNew: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onCreateBlank: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ resumes, onCreateNew, onEdit, onDelete, onCreateBlank }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Your Resumes</h1>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                        onClick={onCreateNew}
                        className="flex items-center gap-2 w-1/2 sm:w-auto justify-center bg-black dark:bg-brand-yellow dark:text-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:brightness-95 transition-colors"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L13 9.414V13H5.5z" />
                            <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                        </svg>
                        Import Resume
                    </button>
                    <button
                        onClick={onCreateBlank}
                        className="flex items-center gap-2 w-1/2 sm:w-auto justify-center bg-gray-200 dark:bg-slate-700 text-black dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Create Blank
                    </button>
                </div>
            </div>

            {resumes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resumes.map(resume => (
                        <ResumeCard
                            key={resume.id}
                            resume={resume}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No resumes yet</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Import an existing resume or create a new one to get started.</p>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;