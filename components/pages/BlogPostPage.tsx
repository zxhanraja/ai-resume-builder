import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { BlogPost } from '../../types';

const BackToBlogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);


interface BlogPostPageProps {
    post: BlogPost;
    onBackToBlog: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBackToBlog }) => {
    return (
        <div className="bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto">
                     <button 
                        onClick={onBackToBlog}
                        className="flex items-center text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-black dark:hover:text-white mb-8 transition-colors group"
                    >
                        <BackToBlogIcon />
                        Back to Blog
                    </button>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{post.title}</h1>
                    <p className="text-md text-gray-500 dark:text-slate-400 mb-8 border-b dark:border-slate-800 pb-6">{post.date}</p>
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 prose-p:dark:text-slate-300 prose-headings:dark:text-white prose-strong:dark:text-white prose-a:text-brand-yellow">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                     <button 
                        onClick={onBackToBlog}
                        className="flex items-center text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-black dark:hover:text-white mt-12 transition-colors group"
                    >
                        <BackToBlogIcon />
                        Back to Blog
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;