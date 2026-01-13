import React from 'react';
import InfoPageLayout from './InfoPageLayout';

const Feature: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p>{children}</p>
    </div>
);

const FeaturesPage: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
    return (
        <InfoPageLayout title="Our Features" onBackToHome={onBackToHome}>
            <p className="lead">Our AI Resume Builder is packed with powerful features designed to streamline your job application process and help you stand out to recruiters.</p>
            
            <Feature title="AI-Powered Content Suggestions">
                Struggling to find the right words? Our AI analyzes your experience and generates impactful, professional bullet points that highlight your achievements. Turn simple duties into compelling accomplishments that catch a recruiter's eye.
            </Feature>

            <Feature title="ATS-Friendly Templates">
                Choose from a library of professionally designed templates that are optimized for Applicant Tracking Systems (ATS). Our templates ensure that your resume is easily parsable by automated systems, so it always reaches a human.
            </Feature>

            <Feature title="Real-Time Resume Preview">
                See your changes as you make them with our live preview. Instantly visualize how your resume will look, and experiment with different templates, fonts, and colors to create the perfect document.
            </Feature>

            <Feature title="Easy Import & Export">
                Get started in seconds by importing your existing resume from a file or your LinkedIn profile. When you're done, export your masterpiece as a pixel-perfect PDF, ready to be sent out for job applications.
            </Feature>

             <Feature title="Resume Analyzer & ATS Checker">
                Get instant feedback on your resume's effectiveness. Our analyzer scores your resume based on key metrics like keyword optimization, formatting, and clarity, providing actionable suggestions for improvement.
            </Feature>

             <Feature title="Full Customization Control">
                Every aspect of your resume is customizable. Adjust margins, line spacing, colors, fonts, and section order to create a resume that truly represents your personal brand.
            </Feature>
        </InfoPageLayout>
    );
};

export default FeaturesPage;
