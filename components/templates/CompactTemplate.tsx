import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-3">
        <h2 className="text-[9pt] font-bold uppercase tracking-wider text-[color:var(--accent-color)]">{title}</h2>
        <div className="border-t border-gray-300 mt-1 mb-2"></div>
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


const CompactTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-sans text-[8pt] text-gray-800 leading-tight" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="mb-3">
                <h1 className="text-xl font-bold">{personalInfo.name}</h1>
                <div className="mt-1 text-[7pt] text-gray-600 flex items-center gap-x-2 gap-y-1 flex-wrap break-words">
                    {personalInfo.location && <span className="flex items-center gap-1"><LocationIcon className="w-2.5 h-2.5" />{personalInfo.location}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1"><PhoneIcon className="w-2.5 h-2.5" />{personalInfo.phone}</span>}
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline"><MailIcon className="w-2.5 h-2.5" />{personalInfo.email}</a>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><WebsiteIcon className="w-2.5 h-2.5" />{displayUrl(personalInfo.website)}</a>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><LinkedInIcon className="w-2.5 h-2.5" />{displayUrl(personalInfo.linkedin)}</a>}
                    {personalInfo.twitter && <a href={formatUrl(personalInfo.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><TwitterIcon className="w-2.5 h-2.5" />{displayUrl(personalInfo.twitter)}</a>}
                </div>
            </header>
            
            <p className="text-[8pt] italic mb-3">{personalInfo.summary}</p>
            
            <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-2 page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <p><span className="font-bold">{exp.jobTitle}</span>, {exp.company}</p>
                            <p className="text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                        <ul className="list-disc list-inside mt-0.5 space-y-0.5 pl-2">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>
            
            <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-1 page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <p className="font-bold">{edu.institution}</p>
                            <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p>{edu.degree}, {edu.fieldOfStudy}</p>
                    </div>
                ))}
            </Section>

            <Section title="Skills">
                <div className="flex flex-wrap -m-0.5">
                    {skills.map(skill => (
                        <span key={skill.id} className="m-0.5 bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-[7pt] font-medium">{skill.name}</span>
                    ))}
                </div>
            </Section>
            
            {projects.length > 0 && (
                <Section title="Projects">
                    {projects.map(proj => (
                         <div key={proj.id} className="mb-2 page-break-inside-avoid">
                             <p>
                                <span className="font-bold">{proj.name}</span>
                                {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2 break-all">[link]</a>}
                             </p>
                            <ul className="list-disc list-inside mt-0.5 space-y-0.5 pl-2">
                                {proj.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>
            )}

            {certifications.length > 0 && <Section title="Certifications">
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-1 page-break-inside-avoid">
                        <p><span className="font-bold">{cert.name}</span>, {cert.issuer} ({cert.date})</p>
                    </div>
                ))}
            </Section>}

            {volunteering.length > 0 && <Section title="Volunteering">
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-2 page-break-inside-avoid">
                        <p><span className="font-bold">{vol.organization}</span> - {vol.role}</p>
                        <p>{vol.description}</p>
                    </div>
                ))}
            </Section>}

            {publications.length > 0 && <Section title="Publications">
                {publications.map(pub => (
                    <div key={pub.id} className="mb-1 page-break-inside-avoid">
                        <p><span className="font-bold">{pub.title}</span>, {pub.publisher} ({pub.date})</p>
                    </div>
                ))}
            </Section>}
        </div>
    );
});

export default CompactTemplate;