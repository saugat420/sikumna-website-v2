export type EventTheme = "blue";

type LearningBlock = { icon: string; title: string; description: string; points: string[] };

export type EventLandingData = {
  theme: EventTheme;
  kicker: string;
  title: string;
  supportingLine?: string;
  subtitle: string;
  heroImage: string;
  bulletPoints: string[];
  learnerCount: string;
  buttonLabel: string;
  scarcity: string;
  highlights: { icon: string; title: string; description: string }[];
  lessonIntro: string;
  learningBlocks: LearningBlock[];
  sessionSteps: { title: string; description: string }[];
  audiences: { icon: string; label: string }[];
  audienceNote: string;
  instructor: { trainerId?: string; name: string; image: string; role: string; bio: string; bullets: string[] };
  reviewSummary: string;
  testimonials: { quote: string; name: string; role: string }[];
  reserveTitle: string;
  reserveDescription: string;
  date: string;
  time: string;
  duration: string;
  platform: string;
  language: string;
  faqs: { question: string; answer: string }[];
};

export const aiMarketingEvent: EventLandingData = {
  theme: "blue",
  kicker: "Free live masterclass",
  title: "Learn AI Marketing From Scratch In 90 Mins",
  subtitle: "In this free masterclass, you’ll learn how AI Marketing can help you build a high-paying freelancer career in 2026—even if you are a beginner.",
  heroImage: "/generated/events/ai-marketing-masterclass-hero.png",
  bulletPoints: ["Live on Zoom", "90 Minutes", "Beginner Friendly", "Interactive Q&A"],
  learnerCount: "11,000+ learners registered",
  buttonLabel: "Reserve My Free Seat",
  scarcity: "Registration is free; seats are kept limited for a better live experience.",
  highlights: [
    { icon: "bot", title: "Learn AI Marketing", description: "from scratch" },
    { icon: "sparkles", title: "Practical strategies", description: "you can use" },
    { icon: "briefcase", title: "Live examples", description: "and case studies" },
    { icon: "route", title: "Step-by-step roadmap", description: "to get started" },
  ],
  lessonIntro: "A complete 90-minute session packed with practical insights.",
  learningBlocks: [
    { icon: "bot", title: "Understand AI Marketing", description: "Get the foundation right before you start using tools.", points: ["What AI Marketing actually means", "How AI is changing modern marketing", "Where a beginner should focus first"] },
    { icon: "sparkles", title: "Use AI in Real Marketing Work", description: "See practical ways AI can support the work marketers do every day.", points: ["Create content, ads and email ideas", "Research faster with useful prompts", "Choose beginner-friendly tools"] },
    { icon: "route", title: "Turn the Skill Into Opportunity", description: "Leave with a clear path for building your next practical skill.", points: ["Build freelance skills step by step", "Recognise client-work opportunities", "Ask questions during the live Q&A"] },
  ],
  sessionSteps: [
    { title: "Understand", description: "Start with the ideas and tools that matter." },
    { title: "Watch it in action", description: "See practical examples of AI-assisted work." },
    { title: "Build your roadmap", description: "Know what to practice after the session." },
  ],
  audiences: [
    { icon: "student", label: "Student" }, { icon: "professional", label: "Working professional" }, { icon: "target", label: "Job seeker" },
    { icon: "laptop", label: "Aspiring freelancer" }, { icon: "store", label: "Business owner" }, { icon: "megaphone", label: "Marketing beginner" },
  ],
  audienceNote: "No marketing experience needed. No coding knowledge needed.",
  instructor: {
    trainerId: "saugat-basnet", name: "Saugat Basnet", role: "Digital Marketing Expert & Educator", image: "/generated/mentors/saurav-shrestha.png",
    bio: "Saugat helps learners turn digital marketing concepts into practical work they can use for their careers and businesses. This session is focused on clear, beginner-friendly next steps—not theory for theory’s sake.",
    bullets: ["Trained 14,000+ students", "9+ years of real-world experience", "Helped 1,000+ businesses grow online", "Founder of Sikumna Nepal"],
  },
  reviewSummary: "4.9/5 from 1,000+ reviews",
  testimonials: [
    { quote: "The best masterclass I have ever attended. Very practical and eye-opening!", name: "Bikram Thapa", role: "Digital Marketer" },
    { quote: "Saugat sir explains complex things in the simplest way. Highly recommended.", name: "Anita Karki", role: "Business Owner" },
    { quote: "I learned more in 90 minutes than months of watching random videos.", name: "Rajan Shrestha", role: "Freelancer" },
  ],
  reserveTitle: "Reserve your free seat",
  reserveDescription: "Seats are limited. Reserve your spot now and receive the joining details by email.",
  date: "Sat, 24 May 2025", time: "7:00 PM NPT", duration: "90 Minutes", platform: "Zoom", language: "Nepali + English",
  faqs: [
    { question: "Is this masterclass really free?", answer: "Yes. The live AI Marketing Masterclass is completely free, but registration is required because seats are limited." },
    { question: "Do I need any prior marketing experience?", answer: "No. The session starts with the fundamentals and is suitable for complete beginners." },
    { question: "Will I get the recording?", answer: "Registered learners will receive an update after the session if a replay is made available." },
    { question: "How will I get the joining link?", answer: "We will email the Zoom joining details to the address you use during registration." },
  ],
};

export const englishFluencyEvent: EventLandingData = {
  theme: "blue",
  kicker: "Free live workshop",
  title: "Speak English Confidently in Daily Life",
  supportingLine: "Join the FREE English Fluency Workshop",
  subtitle: "If you understand English but feel nervous while speaking, this workshop will help you learn simple techniques to speak more confidently, form better sentences, and improve your daily conversation.",
  heroImage: "/generated/events/english-fluency-workshop-hero.png",
  bulletPoints: ["Live on Zoom", "120 Minutes", "Interactive Practice", "100% Free"],
  learnerCount: "8,500+ learners registered",
  buttonLabel: "Reserve My FREE Seat",
  scarcity: "Registration is free; seats are kept limited for a better live experience.",
  highlights: [
    { icon: "messages", title: "Speak with confidence", description: "in daily life" }, { icon: "clipboard", title: "Practical techniques", description: "that work" },
    { icon: "users", title: "Live practice", description: "and feedback" }, { icon: "shield", title: "Improve in just", description: "60 days" },
  ],
  lessonIntro: "A practical two-hour workshop to transform how you approach English speaking.",
  learningBlocks: [
    { icon: "help", title: "Understand What Holds You Back", description: "Know why speaking feels difficult and what to do about it.", points: ["Why you struggle to speak English", "How to stop overthinking every sentence", "Think in English, not translate"] },
    { icon: "lightbulb", title: "Use Techniques That Work", description: "Practice simple approaches that make speaking feel more natural.", points: ["Seven practical fluency techniques", "Build better daily-life sentences", "Speak in office, meetings and interviews"] },
    { icon: "messages", title: "Build Lasting Confidence", description: "Turn small practice into a habit that carries into real life.", points: ["Overcome fear and hesitation", "Practice with live feedback", "Create a 60-day improvement plan"] },
  ],
  sessionSteps: [
    { title: "Understand", description: "See what is really holding your fluency back." },
    { title: "Practice", description: "Learn clear techniques through live examples." },
    { title: "Speak with confidence", description: "Leave with a simple plan to keep growing." },
  ],
  audiences: [
    { icon: "student", label: "Student" }, { icon: "professional", label: "Working professional" }, { icon: "target", label: "Job seeker" },
    { icon: "store", label: "Entrepreneur" }, { icon: "home", label: "Homemaker" }, { icon: "messages", label: "Developing speaker" },
  ],
  audienceNote: "No advanced English needed. A willingness to practice is enough.",
  instructor: {
    name: "Smriti Ma’am", role: "English Communication Expert", image: "/generated/mentors/anita-karki.png",
    bio: "Smriti makes English communication practical, encouraging and relevant to the situations learners face every day. Her sessions help people move from understanding English to using it with confidence.",
    bullets: ["Trained 50,000+ learners", "6+ years of teaching experience", "Specialised in spoken English", "Focused on practical communication"],
  },
  reviewSummary: "4.9/5 from 800+ reviews",
  testimonials: [
    { quote: "Smriti ma’am makes learning fun and easy. My confidence improved a lot!", name: "Prakriti Tamang", role: "Student" },
    { quote: "The techniques are super practical. I can use them every day.", name: "Sushil Adhikari", role: "Working Professional" },
    { quote: "Best workshop for anyone who wants to speak English fluently.", name: "Neha KC", role: "Job Seeker" },
  ],
  reserveTitle: "Start speaking English confidently today",
  reserveDescription: "Seats are limited. Reserve your spot now and receive the joining details by email.",
  date: "Sun, 25 May 2025", time: "7:00 PM NPT", duration: "120 Minutes", platform: "Zoom", language: "Nepali + English",
  faqs: [
    { question: "Is this workshop really free?", answer: "Yes. The live English Fluency Workshop is completely free, but advance registration is required." },
    { question: "Do I need to know English already?", answer: "Only basic understanding is helpful. The workshop is designed to support beginners and developing speakers." },
    { question: "Will I get the recording?", answer: "Registered learners will receive an update after the workshop if a replay becomes available." },
    { question: "How will I get the joining link?", answer: "The Zoom joining link and reminders will be sent to your registration email." },
  ],
};
