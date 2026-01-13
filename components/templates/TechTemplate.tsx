import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const formatUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
};

const displayUrl = (url?: string) => {
    if (!url) return '';
    return url.replace(/^(https?:\/\/)?(www\.)?/, '');
};

const TechTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-mono text-sm text-gray-800" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="mb-8">
                <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
                <div className="mt-2 flex items-center gap-x-4 gap-y-1 text-xs flex-wrap break-words">
                    <span className="flex items-center gap-1.5"><PhoneIcon className="w-3 h-3" />{personalInfo.phone}</span>
                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:underline"><MailIcon className="w-3 h-3" />{personalInfo.email}</a>
                    <span className="flex items-center gap-1.5"><LocationIcon className="w-3 h-3" />{personalInfo.location}</span>
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><WebsiteIcon className="w-3 h-3" />{displayUrl(personalInfo.website)}</a>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><LinkedInIcon className="w-3 h-3" />{displayUrl(personalInfo.linkedin)}</a>}
                    {personalInfo.twitter && <a href={formatUrl(personalInfo.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><TwitterIcon className="w-3 h-3" />{displayUrl(personalInfo.twitter)}</a>}
                </div>
                {personalInfo.targetTitle && <p className="mt-2 text-md font-semibold text-[color:var(--accent-color)]">{personalInfo.targetTitle}</p>}
            </header>
            
            {personalInfo.summary && <section className="mb-6">
                <h2 className="text-md font-bold uppercase text-[color:var(--accent-color)] pb-1 mb-2">Summary</h2>
                <p className="text-xs">{personalInfo.summary}</p>
            </section>}
            
            <section className="mb-6">
                <h2 className="text-md font-bold uppercase text-[color:var(--accent-color)] pb-1 mb-2">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-sm font-bold">{exp.jobTitle} @ {exp.company}</h3>
                            <p className="text-xs">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                        <p className="italic text-xs">{exp.location}</p>
                        <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </section>

            {projects.length > 0 && <section className="mb-6">
                <h2 className="text-md font-bold uppercase text-[color:var(--accent-color)] pb-1 mb-2">Projects</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-4 page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-sm font-bold">{proj.name}</h3>
                            {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline break-all">{displayUrl(proj.url)}</a>}
                        </div>
                        <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                            {proj.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </section>}
            
            <section className="mb-6">
                <h2 className="text-md font-bold uppercase text-[color:var(--accent-color)] pb-1 mb-2">Education</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 page-break-inside-avoid">
                         <div className="flex justify-between items-baseline">
                             <h3 className="text-sm font-bold">{edu.institution}</h3>
                             <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p className="text-xs">{edu.degree}, {edu.fieldOfStudy}</p>
                    </div>
                ))}
            </section>
            
            {certifications.length > 0 && <section className="mb-6">
                <h2 className="text-md font-bold uppercase text-[color:var(--accent-color)] pb-1 mb-2">Certifications</h2>
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-2 page-break-inside-avoid">
                         <div className="flex justify-between items-baseline">
                             <h3 className="text-sm font-bold">{cert.name}</h3>
                             <p className="text-xs">{cert.date}</p>
                        </div>
                        <p className="text-xs italic">{cert.issuer}</p>
                    </div>
                ))}
            </section>}

            <section>
                <h2 className="text-md font-bold uppercase text-[color:var(--accent-color)] pb-1 mb-2">Skills</h2>
                <div className="flex flex-wrap -m-1">
                    {skills.map(skill => (
                        <span key={skill.id} className="m-1 bg-gray-200 text-gray-900 px-2 py-0.5 rounded text-xs">{skill.name}</span>
                    ))}
                </div>
            </section>

            {volunteering.length > 0 && <section className="mt-6">
                <h2 className="text-md font-bold uppercase text-[color:var(--accent-color)] pb-1 mb-2">Volunteering</h2>
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-4 page-break-inside-avoid">
                        <h3 className="text-sm font-bold">{vol.organization} - <span className="italic font-normal">{vol.role}</span></h3>
                        <p className="text-xs">{vol.description}</p>
                    </div>
                ))}
            </section>}

            {publications.length > 0 && <section className="mt-6">
                <h2 className="text-md font-bold uppercase text-[color:var(--accent-color)] pb-1 mb-2">Publications</h2>
                {publications.map(pub => (
                    <div key={pub.id} className="mb-2 page-break-inside-avoid">
                         <div className="flex justify-between items-baseline">
                             <h3 className="text-sm font-bold">{pub.title}</h3>
                             <p className="text-xs">{pub.date}</p>
                        </div>
                        <p className="text-xs italic">{pub.publisher}</p>
                    </div>
                ))}
            </section>}
        </div>
    );
});

export default TechTemplate;