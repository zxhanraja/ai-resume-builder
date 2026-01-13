import React from 'react';
import InfoPageLayout from './InfoPageLayout';
import { BLOG_POSTS } from '../../constants';
import type { BlogPost as BlogPostType } from '../../types';

const BlogPost: React.FC<{ post: BlogPostType; onView: () => void }> = ({ post, onView }) => (
    <div className="border-l-4 border-brand-yellow pl-6 py-4">
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">{post.date}</p>
        <h3 
            className="text-2xl font-bold mb-2 hover:text-brand-yellow transition-colors cursor-pointer"
            onClick={onView}
        >
            {post.title}
        </h3>
        <p>{post.excerpt}</p>
        <button onClick={onView} className="text-sm font-semibold text-brand-yellow hover:underline mt-4 inline-block">Read More &rarr;</button>
    </div>
);

const BlogPage: React.FC<{ onBackToHome: () => void; onViewPost: (post: BlogPostType) => void; }> = ({ onBackToHome, onViewPost }) => {
    return (
        <InfoPageLayout title="Our Blog" onBackToHome={onBackToHome}>
            <p className="lead">
                Stay updated with the latest tips, tricks, and trends in resume writing, career development, and job searching. Our experts share their insights to help you succeed.
            </p>
            <div className="mt-12 space-y-12">
                {BLOG_POSTS.map(post => (
                    <BlogPost 
                        key={post.id}
                        post={post}
                        onView={() => onViewPost(post)}
                    />
                ))}
            </div>
        </InfoPageLayout>
    );
};

export default BlogPage;