import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const MODEL = "google/gemini-3-flash-preview";

const RoleSchema = z.enum(["frontend", "backend", "data-science"]);
const DifficultySchema = z.enum(["beginner", "intermediate", "advanced"]);

const ROLE_LABELS: Record<string, string> = {
  frontend: "Frontend Engineering (React, JS, HTML/CSS, web performance)",
  backend: "Backend Engineering (APIs, databases, auth, system design fundamentals)",
  "data-science": "Data Science / ML (statistics, ML algorithms, Python, data wrangling)",
};

function gateway() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  return createLovableAiGatewayProvider(key);
}

const QuestionsInput = z.object({
  role: RoleSchema,
  difficulty: DifficultySchema,
  count: z.number().min(3).max(10).default(6),
});

export const generateQuestions = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => QuestionsInput.parse(input))
  .handler(async ({ data }) => {
    const g = gateway();
    const { experimental_output } = await generateText({
      model: g(MODEL),
      experimental_output: Output.object({
        schema: z.object({
          questions: z
            .array(
              z.object({
                question: z.string(),
                category: z.enum(["Conceptual", "Coding", "System Design", "Behavioural"]),
                keywords: z.array(z.string()),
              }),
            )
            .min(3)
            .max(10),
        }),
      }),
      prompt: `You are an expert technical interviewer for campus placements.

Generate ${data.count} interview questions for a ${data.difficulty} level candidate applying for a ${ROLE_LABELS[data.role]} role.

Rules:
- Order questions from warm-up → core → deep-dive.
- Mix categories (mostly Conceptual, some Coding/System Design, one Behavioural at most).
- Each question should be self-contained and answerable in 3-6 sentences.
- "keywords" = 3-6 concept tags the ideal answer should mention.
- Do NOT number the questions.`,
    });

    return experimental_output;
  });

const EvalInput = z.object({
  role: RoleSchema,
  difficulty: DifficultySchema,
  question: z.string(),
  keywords: z.array(z.string()),
  answer: z.string(),
});

export const evaluateAnswer = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EvalInput.parse(input))
  .handler(async ({ data }) => {
    const g = gateway();

    if (!data.answer.trim()) {
      return {
        score: 0,
        strengths: [],
        improvements: ["No answer was provided."],
        modelAnswer: "",
        coverage: data.keywords.map((k) => ({ keyword: k, covered: false })),
      };
    }

    const { experimental_output } = await generateText({
      model: g(MODEL),
      experimental_output: Output.object({
        schema: z.object({
          score: z.number().min(0).max(10),
          strengths: z.array(z.string()),
          improvements: z.array(z.string()),
          modelAnswer: z.string(),
          coverage: z.array(z.object({ keyword: z.string(), covered: z.boolean() })),
        }),
      }),
      prompt: `You are a strict but fair technical interviewer grading a candidate.

ROLE: ${ROLE_LABELS[data.role]}
DIFFICULTY: ${data.difficulty}
QUESTION: ${data.question}
EXPECTED CONCEPT KEYWORDS: ${data.keywords.join(", ")}

CANDIDATE ANSWER:
"""
${data.answer}
"""

Scoring rubric (0-10):
9-10 Excellent: complete, accurate, well-structured, correct terminology
7-8 Good: mostly correct, minor gaps or imprecise wording
5-6 Average: core idea present but missing key concepts
3-4 Below Average: partial understanding, significant gaps
0-2 Poor: incorrect, off-topic, or empty

Return:
- score (0-10 integer)
- strengths: 1-3 short bullets of what they did well (empty if score ≤ 2)
- improvements: 1-3 short bullets of what to fix
- modelAnswer: a concise ideal answer (4-7 sentences) the candidate should aspire to
- coverage: for EACH expected keyword, true if the candidate clearly addressed that concept (even with synonyms), else false.`,
    });

    return experimental_output;
  });
