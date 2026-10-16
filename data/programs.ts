export type ProgramCategory = "Marketing & AI" | "Communication" | "Personal growth";
export type Program = {
  slug: string; title: string; trainerId?: string; category: ProgramCategory; description: string; image: string;
  tagline: string; tone: "blue" | "violet" | "coral" | "amber" | "green" | "teal";
  icon: "megaphone" | "sparkles" | "user" | "messages" | "wallet" | "languages";
  positioning: string; format: string; duration: string; about: string; audience: string[];
  outcomes: string[]; modules: string[]; howItWorks: string[]; faq: { question: string; answer: string }[];
};

const how = ["Live, guided sessions", "Practical assignments", "Feedback and Q&A", "Peer learning and accountability"];
const faq = [
  { question: "Is this a live program?", answer: "Yes. This is a live cohort program built around guided sessions, practice and interaction." },
  { question: "When does the next cohort begin?", answer: "Cohort dates, duration and enrollment details are announced when registration opens. Contact Sikumna for the latest update." },
  { question: "Can beginners join?", answer: "Yes. The program starts with clear foundations and builds toward practical application." },
];

export const programs: Program[] = [
  {
    slug: "digital-marketing", title: "Digital Marketing", trainerId: "saugat-basnet", category: "Marketing & AI", tagline: "Build attention. Create demand.", tone: "blue", icon: "megaphone",
    description: "Learn the foundations of modern digital marketing and turn ideas into practical campaigns.", image: "/content/programs/digital-marketing.webp",
    positioning: "Learn how digital channels work together and build campaigns with a clear purpose.", format: "Live cohort program", duration: "Schedule announced before enrollment",
    about: "Digital Marketing is a practical cohort for learners who want a clear understanding of strategy, content, social media, advertising and measurement. You will learn by building—not by memorising disconnected terms.",
    audience: ["Marketing beginners", "Students and job seekers", "Aspiring freelancers", "Small-business owners"], outcomes: ["Plan a clear digital campaign", "Create useful content for the right audience", "Read core performance signals with confidence"],
    modules: ["Digital marketing foundations", "Audience and positioning", "Content and social media", "Campaigns and measurement"], howItWorks: how, faq,
  },
  {
    slug: "ai-powered-digital-marketing", title: "AI Powered Digital Marketing", trainerId: "saugat-basnet", category: "Marketing & AI", tagline: "Think better. Market smarter.", tone: "violet", icon: "sparkles",
    description: "Use AI responsibly to improve research, content, campaigns and everyday marketing workflows.", image: "/content/programs/ai-powered-digital-marketing.webp",
    positioning: "Turn modern AI tools into practical marketing skills and real working systems.", format: "Live cohort program", duration: "Schedule announced before enrollment",
    about: "AI Powered Digital Marketing connects marketing fundamentals with responsible AI workflows. The focus is not on collecting tools; it is on knowing where AI genuinely helps and how to produce better work with human judgement.",
    audience: ["Digital marketers", "Aspiring freelancers", "Business owners", "Students building a modern skill"], outcomes: ["Build repeatable AI-assisted workflows", "Improve research and content quality", "Create a practical marketing portfolio"],
    modules: ["AI and marketing foundations", "Research and insight workflows", "Content and campaign systems", "Portfolio and opportunity plan"], howItWorks: how, faq,
  },
  {
    slug: "personal-branding", title: "Personal Branding", trainerId: "saugat-basnet", category: "Personal growth", tagline: "Make your name mean more.", tone: "coral", icon: "user",
    description: "Learn to communicate what you do, what you believe and the value you bring.", image: "/content/programs/personal-branding.webp",
    positioning: "Build a credible personal brand that feels clear, useful and genuinely yours.", format: "Live cohort program", duration: "Schedule announced before enrollment",
    about: "Personal Branding helps you clarify your strengths, message and online presence. Through guided exercises and feedback, you will shape a brand that supports your career, business or creative work without pretending to be someone else.",
    audience: ["Students and job seekers", "Freelancers and creators", "Professionals", "Entrepreneurs"], outcomes: ["Define a clear personal positioning", "Communicate your value with confidence", "Create a consistent online presence"],
    modules: ["Strengths and positioning", "Audience and message", "Content and credibility", "Personal brand action plan"], howItWorks: how, faq,
  },
  {
    slug: "communication", title: "Communication", trainerId: "anita-karki", category: "Communication", tagline: "Say it clearly. Make it count.", tone: "amber", icon: "messages",
    description: "Communicate ideas clearly, listen well and handle everyday conversations with confidence.", image: "/content/programs/communication.webp",
    positioning: "Build practical communication habits for work, relationships and everyday life.", format: "Live cohort program", duration: "Schedule announced before enrollment",
    about: "Communication is a practice-led cohort focused on clarity, listening, expression and confidence. Learners work through familiar situations and receive supportive feedback they can use immediately.",
    audience: ["Students", "Job seekers", "Working professionals", "Anyone who wants to express ideas more clearly"], outcomes: ["Structure ideas before speaking", "Listen and respond with confidence", "Handle common workplace conversations"],
    modules: ["Clear communication foundations", "Listening and response", "Workplace conversations", "Confidence through practice"], howItWorks: how, faq,
  },
  {
    slug: "personal-finance", title: "Personal Finance", category: "Personal growth", tagline: "Know your money. Own your choices.", tone: "green", icon: "wallet",
    description: "Understand everyday money habits and make more thoughtful financial decisions.", image: "/content/programs/personal-finance.webp",
    positioning: "Build calm, practical money habits for the life you are actually living.", format: "Live cohort program", duration: "Schedule announced before enrollment",
    about: "Personal Finance makes everyday money concepts approachable. It helps learners understand spending, saving, planning and financial choices without hype or unrealistic promises.",
    audience: ["Young adults", "First-time earners", "Families improving money habits", "Anyone who wants more clarity around personal money"], outcomes: ["Understand where your money goes", "Create a realistic saving plan", "Make financial choices with greater clarity"],
    modules: ["Money habits and goals", "Spending and budgeting", "Saving and financial safety", "A personal money plan"], howItWorks: how, faq,
  },
  {
    slug: "english-fluency", title: "English Fluency", trainerId: "anita-karki", category: "Communication", tagline: "Speak more. Hold back less.", tone: "teal", icon: "languages",
    description: "Build speaking confidence through consistent live practice and supportive feedback.", image: "/content/programs/english-fluency.webp",
    positioning: "Build the confidence and habits to communicate clearly in daily life and work.", format: "Live cohort program", duration: "Schedule announced before enrollment",
    about: "English Fluency is a practice-led program for learners who understand English but hesitate when speaking. It focuses on useful situations, repeatable habits and encouraging feedback that makes steady improvement possible.",
    audience: ["Students", "Job seekers", "Working professionals", "Entrepreneurs", "People who understand English but hesitate to speak"], outcomes: ["Speak more naturally in everyday situations", "Build workplace communication confidence", "Practice consistently with supportive feedback"],
    modules: ["Confidence foundations", "Everyday conversations", "Workplace English", "Fluency habits"], howItWorks: how, faq,
  },
];

export function getProgram(slug: string) { return programs.find((program) => program.slug === slug); }
