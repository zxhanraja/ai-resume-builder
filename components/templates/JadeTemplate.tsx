import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';


const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b-2 pb-1 mb-3" style={{ borderColor: 'var(--accent-color)' }}>{title}</h2>
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


const JadeTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-sans text-[10pt] text-gray-800" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="mb-6 flex flex-col sm:flex-row justify-between items-start">
                <div>
                    <h1 className="text-4xl font-extrabold text-left">{personalInfo.name}</h1>
                    {personalInfo.targetTitle && <h2 className="text-lg font-semibold mt-1 text-left" style={{ color: 'var(--accent-color)' }}>{personalInfo.targetTitle}</h2>}
                </div>
                 <div className="mt-4 sm:mt-0 text-xs text-left sm:text-right space-y-1 flex-shrink-0">
                     <p className="flex items-center sm:justify-end gap-2"><span className="break-all">{personalInfo.location}</span><LocationIcon className="w-4 h-4"/></p>
                     <p className="flex items-center sm:justify-end gap-2"><span className="break-all">{personalInfo.phone}</span><PhoneIcon className="w-4 h-4"/></p>
                     <a href={`mailto:${personalInfo.email}`} className="flex items-center sm:justify-end gap-2 hover:underline"><span className="break-all">{personalInfo.email}</span><MailIcon className="w-4 h-4"/></a>
                     {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="flex items-center sm:justify-end gap-2 hover:underline"><span className="break-all">{displayUrl(personalInfo.website)}</span><WebsiteIcon className="w-4 h-4"/></a>}
                     {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center sm:justify-end gap-2 hover:underline"><span className="break-all">{displayUrl(personalInfo.linkedin)}</span><LinkedInIcon className="w-4 h-4"/></a>}
                     {personalInfo.twitter && <a href={formatUrl(personalInfo.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center sm:justify-end gap-2 hover:underline"><span className="break-all">{displayUrl(personalInfo.twitter)}</span><TwitterIcon className="w-4 h-4"/></a>}
                 </div>
            </header>

            {personalInfo.summary && (
                <section className="mb-6">
                    <p className="text-xs">{personalInfo.summary}</p>
                </section>
            )}

            <Section title="Work Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-sm">{exp.company}</h3>
                            <p className="text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                        <h4 className="font-bold" style={{ color: 'var(--accent-color)' }}>{exp.jobTitle}</h4>
                        <ul className="list-disc list-inside mt-1 space-y-0.5 pl-2">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>

            {projects.length > 0 && (
                <Section title="Projects">
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4 text-xs page-break-inside-avoid">
                            <h3 className="font-bold text-sm">{proj.name}</h3>
                            {proj.url && <a href={formatUrl(proj.url)} className="text-blue-600 hover:underline break-all text-[9pt]">{displayUrl(proj.url)}</a>}
                            <ul className="list-disc list-inside mt-1 space-y-0.5 pl-2">
                                {proj.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>
            )}
            
            <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-3 text-xs page-break-inside-avoid">
                        <h3 className="font-bold" style={{ color: 'var(--accent-color)' }}>{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-gray-500">{edu.endDate}</p>
                    </div>
                ))}
            </Section>

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
                        <h3 className="font-bold">{cert.name} - <span className="italic font-normal">{cert.issuer} ({cert.date})</span></h3>
                    </div>
                ))}
            </Section>}

            {volunteering.length > 0 && <Section title="Volunteering">
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-4 text-xs page-break-inside-avoid">
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

export default JadeTemplate;