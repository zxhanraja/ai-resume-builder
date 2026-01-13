
import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 mb-2">{title}</h2>
        {children}
    </section>
);

const WhartonTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="font-serif text-[10pt] text-gray-800 leading-normal" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold tracking-wider">{personalInfo.name}</h1>
                <div className="flex justify-center items-center gap-x-3 gap-y-1 text-xs flex-wrap mt-2">
                    <span className="flex items-center gap-1"><LocationIcon className="w-3 h-3" />{personalInfo.location}</span>
                    <span className="flex items-center gap-1"><PhoneIcon className="w-3 h-3" />{personalInfo.phone}</span>
                    <span className="flex items-center gap-1"><MailIcon className="w-3 h-3" />{personalInfo.email}</span>
                    {personalInfo.website && <span className="flex items-center gap-1"><WebsiteIcon className="w-3 h-3" />{personalInfo.website}</span>}
                    {personalInfo.linkedin && <span className="flex items-center gap-1"><LinkedInIcon className="w-3 h-3" />{personalInfo.linkedin}</span>}
                    {personalInfo.twitter && <span className="flex items-center gap-1"><TwitterIcon className="w-3 h-3" />{personalInfo.twitter}</span>}
                </div>
            </header>
            
            <Section title="Professional Summary">
                <p className="text-xs">{personalInfo.summary}</p>
            </Section>
            
            <Section title="Professional Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{exp.company}</h3>
                            <p className="italic">{exp.location}</p>
                        </div>
                        <div className="flex justify-between items-baseline italic">
                            <p>{exp.jobTitle}</p>
                            <p>{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
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
                             <p>{edu.endDate}</p>
                        </div>
                        <p>{edu.degree}, {edu.fieldOfStudy}</p>
                    </div>
                ))}
            </Section>

            {projects.length > 0 && <Section title="Projects">
                {projects.map(proj => (
                     <div key={proj.id} className="mb-2 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{proj.name}</h3>
                            {proj.url && <a href={proj.url} className="italic break-all">{proj.url}</a>}
                        </div>
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

export default WhartonTemplate;