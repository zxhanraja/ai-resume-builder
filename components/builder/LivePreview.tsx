import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import type { Resume } from '../../types';
import ProfessionalV2Template from '../templates/ProfessionalV2Template';
import TechTemplate from '../templates/TechTemplate';
import AcademicTemplate from '../templates/AcademicTemplate';
import CompactTemplate from '../templates/CompactTemplate';
import ModernProfessionalTemplate from '../templates/ModernProfessionalTemplate';
import ExecutiveV2Template from '../templates/ExecutiveV2Template';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';
import CrispTemplate from '../templates/CrispTemplate';
import TealTemplate from '../templates/TealTemplate';
import AtsClassicTemplate from '../templates/AtsClassicTemplate';
import AtsModernTemplate from '../templates/AtsModernTemplate';
import BoldTemplate from '../templates/BoldTemplate';
import CorporateTemplate from '../templates/CorporateTemplate';
import ElegantTemplate from '../templates/ElegantTemplate';

interface LivePreviewProps {
    resume: Resume;
}

const LivePreview: React.FC<LivePreviewProps> = React.memo(({ resume }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    const paperSizeDetails = {
        'Letter': { widthIn: 8.5, heightIn: 11 },
        'A4': { widthIn: 210 / 25.4, heightIn: 297 / 25.4 }
    };

    const currentPaper = paperSizeDetails[resume.design.paperSize] || paperSizeDetails['Letter'];
    const paperWidthPx = currentPaper.widthIn * 96;

    // This hook calculates the correct scale for the preview to fit the viewport.
    useLayoutEffect(() => {
        const updateScale = () => {
            if (!wrapperRef.current) return;
            
            // On mobile, don't scale down, allow native scroll/zoom.
            if (window.innerWidth < 1024) {
                setScale(1);
                return;
            }

            const wrapperWidth = wrapperRef.current.offsetWidth;
            // Corresponds to p-8 on lg screens (4rem = 64px total)
            // A smaller padding on smaller screens is used for better fit.
            const padding = window.innerWidth < 1280 ? 32 : 64;
            const availableWidth = wrapperWidth - padding;
            
            let newScale = availableWidth > 0 ? Math.min(availableWidth / paperWidthPx, 1) : 1;
            setScale(newScale);
        };

        const resizeObserver = new ResizeObserver(updateScale);
        if (wrapperRef.current) {
            resizeObserver.observe(wrapperRef.current);
        }
        updateScale(); // Initial scale calculation

        return () => {
            if (wrapperRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                resizeObserver.unobserve(wrapperRef.current);
            }
        };
    }, [resume.design.paperSize, paperWidthPx]);

    const renderTemplate = () => {
        switch (resume.template) {
            case 'atsClassic': return <AtsClassicTemplate resume={resume} />;
            case 'atsModern': return <AtsModernTemplate resume={resume} />;
            case 'bold': return <BoldTemplate resume={resume} />;
            case 'corporate': return <CorporateTemplate resume={resume} />;
            case 'elegant': return <ElegantTemplate resume={resume} />;
            case 'executive': return <ExecutiveTemplate resume={resume} />;
            case 'professionalV2': return <ProfessionalV2Template resume={resume} />;
            case 'tech': return <TechTemplate resume={resume} />;
            case 'academic': return <AcademicTemplate resume={resume} />;
            case 'compact': return <CompactTemplate resume={resume} />;
            case 'modernProfessional': return <ModernProfessionalTemplate resume={resume} />;
            case 'executiveV2': return <ExecutiveV2Template resume={resume} />;
            case 'crisp': return <CrispTemplate resume={resume} />;
            case 'teal': return <TealTemplate resume={resume} />;
            default: return <ProfessionalV2Template resume={resume} />;
        }
    };

    const templateContent = (
        <div 
            style={{
                fontFamily: resume.design.fontFamily,
                fontSize: resume.design.fontSize,
                lineHeight: resume.design.lineHeight,
            }}
        >
            {renderTemplate()}
        </div>
    );
    
    // This is the core of the fix:
    // We render a SINGLE, scrollable container for the preview.
    // The buggy JS-based pagination is completely removed. This eliminates repeating content, cut-off text, and the weird browser headers.
    // The final PDF export still works correctly because of the @media print CSS rules.
    return (
        <div 
            ref={wrapperRef} 
            className="live-preview-wrapper w-full h-full flex justify-center items-start overflow-y-auto p-4 lg:p-8"
        >
            <style>{`:root { --accent-color: ${resume.design.accentColor}; }`}</style>
            <div
                id="resume-preview"
                className="bg-white shadow-lg lg:my-8" // Margin for desktop aesthetic
                style={{
                    width: resume.design.paperSize === 'A4' ? '210mm' : '8.5in',
                    height: 'auto', // Let content determine height
                    minHeight: resume.design.paperSize === 'A4' ? '297mm' : '11in', // For visual consistency
                    transform: `scale(${scale})`,
                    transformOrigin: 'center top',
                }}
            >
                {templateContent}
            </div>
        </div>
    );
});

export default LivePreview;
