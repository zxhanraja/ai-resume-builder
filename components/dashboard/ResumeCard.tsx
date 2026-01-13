
import React from 'react';
import type { Resume } from '../../types';

interface ResumeCardProps {
    resume: Resume;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ resume, onEdit, onDelete }) => {
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-black/10 dark:border-slate-700 shadow-sm hover:shadow-brand-yellow/10 hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{resume.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">Last edited: {formatDate(resume.lastEdited)}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Template: <span className="capitalize font-medium text-gray-700 dark:text-slate-300">{resume.template}</span></p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-t border-black/10 dark:border-slate-700 flex justify-end items-center space-x-2">
                <button 
                    onClick={() => onDelete(resume.id)}
                    className="font-semibold bg-transparent text-red-500 hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-400/10 py-2 px-4 rounded-lg transition-colors text-sm"
                >
                    Delete
                </button>
                <button 
                    onClick={() => onEdit(resume.id)}
                    className="font-bold bg-brand-yellow text-black py-2 px-4 rounded-lg hover:brightness-95 transition-colors text-sm"
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default ResumeCard;