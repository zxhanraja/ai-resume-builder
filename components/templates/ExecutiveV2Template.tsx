import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[color:var(--accent-color)] border-b-2 border-[color:var(--accent-color)] pb-1 mb-3">{title}</h2>
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


const ExecutiveV2Template: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-sans text-sm text-gray-800" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="mb-6">
                <h1 className="text-4xl font-extrabold">{personalInfo.name}</h1>
                {personalInfo.targetTitle && <p className="text-lg font-semibold text-gray-600">{personalInfo.targetTitle}</p>}
                <div className="mt-2 flex items-center justify-start gap-x-4 gap-y-1 text-xs flex-wrap break-words">
                    <span className="flex items-center gap-1.5"><PhoneIcon className="w-3 h-3" />{personalInfo.phone}</span>
                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:underline"><MailIcon className="w-3 h-3" />{personalInfo.email}</a>
                    <span className="flex items-center gap-1.5"><LocationIcon className="w-3 h-3" />{personalInfo.location}</span>
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><WebsiteIcon className="w-3 h-3" />{displayUrl(personalInfo.website)}</a>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><LinkedInIcon className="w-3 h-3" />{displayUrl(personalInfo.linkedin)}</a>}
                    {personalInfo.twitter && <a href={formatUrl(personalInfo.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><TwitterIcon className="w-3 h-3" />{displayUrl(personalInfo.twitter)}</a>}
                </div>
            </header>
            
            {personalInfo.summary && <Section title="Summary">
                <p className="text-xs">{personalInfo.summary}</p>
            </Section>}
            
            <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-sm font-bold">{exp.jobTitle}</h3>
                            <p className="text-xs">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                        <p className="italic text-xs">{exp.company}, {exp.location}</p>
                        <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>
            
            <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 text-xs page-break-inside-avoid">
                         <h3 className="font-semibold">{edu.institution}</h3>
                         <p>{edu.degree}</p>
                         <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </Section>
            <Section title="Skills">
                <div className="flex flex-wrap -m-1">
                    {skills.map(skill => (
                        <span key={skill.id} className="m-1 bg-[color:var(--accent-color)]/10 text-[color:var(--accent-color)] px-3 py-1 rounded-full text-xs font-semibold" style={{ color: 'var(--accent-color)'}}>{skill.name}</span>
                    ))}
                </div>
            </Section>

            {projects.length > 0 && <Section title="Projects">
                {projects.map(proj => (
                    <div key={proj.id} className="mb-4 text-xs page-break-inside-avoid">
                         <h3 className="font-semibold">{proj.name}</h3>
                        <p>{proj.description}</p>
                         {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{displayUrl(proj.url)}</a>}
                    </div>
                ))}
            </Section>}

            {certifications.length > 0 && <Section title="Certifications">
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-2 text-xs page-break-inside-avoid">
                        <h3 className="font-semibold">{cert.name} - <span className="italic font-normal">{cert.issuer} ({cert.date})</span></h3>
                    </div>
                ))}
            </Section>}

            {volunteering.length > 0 && <Section title="Volunteering">
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-4 text-xs page-break-inside-avoid">
                        <h3 className="font-semibold">{vol.organization} - <span className="italic font-normal">{vol.role}</span></h3>
                        <p>{vol.description}</p>
                    </div>
                ))}
            </Section>}

            {publications.length > 0 && <Section title="Publications">
                {publications.map(pub => (
                    <div key={pub.id} className="mb-2 text-xs page-break-inside-avoid">
                        <h3 className="font-semibold">{pub.title} - <span className="italic font-normal">{pub.publisher} ({pub.date})</span></h3>
                    </div>
                ))}
            </Section>}

        </div>
    );
});

export default ExecutiveV2Template;