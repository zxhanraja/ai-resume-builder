import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-6">
        <h2 className="text-lg font-semibold tracking-wider uppercase border-b border-black pb-1 mb-3">{title}</h2>
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


const ExecutiveTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-serif text-sm text-gray-800 bg-yellow-50" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
                <div className="mt-2 flex items-center justify-center gap-x-3 gap-y-1 flex-wrap break-words">
                    {personalInfo.phone && <span className="flex items-center gap-1"><PhoneIcon className="w-3 h-3" /> {personalInfo.phone}</span>}
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline"><MailIcon className="w-3 h-3" /> {personalInfo.email}</a>}
                    {personalInfo.location && <span className="flex items-center gap-1"><LocationIcon className="w-3 h-3" /> {personalInfo.location}</span>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><WebsiteIcon className="w-3 h-3" /> {displayUrl(personalInfo.website)}</a>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><LinkedInIcon className="w-3 h-3" /> {displayUrl(personalInfo.linkedin)}</a>}
                    {personalInfo.twitter && <a href={formatUrl(personalInfo.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><TwitterIcon className="w-3 h-3" /> {displayUrl(personalInfo.twitter)}</a>}
                </div>
            </header>
            
            <Section title="Professional Summary">
                <p>{personalInfo.summary}</p>
            </Section>
            
            <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-base font-bold">{exp.jobTitle}</h3>
                            <p className="text-xs">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                        <p className="italic">{exp.company}, {exp.location}</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>
            
            <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 page-break-inside-avoid">
                         <div className="flex justify-between items-baseline">
                             <h3 className="text-base font-bold">{edu.institution}</h3>
                             <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p>{edu.degree}, {edu.fieldOfStudy}</p>
                    </div>
                ))}
            </Section>
            
            {skills.length > 0 && (
                <Section title="Skills">
                    <div className="flex flex-wrap -m-1">
                        {skills.map(skill => (
                            <span key={skill.id} className="m-1 bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">{skill.name}</span>
                        ))}
                    </div>
                </Section>
            )}

            {projects.length > 0 && (
                <Section title="Projects">
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4 page-break-inside-avoid">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-base font-bold">{proj.name}</h3>
                                {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline break-all">{displayUrl(proj.url)}</a>}
                            </div>
                            <p className="text-xs mt-1">{proj.description}</p>
                        </div>
                    ))}
                </Section>
            )}

            {certifications.length > 0 && (
                <Section title="Certifications">
                    {certifications.map(cert => (
                        <div key={cert.id} className="mb-2 text-xs page-break-inside-avoid">
                            <h3 className="font-bold">{cert.name}, <span className="italic font-normal">{cert.issuer} ({cert.date})</span></h3>
                        </div>
                    ))}
                </Section>
            )}

            {volunteering.length > 0 && (
                <Section title="Volunteering">
                    {volunteering.map(vol => (
                        <div key={vol.id} className="mb-4 page-break-inside-avoid">
                            <h3 className="text-base font-bold">{vol.organization} - <span className="italic">{vol.role}</span></h3>
                            <p className="text-xs mt-1">{vol.description}</p>
                        </div>
                    ))}
                </Section>
            )}

            {publications.length > 0 && (
                <Section title="Publications">
                    {publications.map(pub => (
                        <div key={pub.id} className="mb-2 text-xs page-break-inside-avoid">
                            <h3 className="font-bold">{pub.title} - <span className="italic font-normal">{pub.publisher} ({pub.date})</span></h3>
                        </div>
                    ))}
                </Section>
            )}
        </div>
    );
});

export default ExecutiveTemplate;