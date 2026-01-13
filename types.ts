

export interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
    photoUrl?: string;
    targetTitle?: string;
    linkedin?: string;
    twitter?: string;
}

export interface Experience {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
}

export interface Skill {
    id: string;
    name: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    url?: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
}

export interface Volunteering {
    id: string;
    organization: string;
    role: string;
    description: string;
}
export interface Publication {
    id: string;
    title: string;
    publisher: string;
    date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export type TemplateName = string;

// FIX: Export TemplateStyle and TemplateLayout types
export type TemplateStyle = 'Modern' | 'Traditional' | 'Creative';
export type TemplateLayout = '1 Column' | '2 Column';

export type HeaderAlignment = 'left' | 'center' | 'right';
export type DateAlignment = 'left' | 'right';
export type LocationAlignment = 'left' | 'right';
export type SkillsLayout = 'comma' | 'list' | 'columns';
export type PaperSize = 'Letter' | 'A4';

export interface DesignSettings {
    fontFamily: string;
    fontSize: string;
    accentColor: string;
    lineHeight: string;
    dateFormat: string;
    headerAlignment: HeaderAlignment;
    dateAlignment: DateAlignment;
    locationAlignment: LocationAlignment;
    skillsLayout: SkillsLayout;
    paperSize: PaperSize;
    leftRightMargin: number; // in inches
    topBottomMargin: number; // in inches
}

export interface Resume {
    id: string;
    title: string;
    template: TemplateName;
    lastEdited: string;
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    projects: Project[];
    certifications: Certification[];
    volunteering: Volunteering[];
    publications: Publication[];
    design: DesignSettings;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export type View = 'landing' | 'dashboard' | 'builder' | 'features' | 'faq' | 'about' | 'blog' | 'contact' | 'privacy' | 'terms' | 'blogPost';