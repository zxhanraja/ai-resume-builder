import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const TwoColumnTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-sans text-sm text-gray-800" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-[color:var(--accent-color)]">{personalInfo.name}</h1>
                {personalInfo.targetTitle && <p className="mt-1 text-md font-semibold">{personalInfo.targetTitle}</p>}
                 {personalInfo.summary && <p className="text-xs mt-4">{personalInfo.summary}</p>}
            </header>
            
            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider text-[color:var(--accent-color)] pb-1 mb-2">Contact</h2>
                <div className="text-xs space-y-2 break-words">
                    <p className="flex items-center gap-2"><PhoneIcon className="w-3.5 h-3.5 flex-shrink-0" /><span>{personalInfo.phone}</span></p>
                    <p className="flex items-center gap-2"><MailIcon className="w-3.5 h-3.5 flex-shrink-0" /><span>{personalInfo.email}</span></p>
                    <p className="flex items-center gap-2"><LocationIcon className="w-3.5 h-3.5 flex-shrink-0" /><span>{personalInfo.location}</span></p>
                    {personalInfo.website && <p className="flex items-center gap-2"><WebsiteIcon className="w-3.5 h-3.5 flex-shrink-0" /><span>{personalInfo.website}</span></p>}
                    {personalInfo.linkedin && <p className="flex items-center gap-2"><LinkedInIcon className="w-3.5 h-3.5 flex-shrink-0" /><span>{personalInfo.linkedin}</span></p>}
                    {personalInfo.twitter && <p className="flex items-center gap-2"><TwitterIcon className="w-3.5 h-3.5 flex-shrink-0" /><span>{personalInfo.twitter}</span></p>}
                </div>
            </section>
            
            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider text-[color:var(--accent-color)] pb-1 mb-2">Experience</h2>
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
            </section>

            {projects.length > 0 && <section className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider text-[color:var(--accent-color)] pb-1 mb-2">Projects</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-4 page-break-inside-avoid">
                         <h3 className="text-sm font-bold">{proj.name}</h3>
                         {proj.url && <a href={proj.url} className="text-xs text-blue-600 hover:underline break-all">{proj.url}</a>}
                        <p className="text-xs">{proj.description}</p>
                    </div>
                ))}
            </section>}

            <section className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider text-[color:var(--accent-color)] pb-1 mb-2">Education</h2>
                 {education.map(edu => (
                    <div key={edu.id} className="mb-2 text-xs">
                         <h3 className="font-semibold">{edu.institution}</h3>
                         <p>{edu.degree}</p>
                         <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="text-lg font-bold uppercase tracking-wider text-[color:var(--accent-color)] pb-1 mb-2">Skills</h2>
                <div className="flex flex-wrap -m-1">
                    {skills.map(skill => (
                        <span key={skill.id} className="m-1 bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">{skill.name}</span>
                    ))}
                </div>
            </section>

            {certifications.length > 0 && <section className="mt-6">
                <h2 className="text-lg font-bold uppercase tracking-wider text-[color:var(--accent-color)] pb-1 mb-2">Certifications</h2>
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-2 text-xs page-break-inside-avoid">
                        <h3 className="font-semibold">{cert.name}, <span className="italic">{cert.issuer} ({cert.date})</span></h3>
                    </div>
                ))}
            </section>}

            {volunteering.length > 0 && <section className="mt-6">
                <h2 className="text-lg font-bold uppercase tracking-wider text-[color:var(--accent-color)] pb-1 mb-2">Volunteering</h2>
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-4 page-break-inside-avoid">
                        <h3 className="font-semibold">{vol.organization} - <span className="italic">{vol.role}</span></h3>
                        <p className="text-xs">{vol.description}</p>
                    </div>
                ))}
            </section>}

            {publications.length > 0 && <section className="mt-6">
                <h2 className="text-lg font-bold uppercase tracking-wider text-[color:var(--accent-color)] pb-1 mb-2">Publications</h2>
                {publications.map(pub => (
                    <div key={pub.id} className="mb-2 text-xs page-break-inside-avoid">
                        <h3 className="font-semibold">{pub.title} - <span className="italic">{pub.publisher} ({pub.date})</span></h3>
                    </div>
                ))}
            </section>}
        </div>
    );
});

export default TwoColumnTemplate;