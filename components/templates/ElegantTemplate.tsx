import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[color:var(--accent-color)] border-b border-gray-300 pb-1 mb-3">{title}</h2>
        {children}
    </section>
);

const ElegantTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-serif text-[10pt] text-gray-800" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="text-center mb-6 border-b-2 border-gray-300 pb-6">
                <h1 className="text-4xl font-bold tracking-wide">{personalInfo.name}</h1>
                <div className="mt-2 text-xs text-gray-600 flex items-center justify-center gap-x-3 gap-y-1 flex-wrap">
                    {personalInfo.phone && <span className="flex items-center gap-1.5"><PhoneIcon className="w-3 h-3" /> {personalInfo.phone}</span>}
                    {personalInfo.email && <span className="flex items-center gap-1.5"><MailIcon className="w-3 h-3" /> {personalInfo.email}</span>}
                    {personalInfo.location && <span className="flex items-center gap-1.5"><LocationIcon className="w-3 h-3" /> {personalInfo.location}</span>}
                    {personalInfo.website && <span className="flex items-center gap-1.5"><WebsiteIcon className="w-3 h-3" /> {personalInfo.website}</span>}
                    {personalInfo.linkedin && <span className="flex items-center gap-1.5"><LinkedInIcon className="w-3 h-3" /> {personalInfo.linkedin}</span>}
                    {personalInfo.twitter && <span className="flex items-center gap-1.5"><TwitterIcon className="w-3 h-3" /> {personalInfo.twitter}</span>}
                </div>
            </header>
            
            <p className="text-center text-xs mb-6">{personalInfo.summary}</p>
            
            <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-sm">{exp.jobTitle}, <span className="italic font-normal">{exp.company}</span></h3>
                            <p className="text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>

            <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                             <h3 className="font-bold text-sm">{edu.degree}, <span className="italic font-normal">{edu.fieldOfStudy}</span></h3>
                             <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p>{edu.institution}</p>
                    </div>
                ))}
            </Section>
            
            <Section title="Skills">
                <div className="flex flex-wrap justify-center -m-1">
                    {skills.map(skill => (
                        <span key={skill.id} className="m-1 border border-gray-300 text-gray-700 px-3 py-1 rounded-sm text-xs">{skill.name}</span>
                    ))}
                </div>
            </Section>

            {projects.length > 0 && <Section title="Projects">
                {projects.map(proj => (
                    <div key={proj.id} className="mb-4 text-xs page-break-inside-avoid">
                        <h3 className="font-bold text-sm">{proj.name}</h3>
                        <p className="mt-1">{proj.description}</p>
                    </div>
                ))}
            </Section>}

            {certifications.length > 0 && <Section title="Certifications">
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-2 text-xs page-break-inside-avoid">
                        <h3 className="font-bold">{cert.name}, <span className="italic font-normal">{cert.issuer} ({cert.date})</span></h3>
                    </div>
                ))}
            </Section>}

            {volunteering.length > 0 && <Section title="Volunteering">
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-4 text-xs page-break-inside-avoid">
                        <h3 className="font-bold text-sm">{vol.organization} - <span className="italic font-normal">{vol.role}</span></h3>
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

export default ElegantTemplate;