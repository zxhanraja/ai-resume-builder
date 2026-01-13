import React from 'react';
import type { Resume } from '../../types';

const MainSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wider text-teal-800 pb-2 mb-3">{title}</h2>
        {children}
    </section>
);

const SidebarTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-sans text-sm" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="mb-8 p-8 bg-teal-800 text-white flex flex-col items-center text-center gap-4">
                {personalInfo.photoUrl && (
                    <img src={personalInfo.photoUrl} alt={personalInfo.name} className="w-32 h-32 rounded-full object-cover border-4 border-teal-600 flex-shrink-0" />
                )}
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold">{personalInfo.name}</h1>
                    <div className="mt-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-2 mb-3">Contact</h2>
                        <p className="mb-1 break-words">{personalInfo.phone}</p>
                        <p className="mb-1 break-words">{personalInfo.email}</p>
                        <p className="mb-1 break-words">{personalInfo.location}</p>
                        {personalInfo.website && <p className="mb-1 break-words">{personalInfo.website}</p>}
                    </div>
                </div>
            </header>
            
            <main className="p-4">
                <MainSection title="Summary">
                    <p className="text-gray-700">{personalInfo.summary}</p>
                </MainSection>

                <MainSection title="Work Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-5 page-break-inside-avoid">
                            <h3 className="text-lg font-bold text-gray-800">{exp.jobTitle}</h3>
                            <div className="flex justify-between text-xs italic text-gray-600 mb-1">
                                <span>{exp.company}, {exp.location}</span>
                                <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                            </div>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </MainSection>
                
                <MainSection title="Education">
                    {education.map(edu => (
                        <div key={edu.id} className="mb-3">
                            <h3 className="font-semibold text-lg">{edu.degree}</h3>
                            <p className="text-sm text-gray-600">{edu.institution}</p>
                            <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                        </div>
                    ))}
                </MainSection>

                <MainSection title="Skills">
                    <div className="flex flex-wrap -m-1">
                        {skills.map(skill => (
                            <span key={skill.id} className="m-1 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold">{skill.name}</span>
                        ))}
                    </div>
                </MainSection>

                {projects.length > 0 && <MainSection title="Projects">
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4 page-break-inside-avoid">
                            <h3 className="text-lg font-bold text-gray-800">{proj.name}</h3>
                            <p className="text-gray-700">{proj.description}</p>
                        </div>
                    ))}
                </MainSection>}

                {certifications.length > 0 && <MainSection title="Certifications">
                    {certifications.map(cert => (
                        <div key={cert.id} className="mb-3">
                            <h3 className="font-semibold text-lg">{cert.name}</h3>
                            <p className="text-sm text-gray-600">{cert.issuer} ({cert.date})</p>
                        </div>
                    ))}
                </MainSection>}

                {volunteering.length > 0 && <MainSection title="Volunteering">
                    {volunteering.map(vol => (
                        <div key={vol.id} className="mb-4 page-break-inside-avoid">
                            <h3 className="text-lg font-bold text-gray-800">{vol.organization} - <span className="font-semibold italic">{vol.role}</span></h3>
                            <p className="text-gray-700">{vol.description}</p>
                        </div>
                    ))}
                </MainSection>}

                {publications.length > 0 && <MainSection title="Publications">
                    {publications.map(pub => (
                        <div key={pub.id} className="mb-3">
                            <h3 className="font-semibold text-lg">{pub.title}</h3>
                            <p className="text-sm text-gray-600">{pub.publisher} ({pub.date})</p>
                        </div>
                    ))}
                </MainSection>}
            </main>
        </div>
    );
});

export default SidebarTemplate;