export type Program = {
  slug: string; title: string; trainerId: string; category: string; description: string; image: string;
  positioning: string; format: string; duration: string; about: string; audience: string[];
  outcomes: string[]; modules: string[]; howItWorks: string[]; relatedEvent: string;
  faq: { question: string; answer: string }[];
};

export const programs: Program[] = [
  {
    slug: "ai-marketing-launchpad", title: "AI Marketing Launchpad", trainerId: "saugat-basnet", category: "Marketing + AI",
    positioning: "Build useful AI marketing skills through guided practice, feedback and real-world application.",
    description: "Build practical AI marketing skills for research, campaigns and real client opportunities.", image: "/generated/icons/ai-marketing-launchpad.png",
    format: "Live Zoom mentorship", duration: "Structured cohort",
    about: "AI Marketing Launchpad is a guided learning program for people who want to use AI thoughtfully in practical marketing work. The program connects foundations, demonstrations and repeated practice so learners can build confidence instead of collecting disconnected tools.",
    audience: ["Marketing beginners", "Aspiring freelancers", "Students and job seekers", "Small-business owners", "Working professionals building a modern skill"],
    outcomes: ["Work faster with responsible AI workflows", "Create a practical portfolio", "Turn learning into a career action plan"],
    modules: ["AI marketing foundations", "Research and content workflows", "Campaign thinking", "Portfolio and opportunity plan"],
    howItWorks: ["Live Zoom sessions", "Guided assignments", "Practical demonstrations", "Mentor feedback and Q&A", "Peer learning and accountability"],
    relatedEvent: "/events/ai-marketing-masterclass",
    faq: [
      { question: "Do I need marketing or coding experience?", answer: "No. The program starts with practical foundations and does not require coding knowledge." },
      { question: "Is the program live?", answer: "Yes. The learning experience is built around live Zoom mentorship, practice and Q&A." },
      { question: "How do I learn more before joining?", answer: "Join the free AI Marketing Masterclass to experience the teaching approach and receive the next program details." },
    ],
  },
  {
    slug: "english-fluency-launchpad", title: "60 Day English Fluency Launchpad", trainerId: "anita-karki", category: "Communication",
    positioning: "Build speaking confidence through consistent live practice and supportive feedback.",
    description: "Build the confidence and habits to communicate clearly in daily life and work.", image: "/generated/icons/english-fluency.png",
    format: "Live speaking practice", duration: "60 days",
    about: "The 60 Day English Fluency Launchpad is a practice-led program for learners who understand English but hesitate when speaking. It focuses on useful situations, repeatable habits and encouraging feedback that makes steady improvement possible.",
    audience: ["Students", "Job seekers", "Working professionals", "Entrepreneurs", "Anyone who understands English but hesitates to speak"],
    outcomes: ["Speak more naturally in everyday situations", "Build workplace communication confidence", "Practice consistently with supportive feedback"],
    modules: ["Confidence foundations", "Everyday conversations", "Workplace English", "Fluency habits"],
    howItWorks: ["Live Zoom sessions", "Guided speaking practice", "Daily fluency habits", "Mentor feedback and Q&A", "Supportive peer practice"],
    relatedEvent: "/events/english-fluency-workshop",
    faq: [
      { question: "Do I need advanced English?", answer: "No. Basic understanding is enough; the program is designed for developing speakers." },
      { question: "Will I get speaking practice?", answer: "Yes. Live practice and feedback are central parts of the program." },
      { question: "How can I experience the teaching first?", answer: "Join the free English Fluency Workshop to learn the approach and receive the next program details." },
    ],
  },
];

export function getProgram(slug: string) { return programs.find((program) => program.slug === slug); }
