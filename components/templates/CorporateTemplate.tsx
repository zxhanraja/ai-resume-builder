import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-gray-200 pb-1 mb-2" style={{ borderColor: 'var(--accent-color)'}}>{title}</h2>
        {children}
    </section>
);

const CorporateTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-sans text-[10pt] text-gray-800 leading-relaxed" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="text-center mb-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-[color:var(--accent-color)]">{personalInfo.name}</h1>
                {personalInfo.targetTitle && <p className="mt-1 text-lg font-semibold text-gray-700">{personalInfo.targetTitle}</p>}
                <div className="mt-2 flex justify-center items-center gap-x-3 gap-y-1 text-xs text-gray-600 flex-wrap">
                    <span className="flex items-center gap-1.5"><LocationIcon className="w-3 h-3" />{personalInfo.location}</span>
                    <span className="flex items-center gap-1.5"><PhoneIcon className="w-3 h-3" />{personalInfo.phone}</span>
                    <span className="flex items-center gap-1.5"><MailIcon className="w-3 h-3" />{personalInfo.email}</span>
                    {personalInfo.website && <span className="flex items-center gap-1.5"><WebsiteIcon className="w-3 h-3" />{personalInfo.website}</span>}
                    {personalInfo.linkedin && <span className="flex items-center gap-1.5"><LinkedInIcon className="w-3 h-3" />{personalInfo.linkedin}</span>}
                    {personalInfo.twitter && <span className="flex items-center gap-1.5"><TwitterIcon className="w-3 h-3" />{personalInfo.twitter}</span>}
                </div>
            </header>
            
            <Section title="Summary">
                <p className="text-xs">{personalInfo.summary}</p>
            </Section>
            
            <Section title="Skills">
                <div className="flex flex-wrap -m-1">
                    {skills.map(skill => (
                        <span key={skill.id} className="m-1 bg-[color:var(--accent-color)]/10 text-[color:var(--accent-color)] px-2 py-1 rounded text-xs" style={{ color: 'var(--accent-color)'}}>{skill.name}</span>
                    ))}
                </div>
            </Section>

            <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-sm">{exp.jobTitle}</h3>
                            <p className="text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                        <p className="italic">{exp.company}, {exp.location}</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>
            
            {projects.length > 0 && (
                <Section title="Projects">
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-3 text-xs page-break-inside-avoid">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-sm">{proj.name}</h3>
                                {proj.url && <a href={proj.url} className="text-blue-600 hover:underline break-all">{proj.url}</a>}
                            </div>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                                {proj.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>
            )}

            <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                             <h3 className="font-bold text-sm">{edu.institution}</h3>
                             <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p>{edu.degree}, {edu.fieldOfStudy}</p>
                    </div>
                ))}
            </Section>

            {certifications.length > 0 && <Section title="Certifications">
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-2 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-sm">{cert.name}</h3>
                            <p className="text-gray-600">{cert.date}</p>
                        </div>
                        <p className="italic">{cert.issuer}</p>
                    </div>
                ))}
            </Section>}

            {volunteering.length > 0 && <Section title="Volunteering">
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-3 text-xs page-break-inside-avoid">
                        <h3 className="font-bold text-sm">{vol.organization} - <span className="italic font-normal">{vol.role}</span></h3>
                        <p className="mt-1">{vol.description}</p>
                    </div>
                ))}
            </Section>}

            {publications.length > 0 && <Section title="Publications">
                {publications.map(pub => (
                    <div key={pub.id} className="mb-2 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-sm">{pub.title}</h3>
                            <p className="text-gray-600">{pub.date}</p>
                        </div>
                        <p className="italic">{pub.publisher}</p>
                    </div>
                ))}
            </Section>}
        </div>
    );
});

export default CorporateTemplate;