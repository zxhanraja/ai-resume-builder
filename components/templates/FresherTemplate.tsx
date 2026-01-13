
import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';


const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white bg-[color:var(--accent-color)] px-2 py-1 mb-2">{title}</h2>
        {children}
    </section>
);

const FresherTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, education, skills, certifications, experience, projects, volunteering, publications } = resume;

    return (
        <div className="font-sans text-xs text-gray-800 leading-normal" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="text-center mb-6">
                <h1 className="text-3xl font-extrabold">{personalInfo.targetTitle || personalInfo.name}</h1>
                <p className="mt-1 font-semibold">{personalInfo.summary}</p>
                <div className="mt-2 flex justify-center items-center gap-x-3 gap-y-1 text-xs flex-wrap">
                    <span className="flex items-center gap-1"><LocationIcon className="w-3 h-3" />{personalInfo.location}</span>
                    <span className="flex items-center gap-1"><PhoneIcon className="w-3 h-3" />{personalInfo.phone}</span>
                    <span className="flex items-center gap-1"><MailIcon className="w-3 h-3" />{personalInfo.email}</span>
                    {personalInfo.website && <span className="flex items-center gap-1"><WebsiteIcon className="w-3 h-3" />{personalInfo.website}</span>}
                    {personalInfo.linkedin && <span className="flex items-center gap-1"><LinkedInIcon className="w-3 h-3" />{personalInfo.linkedin}</span>}
                    {personalInfo.twitter && <span className="flex items-center gap-1"><TwitterIcon className="w-3 h-3" />{personalInfo.twitter}</span>}
                </div>
            </header>
            
            <Section title="Objective">
                <p>{personalInfo.summary}</p>
            </Section>

            <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                             <h3 className="font-bold">{edu.institution}</h3>
                             <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p>{edu.degree}, {edu.fieldOfStudy}</p>
                    </div>
                ))}
            </Section>

            <Section title="Skills">
                <div className="flex flex-wrap -m-1">
                    {skills.map(skill => (
                        <span key={skill.id} className="m-1 bg-gray-100 text-gray-800 px-2 py-1 rounded">{skill.name}</span>
                    ))}
                </div>
            </Section>

            {certifications.length > 0 && <Section title="Certifications">
                 <ul className="list-disc list-inside">
                    {certifications.map(cert => <li key={cert.id} className="page-break-inside-avoid">{cert.name} from {cert.issuer}</li>)}
                </ul>
            </Section>}

            {experience.length > 0 && <Section title="Internships">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3 page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <div>
                                <h3 className="font-bold">{exp.jobTitle}</h3>
                                <p className="italic">{exp.company}, {exp.location}</p>
                            </div>
                            <p className="text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                        <ul className="list-disc list-inside mt-1 space-y-0.5">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>}

            {projects.length > 0 && <Section title="Academic Projects">
                 {projects.map(proj => (
                    <div key={proj.id} className="mb-3 page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{proj.name}</h3>
                            {proj.url && <a href={proj.url} className="text-blue-600 hover:underline break-all">{proj.url}</a>}
                        </div>
                        <ul className="list-disc list-inside mt-1 space-y-0.5">
                            {proj.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>}

            {volunteering.length > 0 && <Section title="Volunteering">
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-3 page-break-inside-avoid">
                        <h3 className="font-bold">{vol.organization} - <span className="italic font-normal">{vol.role}</span></h3>
                        <p>{vol.description}</p>
                    </div>
                ))}
            </Section>}

            {publications.length > 0 && <Section title="Publications">
                <ul className="list-disc list-inside">
                    {publications.map(pub => <li key={pub.id} className="page-break-inside-avoid">{pub.title} from {pub.publisher} ({pub.date})</li>)}
                </ul>
            </Section>}
        </div>
    );
});

export default FresherTemplate;