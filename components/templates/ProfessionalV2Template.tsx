import React from 'react';
import type { Resume } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, WebsiteIcon, LinkedInIcon, TwitterIcon } from '../shared/ResumeIcons';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[color:var(--accent-color)] border-b border-black pb-1 mb-2" style={{ borderColor: 'var(--accent-color)'}}>{title}</h2>
        {children}
    </section>
);

const formatUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
};

const displayUrl = (url?: string) => {
    if (!url) return '';
    return url.replace(/^(https?:\/\/)?(www\.)?/, '');
};


const ProfessionalV2Template: React.FC<{ resume: Resume }> = React.memo(({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, volunteering, publications, design } = resume;

    const headerAlignClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    }[design.headerAlignment || 'left'];

    const renderSkills = () => {
        if (!skills || skills.length === 0) return null;

        switch (design.skillsLayout) {
            case 'list':
                return (
                    <ul className="list-disc list-inside text-xs">
                        {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                    </ul>
                );
            case 'columns':
                const midPoint = Math.ceil(skills.length / 2);
                const column1 = skills.slice(0, midPoint);
                const column2 = skills.slice(midPoint);
                return (
                    <div className="flex -mx-2 text-xs">
                        <ul className="w-1/2 px-2 list-disc list-inside">
                            {column1.map(skill => <li key={skill.id}>{skill.name}</li>)}
                        </ul>
                        <ul className="w-1/2 px-2 list-disc list-inside">
                            {column2.map(skill => <li key={skill.id}>{skill.name}</li>)}
                        </ul>
                    </div>
                );
            case 'comma':
            default:
                return <p className="text-xs">{skills.map(s => s.name).join(', ')}</p>;
        }
    };


    return (
        <div className="resume-template-body font-sans text-[9pt] text-gray-800 leading-normal" style={{ padding: `${resume.design.topBottomMargin}in ${resume.design.leftRightMargin}in`, fontFamily: resume.design.fontFamily, fontSize: resume.design.fontSize, lineHeight: resume.design.lineHeight }}>
            <header className={`${headerAlignClass} mb-4`}>
                <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
                <div className={`flex ${headerAlignClass === 'text-left' ? 'justify-start' : headerAlignClass === 'text-right' ? 'justify-end' : 'justify-center'} items-center gap-x-3 gap-y-1 text-xs flex-wrap break-words`}>
                    <span className="flex items-center gap-1"><LocationIcon className="w-3 h-3" /> {personalInfo.location}</span>
                    <span className="flex items-center gap-1"><PhoneIcon className="w-3 h-3" /> {personalInfo.phone}</span>
                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline"><MailIcon className="w-3 h-3" /> {personalInfo.email}</a>
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><WebsiteIcon className="w-3 h-3" /> {displayUrl(personalInfo.website)}</a>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><LinkedInIcon className="w-3 h-3" /> {displayUrl(personalInfo.linkedin)}</a>}
                    {personalInfo.twitter && <a href={formatUrl(personalInfo.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><TwitterIcon className="w-3 h-3" /> {displayUrl(personalInfo.twitter)}</a>}
                </div>
            </header>
            
            <p className={`${headerAlignClass} text-xs italic mb-3`}>{personalInfo.summary}</p>
            
            <Section title="Work Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-2 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{exp.jobTitle}</h3>
                            <p className="font-bold">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                        <p className="italic">{exp.company}</p>
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
                             <h3 className="font-bold">{edu.degree}</h3>
                             <p className="font-bold">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p>{edu.institution}</p>
                    </div>
                ))}
            </Section>

            {projects.length > 0 && <Section title="Projects">
                {projects.map(proj => (
                    <div key={proj.id} className="mb-2 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                             <h3 className="font-bold">{proj.name}</h3>
                             {proj.url && <a href={formatUrl(proj.url)} target="_blank" rel="noopener noreferrer" className="italic break-all hover:underline">{displayUrl(proj.url)}</a>}
                        </div>
                        <ul className="list-disc list-inside mt-1 space-y-0.5">
                            {proj.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>}

            {certifications.length > 0 && <Section title="Certifications">
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-2 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{cert.name}</h3>
                            <p className="font-bold">{cert.date}</p>
                        </div>
                        <p className="italic">{cert.issuer}</p>
                    </div>
                ))}
            </Section>}
            
            <Section title="Skills">
                {renderSkills()}
            </Section>

            {volunteering.length > 0 && <Section title="Volunteering">
                {volunteering.map(vol => (
                    <div key={vol.id} className="mb-2 text-xs page-break-inside-avoid">
                        <h3 className="font-bold">{vol.organization} - <span className="italic font-normal">{vol.role}</span></h3>
                        <p className="mt-1">{vol.description}</p>
                    </div>
                ))}
            </Section>}

            {publications.length > 0 && <Section title="Publications">
                {publications.map(pub => (
                    <div key={pub.id} className="mb-2 text-xs page-break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{pub.title}</h3>
                            <p className="font-bold">{pub.date}</p>
                        </div>
                        <p className="italic">{pub.publisher}</p>
                    </div>
                ))}
            </Section>}
        </div>
    );
});

export default ProfessionalV2Template;