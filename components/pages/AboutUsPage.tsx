import React from 'react';
import InfoPageLayout from './InfoPageLayout';

const AboutUsPage: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
    return (
        <InfoPageLayout title="About Us" onBackToHome={onBackToHome}>
            <p className="lead">
                Welcome to AI Resume Builder, where we're dedicated to helping you land your dream job. We believe that a great resume is the key that unlocks career opportunities, and we're passionate about providing the best tools to help you create one.
            </p>

            <h2>Our Mission</h2>
            <p>
                Our mission is simple: to empower job seekers with the tools and confidence they need to build professional, effective resumes. We leverage the power of artificial intelligence to simplify the resume-writing process, making it faster, smarter, and more accessible for everyone, regardless of their background or experience level.
            </p>
            
            <h2>Our Story</h2>
            <p>
                Founded in 2024 by a team of experienced recruiters, HR professionals, and software engineers, AI Resume Builder was born out of a shared frustration with the outdated and often overwhelming process of crafting a resume. We saw countless qualified candidates being overlooked simply because their resumes failed to communicate their value effectively or pass through modern Applicant Tracking Systems (ATS).
            </p>
            <p>
                We knew there had to be a better way. We envisioned a platform that could combine professional resume-writing expertise with cutting-edge AI technology. The result is an intuitive, powerful builder that not only creates beautiful resumes but also provides intelligent suggestions to make your content stronger and more impactful.
            </p>

            <h2>Why Choose Us?</h2>
            <p>
                We're more than just a software company. We're a team of career experts dedicated to your success. We are constantly researching the latest hiring trends and updating our platform to ensure you always have a competitive edge in your job search. Thank you for trusting us with a vital part of your career journey.
            </p>
        </InfoPageLayout>
    );
};

export default AboutUsPage;
