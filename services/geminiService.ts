
import { GoogleGenAI, Type } from "@google/genai";
import type { Resume } from '../types';

// Robust API key retrieval for production
const getApiKey = () => {
  let key;
  try {
    key = (import.meta as any).env?.VITE_API_KEY ||
      (process.env as any).VITE_API_KEY ||
      (process.env as any).API_KEY;
  } catch (e) {
    key = (process.env as any).API_KEY;
  }

  if (!key) {
    console.error("CRITICAL: Gemini API Key is missing! Please check your .env.local file and ensure VITE_API_KEY is set.");
  }
  return key;
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey: apiKey || "dummy_key_to_prevent_crash_on_init" });

const handleGeminiError = (error: any, context: string): { error: string } => {
  console.error(`Error in ${context}:`, error);

  const message = error.message || error.toString();

  // Check for 429 Quota Exceeded
  if (message.includes('429') || message.includes('Quota exceeded') || message.includes('quota')) {
    return { error: 'Gemini API usage limit exceeded (429). Please try again in a minute.' };
  }

  // Check for 503 Overloaded
  if (message.includes('503') || message.includes('Overloaded')) {
    return { error: 'Gemini API is currently overloaded. Please try again later.' };
  }

  // Check for 404 Not Found
  if (message.includes('404') || message.includes('not found')) {
    return { error: 'Model not found (404). Please check the model name or API version.' };
  }


  if (message.includes('API key not valid')) {
    return { error: 'Invalid API Key. Please check your configuration.' };
  }

  if (message.includes('JSON')) {
    return { error: 'Failed to process AI response. Please try again.' };
  }

  return { error: `AI Service Error: ${message.substring(0, 100)}...` };
};

const resumeResponseSchema = {
  type: Type.OBJECT,
  properties: {
    personalInfo: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Full name of the person." },
        email: { type: Type.STRING, description: "Email address." },
        phone: { type: Type.STRING, description: "Phone number." },
        location: { type: Type.STRING, description: "City and state, e.g., 'San Francisco, CA'." },
        website: { type: Type.STRING, description: "Portfolio or personal website URL." },
        linkedin: { type: Type.STRING, description: "LinkedIn profile URL." },
        twitter: { type: Type.STRING, description: "Twitter (X) profile URL." },
        summary: { type: Type.STRING, description: "The professional summary or objective statement." },
        targetTitle: { type: Type.STRING, description: "The job title the person is targeting." },
      },
      required: ["name", "email", "phone", "location", "website", "summary"]
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "A unique identifier. Preserve if it exists in the input." },
          jobTitle: { type: Type.STRING },
          company: { type: Type.STRING },
          location: { type: Type.STRING },
          startDate: { type: Type.STRING },
          endDate: { type: Type.STRING, description: "Can be 'Present' or a date." },
          description: { type: Type.STRING, description: "A summary of responsibilities and achievements. Each bullet point should be separated by a newline character ('\\n')." },
        },
        required: ["id", "jobTitle", "company", "location", "startDate", "endDate", "description"]
      },
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "A unique identifier. Preserve if it exists in the input." },
          institution: { type: Type.STRING },
          degree: { type: Type.STRING },
          fieldOfStudy: { type: Type.STRING },
          startDate: { type: Type.STRING },
          endDate: { type: Type.STRING },
        },
        required: ["id", "institution", "degree", "fieldOfStudy", "startDate", "endDate"]
      },
    },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "A unique identifier. Preserve if it exists in the input." },
          name: { type: Type.STRING },
        },
        required: ["id", "name"]
      },
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "A unique identifier. Preserve if it exists in the input." },
          name: { type: Type.STRING },
          description: { type: Type.STRING, description: "A summary of the project. Each bullet point should be separated by a newline character ('\\n')." },
          url: { type: Type.STRING },
        },
        required: ["id", "name", "description"]
      },
    },
    certifications: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "A unique identifier. Preserve if it exists in the input." },
          name: { type: Type.STRING },
          issuer: { type: Type.STRING },
          date: { type: Type.STRING },
        },
        required: ["id", "name", "issuer", "date"]
      },
    },
    volunteering: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "A unique identifier. Preserve if it exists in the input." },
          organization: { type: Type.STRING },
          role: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["id", "organization", "role", "description"]
      },
    },
    publications: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "A unique identifier. Preserve if it exists in the input." },
          title: { type: Type.STRING },
          publisher: { type: Type.STRING },
          date: { type: Type.STRING },
        },
        required: ["id", "title", "publisher", "date"]
      },
    },
  },
  required: [
    "personalInfo",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "volunteering",
    "publications",
  ]
};

const parseResume = async (prompt: any, isFile: boolean = false) => {
  if (!apiKey) return { error: 'API Key is missing. Please configuration your .env file.' };

  try {
    const systemInstruction = isFile
      ? "You are an expert document parser. Your task is to extract structured resume information from the provided file and format it into the specified JSON schema. Be resilient to various file formats and layouts."
      : "You are a strict resume parsing engine. Your SOLE function is to extract structured data from the provided text and fit it into the JSON schema. MANDATORY RULES: 1. Parse ALL sections present in the text (Work Experience, Education, Skills, Projects, Certifications, etc.). DO NOT OMIT ANY SECTION. 2. For each section, extract ALL items. DO NOT OMIT any job, degree, or skill. 3. Preserve original formatting for descriptions using newline characters ('\\n'). 4. If a field in the schema is not present in the text (e.g., no 'twitter' URL), return an empty string for that field. Do not omit keys. Your output must be a complete data representation of the resume text.";

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash-001",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: resumeResponseSchema,
        systemInstruction,
      },
    });
    const jsonStr = response.text || "{}";
    const parsedData = JSON.parse(jsonStr.trim());
    return parsedData;

  } catch (error: any) {
    return handleGeminiError(error, 'parseResume');
  }
}

export const parseResumeFromText = async (resumeText: string) => {
  const prompt = `Please parse the following resume text:\n\n${resumeText}`;
  return parseResume(prompt);
};

export const parseResumeFromFile = async (file: { mimeType: string, data: string }) => {
  const prompt = {
    parts: [
      {
        inlineData: file,
      },
      {
        text: "Parse the attached resume file."
      }
    ],
  };
  return parseResume(prompt as any, true);
};

export const improveResumeText = async (text: string, context: string): Promise<string> => {
  if (!apiKey) return text;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash-001',
      contents: `Rewrite the following ${context} to be more concise and impactful for a resume. Focus on action verbs and quantifiable results. Original text:\n\n"${text}"`,
      config: {
        systemInstruction: "You are a professional resume editor. Your task is to rewrite the given text. ONLY return the final, rewritten text. Do not include any additional explanations, options, markdown, or commentary.",
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text?.trim() || text;
  } catch (error) {
    handleGeminiError(error, 'improveResumeText');
    return text;
  }
};

export const improveExperienceItem = async (experience: { jobTitle: string, company: string, description: string }): Promise<{ jobTitle: string, company: string, description: string } | { error: string }> => {
  if (!apiKey) return experience;
  try {
    const prompt = `
Analyze the following work experience entry. If the job title or company name is generic (like "New Job", "Company Name") or empty, suggest a more professional and specific one based on the description. Also, rewrite the description to be more concise and impactful, focusing on action verbs and quantifiable results.

Current Job Title: "${experience.jobTitle}"
Current Company: "${experience.company}"
Current Description:
"${experience.description}"
`;
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash-001',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            jobTitle: { type: Type.STRING, description: "The improved job title. If the original was good, return it as is." },
            company: { type: Type.STRING, description: "The improved company name. If the original was good, return it as is." },
            description: { type: Type.STRING, description: "The rewritten, impactful description. Preserve bullet points by using newline characters ('\\n')." },
          },
          required: ['jobTitle', 'company', 'description']
        },
        systemInstruction: "You are a professional resume editor. Your task is to improve the provided work experience entry. Return ONLY a JSON object with the 'jobTitle', 'company', and 'description'. If an original field is already good, return it unchanged. For the description, preserve the bullet point format by using newline characters ('\\n'). Do not add any commentary or markdown.",
      }
    });
    const jsonStr = response.text || "{}";
    const parsedData = JSON.parse(jsonStr.trim());
    return parsedData;
  } catch (error) {
    const handled = handleGeminiError(error, 'improveExperienceItem');
    // Return original so UI doesn't break, hopefully user sees log.
    // Or we could return the error object if the UI supports it.
    // Given the signature, we might just have to return original and log.
    return experience;
  }
};


export const suggestJobTitle = async (context: { title: string, company: string, description: string }): Promise<string[]> => {
  if (!apiKey) return [];
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash-001',
      contents: `Based on the following job information, suggest 3-5 improved or more specific job titles that are industry-standard.\n\nCurrent Title: "${context.title}"\nCompany: "${context.company}"\nDescription: "${context.description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['suggestions']
        }
      }
    });
    const jsonStr = response.text || "{}";
    const json = JSON.parse(jsonStr.trim());
    return json.suggestions || [];
  } catch (error) {
    handleGeminiError(error, 'suggestJobTitle');
    return [];
  }
};

export const getAtsSuggestions = async (resumeText: string): Promise<string> => {
  if (!apiKey) return 'API Key missing. Cannot analyze resume.';
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash-001',
      contents: `Analyze the following resume text for ATS (Applicant Tracking System) friendliness. Provide a list of actionable suggestions to improve it. Focus on keywords, formatting, and clarity. Format the response as a markdown checklist.\n\n--- RESUME TEXT ---\n${resumeText}`,
    });
    return response.text?.trim() || 'Could not analyze the resume at this time.';
  } catch (error) {
    const handled = handleGeminiError(error, 'getAtsSuggestions');
    return handled.error;
  }
};

export const generateCoverLetter = async (resumeText: string, jobDescription: string): Promise<string> => {
  if (!apiKey) return 'API Key missing. Cannot generate cover letter.';
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash-001',
      contents: `Based on the following resume and job description, write a professional and tailored cover letter. The cover letter should highlight the candidate's skills and experiences that are most relevant to the job description, and should be addressed to the hiring manager. The tone should be professional and enthusiastic. Do not include placeholders like "[Your Name]" or "[Company Name]"; instead, use the information available in the resume.

--- RESUME TEXT ---
${resumeText}

--- JOB DESCRIPTION ---
${jobDescription}`,
    });
    return response.text?.trim() || 'Could not generate the cover letter at this time. Please try again.';
  } catch (error) {
    const handled = handleGeminiError(error, 'generateCoverLetter');
    return handled.error;
  }
};

export const applyAtsSuggestions = async (resume: Resume, suggestions: string): Promise<Resume | { error: string }> => {
  if (!apiKey) return { error: 'API Key missing.' };
  try {
    const prompt = `Based on the following resume JSON and the list of suggestions, please apply the suggestions and return the updated resume as a JSON object.
Ensure the returned JSON is valid and adheres strictly to the provided schema. Do not add, remove, or rename any keys in the JSON structure.
If the suggestions mention removing an item (like a skill or project), remove it from the corresponding array.
If the suggestions mention adding information (like a location), add it to the correct field.
If the suggestions mention rephrasing text (like a summary or description), update the text accordingly.
Preserve all existing IDs for items in arrays.

--- RESUME JSON ---
${JSON.stringify(resume)}

--- SUGGESTIONS ---
${suggestions}`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash-001",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: resumeResponseSchema,
        systemInstruction: "You are an intelligent resume editor that updates JSON data based on instructions. You ONLY output valid JSON that matches the provided schema.",
      },
    });

    const jsonStr = response.text || "{}";
    const updatedResume = JSON.parse(jsonStr.trim());

    if (!updatedResume.personalInfo || !Array.isArray(updatedResume.experience)) {
      throw new Error("The AI returned an invalid resume structure.");
    }

    return { ...resume, ...updatedResume };

  } catch (error: any) {
    return handleGeminiError(error, 'applyAtsSuggestions');
  }
};