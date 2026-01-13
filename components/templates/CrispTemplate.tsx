import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 pb-1 mb-2">{title}</h2>
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


const CrispTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-sans text-[9pt] text-gray-700" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="mb-6 text-center">
                <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
                <div className="mt-2 text-xs flex items-center justify-center gap-x-3 gap-y-1 flex-wrap break-words">
                    {personalInfo.location && <span className="flex items-center gap-1"><LocationIcon className="w-3 h-3"/>{personalInfo.location}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1"><PhoneIcon className="w-3 h-3"/>{personalInfo.phone}</span>}
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline"><MailIcon className="w-3 h-3"/>{personalInfo.email}</a>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><WebsiteIcon className="w-3 h-3"/>{displayUrl(personalInfo.website)}</a>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><LinkedInIcon className="w-3 h-3"/>{displayUrl(personalInfo.linkedin)}</a>}
                    {personalInfo.twitter && <a href={formatUrl(personalInfo.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><TwitterIcon className="w-3 h-3"/>{displayUrl(personalInfo.twitter)}</a>}
                </div>
            </header>
            
            <Section title="Summary"><p className="text-xs">{personalInfo.summary}</p></Section>
            
            <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3 text-xs page-break-inside-avoid">
                        <h3 className="font-bold">{exp.jobTitle}, <span className="font-normal italic">{exp.company}</span></h3>
                        <p className="text-gray-500 text-[8pt]">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        <ul className="list-disc list-inside mt-1">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>

            <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 text-xs page-break-inside-avoid">
                         <h3 className="font-bold">{edu.institution}</h3>
                         <p>{edu.degree}</p>
                    </div>
                ))}
            </Section>

            {projects.length > 0 && <Section title="Projects">
                {projects.map(proj => (
                    <div key={proj.id} className="mb-2 text-xs page-break-inside-avoid">
                        <h3 className="font-bold">{proj.name}</h3>
                        {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block text-[8pt] truncate break-all">{displayUrl(proj.url)}</a>}
                        <p>{proj.description}</p>
                    </div>
                ))}
            </Section>}

            <Section title="Skills">
                <div className="flex flex-wrap -m-1">
                    {skills.map(skill => (
                        <span key={skill.id} className="m-1 bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">{skill.name}</span>
                    ))}
                </div>
            </Section>

            {certifications.length > 0 && <Section title="Certifications">
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-2 text-xs page-break-inside-avoid">
                        <h3 className="font-bold">{cert.name}, <span className="italic font-normal">{cert.issuer} ({cert.date})</span></h3>
                    </div>
                ))}
            </Section>}

            {volunteering.length > 0 && <Section title="Volunteering">
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-3 text-xs page-break-inside-avoid">
                        <h3 className="font-bold">{vol.organization} - <span className="italic font-normal">{vol.role}</span></h3>
                        <p>{vol.description}</p>
                    </div>
                ))}
            </Section>}

            {publications.length > 0 && <Section title="Publications">
                {publications.map(pub => (
                    <div key={pub.id} className="mb-2 text-xs page-break-inside-avoid">
                        <h3 className="font-bold">{pub.title} - <span className="italic font-normal">{pub.publisher} ({pub.date})</span></h3>
                    </div>
                ))}
            </Section>}
        </div>
    );
});

export default CrispTemplate;