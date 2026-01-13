import React from 'react';
import InfoPageLayout from './InfoPageLayout';
import { TemplatesSection } from '../landing/TemplatesSection';
import type { View, TemplateName } from '../../types';

interface TemplatesPageProps {
    onBackToHome: () => void;
    onCreateFromTemplate: (templateId: TemplateName) => void;
}

const TemplatesPage: React.FC<TemplatesPageProps> = ({ onBackToHome, onCreateFromTemplate }) => {
    return (
        <InfoPageLayout title="Resume Templates" onBackToHome={onBackToHome}>
            <p className="lead">
                Browse our collection of professionally designed, ATS-friendly resume templates. 
                Whether you're in a creative field or a corporate environment, find the perfect design to showcase your skills and experience.
                All templates are free and fully customizable.
            </p>
            <div className="my-12 -mx-4 sm:-mx-6 lg:-mx-8">
                <TemplatesSection onCreateFromTemplate={onCreateFromTemplate} isEmbedded={true} />
            </div>
        </InfoPageLayout>
    );
};

export default TemplatesPage;