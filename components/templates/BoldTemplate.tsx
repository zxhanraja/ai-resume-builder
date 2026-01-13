import React from 'react';
import type { Resume, Skill } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const BoldSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-6">
        <h2 className="text-lg font-extrabold uppercase tracking-wider text-gray-800 mb-3 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-1 after:bg-[color:var(--accent-color)]">{title}</h2>
        {children}
    </section>
);

const formatUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
};

const displayUrl = (url?: string) => {
    if (!url) return '';
    return url.replace(/^(https?:\/\/)?(www\.)?/, '');
};


const BoldTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications, design } = resume;
    const headerAlignClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    }[design.headerAlignment || 'left'];

    const headerJustifyClass = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
    }[design.headerAlignment || 'left'];

    return (
        <div className="resume-template-body font-sans text-gray-700" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className={`${headerAlignClass} mb-8 border-b-4 border-gray-200 pb-6`}>
                <h1 className="text-5xl font-extrabold">{personalInfo.name}</h1>
                {personalInfo.targetTitle && <p className="mt-2 text-xl font-semibold text-[color:var(--accent-color)]">{personalInfo.targetTitle}</p>}
                <div className={`mt-2 text-xs flex items-center ${headerJustifyClass} gap-x-3 gap-y-1 flex-wrap break-words`}>
                    {personalInfo.phone && <span className="flex items-center gap-1"><PhoneIcon className="w-3 h-3" /> {personalInfo.phone}</span>}
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline"><MailIcon className="w-3 h-3" /> {personalInfo.email}</a>}
                    {personalInfo.location && <span className="flex items-center gap-1"><LocationIcon className="w-3 h-3" /> {personalInfo.location}</span>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><WebsiteIcon className="w-3 h-3" /> {displayUrl(personalInfo.website)}</a>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><LinkedInIcon className="w-3 h-3" /> {displayUrl(personalInfo.linkedin)}</a>}
                    {personalInfo.twitter && <a href={formatUrl(personalInfo.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><TwitterIcon className="w-3 h-3" /> {displayUrl(personalInfo.twitter)}</a>}
                </div>
            </header>
            
            {personalInfo.summary && <BoldSection title="Summary">
                <p className="text-sm">{personalInfo.summary}</p>
            </BoldSection>}
            
            <BoldSection title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-md font-bold">{exp.jobTitle}</h3>
                            <p className="text-xs font-medium">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                        <p className="italic font-semibold text-sm">{exp.company}, {exp.location}</p>
                        <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </BoldSection>
            
            {projects.length > 0 && (
                <BoldSection title="Projects">
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4 page-break-inside-avoid">
                            <h3 className="font-bold">{proj.name}</h3>
                            <p className="text-sm">{proj.description}</p>
                            {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">{displayUrl(proj.url)}</a>}
                        </div>
                    ))}
                </BoldSection>
            )}

            <BoldSection title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 page-break-inside-avoid">
                         <div className="flex justify-between items-baseline">
                             <h3 className="text-md font-bold">{edu.institution}</h3>
                             <p className="text-xs font-medium">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p className="text-sm">{edu.degree}, {edu.fieldOfStudy}</p>
                    </div>
                ))}
            </BoldSection>
            
            <BoldSection title="Skills">
                <div className="flex flex-wrap -m-1">
                    {skills.map(skill => (
                        <span key={skill.id} className="m-1 bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">{skill.name}</span>
                    ))}
                </div>
            </BoldSection>

            {certifications.length > 0 && <BoldSection title="Certifications">
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-2 text-sm page-break-inside-avoid">
                        <h3 className="font-bold">{cert.name}, <span className="italic font-normal">{cert.issuer} ({cert.date})</span></h3>
                    </div>
                ))}
            </BoldSection>}

            {volunteering.length > 0 && <BoldSection title="Volunteering">
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-4 page-break-inside-avoid">
                        <h3 className="font-bold">{vol.organization} - <span className="italic font-normal">{vol.role}</span></h3>
                        <p className="text-sm">{vol.description}</p>
                    </div>
                ))}
            </BoldSection>}

            {publications.length > 0 && <BoldSection title="Publications">
                {publications.map(pub => (
                    <div key={pub.id} className="mb-2 text-sm page-break-inside-avoid">
                        <h3 className="font-bold">{pub.title} - <span className="italic font-normal">{pub.publisher} ({pub.date})</span></h3>
                    </div>
                ))}
            </BoldSection>}
        </div>
    );
});

export default BoldTemplate;