import React from 'react';
import type { Resume } from '../../types';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-6">
        <h2 className="text-sm font-bold uppercase text-blue-600 border-b-2 border-gray-300 pb-1 mb-3">{title}</h2>
        {children}
    </section>
);

const ProfessionalTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="resume-template-body font-sans text-xs text-gray-700" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="mb-8 flex flex-col items-center text-center">
                 {personalInfo.photoUrl && (
                    <img src={personalInfo.photoUrl} alt={personalInfo.name} className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 mb-4" />
                )}
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">{personalInfo.name}</h1>
                    <p className="text-md text-gray-600 mt-1 break-words">
                        {personalInfo.email} &bull; {personalInfo.phone} &bull; {personalInfo.location}
                        {personalInfo.website && ` &bull; ${personalInfo.website}`}
                    </p>
                </div>
            </header>
            
            <Section title="Summary">
                <p>{personalInfo.summary}</p>
            </Section>
            
            <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-base text-gray-800">{exp.jobTitle}</h3>
                            <p className="text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                        <p className="italic text-gray-600">{exp.company}, {exp.location}</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                            {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>
            
            {projects.length > 0 && (
                <Section title="Projects">
                     {projects.map(proj => (
                        <div key={proj.id} className="mb-3 page-break-inside-avoid">
                            <h3 className="font-bold text-gray-800">{proj.name}</h3>
                            <p>{proj.description}</p>
                            {proj.url && <a href={proj.url} className="text-blue-600 hover:underline break-all">{proj.url}</a>}
                        </div>
                    ))}
                </Section>
            )}

             <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-base text-gray-800">{edu.institution}</h3>
                             <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p>{edu.degree}, {edu.fieldOfStudy}</p>
                    </div>
                ))}
            </Section>
            
            <Section title="Skills">
                <div className="flex flex-wrap -m-1">
                    {skills.map(skill => (
                        <span key={skill.id} className="m-1 bg-blue-100 text-blue-800 px-2 py-1 rounded">{skill.name}</span>
                    ))}
                </div>
            </Section>

            {certifications.length > 0 && <Section title="Certifications">
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-2 page-break-inside-avoid">
                        <h3 className="font-bold text-base text-gray-800">{cert.name}, <span className="italic font-normal">{cert.issuer} ({cert.date})</span></h3>
                    </div>
                ))}
            </Section>}

            {volunteering.length > 0 && <Section title="Volunteering">
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-4 page-break-inside-avoid">
                        <h3 className="font-bold text-base text-gray-800">{vol.organization} - <span className="italic font-normal">{vol.role}</span></h3>
                        <p>{vol.description}</p>
                    </div>
                ))}
            </Section>}

            {publications.length > 0 && <Section title="Publications">
                {publications.map(pub => (
                    <div key={pub.id} className="mb-2 page-break-inside-avoid">
                        <h3 className="font-bold text-base text-gray-800">{pub.title} - <span className="italic font-normal">{pub.publisher} ({pub.date})</span></h3>
                    </div>
                ))}
            </Section>}
        </div>
    );
});

export default ProfessionalTemplate;