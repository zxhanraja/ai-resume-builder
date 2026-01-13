import React from 'react';
import type { Resume } from '../../types';

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={`mb-6 ${className}`}>
        <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">{title}</h2>
        {children}
    </section>
);

const CreativeTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-sans text-sm" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="p-6 text-center bg-gray-50 mb-6">
                {personalInfo.photoUrl && (
                    <div className="flex justify-center mb-4">
                        <img src={personalInfo.photoUrl} alt={personalInfo.name} className="w-36 h-36 rounded-full object-cover shadow-lg" />
                    </div>
                )}
                 <h1 className="text-3xl font-bold text-center text-gray-800">{personalInfo.name}</h1>
                 <p className="text-xs text-gray-600 mt-2">{personalInfo.summary}</p>

                 <div className="mt-4 text-xs text-gray-600">
                    <p className="mb-1 break-words">{personalInfo.phone}</p>
                    <p className="mb-1 break-words">{personalInfo.email}</p>
                    <p className="mb-1 break-words">{personalInfo.location}</p>
                    {personalInfo.website && <p className="mb-1 break-words">{personalInfo.website}</p>}
                </div>
            </header>
            
            <main className="px-2">
                <Section title="Work Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-5 relative pl-5 page-break-inside-avoid">
                             <div className="absolute left-0 h-full w-0.5 bg-gray-200">
                                <div className="absolute -left-1.5 top-0 w-3.5 h-3.5 bg-teal-500 rounded-full border-2 border-white"></div>
                            </div>
                            <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</p>
                            <h3 className="text-base font-bold text-gray-800">{exp.jobTitle}</h3>
                            <p className="text-sm italic text-gray-600 mb-1">{exp.company}</p>
                            <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>

                <Section title="Education">
                     {education.map(edu => (
                        <div key={edu.id} className="mb-4 relative pl-5 page-break-inside-avoid">
                            <div className="absolute left-0 h-full w-0.5 bg-gray-200">
                                <div className="absolute -left-1.5 top-0 w-3.5 h-3.5 bg-teal-500 rounded-full border-2 border-white"></div>
                            </div>
                            <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                            <h3 className="text-base font-bold text-gray-800">{edu.institution}</h3>
                            <p className="text-sm italic text-gray-600">{edu.degree}, {edu.fieldOfStudy}</p>
                        </div>
                    ))}
                </Section>

                {projects.length > 0 && (
                     <Section title="Projects">
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-3 page-break-inside-avoid">
                                <h3 className="font-bold text-gray-800">{proj.name}</h3>
                                <p className="text-xs">{proj.description}</p>
                                {proj.url && <a href={proj.url} className="text-teal-600 hover:underline text-xs break-all">{proj.url}</a>}
                            </div>
                        ))}
                    </Section>
                )}

                <Section title="Skills">
                    <div className="flex flex-wrap -m-1">
                        {skills.map(skill => (
                            <span key={skill.id} className="m-1 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold">{skill.name}</span>
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
                        <div key={vol.id} className="mb-4 page-break-inside-avoid">
                            <h3 className="font-bold">{vol.organization} - <span className="italic font-normal">{vol.role}</span></h3>
                            <p className="text-xs">{vol.description}</p>
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
            </main>
        </div>
    );
});

export default CreativeTemplate;