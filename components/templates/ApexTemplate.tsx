import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-5">
        <h2 className="text-lg font-bold uppercase tracking-wider text-[color:var(--accent-color)]">{title}</h2>
        <div className="border-t border-gray-300 mt-1 mb-3"></div>
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


const ApexTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-sans text-sm text-gray-800" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="mb-8 text-center">
                <h1 className="text-5xl font-extrabold">{personalInfo.name}</h1>
                <div className="mt-2 text-sm flex items-center justify-center gap-x-3 gap-y-1 flex-wrap break-words">
                    {personalInfo.location && <span className="flex items-center gap-1"><LocationIcon className="w-3.5 h-3.5" /> {personalInfo.location}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1"><PhoneIcon className="w-3.5 h-3.5" /> {personalInfo.phone}</span>}
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline"><MailIcon className="w-3.5 h-3.5" /> {personalInfo.email}</a>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><WebsiteIcon className="w-3.5 h-3.5" /> {displayUrl(personalInfo.website)}</a>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><LinkedInIcon className="w-3.5 h-3.5" /> {displayUrl(personalInfo.linkedin)}</a>}
                    {personalInfo.twitter && <a href={formatUrl(personalInfo.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><TwitterIcon className="w-3.5 h-3.5" /> {displayUrl(personalInfo.twitter)}</a>}
                </div>
            </header>
            
            <p className="text-center mb-6">{personalInfo.summary}</p>
            
            <Section title="Skills">
                 <div className="flex flex-wrap -m-1">
                    {skills.map(skill => (
                        <span key={skill.id} className="m-1 bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">{skill.name}</span>
                    ))}
                </div>
            </Section>

            <Section title="Experience">
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
            </Section>
            
            {projects.length > 0 && (
                <Section title="Projects">
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4 page-break-inside-avoid">
                            <h3 className="font-bold text-md">{proj.name}</h3>
                            <p className="text-sm">{proj.description}</p>
                            {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">{displayUrl(proj.url)}</a>}
                        </div>
                    ))}
                </Section>
            )}

            <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 page-break-inside-avoid">
                         <div className="flex justify-between items-baseline">
                             <h3 className="text-md font-bold">{edu.institution}</h3>
                             <p className="text-xs font-medium">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p className="text-sm">{edu.degree}, {edu.fieldOfStudy}</p>
                    </div>
                ))}
            </Section>
            
            {certifications.length > 0 && <Section title="Certifications">
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-2 text-sm page-break-inside-avoid">
                        <h3 className="font-bold">{cert.name}, <span className="italic font-normal">{cert.issuer} ({cert.date})</span></h3>
                    </div>
                ))}
            </Section>}

            {volunteering.length > 0 && <Section title="Volunteering">
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-4 page-break-inside-avoid">
                        <h3 className="font-bold text-md">{vol.organization} - <span className="italic font-normal">{vol.role}</span></h3>
                        <p className="text-sm">{vol.description}</p>
                    </div>
                ))}
            </Section>}

            {publications.length > 0 && <Section title="Publications">
                {publications.map(pub => (
                    <div key={pub.id} className="mb-2 text-sm page-break-inside-avoid">
                        <h3 className="font-bold">{pub.title} - <span className="italic font-normal">{pub.publisher} ({pub.date})</span></h3>
                    </div>
                ))}
            </Section>}

        </div>
    );
});

export default ApexTemplate;
