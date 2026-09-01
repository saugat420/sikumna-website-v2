export type Program = {
  slug: string; title: string; trainerId: string; category: string; description: string; image: string;
  format: string; duration: string; outcomes: string[]; modules: string[]; relatedEvent: string;
};

export const programs: Program[] = [
  { slug: "ai-marketing-launchpad", title: "AI Marketing Launchpad", trainerId: "saugat-basnet", category: "Marketing + AI", description: "Build practical AI marketing skills for research, campaigns and real client opportunities.", image: "/generated/icons/ai-marketing-launchpad.png", format: "Live mentorship", duration: "Structured cohort", outcomes: ["Work faster with responsible AI workflows", "Create a practical portfolio", "Turn learning into a career action plan"], modules: ["AI marketing foundations", "Research and content workflows", "Campaign thinking", "Portfolio and opportunity plan"], relatedEvent: "/events/ai-marketing-masterclass" },
  { slug: "english-fluency-launchpad", title: "60 Day English Fluency Launchpad", trainerId: "anita-karki", category: "Communication", description: "Build the confidence and habits to communicate clearly in daily life and work.", image: "/generated/icons/english-fluency.png", format: "Live practice", duration: "60 days", outcomes: ["Speak more naturally in everyday situations", "Build workplace communication confidence", "Practice consistently with supportive feedback"], modules: ["Confidence foundations", "Everyday conversations", "Workplace English", "Fluency habits"], relatedEvent: "/events/english-fluency-workshop" },
];

export function getProgram(slug: string) { return programs.find((program) => program.slug === slug); }
