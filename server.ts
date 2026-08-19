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

// Fallback generator when API key is not configured or in case of error
function generateFallbackSuggestions(
  text: string,
  sectionType: string,
  goal: string,
  customInstructions?: string
) {
  const trimmed = text.trim();
  
  if (sectionType === "summary") {
    return {
      original: trimmed,
      sectionType,
      suggestions: [
        {
          id: "sug-1",
          title: "Executive & High-Impact",
          text: `Results-driven professional with a proven track record of delivering high-quality solutions, optimizing workflows, and driving measurable organizational impact. Adept at cross-functional collaboration and strategic execution in fast-paced environments.`,
          impactNote: "Emphasizes leadership qualities, quantifiable impact, and professional maturity.",
          keyChanges: ["Elevated vocabulary", "Focused on measurable outcomes", "Strong opening hook"],
          wordCount: 31,
        },
        {
          id: "sug-2",
          title: "ATS & Keyword-Optimized",
          text: `Dynamic and detail-oriented specialist proficient in modern industry methodologies, system optimization, and end-to-end project delivery. Committed to driving operational efficiency and continuous quality enhancement.`,
          impactNote: "Structured for high keyword density and fast scanning by applicant tracking systems.",
          keyChanges: ["Inserted industry standard keywords", "Structured for readability"],
          wordCount: 26,
        },
        {
          id: "sug-3",
          title: "Concise & Direct",
          text: `Accomplished practitioner focused on efficient execution, problem-solving, and continuous process optimization. Experienced in delivering robust solutions that elevate team performance.`,
          impactNote: "Eliminates filler words for maximum space efficiency on single-page resumes.",
          keyChanges: ["Removed verbose clauses", "Concise 2-sentence punchy layout"],
          wordCount: 21,
        },
      ],
    };
  }

  if (sectionType === "experience_bullet" || sectionType === "bullet") {
    return {
      original: trimmed,
      sectionType,
      suggestions: [
        {
          id: "sug-1",
          title: "STAR Method (Action + Metric + Result)",
          text: `Spearheaded key initiatives resulting in a 25% increase in operational efficiency and significant workflow optimization across cross-functional teams.`,
          impactNote: "Begins with a decisive power verb and specifies measurable business value.",
          keyChanges: ["Added strong action verb 'Spearheaded'", "Included quantified impact metrics"],
          wordCount: 20,
        },
        {
          id: "sug-2",
          title: "ATS-Optimized Achievement",
          text: `Designed and executed critical project deliverables, ensuring 100% compliance with industry standards and reducing processing cycle time.`,
          impactNote: "Clean phrasing that highlights core competencies and standardized workflow execution.",
          keyChanges: ["Replaced passive description with achievement focus", "Highlighted compliance & speed"],
          wordCount: 19,
        },
        {
          id: "sug-3",
          title: "Concise Power Bullet",
          text: `Engineered streamlined procedures that accelerated project delivery by 30% while maintaining exceptional quality standards.`,
          impactNote: "Punchy, fast-reading bullet point that grabs recruiter attention in under 3 seconds.",
          keyChanges: ["Shortened sentence structure", "Strong verb and metric combination"],
          wordCount: 16,
        },
      ],
    };
  }

  // Generic fallback
  return {
    original: trimmed,
    sectionType,
    suggestions: [
      {
        id: "sug-1",
        title: "Polished & Professional",
        text: `Orchestrated comprehensive solutions and executed strategic objectives with high precision, driving noticeable quality improvements.`,
        impactNote: "Enhanced tone with active voice and professional vocabulary.",
        keyChanges: ["Active voice rewrite", "Polished vocabulary"],
        wordCount: 15,
      },
      {
        id: "sug-2",
        title: "Impact-Driven Formulation",
        text: `Delivered high-value deliverables by applying best-in-class methodologies, boosting productivity and team output.`,
        impactNote: "Focuses directly on value delivery and output.",
        keyChanges: ["Emphasized business value", "Direct outcome focus"],
        wordCount: 14,
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
  try {
    const { text, sectionType = "general", goal = "executive", customInstructions = "", context = {} } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Text is required to improve" });
    }

    const ai = getGeminiClient();

    // If no Gemini client is configured, return high quality fallback
    if (!ai) {
      console.warn("GEMINI_API_KEY not provided. Returning structured fallback suggestions.");
      const fallback = generateFallbackSuggestions(text, sectionType, goal, customInstructions);
      return res.json({
        ...fallback,
        source: "fallback",
        note: "Add your Gemini API key in AI Studio Secrets to unlock dynamic real-time AI generations.",
      });
    }

    const systemPrompt = `You are a world-class Executive Resume Writer and Career Coach who specializes in ATS (Applicant Tracking System) optimization, high-impact phrasing, and recruiter psychology.

Your task is to take the user's CV/Resume text (which might be a Summary, Work Experience bullet point, Job Description, Project Description, Skills summary, or Custom section) and rewrite it into 3 distinct, highly polished variations tailored to make the candidate stand out.

Guidelines for rewriting:
1. Use strong, decisive power action verbs (e.g., Spearheaded, Orchestrated, Engineered, Pioneered, Accelerated, Championed, Formulated).
2. Incorporate STAR methodology (Situation, Task, Action, Result) where applicable and encourage quantifiable metrics (%, $, time saved, users served).
3. Ensure the phrasing passes modern ATS parsers with clean, industry-relevant keywords and zero grammatical errors.
4. Eliminate weak filler words (e.g., "responsible for", "helped with", "worked on", "assisted in", "duties included").
5. Keep the tone natural, authoritative, confident, and professional.
6. Strictly avoid generic clichés ("hardworking", "team player", "go-getter").

Goal specified by user: ${goal}
Section type: ${sectionType}
Additional instructions from user: ${customInstructions ? customInstructions : "None provided"}
Context: ${JSON.stringify(context)}

Generate exactly 3 diverse options:
- Option 1: Executive & High Impact (Focus on leadership, business value, strategic outcome)
- Option 2: ATS Keyword & Core Competency Focused (High keyword density, standard terminology)
- Option 3: Concise & Action-Oriented (Punchy, dense, removes all unnecessary filler)`;

    const userPrompt = `Original text to improve:
"""${text.trim()}"""

Please generate 3 improved rewrite variations for this ${sectionType} section following the instructions.`;

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
              description: "The original input text",
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
      throw new Error("No response returned from Gemini model");
    }

    const parsedData = JSON.parse(outputText);
    return res.json({
      ...parsedData,
      source: "gemini",
    });
  } catch (error: any) {
    console.error("Error generating text improvement:", error);
    // Graceful fallback so user is never stranded
    const { text = "", sectionType = "general", goal = "executive", customInstructions = "" } = req.body || {};
    const fallback = generateFallbackSuggestions(text, sectionType, goal, customInstructions);
    return res.json({
      ...fallback,
      source: "fallback",
      error: error.message || "Gemini processing failed, showing smart template alternatives.",
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
