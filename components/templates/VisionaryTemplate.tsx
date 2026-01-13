import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[color:var(--accent-color)] border-b-2 border-[color:var(--accent-color)] pb-1 mb-3">{title}</h2>
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


const VisionaryTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-sans text-[9pt] text-gray-800 leading-normal" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in`, fontFamily: resume.design.fontFamily, fontSize: resume.design.fontSize, lineHeight: resume.design.lineHeight }}>
            <header className="flex flex-col sm:flex-row justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
                    {personalInfo.targetTitle && <p className="text-md font-semibold text-gray-600">{personalInfo.targetTitle}</p>}
                </div>
                <div className="mt-2 sm:mt-0 text-left sm:text-right text-xs space-y-1 flex-shrink-0">
                    {personalInfo.phone && <p className="flex items-center sm:justify-end gap-1.5"><span className="break-all">{personalInfo.phone}</span><PhoneIcon className="w-3 h-3 flex-shrink-0" /></p>}
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center sm:justify-end gap-1.5 hover:underline"><span className="break-all">{personalInfo.email}</span><MailIcon className="w-3 h-3 flex-shrink-0" /></a>}
                    {personalInfo.location && <p className="flex items-center sm:justify-end gap-1.5"><span className="break-all">{personalInfo.location}</span><LocationIcon className="w-3 h-3 flex-shrink-0" /></p>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="flex items-center sm:justify-end gap-1.5 hover:underline"><span className="break-all">{displayUrl(personalInfo.website)}</span><WebsiteIcon className="w-3 h-3 flex-shrink-0" /></a>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center sm:justify-end gap-1.5 hover:underline"><span className="break-all">{displayUrl(personalInfo.linkedin)}</span><LinkedInIcon className="w-3 h-3 flex-shrink-0" /></a>}
                    {personalInfo.twitter && <a href={formatUrl(personalInfo.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center sm:justify-end gap-1.5 hover:underline"><span className="break-all">{displayUrl(personalInfo.twitter)}</span><TwitterIcon className="w-3 h-3 flex-shrink-0" /></a>}
                </div>
            </header>
            
            {personalInfo.summary && <p className="text-xs italic mb-4">{personalInfo.summary}</p>}
            
            <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{exp.jobTitle}</h3>
                            <p className="text-gray-600 font-medium">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                        <p className="italic">{exp.company}, {exp.location}</p>
                        <ul className="list-disc list-inside mt-1 space-y-0.5">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>
            
            <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                             <h3 className="font-bold">{edu.institution}</h3>
                             <p className="text-gray-600 font-medium">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p>{edu.degree}, {edu.fieldOfStudy}</p>
                    </div>
                ))}
            </Section>

            {projects.length > 0 && <Section title="Projects">
                {projects.map(proj => (
                    <div key={proj.id} className="mb-3 text-xs page-break-inside-avoid">
                        <h3 className="font-bold">{proj.name}</h3>
                        {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all text-[8pt]">{displayUrl(proj.url)}</a>}
                        <p className="mt-1">{proj.description}</p>
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
                        <p className="mt-1">{vol.description}</p>
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

export default VisionaryTemplate;