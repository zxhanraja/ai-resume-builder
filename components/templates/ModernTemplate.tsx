import React from 'react';
import type { Resume } from '../../types';
import { PhoneIcon, MailIcon, LocationIcon, WebsiteIcon } from '../shared/ResumeIcons';


const formatUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
};

const displayUrl = (url?: string) => {
    if (!url) return '';
    return url.replace(/^(https?:\/\/)?(www\.)?/, '');
};

const ModernTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-sans text-gray-700" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold text-primary-700 break-words">{personalInfo.name}</h1>
                <div className="mt-4 space-y-1 text-sm flex justify-center items-center flex-wrap gap-x-4 gap-y-1 break-words">
                    <p className="break-words flex items-center gap-2"><PhoneIcon className="w-4 h-4 flex-shrink-0" />{personalInfo.phone}</p>
                    <a href={`mailto:${personalInfo.email}`} className="break-words block hover:underline flex items-center gap-2"><MailIcon className="w-4 h-4 flex-shrink-0" />{personalInfo.email}</a>
                    <p className="break-words flex items-center gap-2"><LocationIcon className="w-4 h-4 flex-shrink-0" />{personalInfo.location}</p>
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="break-words block hover:underline flex items-center gap-2"><WebsiteIcon className="w-4 h-4 flex-shrink-0" />{displayUrl(personalInfo.website)}</a>}
                </div>
            </header>
            
            <section className="mb-8">
                <h2 className="text-xl font-bold text-primary-700 border-b-2 border-primary-700 pb-1 mb-3">SUMMARY</h2>
                <p className="text-sm">{personalInfo.summary}</p>
            </section>
            
            <section className="mb-8">
                <h2 className="text-xl font-bold text-primary-700 border-b-2 border-primary-700 pb-1 mb-3">EXPERIENCE</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 page-break-inside-avoid">
                        <h3 className="text-md font-bold">{exp.jobTitle}</h3>
                        <div className="flex justify-between text-sm italic mb-1">
                            <span>{exp.company}</span>
                            <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                        </div>
                        <ul className="list-disc list-inside text-sm space-y-1">
                             {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
            
            <section className="mb-8">
                <h2 className="text-xl font-bold text-primary-700 border-b-2 border-primary-700 pb-1 mb-3">EDUCATION</h2>
                 {education.map(edu => (
                    <div key={edu.id} className="mb-2">
                         <h4 className="font-semibold">{edu.institution}</h4>
                         <p className="text-sm">{edu.degree}, {edu.fieldOfStudy}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="text-xl font-bold text-primary-700 border-b-2 border-primary-700 pb-1 mb-3">SKILLS</h2>
                <div className="flex flex-wrap -m-1">
                    {skills.map(skill => (
                        <span key={skill.id} className="m-1 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-semibold">{skill.name}</span>
                    ))}
                </div>
            </section>

            {projects.length > 0 && <section className="mt-8">
                <h2 className="text-xl font-bold text-primary-700 border-b-2 border-primary-700 pb-1 mb-3">PROJECTS</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-4 page-break-inside-avoid">
                        <h3 className="text-md font-bold">{proj.name}</h3>
                        <p className="text-sm">{proj.description}</p>
                    </div>
                ))}
            </section>}

            {certifications.length > 0 && <section className="mt-8">
                <h2 className="text-xl font-bold text-primary-700 border-b-2 border-primary-700 pb-1 mb-3">CERTIFICATIONS</h2>
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-2">
                        <h4 className="font-semibold">{cert.name}, <span className="italic">{cert.issuer} ({cert.date})</span></h4>
                    </div>
                ))}
            </section>}

            {volunteering.length > 0 && <section className="mt-8">
                <h2 className="text-xl font-bold text-primary-700 border-b-2 border-primary-700 pb-1 mb-3">VOLUNTEERING</h2>
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-4 page-break-inside-avoid">
                        <h3 className="text-md font-bold">{vol.organization} - <span className="italic">{vol.role}</span></h3>
                        <p className="text-sm">{vol.description}</p>
                    </div>
                ))}
            </section>}

            {publications.length > 0 && <section className="mt-8">
                <h2 className="text-xl font-bold text-primary-700 border-b-2 border-primary-700 pb-1 mb-3">PUBLICATIONS</h2>
                {publications.map(pub => (
                    <div key={pub.id} className="mb-2">
                        <h4 className="font-semibold">{pub.title} - <span className="italic">{pub.publisher} ({pub.date})</span></h4>
                    </div>
                ))}
            </section>}
        </div>
    );
});

export default ModernTemplate;