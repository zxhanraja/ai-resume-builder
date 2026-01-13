

import type { Resume, BlogPost, TemplateLayout, TemplateStyle } from './types';

export const mockResumes: Resume[] = [
    {
        id: 'res-1',
        title: 'Software Engineer Resume',
        template: 'professionalV2',
        lastEdited: '2023-10-26T10:00:00Z',
        personalInfo: {
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            phone: '123-456-7890',
            location: 'San Francisco, CA',
            website: 'https://janedoe.dev',
            linkedin: 'https://linkedin.com/in/janedoe',
            twitter: 'https://twitter.com/janedoe',
            summary: 'Innovative and deadline-driven Software Engineer with 5+ years of experience designing and developing user-centered digital products from initial concept to final, polished deliverable. Adept at leveraging modern front-end and back-end technologies to build scalable and maintainable applications.',
            photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            targetTitle: 'Senior Software Engineer',
        },
        experience: [
            {
                id: 'exp-1',
                jobTitle: 'Senior Frontend Developer',
                company: 'Tech Solutions Inc.',
                location: 'San Francisco, CA',
                startDate: '2020-01-01',
                endDate: 'Present',
                description: '- Led a team of 5 developers in the creation of a new e-commerce platform, resulting in a 40% increase in sales within the first six months.\n- Improved website performance by 30% through code optimization, image compression, and implementing a CDN.\n- Mentored junior developers and conducted code reviews to ensure code quality and adherence to best practices.',
            },
            {
                id: 'exp-2',
                jobTitle: 'Software Engineer',
                company: 'Innovate LLC',
                location: 'Palo Alto, CA',
                startDate: '2016-07-01',
                endDate: '2019-12-31',
                description: '- Developed and maintained RESTful APIs for a client-facing web application with over 1 million active users.\n- Collaborated with a cross-functional team of designers, product managers, and other engineers to deliver high-quality features.\n- Wrote unit and integration tests to ensure software reliability and stability.',
            },
        ],
        education: [
            {
                id: 'edu-1',
                institution: 'University of Technology',
                degree: 'Bachelor of Science',
                fieldOfStudy: 'Computer Science',
                startDate: '2012-09-01',
                endDate: '2016-06-01',
            },
        ],
        skills: [
            { id: 'skill-1', name: 'React' },
            { id: 'skill-2', name: 'TypeScript' },
            { id: 'skill-3', name: 'Node.js' },
            { id: 'skill-4', name: 'GraphQL' },
            { id: 'skill-5', name: 'Next.js' },
            { id: 'skill-6', name: 'CI/CD' },
            { id: 'skill-7', name: 'Docker' },
            { id: 'skill-8', name: 'Kubernetes' },
            { id: 'skill-9', name: 'AWS' },
            { id: 'skill-10', name: 'Python' },
            { id: 'skill-11', name: 'SQL' },
            { id: 'skill-12', name: 'Agile Methodologies' },
        ],
        projects: [
            {
                id: 'proj-1',
                name: 'Personal Portfolio',
                description: 'A responsive personal portfolio website built with Next.js and deployed on Vercel to showcase my projects and skills.',
                url: 'https://janedoe.dev',
            },
             {
                id: 'proj-2',
                name: 'E-commerce Store API',
                description: 'A full-featured REST API for an e-commerce platform built with Node.js, Express, and MongoDB, including user authentication and payment processing.',
                url: 'https://github.com/janedoe/ecommerce-api',
            },
        ],
        certifications: [
            {
                id: 'cert-1',
                name: 'AWS Certified Solutions Architect - Associate',
                issuer: 'Amazon Web Services',
                date: '08/2022',
            },
            {
                id: 'cert-2',
                name: 'Certified Kubernetes Application Developer (CKAD)',
                issuer: 'The Linux Foundation',
                date: '05/2021',
            }
        ],
        volunteering: [
            {
                id: 'vol-1',
                organization: 'Girls Who Code',
                role: 'Volunteer Instructor',
                description: 'Taught basic web development concepts to high school students in an after-school program.',
            }
        ],
        publications: [],
        design: {
            fontFamily: "'Inter', sans-serif",
            fontSize: '10pt',
            accentColor: '#2563eb',
            lineHeight: '1.4',
            dateFormat: 'MM/YYYY',
            headerAlignment: 'left',
            dateAlignment: 'right',
            locationAlignment: 'right',
            skillsLayout: 'columns',
            paperSize: 'Letter',
            leftRightMargin: 0.6,
            topBottomMargin: 0.6,
        },
    },
];

// FIX: Added the 'style' property to each template object to satisfy the type requirement.
export const TEMPLATES: {id: string; name: string; style: TemplateStyle; layout: TemplateLayout}[] = [
    { id: 'professionalV2', name: 'Professional V2', style: 'Modern', layout: '1 Column' },
    { id: 'atsClassic', name: 'ATS Classic', style: 'Traditional', layout: '1 Column' },
    { id: 'atsModern', name: 'ATS Modern', style: 'Modern', layout: '1 Column' },
    { id: 'bold', name: 'Bold', style: 'Modern', layout: '1 Column' },
    { id: 'corporate', name: 'Corporate', style: 'Traditional', layout: '1 Column' },
    { id: 'elegant', name: 'Elegant', style: 'Creative', layout: '1 Column' },
    { id: 'tech', name: 'Tech', style: 'Modern', layout: '1 Column' },
    { id: 'academic', name: 'Academic', style: 'Traditional', layout: '1 Column' },
    { id: 'compact', name: 'Compact', style: 'Modern', layout: '1 Column' },
    { id: 'modernProfessional', name: 'Modern Professional', style: 'Modern', layout: '1 Column' },
    { id: 'executiveV2', name: 'Executive V2', style: 'Modern', layout: '1 Column' },
    { id: 'executive', name: 'Executive', style: 'Traditional', layout: '1 Column' },
    { id: 'crisp', name: 'Crisp', style: 'Modern', layout: '1 Column' },
    { id: 'teal', name: 'Teal', style: 'Creative', layout: '1 Column' },
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'killer-swe-resume',
        title: '5 Tips for a Killer Software Engineer Resume',
        date: 'October 27, 2024',
        excerpt: 'In a competitive tech market, your resume needs to do more than just list your skills. Learn how to showcase your projects, quantify your impact, and use the right keywords to grab the attention of top tech recruiters.',
        content: `
## Introduction
The tech job market is more competitive than ever. A well-crafted resume is your first, and often only, chance to make an impression. For software engineers, it's not just about listing languages and frameworks; it's about telling a story of your impact. Here are five essential tips to make your resume stand out.

### 1. Quantify Your Achievements
Hiring managers love numbers. Instead of saying you "improved performance," say you "Improved API response time by 30%, leading to a 15% increase in user engagement." Quantifiable results demonstrate tangible value. Go through your past projects and find metrics:
- How much did you increase revenue?
- By what percentage did you reduce server costs?
- How many users did your feature serve?

### 2. Tailor for the Job and ATS
One-size-fits-all resumes don't work. Customize your resume for every application. Read the job description carefully and mirror its language. Use the keywords they mention for skills and responsibilities. This not only shows the recruiter you're a good fit but also helps you get past the Applicant Tracking System (ATS).

### 3. Showcase Your Projects
Your personal or open-source projects are proof of your passion and skills. Dedicate a section to them, especially if you're early in your career. For each project, include:
- A link to the live project and the GitHub repository.
- A brief description of the project and its purpose.
- The tech stack you used.
- Your specific contributions and any challenges you overcame.

### 4. Keep it Concise and Readable
Recruiters spend an average of 6-7 seconds on a resume. Keep it to one page if you have less than 10 years of experience. Use clear headings, bullet points, and a clean font. Avoid jargon where possible and ensure there are no typos.

### 5. Highlight Your "Soft" Skills
Technical skills are crucial, but so are soft skills. Weave them into your experience descriptions. Show, don't just tell. Instead of listing "Teamwork," describe a project where you "Collaborated with a cross-functional team of 5 to deliver a project ahead of schedule."

By following these tips, you can transform your resume from a simple list of skills into a powerful marketing document that gets you noticed.
        `,
    },
    {
        id: 'beat-the-ats',
        title: 'How to Beat the Applicant Tracking System (ATS)',
        date: 'October 22, 2024',
        excerpt: 'Did you know over 90% of large companies use an ATS to screen resumes? We break down how these systems work and provide actionable strategies to ensure your resume makes it to a human\'s desk.',
        content: `
## What is an ATS?
An Applicant Tracking System (ATS) is software that companies use to manage the recruiting and hiring process. Its primary function for job seekers is to parse resumes, extract relevant information, and rank candidates based on how well their qualifications match the job description. If your resume isn't optimized for ATS, it might get rejected before a human ever sees it.

### 1. Use a Clean, Professional Format
Fancy graphics, columns, and tables can confuse an ATS. Stick to a simple, chronological or hybrid format. Use standard fonts like Arial, Helvetica, or Times New Roman.
- **Do:** Use standard section headings like "Work Experience," "Education," and "Skills."
- **Don't:** Put important information in the header or footer, as some systems can't read these areas.

### 2. Keywords are Everything
The ATS works by matching keywords from the job description to your resume.
- **Analyze the Job Description:** Copy the job description into a word cloud tool to see which words appear most frequently.
- **Incorporate Keywords Naturally:** Weave these keywords throughout your resume, especially in your professional summary and work experience sections. Don't just stuff them in a list.
- **Use Both Acronyms and Full Phrases:** For example, include both "Customer Relationship Management" and "CRM."

### 3. Use Standard Bullet Points
Stick to the standard solid or open circle bullet points. Complex symbols or custom graphics might not be parsed correctly.

### 4. Submit the Right File Type
Unless the application specifies otherwise, submit your resume as a .docx or .pdf file. PDFs are generally good at preserving formatting, but some older ATS systems may struggle with them. If both are allowed, a .docx file is often the safest bet.

### 5. Don't Rely on Visuals Alone
Avoid using images, charts, or graphs to display your skills or experience. The ATS can't read them. All critical information must be in text format.

By understanding how an ATS works, you can craft a resume that not only impresses recruiters but also successfully navigates the initial automated screening process.
        `,
    },
    {
        id: 'quantify-achievements',
        title: 'The Importance of Quantifying Your Achievements',
        date: 'October 15, 2024',
        excerpt: "'Managed a team' is good, but 'Managed a team of 5 to increase sales by 15% in Q3' is better. Learn the art of using numbers and metrics to demonstrate your true value to potential employers.",
        content: `
## From Responsibility to Achievement
Many people make the mistake of listing job responsibilities on their resume instead of their achievements. A responsibility describes what you were supposed to do, while an achievement demonstrates how well you did it. The single most effective way to showcase your achievements is by quantifying them.

### Why Numbers Matter
Numbers provide context and scale. They are specific, objective, and compelling. They turn vague statements into concrete evidence of your capabilities. Compare these two statements:

- **Before:** "Responsible for managing social media accounts."
- **After:** "Grew organic social media engagement by 200% over 6 months by implementing a new content strategy."

The second statement is far more powerful. It tells the recruiter not just what you did, but the impact you had.

### How to Find Your Numbers
Even if you're not in a sales or finance role, you can find ways to quantify your work. Ask yourself these questions:
- **How many?** How many customers did you support? How many articles did you write? How many team members did you train?
- **How much?** By what percentage did you increase efficiency? How much money did you save the company? How much did you increase traffic?
- **How often?** How many reports did you produce per week? How many events did you organize per year?

### The STAR Method
A great way to frame your quantified achievements is using the STAR method:
- **Situation:** Briefly describe the context.
- **Task:** What was your goal or task?
- **Action:** What specific actions did you take?
- **Result:** What was the outcome? (This is where you put your number!)

**Example:** *"Reduced bug report tickets by 25% (Result) by developing a new suite of automated tests (Action) for the main application (Task) during a critical pre-launch phase (Situation)."*

Start thinking about your accomplishments in terms of numbers, and you'll create a resume that proves your value and sets you apart from the competition.
        `,
    },
     {
        id: 'blank-page-to-job-offer',
        title: 'From a Blank Page to a Job Offer: A Step-by-Step Guide',
        date: 'October 08, 2024',
        excerpt: 'Starting a resume from scratch can be daunting. Follow our comprehensive guide that takes you through every section, from the contact info to the final proofread, ensuring you have a polished, professional document.',
        content: `
## The Ultimate Resume Checklist
Building a resume from the ground up feels like a huge task, but it's manageable if you break it down into smaller, logical steps. Follow this guide to go from a blank page to a job-winning resume.

### Step 1: Brainstorm and Outline
Before you write a single word, create a "master resume" document. List everything you've ever done professionally: every job, every project, every skill, every award. Don't worry about length or formatting yet; just get it all down. This will be your resource for pulling tailored information later.

### Step 2: Choose a Template
Select a clean, professional template. In our builder, all templates are ATS-friendly. Choose one that reflects your industry. A creative field might allow for more design, while a corporate role calls for a more traditional layout.

### Step 3: Craft Your Contact Information
This is the easiest part, but get it right. Include:
- Your full name
- Phone number
- Professional email address (e.g., firstname.lastname@email.com)
- City and State
- A link to your LinkedIn profile or professional portfolio

### Step 4: Write a Compelling Professional Summary
This is your 2-3 sentence elevator pitch. It should summarize your experience, highlight your top skills, and state your career objective. Tailor it to the job you're applying for.

### Step 5: Detail Your Work Experience
This is the core of your resume. For each job, list:
- Job Title, Company, Location
- Dates of employment
- 3-5 bullet points describing your achievements (remember to quantify them!). Start each bullet point with a strong action verb.

### Step 6: Add Your Education
List your degree, institution, and graduation date. You can include your GPA if it's 3.5 or higher.

### Step 7: List Your Relevant Skills
Create a dedicated skills section. Group them logically (e.g., Programming Languages, Software, Certifications). Match these skills to the keywords in the job description.

### Step 8: Proofread, Proofread, Proofread
Typos and grammatical errors are the quickest way to get your resume rejected. Read it out loud. Use a grammar checker like Grammarly. Then, have a friend or family member read it over for you. A fresh pair of eyes can catch mistakes you've missed.

Once you've completed these steps, you'll have a strong, polished resume ready to send out. Good luck!
        `,
    },
];