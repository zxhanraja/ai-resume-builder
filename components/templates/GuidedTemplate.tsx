
import React from 'react';
import type { Resume } from '../../types';

const Placeholder: React.FC<{ text: string }> = ({ text }) => (
    <span className="bg-gray-200 text-gray-500 px-2 py-0.5 rounded-sm italic">{text}</span>
);

const GuidedTemplate: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications } = resume;

    return (
        <div className="font-mono text-sm text-gray-700 border-4 border-dashed border-gray-300" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in` }}>
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">{personalInfo.name || <Placeholder text="Your Name" />}</h1>
                <p className="mt-2 text-xs break-words">
                    {personalInfo.location || <Placeholder text="City, State"/>} | {personalInfo.email || <Placeholder text="your.email@server.com" />}
                    {personalInfo.linkedin ? ` | ${personalInfo.linkedin}` : ` | `} {<Placeholder text="linkedin.com/in/..." />}
                    {personalInfo.twitter ? ` | ${personalInfo.twitter}` : ` | `} {<Placeholder text="twitter.com/..." />}
                </p>
            </header>
            
            <section className="mb-6">
                <p>
                    Add a strong resume summary here that highlights what it is you do, the types of companies you've worked with, and why you're great at your job. Mention your top skills, specializations, and strengths.
                </p>
                <div className="mt-2 p-3 bg-gray-100 border-l-4 border-gray-400">
                    <p className="italic">{personalInfo.summary || <Placeholder text="Your professional summary..." />}</p>
                </div>
            </section>
            
            <section className="mb-6">
                <h2 className="font-bold text-lg mb-2">WORK EXPERIENCE</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 page-break-inside-avoid">
                        <p className="font-bold">{exp.company || <Placeholder text="Company" />}, {exp.location || <Placeholder text="Location" />}</p>
                        <p className="italic">{exp.jobTitle || <Placeholder text="Job Title" />}</p>
                        <p className="text-xs text-gray-500 mb-2">{exp.startDate || <Placeholder text="MM/YYYY" />} - {exp.endDate || <Placeholder text="MM/YYYY" />}</p>
                        <p>
                            Tailor your experience sections to the job description. Don't use up too much of your space detailing daily duties that aren't relevant. Study the job listing to figure out what's most important to the hiring manager.
                        </p>
                        <div className="mt-2 p-3 bg-gray-100 border-l-4 border-gray-400">
                            <ul className="list-disc list-inside text-xs space-y-1">
                                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                    </div>
                ))}
            </section>

             <section>
                <h2 className="font-bold text-lg mb-2">EDUCATION</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 page-break-inside-avoid">
                        <p className="font-bold">{edu.degree || <Placeholder text="Degree" />}, {edu.institution || <Placeholder text="College Name" />}, {edu.endDate || <Placeholder text="YYYY" />}</p>
                    </div>
                ))}
            </section>

            {skills.length > 0 && <section className="mb-6">
                <h2 className="font-bold text-lg mb-2">SKILLS</h2>
                <p>{skills.map(s => s.name).join(', ')}</p>
            </section>}

            {projects.length > 0 && <section className="mb-6">
                <h2 className="font-bold text-lg mb-2">PROJECTS</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-2 page-break-inside-avoid">
                        <p className="font-bold">{proj.name}</p>
                        <p>{proj.description}</p>
                    </div>
                ))}
            </section>}

            {certifications.length > 0 && <section className="mb-6">
                <h2 className="font-bold text-lg mb-2">CERTIFICATIONS</h2>
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-2 page-break-inside-avoid">
                        <p className="font-bold">{cert.name}, <span className="italic">{cert.issuer} ({cert.date})</span></p>
                    </div>
                ))}
            </section>}
            
            {volunteering.length > 0 && <section className="mb-6">
                <h2 className="font-bold text-lg mb-2">VOLUNTEERING</h2>
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-2 page-break-inside-avoid">
                        <p className="font-bold">{vol.organization}, <span className="italic">{vol.role}</span></p>
                        <p>{vol.description}</p>
                    </div>
                ))}
            </section>}

            {publications.length > 0 && <section className="mb-6">
                <h2 className="font-bold text-lg mb-2">PUBLICATIONS</h2>
                {publications.map(pub => (
                    <div key={pub.id} className="mb-2 page-break-inside-avoid">
                        <p className="font-bold">{pub.title}, <span className="italic">{pub.publisher} ({pub.date})</span></p>
                    </div>
                ))}
            </section>}
        </div>
    );
});

export default GuidedTemplate;