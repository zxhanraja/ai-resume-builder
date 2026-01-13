import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-gray-200 pb-1 mb-2">{title}</h2>
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


const VantageTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-sans text-sm text-gray-800">
            <header className="p-6 md:p-8 bg-[color:var(--accent-color)] text-white text-center">
                <h1 className="text-4xl font-extrabold">{personalInfo.name}</h1>
                <p className="mt-1 text-lg font-semibold">{personalInfo.targetTitle}</p>
            </header>
            <div className="p-6 md:p-8">
                <Section title="Contact">
                    <div className="text-xs space-y-1 break-words">
                        <p className="flex items-center gap-2"><PhoneIcon className="w-3 h-3 flex-shrink-0"/><span>{personalInfo.phone}</span></p>
                        <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:underline"><MailIcon className="w-3 h-3 flex-shrink-0"/><span>{personalInfo.email}</span></a>
                        <p className="flex items-center gap-2"><LocationIcon className="w-3 h-3 flex-shrink-0"/><span>{personalInfo.location}</span></p>
                        <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline"><WebsiteIcon className="w-3 h-3 flex-shrink-0"/><span>{displayUrl(personalInfo.website)}</span></a>
                        <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline"><LinkedInIcon className="w-3 h-3 flex-shrink-0"/><span>{displayUrl(personalInfo.linkedin)}</span></a>
                        {personalInfo.twitter && <a href={formatUrl(personalInfo.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline"><TwitterIcon className="w-3 h-3 flex-shrink-0"/><span>{displayUrl(personalInfo.twitter)}</span></a>}
                    </div>
                </Section>
                 <Section title="Summary">
                    <p className="text-xs">{personalInfo.summary}</p>
                </Section>
                 <Section title="Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-3 text-xs page-break-inside-avoid">
                            <h3 className="font-bold text-sm">{exp.jobTitle}</h3>
                            <div className="flex justify-between items-baseline italic text-gray-600">
                                <p>{exp.company}</p>
                                <p>{exp.startDate} - {exp.endDate || 'Present'}</p>
                            </div>
                            <ul className="list-disc list-inside mt-1 space-y-0.5">
                                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>
                 {projects.length > 0 && <Section title="Projects">
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-3 text-xs page-break-inside-avoid">
                            <h3 className="font-bold">{proj.name}</h3>
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
                 <Section title="Education">
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2 text-xs">
                             <h3 className="font-bold">{edu.institution}</h3>
                             <p>{edu.degree}</p>
                             <p className="text-gray-600">{edu.endDate}</p>
                        </div>
                    ))}
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
        </div>
    );
});

export default VantageTemplate;