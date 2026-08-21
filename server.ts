import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper to get lazy GoogleGenAI client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Clean markdown fences from JSON responses if any
function extractJsonFromText(rawText: string): any {
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  cleaned = cleaned.trim();
  return JSON.parse(cleaned);
}

// Dynamic fallback generator tailored to the user's actual content
function generateFallbackSuggestions(
  text: string,
  sectionType: string,
  goal: string,
  customInstructions?: string,
  context?: any
) {
  const trimmed = (text || "").trim();
  const jobTitle = context?.jobTitle || "Professional";
  const userWords = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];

  // Summary generation / rewrite
  if (sectionType === "summary" || (!trimmed && sectionType === "general")) {
    const baseSubject = trimmed ? trimmed : `Experienced ${jobTitle} passionate about delivering high-quality results and optimizing operations.`;
    return {
      original: trimmed || baseSubject,
      sectionType: "summary",
      suggestions: [
        {
          id: "sug-exec",
          title: "Executive & High-Impact",
          text: `Results-driven ${jobTitle} with demonstrated expertise in strategic execution, cross-functional leadership, and delivering measurable organizational outcomes. Proven track record of spearheading high-stakes initiatives, optimizing workflows, and elevating performance across diverse teams.`,
          impactNote: "Positions candidate as an authoritative leader with strategic business vision.",
          keyChanges: ["Executive leadership vocabulary", "Outcome-driven framing", "High-confidence tone"],
          wordCount: 33,
        },
        {
          id: "sug-ats",
          title: "ATS Keyword & Core Competency",
          text: `Dynamic and performance-oriented ${jobTitle} proficient in modern methodologies, process automation, and end-to-end project lifecycle management. Skilled at leveraging data-backed insights to streamline operations and ensure rigorous quality standards.`,
          impactNote: "Engineered for high ATS parser match rate and quick recruiter scanning.",
          keyChanges: ["Inserted industry keywords", "Standardized terminology", "Clear structural flow"],
          wordCount: 30,
        },
        {
          id: "sug-concise",
          title: "Concise & Action-Oriented",
          text: `Accomplished ${jobTitle} focused on operational excellence, problem-solving, and continuous optimization. Experienced in delivering robust, scalable solutions that drive measurable team productivity.`,
          impactNote: "Space-saving 2-sentence formulation optimal for dense single-page resumes.",
          keyChanges: ["Eliminated filler phrasing", "Punchy syntax", "Clean layout"],
          wordCount: 22,
        },
      ],
    };
  }

  // Work experience bullet point or project bullet
  if (sectionType === "experience_bullet" || sectionType === "bullet" || sectionType === "project_desc" || sectionType === "experience_desc") {
    const rawAction = userWords.length > 0 ? trimmed.replace(/^(I |We |Responsible for |Worked on |Helped to )/i, "") : "led key project initiatives";
    const capitalizedRaw = rawAction.charAt(0).toUpperCase() + rawAction.slice(1);

    return {
      original: trimmed || `${jobTitle} deliverables and project execution`,
      sectionType,
      suggestions: [
        {
          id: "sug-star",
          title: "STAR Method (Action + Metric + Outcome)",
          text: `Spearheaded ${capitalizedRaw.toLowerCase().replace(/\.$/, "")}, resulting in a 25% increase in operational efficiency and significant workflow optimization across cross-functional teams.`,
          impactNote: "Begins with decisive power verb 'Spearheaded' and includes quantified business metrics.",
          keyChanges: ["Added strong action verb", "Included quantifiable % impact", "STAR methodology"],
          wordCount: 22,
        },
        {
          id: "sug-ats-opt",
          title: "ATS-Optimized Achievement",
          text: `Architected and executed critical deliverables for ${capitalizedRaw.toLowerCase().replace(/\.$/, "")}, ensuring 100% compliance with industry standards and reducing turnaround cycle time.`,
          impactNote: "Focuses on technical accuracy, standardized processes, and quality assurance.",
          keyChanges: ["Replaced passive verbs with 'Architected'", "Emphasized speed & compliance"],
          wordCount: 21,
        },
        {
          id: "sug-power",
          title: "Concise Power Bullet",
          text: `Engineered streamlined procedures for ${capitalizedRaw.toLowerCase().replace(/\.$/, "")}, boosting output by 30% while maintaining exceptional quality standards.`,
          impactNote: "Fast-reading bullet point designed to catch recruiter attention within 3 seconds.",
          keyChanges: ["Removed verbose clauses", "Action-oriented power verbs"],
          wordCount: 18,
        },
      ],
    };
  }

  // General text rewrite fallback
  return {
    original: trimmed,
    sectionType,
    suggestions: [
      {
        id: "sug-gen-1",
        title: "Executive & Polished",
        text: `Orchestrated comprehensive solutions and executed strategic objectives with high precision, driving measurable quality enhancements.`,
        impactNote: "Active voice rewrite with elevated professional tone.",
        keyChanges: ["Active voice rewrite", "Polished executive vocabulary"],
        wordCount: 16,
      },
      {
        id: "sug-gen-2",
        title: "Impact-Driven Formulation",
        text: `Delivered high-value deliverables by applying best-in-class methodologies, boosting overall productivity and team execution.`,
        impactNote: "Direct focus on business value delivery.",
        keyChanges: ["Emphasized business value", "Direct outcome focus"],
        wordCount: 15,
      },
    ],
  };
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// AI Text Improvement Endpoint
app.post("/api/ai/improve-text", async (req, res) => {
  const { text = "", sectionType = "general", goal = "executive", customInstructions = "", context = {} } = req.body || {};
  const trimmed = typeof text === "string" ? text.trim() : "";

  try {
    const ai = getGeminiClient();

    // If no Gemini client is configured, return high quality dynamic fallback
    if (!ai) {
      console.warn("GEMINI_API_KEY not configured. Providing high-quality structured suggestions.");
      const fallback = generateFallbackSuggestions(trimmed, sectionType, goal, customInstructions, context);
      return res.json({
        ...fallback,
        source: "fallback",
        note: "Add your Gemini API key in AI Studio Secrets to unlock dynamic real-time AI generations.",
      });
    }

    const systemPrompt = `You are a world-class Executive Resume Writer and Career Coach who specializes in ATS (Applicant Tracking System) optimization, high-impact phrasing, and recruiter psychology.

Your task is to take the user's CV/Resume text (or role context) and produce 3 distinct, highly polished variations tailored to make the candidate stand out.

Guidelines for rewriting:
1. Use strong, decisive power action verbs (e.g., Spearheaded, Orchestrated, Engineered, Pioneered, Accelerated, Championed, Formulated, Architected).
2. Incorporate STAR methodology (Situation, Task, Action, Result) where applicable and include realistic quantifiable metrics (%, $, time saved, efficiency gains).
3. Ensure the phrasing passes modern ATS parsers with clean, industry-relevant keywords and zero grammatical errors.
4. Eliminate weak filler words (e.g., "responsible for", "helped with", "worked on", "assisted in", "duties included").
5. Keep the tone natural, authoritative, confident, and professional.
6. Strictly avoid generic clichés ("hardworking", "team player", "go-getter").

User Goal: ${goal}
Section Type: ${sectionType}
Candidate Context: ${JSON.stringify(context || {})}
User Custom Instructions: ${customInstructions ? customInstructions : "None provided"}

Generate exactly 3 distinct, diverse suggestions:
- Option 1: Executive & High Impact (Focus on leadership, business value, strategic outcome)
- Option 2: ATS Keyword & Competency Focused (High keyword density, standard terminology)
- Option 3: Concise & Action-Oriented (Punchy, dense, removes all unnecessary filler)`;

    const inputContextDescription = trimmed
      ? `Original text to improve:\n"""${trimmed}"""`
      : `Generate a new professional ${sectionType} section for candidate in role: "${context?.jobTitle || "Professional"}" with skills: "${(context?.skills || []).join(", ")}"`;

    const userPrompt = `${inputContextDescription}\n\nPlease generate 3 improved rewrite variations for this ${sectionType} section following the instructions.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            original: {
              type: Type.STRING,
              description: "The original or source input text",
            },
            sectionType: {
              type: Type.STRING,
              description: "The section type analyzed",
            },
            suggestions: {
              type: Type.ARRAY,
              description: "List of 3 distinct rewritten variations",
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: {
                    type: Type.STRING,
                    description: "A short title for this style variation (e.g. Executive & High Impact)",
                  },
                  text: {
                    type: Type.STRING,
                    description: "The complete rewritten text ready to be inserted into the CV",
                  },
                  impactNote: {
                    type: Type.STRING,
                    description: "A brief 1-sentence explanation of why this version is effective",
                  },
                  keyChanges: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "2 to 3 concise bullet points explaining key improvements made",
                  },
                  wordCount: {
                    type: Type.INTEGER,
                    description: "Total word count of this suggestion",
                  },
                },
                required: ["id", "title", "text", "impactNote", "keyChanges", "wordCount"],
              },
            },
          },
          required: ["original", "suggestions"],
        },
      },
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error("No text output received from Gemini API");
    }

    const parsedData = extractJsonFromText(outputText);
    if (!parsedData || !Array.isArray(parsedData.suggestions) || parsedData.suggestions.length === 0) {
      throw new Error("Invalid suggestions format returned from Gemini");
    }

    // Ensure each suggestion has complete fields and an id
    const enrichedSuggestions = parsedData.suggestions.map((sug: any, idx: number) => ({
      id: sug.id || `sug-${idx + 1}-${Date.now()}`,
      title: sug.title || `Variation ${idx + 1}`,
      text: sug.text || "",
      impactNote: sug.impactNote || "Enhanced for professional impact and ATS keyword match.",
      keyChanges: Array.isArray(sug.keyChanges) ? sug.keyChanges : ["Elevated tone", "Power verbs"],
      wordCount: typeof sug.wordCount === "number" ? sug.wordCount : (sug.text || "").split(/\s+/).filter(Boolean).length,
    }));

    return res.json({
      original: parsedData.original || trimmed,
      sectionType: parsedData.sectionType || sectionType,
      suggestions: enrichedSuggestions,
      source: "gemini",
    });
  } catch (error: any) {
    console.error("Gemini text improvement error:", error);
    // Graceful fallback so user always receives high-quality results immediately
    const fallback = generateFallbackSuggestions(trimmed, sectionType, goal, customInstructions, context);
    return res.json({
      ...fallback,
      source: "fallback",
      error: error?.message || "Using smart AI template variations.",
    });
  }
});

// Quick AI Keyword & Action Verb Suggestions
app.post("/api/ai/suggest-keywords", async (req, res) => {
  try {
    const { jobTitle = "Software Engineer", industry = "Technology" } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        actionVerbs: ["Architected", "Spearheaded", "Engineered", "Optimized", "Automated", "Delivered", "Transformed", "Pioneered"],
        technicalSkills: ["System Architecture", "API Integration", "Cloud Infrastructure", "Performance Optimization", "Data Modeling"],
        softSkills: ["Strategic Communication", "Cross-Functional Leadership", "Agile Execution", "Root Cause Analysis"],
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Provide top ATS keywords and power action verbs for a candidate in role: "${jobTitle}" (Industry: "${industry}").`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            actionVerbs: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "8 strong action verbs for bullet points",
            },
            technicalSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "8 key technical competencies/tools",
            },
            softSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "5 workplace/leadership skills",
            },
          },
          required: ["actionVerbs", "technicalSkills", "softSkills"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (err: any) {
    console.error("Error getting keywords:", err);
    return res.json({
      actionVerbs: ["Orchestrated", "Spearheaded", "Accelerated", "Delivered", "Optimized", "Standardized", "Pioneered"],
      technicalSkills: ["Project Management", "Process Optimization", "Quality Assurance", "Data Analysis"],
      softSkills: ["Problem Solving", "Stakeholder Management", "Team Collaboration"],
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CV Maker Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
