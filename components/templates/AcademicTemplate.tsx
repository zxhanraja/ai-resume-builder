import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const AcademicSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">{title}</h2>
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


const AcademicTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, education, experience, publications, volunteering, skills, certifications } = resume;

    return (
        <div className="resume-template-body font-serif text-[10pt] text-gray-900" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
                <div className="mt-2 text-xs flex items-center justify-center gap-x-3 gap-y-1 flex-wrap break-words">
                    {personalInfo.location && <span className="flex items-center gap-1"><LocationIcon className="w-3 h-3" /> {personalInfo.location}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1"><PhoneIcon className="w-3 h-3" /> {personalInfo.phone}</span>}
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline"><MailIcon className="w-3 h-3" /> {personalInfo.email}</a>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><WebsiteIcon className="w-3 h-3" /> {displayUrl(personalInfo.website)}</a>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><LinkedInIcon className="w-3 h-3" /> {displayUrl(personalInfo.linkedin)}</a>}
                    {personalInfo.twitter && <a href={formatUrl(personalInfo.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><TwitterIcon className="w-3 h-3" /> {displayUrl(personalInfo.twitter)}</a>}
                </div>
            </header>
            
            <AcademicSection title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 page-break-inside-avoid">
                         <div className="flex justify-between items-baseline">
                             <h3 className="font-semibold">{edu.institution}</h3>
                             <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p>{edu.degree}, {edu.fieldOfStudy}</p>
                    </div>
                ))}
            </AcademicSection>

            {experience.length > 0 && <AcademicSection title="Research Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3 page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-semibold">{exp.jobTitle}</h3>
                            <p className="text-xs">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                        <p className="italic text-sm">{exp.company}, {exp.location}</p>
                        <ul className="list-disc list-inside mt-1 text-xs space-y-0.5">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </AcademicSection>}

            {publications.length > 0 && <AcademicSection title="Publications">
                 <ul className="list-decimal list-inside text-xs space-y-1">
                    {publications.map(pub => (
                        <li key={pub.id} className="page-break-inside-avoid">
                            <span className="font-semibold">{pub.title}</span>, {pub.publisher}, {pub.date}.
                        </li>
                    ))}
                </ul>
            </AcademicSection>}
            
            {volunteering.length > 0 && <AcademicSection title="Teaching Experience">
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-3 text-xs page-break-inside-avoid">
                        <h3 className="font-semibold">{vol.role}, {vol.organization}</h3>
                        <p>{vol.description}</p>
                    </div>
                ))}
            </AcademicSection>}

            {certifications.length > 0 && <AcademicSection title="Certifications">
                <ul className="list-disc list-inside text-xs space-y-1">
                    {certifications.map(cert => (
                        <li key={cert.id} className="page-break-inside-avoid">
                           {cert.name}, {cert.issuer}, {cert.date}.
                        </li>
                    ))}
                </ul>
            </AcademicSection>}

            {skills.length > 0 && <AcademicSection title="Skills">
                <div className="flex flex-wrap -m-1">
                    {skills.map(skill => (
                        <span key={skill.id} className="m-1 bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">{skill.name}</span>
                    ))}
                </div>
            </AcademicSection>}
        </div>
    );
});

export default AcademicTemplate;