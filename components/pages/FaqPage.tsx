import React from 'react';
import InfoPageLayout from './InfoPageLayout';
import { FaqSection } from '../landing/FaqSection';

const FaqPage: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
    return (
        <InfoPageLayout title="Frequently Asked Questions" onBackToHome={onBackToHome}>
             <p className="lead">
                Find answers to common questions about our AI Resume Builder, its features, and how to get the most out of our platform.
            </p>
            <div className="my-12">
                <FaqSection />
            </div>
        </InfoPageLayout>
    );
};

export default FaqPage;
